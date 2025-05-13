import { type LucideIcon } from "lucide-react";

interface CategoryProps {
  categories: {
    id: string;
    icon: LucideIcon;
    name: string;
    quantity: number;
    amount: number;
  }[]
}
export function Category(props: CategoryProps) {
  const { categories } = props
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "350px",
        width: "100%",
        height: "100%",
      }}
    >
      <h3>Categorias</h3>
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1rem",
        backgroundColor: "#09090B",
      }}>
        {categories.map((cat) => (
          <div
            key={cat.id}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              color: "#fff",
              backgroundColor: "transparent",
            }}
          >
            <div style={{ display: "flex", gap: "1rem", alignItems: "center", flex: 1 }}>
              {cat.icon && <cat.icon />}
              <span>{cat.name}</span>
            </div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <span style={{ textAlign: "right", minWidth: "50px" }}>{cat.quantity}</span>
              <span style={{ textAlign: "right", minWidth: "50px" }}>{cat.amount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
