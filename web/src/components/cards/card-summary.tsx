import { LucideIcon } from "lucide-react";

interface CardSummaryProps {
  card: {
    icon: LucideIcon;
     title: string;
    amount: number;
    description: string;
  }
}
export function CardSummary(props: CardSummaryProps) {
  const { card } = props;
  const { title, amount, description } = card;

  // Define a cor do amount com base no título
  const amountColor =
    title === "Entradas"
      ? "#4ADE80"
      : title === "Saídas"
      ? "#EF4444"
      : title === "Balanço"
      ? amount >= 0
        ? "#4ADE80"
        : "#EF4444"
      : "#FFF";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
        maxHeight: "300px",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
          gap: "1rem",
          backgroundColor: "#09090B",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          height: "100%",
          color: "#fff",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <span>{title}</span>
          {card.icon && <card.icon />}
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginTop: "0.5rem",
            color: amountColor, // Aplica a cor dinâmica
          }}
        >
          <span>R$ {amount}</span>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
          }}
        >
          <p
            style={{
              fontSize: "0.7rem",
              color: "#666",
              textAlign: "left",
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}