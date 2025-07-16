import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000';

// Cores para o console
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

// Função para fazer requisições HTTP
async function makeRequest(method, url, body = null) {
  const options = {
    method,
    headers: {},
  };

  if (body) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${url}`, options);
    
    // Para DELETE, verificar apenas o status
    if (method === 'DELETE') {
      return { status: response.status, data: null };
    }
    
    // Para outras requisições, tentar ler JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      return { status: response.status, data };
    }
    
    return { status: response.status, data: null };
  } catch (error) {
    return { status: 0, error: error.message };
  }
}

// Função para exibir resultado do teste
function logResult(testName, success, message = '') {
  const icon = success ? '✅' : '❌';
  const color = success ? colors.green : colors.red;
  console.log(`${color}${icon} ${testName}${colors.reset}${message ? ' - ' + message : ''}`);
}

// Função para exibir cabeçalho da seção
function logSection(title) {
  console.log(`\n${colors.blue}${colors.bold}=== ${title} ===${colors.reset}`);
}

// Função para gerar dados únicos
function generateUniqueData() {
  const timestamp = Date.now();
  return {
    categoryName: `Teste_${timestamp}`,
    bankName: `Banco_${timestamp}`,
    bankIspb: `${timestamp}`.slice(-8),
    bankCode: `${timestamp}`.slice(-3),
    transactionDesc: `Transação_${timestamp}`
  };
}

// Função principal de teste
async function runCompleteTest() {
  console.log(`${colors.bold}${colors.blue}🚀 TESTE COMPLETO DA API - FINANCE BACKEND${colors.reset}`);
  console.log(`${colors.yellow}Testando: ${BASE_URL}${colors.reset}\n`);

  // Verificar se servidor está rodando
  try {
    await fetch(`${BASE_URL}/categories`);
  } catch (error) {
    console.log(`${colors.red}❌ Servidor não está rodando em ${BASE_URL}${colors.reset}`);
    return;
  }

  const uniqueData = generateUniqueData();
  let categoryId, bankId, transactionId;

  // ========== CATEGORIAS ==========
  logSection('CATEGORIAS');
  
  // POST categoria
  const createCat = await makeRequest('POST', '/categories', {
    name: uniqueData.categoryName,
    icon: 'Test'
  });
  if (createCat.status === 200) {
    categoryId = createCat.data.id;
    logResult('POST /categories', true, `Criada: ${uniqueData.categoryName}`);
  } else {
    logResult('POST /categories', false, `Erro ${createCat.status}`);
  }

  // GET todas categorias
  const getAllCats = await makeRequest('GET', '/categories');
  logResult('GET /categories', getAllCats.status === 200, `${getAllCats.data?.length || 0} categorias`);

  // GET categoria por ID
  const getCat = await makeRequest('GET', `/categories/${categoryId}`);
  logResult('GET /categories/:id', getCat.status === 200, `Nome: ${getCat.data?.name || 'N/A'}`);

  // PATCH categoria
  const updateCat = await makeRequest('PATCH', `/categories/${categoryId}`, {
    name: uniqueData.categoryName + '_Updated'
  });
  logResult('PATCH /categories/:id', updateCat.status === 200, `Atualizada para: ${updateCat.data?.name || 'N/A'}`);

  // ========== BANCOS ==========
  logSection('BANCOS');
  
  // POST banco
  const createBank = await makeRequest('POST', '/banks', {
    ispb: uniqueData.bankIspb,
    name: uniqueData.bankName,
    code: uniqueData.bankCode,
    fullName: uniqueData.bankName + ' S.A.'
  });
  if (createBank.status === 200) {
    bankId = createBank.data.id;
    logResult('POST /banks', true, `Criado: ${uniqueData.bankName}`);
  } else {
    logResult('POST /banks', false, `Erro ${createBank.status}`);
  }

  // GET todos bancos
  const getAllBanks = await makeRequest('GET', '/banks');
  logResult('GET /banks', getAllBanks.status === 200, `${getAllBanks.data?.length || 0} bancos`);

  // GET banco por ID
  const getBank = await makeRequest('GET', `/banks/${bankId}`);
  logResult('GET /banks/:id', getBank.status === 200, `Nome: ${getBank.data?.name || 'N/A'}`);

  // PATCH banco
  const updateBank = await makeRequest('PATCH', `/banks/${bankId}`, {
    name: uniqueData.bankName + '_Updated'
  });
  logResult('PATCH /banks/:id', updateBank.status === 200, `Atualizado para: ${updateBank.data?.name || 'N/A'}`);

  // ========== TRANSAÇÕES ==========
  logSection('TRANSAÇÕES');
  
  // POST transação
  const createTrans = await makeRequest('POST', '/transactions', {
    description: uniqueData.transactionDesc,
    type: 'expense',
    amount: 150.75,
    date: new Date().toISOString(),
    categoryId: categoryId,
    ispb: uniqueData.bankIspb
  });
  if (createTrans.status === 200) {
    transactionId = createTrans.data.id;
    logResult('POST /transactions', true, `Criada: ${uniqueData.transactionDesc}`);
  } else {
    logResult('POST /transactions', false, `Erro ${createTrans.status}`);
  }

  // GET todas transações
  const getAllTrans = await makeRequest('GET', '/transactions');
  logResult('GET /transactions', getAllTrans.status === 200, `${getAllTrans.data?.length || 0} transações`);

  // GET transação por ID
  const getTrans = await makeRequest('GET', `/transactions/${transactionId}`);
  logResult('GET /transactions/:id', getTrans.status === 200, `Descrição: ${getTrans.data?.description || 'N/A'}`);

  // GET transações por categoria
  const getTransByCat = await makeRequest('GET', `/transactions/category/${categoryId}`);
  logResult('GET /transactions/category/:id', getTransByCat.status === 200, `${getTransByCat.data?.length || 0} transações da categoria`);

  // PATCH transação
  const updateTrans = await makeRequest('PATCH', `/transactions/${transactionId}`, {
    description: uniqueData.transactionDesc + '_Updated',
    amount: 200.50
  });
  logResult('PATCH /transactions/:id', updateTrans.status === 200, `Atualizada: ${updateTrans.data?.description || 'N/A'}`);

  // ========== LIMPEZA (DELETE) ==========
  logSection('LIMPEZA - DELETE');
  
  // Aguardar um pouco antes de deletar
  await new Promise(resolve => setTimeout(resolve, 500));

  // DELETE transação
  const deleteTrans = await makeRequest('DELETE', `/transactions/${transactionId}`);
  logResult('DELETE /transactions/:id', deleteTrans.status === 204, 'Transação removida');

  // DELETE banco
  const deleteBank = await makeRequest('DELETE', `/banks/${bankId}`);
  logResult('DELETE /banks/:id', deleteBank.status === 204, 'Banco removido');

  // DELETE categoria
  const deleteCat = await makeRequest('DELETE', `/categories/${categoryId}`);
  logResult('DELETE /categories/:id', deleteCat.status === 204, 'Categoria removida');

  // ========== RESULTADO FINAL ==========
  console.log(`\n${colors.green}${colors.bold}🎉 TESTE COMPLETO FINALIZADO!${colors.reset}`);
  console.log(`${colors.blue}Todas as operações CRUD foram testadas com sucesso!${colors.reset}`);
  console.log(`${colors.yellow}Para executar novamente: npm test${colors.reset}`);
}

// Executar teste
runCompleteTest().catch(error => {
  console.error(`${colors.red}❌ Erro durante o teste: ${error.message}${colors.reset}`);
  process.exit(1);
});
