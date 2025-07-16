import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000';

// Função para fazer requisições HTTP com debug detalhado
async function makeRequest(method, url, body = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    console.log(`🔍 Fazendo ${method} para ${BASE_URL}${url}`);
    const response = await fetch(`${BASE_URL}${url}`, options);
    
    console.log(`📊 Status: ${response.status}`);
    console.log(`📋 Headers:`, Object.fromEntries(response.headers));
    
    // Para DELETE, verificar apenas o status
    if (method === 'DELETE') {
      const text = await response.text();
      console.log(`📄 Body response: "${text}"`);
      return { status: response.status, data: text };
    }
    
    // Para outras requisições, tentar ler JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      console.log(`📄 JSON response:`, data);
      return { status: response.status, data };
    }
    
    const text = await response.text();
    console.log(`📄 Text response: "${text}"`);
    return { status: response.status, data: text };
  } catch (error) {
    console.log(`❌ Erro na requisição: ${error.message}`);
    return { status: 0, error: error.message };
  }
}

// Teste específico para DELETE
async function testDelete() {
  console.log('🚀 TESTE DEBUG DO DELETE\n');

  // Criar uma categoria para testar
  console.log('=== CRIANDO CATEGORIA ===');
  const createCat = await makeRequest('POST', '/categories', {
    name: 'TestDelete_' + Date.now(),
    icon: 'Test'
  });
  
  if (createCat.status !== 200) {
    console.log('❌ Falha ao criar categoria');
    return;
  }
  
  const categoryId = createCat.data.id;
  console.log(`✅ Categoria criada com ID: ${categoryId}\n`);

  // Testar DELETE
  console.log('=== TESTANDO DELETE ===');
  const deleteCat = await makeRequest('DELETE', `/categories/${categoryId}`);
  
  console.log(`\n📊 Resultado do DELETE:`);
  console.log(`Status: ${deleteCat.status}`);
  console.log(`Esperado: 204`);
  console.log(`Sucesso: ${deleteCat.status === 204 ? '✅' : '❌'}`);
}

// Executar teste
testDelete().catch(error => {
  console.error(`❌ Erro durante o teste: ${error.message}`);
  process.exit(1);
});
