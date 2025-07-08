import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import transactions from "../../assets/transactions.json" with { type: "json" };

// Definir o tipo Transaction baseado na estrutura do seu JSON
type Transaction = typeof transactions[0] & { date: string }; // Certifique-se que 'date' está no tipo

// Função para obter o nome do mês a partir de uma data (ex: "2023-05-15" -> "Maio")
const getMonthName = (dateString: string) => {
  const date = new Date(dateString);
  // Sempre retorna o mês em minúsculo
  return date.toLocaleString('pt-BR', { month: 'long' }).toLowerCase();
};

// Função para obter o número do mês para ordenação (0 = Janeiro, 1 = Fevereiro, ...)
const getMonthNumber = (dateString: string) => {
  return new Date(dateString).getMonth();
}

const allMonths = [
  { month: "janeiro", order: 0 },
  { month: "fevereiro", order: 1 },
  { month: "março", order: 2 },
  { month: "abril", order: 3 },
  { month: "maio", order: 4 },
  { month: "junho", order: 5 },
  { month: "julho", order: 6 },
  { month: "agosto", order: 7 },
  { month: "setembro", order: 8 },
  { month: "outubro", order: 9 },
  { month: "novembro", order: 10 },
  { month: "dezembro", order: 11 },
];

// Descubra o ano de referência (pode ser fixo ou o mais recente)
const referenceYear = 2023;

// Processar os dados de transações para obter os gastos por mês
const monthlySpendingDataRaw = transactions
  .filter((transaction: Transaction) => transaction.type === "expense" && new Date(transaction.date).getFullYear() === referenceYear)
  .reduce((acc, transaction) => {
    const date = new Date(transaction.date);
    const monthNumber = date.getMonth();
    const monthName = allMonths[monthNumber].month;
    const existingMonth = acc.find(item => item.month === monthName);

    if (existingMonth) {
      existingMonth.Gasto += transaction.amount;
    } else {
      acc.push({ month: monthName, Gasto: transaction.amount, monthOrder: monthNumber });
    }
    return acc;
  }, [] as { month: string; Gasto: number; monthOrder: number }[]);

// Garante que todos os meses aparecem, mesmo que não haja gasto
const monthlySpendingData = allMonths.map(({ month, order }) => {
  const found = monthlySpendingDataRaw.find(item => item.month === month);
  return {
    month,
    Gasto: found ? found.Gasto : 0,
    monthOrder: order,
  };
});

export function ChartAnalyze() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      width: "100%",
    }}>
      <h3
      style={{
        color: "#fff",
        fontSize: "1.5rem",
        fontWeight: "bold",
      }}
      >Análise de Gastos por Mês</h3> 
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "95%",
          height: "300px",
          backgroundColor: "#09090B",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          padding: "1rem",
        }}
      >
        {monthlySpendingData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlySpendingData} // Usar os dados de gastos mensais
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" /> {/* 'month' será o nome do mês */}
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1F2937", border: "none", borderRadius: "4px", color: "#E5E7EB" }}
                itemStyle={{ color: "#EF4444" }}
                cursor={{ fill: 'rgba(107, 114, 128, 0.2)' }}
                formatter={(value: number, name: string, props: any) => {
                  // O 'name' aqui será 'Gasto', props.payload.month terá o nome do mês
                  return [`R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, `Gasto em ${props.payload.month}`];
                }}
                labelFormatter={(label: string) => `Mês: ${label}`} // O label aqui é o valor do dataKey do XAxis (mês)
              />
              <Bar dataKey="Gasto" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p style={{ color: "#9CA3AF" }}>Não há dados de gastos para exibir.</p>
        )}
      </div>
    </div>
  )
}
