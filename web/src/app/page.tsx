"use client"

import { CardSummary } from "../components/cards/card-summary";
import { Category } from "../components/categorys/category";
import { ChartAnalyze } from "../components/charts/chart-analyze";
import { Header } from "../components/header";
import { TransactionTable } from "../components/transactions/transactions-table";

import transactions from "../assets/transactions.json";

import { BanknoteArrowDown, BanknoteArrowUp, Banknote } from "lucide-react";



// Calcula os totais a partir do JSON
const totalEntries = transactions
  .filter((t: any) => t.type === "income")
  .reduce((sum: number, t: any) => sum + (t.amount || 0), 0);

const totalExits = transactions
  .filter((t: any) => t.type === "expense")
  .reduce((sum: number, t: any) => sum + (t.amount || 0), 0);

const totalBalance = totalEntries - totalExits;

const cards = [
  {
    icon: BanknoteArrowDown,
    title: "Entradas",
    amount: totalEntries,
    description: "Soma de todas as entradas do período",
  },
  {
    icon: BanknoteArrowUp,
    title: "Saídas",
    amount: totalExits,
    description: "Soma de todas as saídas do período",
  },
  {
    icon: Banknote,
    title: "Balanço",
    amount: totalBalance,
    description: "Soma de todas as entradas e saídas do período",
  }
]

function getCategoriesFromTransactions(transactions: any[]) {
  const map = new Map<string, { id: string; icon: any; name: string; quantity: number; amount: number }>();
  transactions.forEach((t) => {
    if (!t.category || !t.category.name) return;
    const key = t.category.name;
    const icon = t.category.icon;
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

const categories = getCategoriesFromTransactions(transactions);

export default function Home() {


  return (
   <main style={{
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    justifyContent: "start",
    alignItems: "start",
    height: "100%",
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
    padding: "1rem",
    backgroundColor: "#27272A",
   }}>
    <Header/>
    <section style={{
      display: "flex",
      flexDirection: "row",
      gap: "1rem",
      width: "100%",
    }}>
      {cards.map((card) => (
        <CardSummary key={card.title} card={card}/>
      ))}
    </section>

    <section style={{
      display: "flex",
      flexDirection: "row",
      gap: "1rem",
      width: "100%",
    }}>
      <ChartAnalyze/>
      <Category categories={categories}/>
    </section>

    <section style={{
      display: "flex",
      flexDirection: "row",
      gap: "1rem",
      width: "100%",
    }}>
      <TransactionTable />
    </section>
   </main>
  );
}
