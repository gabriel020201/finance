import { type LucideIcon } from "lucide-react";
import transactions from "../../assets/transactions.json" with { type: "json" };
import styles from "./category.module.css";

// Mapeamento de ícones pelo nome (adicione todos os ícones usados nas categorias)
import { ShoppingBasket, Utensils, Dumbbell, Film, Heart, Car, Book, Wifi, Zap, Fuel, Stethoscope, Laptop, ShoppingCart, Shirt, Droplet, Dog, Coffee, PenTool, Scissors, IceCream, Wrench, Tv, DollarSign, CircleEllipsis, TreePalm, Pill } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  ShoppingBasket,
  Utensils,
  Dumbbell,
  Film,
  Heart,
  Car,
  Book,
  Wifi,
  Zap,
  Fuel,
  Stethoscope,
  Laptop,
  ShoppingCart,
  Shirt,
  Droplet,
  Dog,
  Coffee,
  PenTool,
  Scissors,
  IceCream,
  Wrench,
  Tv,
  DollarSign,
  CircleEllipsis,
  TreePalm,
  Pill,
};
interface CategoryProps {
  categories: any[];
}


  // component implementation

type Transaction = typeof transactions[0];

function getCategoriesFromTransactions(transactions: Transaction[]) {
  const map = new Map<string, { id: string; icon: LucideIcon; name: string; quantity: number; amount: number }>();
  transactions.forEach((t) => {
    if (!t.category || !t.category.name) return;
    const key = t.category.name;
    const icon = iconMap[t.category.icon] || ShoppingBasket;
    if (map.has(key)) {
      const cat = map.get(key)!;
      cat.quantity += 1;
      cat.amount += t.amount || 0;
    } else {
      map.set(key, {
        id: key,
        icon,
        name: key,
        quantity: 1,
        amount: t.amount || 0,
      });
    }
  });
  return Array.from(map.values());
}

export function Category({ categories }: CategoryProps) {
  const computedCategories = getCategoriesFromTransactions(transactions);

  // Aplica scroll invisível se houver mais de 6 categorias
  const containerClass =
    computedCategories.length > 6 ? styles["scroll-invisivel"] : "";

  return (
    <div
      style={{
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        maxWidth: "400px",
        width: "100%",
        height: "100%",
      }}
    >
      <h3>Categorias</h3>
      <div
        className={containerClass}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "1rem",
          backgroundColor: "#09090B",
        }}
      >
        {computedCategories.map((cat) => (
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
              <span style={{ textAlign: "right", minWidth: "50px" }}>R$ {cat.amount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
