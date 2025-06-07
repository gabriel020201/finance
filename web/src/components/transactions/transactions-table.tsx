import * as lucide from "lucide-react";
import transactions from "../../assets/transactions.json" with { type: "json" };
import React from "react";


type Transaction = typeof transactions[0];

export function TransactionTable() {
  const hasScroll = transactions.length > 1; 

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
        height: "100%",
      }}
    >
      <h3 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: "bold" }}> 
      Transações</h3>
      <div
        className="scrollHidden"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "100%",
          overflowY: hasScroll ? "auto" : "hidden",
          height: "300px", 
          
          
        }}
      >
        <table
          style={{
            borderCollapse: "separate",
            width: "100%",
            
          }}
        >
          <thead>
            <tr
              style={{
                textAlign: "center",
                  color: "#666",
                  fontWeight: "bold",
                  padding: "0.5rem",
                  position: "sticky", 
                  top: 0, 
                  backgroundColor: "#27272A", 
                  zIndex: 1, 
              }}>
              <th>
                Icone
              </th>
              <th>
                Descrição
              </th>
              <th>
                Tipo
              </th>
              <th>
                Valor
              </th>
              <th>
                Banco
              </th>
              <th>
                Data
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction: Transaction) => (
              <tr
                key={transaction.id}
                style={{
                  
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  color: "#fff",
                  textAlign: "center",
                  
                  padding: "0.5rem",
                  
                }}
              >
                <td>
                  {transaction.category.icon in lucide
                    ? React.createElement(
                        lucide[transaction.category.icon as keyof typeof lucide] as React.ElementType
                      )
                    : null}
                </td>
                <td>
                  {transaction.description}
                </td>
                <td>
                  {transaction.type === "income" ? "Entrada" : "Saída"}
                </td>
                <td
                  style={{
                    color: transaction.type === "income" ? "#4ADE80" : "#EF4444", // Verde para entrada, vermelho para saída
                  }}
                >
                  {transaction.amount.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td>
                  {transaction.bank}
                </td>
                <td>
                  {new Date(transaction.date).toLocaleString("pt-BR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}