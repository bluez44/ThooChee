import React, { createContext, useContext, useState, useEffect } from "react";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string; // ISO date string YYYY-MM-DD
  notes?: string;
}

export interface AppState {
  transactions: Transaction[];
  budgetLimit: number;
  voiceState: "idle" | "listening" | "processing";
  addTransaction: (tx: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;
  resetTransactions: () => void;
  updateBudgetLimit: (limit: number) => void;
  setVoiceState: (state: "idle" | "listening" | "processing") => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

// Ethereal mock data representing historical income and expenses
const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: "tx-1",
    title: "Monthly Salary",
    amount: 3200,
    type: "income",
    category: "Salary",
    date: "2026-05-01",
    notes: "Direct deposit from company main payroll",
  },
  {
    id: "tx-2",
    title: "Whole Foods Groceries",
    amount: 142.5,
    type: "expense",
    category: "Groceries",
    date: "2026-05-03",
    notes: "Organic vegetables and monthly stock up",
  },
  {
    id: "tx-3",
    title: "Cozy Coffee Corner",
    amount: 6.8,
    type: "expense",
    category: "Food & Drinks",
    date: "2026-05-04",
    notes: "Oat milk latte and almond croissant",
  },
  {
    id: "tx-4",
    title: "App Store Subscription",
    amount: 14.99,
    type: "expense",
    category: "Entertainment",
    date: "2026-05-05",
    notes: "Stitch UI Pro design subscription renewal",
  },
  {
    id: "tx-5",
    title: "Chevron Gas Station",
    amount: 45.0,
    type: "expense",
    category: "Transportation",
    date: "2026-05-07",
    notes: "Fuel for weekly commute",
  },
  {
    id: "tx-6",
    title: "Freelance Web Design",
    amount: 850.0,
    type: "income",
    category: "Freelance",
    date: "2026-05-10",
    notes: "Homepage mockup delivery for tech client",
  },
  {
    id: "tx-7",
    title: "Electric & Water Utilities",
    amount: 112.35,
    type: "expense",
    category: "Utilities",
    date: "2026-05-12",
    notes: "May monthly household utility bills",
  },
  {
    id: "tx-8",
    title: "Target Home Goods",
    amount: 89.2,
    type: "expense",
    category: "Shopping",
    date: "2026-05-15",
    notes: "Bed linens and scented candles",
  },
  {
    id: "tx-9",
    title: "Uber Ride Home",
    amount: 22.4,
    type: "expense",
    category: "Transportation",
    date: "2026-05-18",
    notes: "Late night ride back home",
  },
  {
    id: "tx-10",
    title: "Gym Membership",
    amount: 60.0,
    type: "expense",
    category: "Health & Fitness",
    date: "2026-05-20",
    notes: "Monthly access pass",
  },
  {
    id: "tx-11",
    title: "Trattoria Pasta Dinner",
    amount: 72.8,
    type: "expense",
    category: "Food & Drinks",
    date: "2026-05-22",
    notes: "Dinner out with friends",
  },
  {
    id: "tx-12",
    title: "Stock Dividends",
    amount: 125.4,
    type: "income",
    category: "Investment",
    date: "2026-05-25",
    notes: "Quarterly stock portfolio payouts",
  },
  {
    id: "tx-13",
    title: "Local Pharmacy",
    amount: 34.5,
    type: "expense",
    category: "Health & Fitness",
    date: "2026-05-26",
    notes: "Vitamins and allergy medicine",
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgetLimit, setBudgetLimit] = useState<number>(2000);
  const [voiceState, setVoiceState] = useState<
    "idle" | "listening" | "processing"
  >("idle");

  // Load initial data on mount
  useEffect(() => {
    setTransactions(INITIAL_TRANSACTIONS);
  }, []);

  const addTransaction = (tx: Omit<Transaction, "id">) => {
    const newTx: Transaction = {
      ...tx,
      id: `tx-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const resetTransactions = () => {
    setTransactions([]);
  };

  const updateBudgetLimit = (limit: number) => {
    setBudgetLimit(limit);
  };

  return (
    <AppContext.Provider
      value={{
        transactions,
        budgetLimit,
        voiceState,
        addTransaction,
        deleteTransaction,
        resetTransactions,
        updateBudgetLimit,
        setVoiceState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within an AppProvider");
  }
  return context;
};
