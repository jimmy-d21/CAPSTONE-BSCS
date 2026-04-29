import { createContext, useContext } from "react";
import { mockFinanceData } from "../data/financeData";

const FinanceContext = createContext(undefined);

export function FinanceProvider({ children }) {
  return (
    <FinanceContext.Provider value={{ financeData: mockFinanceData }}>
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinanceContext() {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error("useFinanceContext must be used within a FinanceProvider");
  return ctx;
}
