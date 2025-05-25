import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import transactions from "../../assets/transactions.json" with { type: "json" };

// Definir o tipo Transaction baseado na estrutura do seu JSON
type Transaction = typeof transactions[0] & { date: string }; // Certifique-se que 'date' está no tipo

// Função para obter o nome do mês a partir de uma data (ex: "2023-05-15" -> "Maio")
const getMonthName = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('pt-BR', { month: 'long' });
};

// Função para obter o número do mês para ordenação (0 = Janeiro, 1 = Fevereiro, ...)
const getMonthNumber = (dateString: string) => {
  return new Date(dateString).getMonth();
}

export function ChartAnalyze() {
  // Processar os dados de transações para obter os gastos por mês
  const monthlySpendingData = transactions
    .filter((transaction: Transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => {
      const monthName = getMonthName(transaction.date);
      const monthNumber = getMonthNumber(transaction.date); // Para ordenação
      const amount = transaction.amount;

      const existingMonth = acc.find(item => item.month === monthName);

      if (existingMonth) {
        existingMonth.Gasto += amount;
      } else {
        acc.push({ month: monthName, Gasto: amount, monthOrder: monthNumber });
      }
      return acc;
    }, [] as { month: string; Gasto: number; monthOrder: number }[])
    .sort((a, b) => a.monthOrder - b.monthOrder); // Ordena os meses cronologicamente

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
      >Análise de Gastos por Mês</h3> {/* Título atualizado */}
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
                contentStyle={{ backgroundColor: "#1F2937", border: "none", borderRadius: "4px" }}
                itemStyle={{ color: "#E5E7EB" }}
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
