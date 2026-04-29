import { createContext, useContext } from "react";
import { mockAnalyticsData } from "../data/analyticsData";

const AnalyticsContext = createContext(undefined);

export function AnalyticsProvider({ children }) {
  return (
    <AnalyticsContext.Provider value={{ globalAnalytics: mockAnalyticsData }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalyticsContext() {
  const ctx = useContext(AnalyticsContext);
  if (!ctx) throw new Error("useAnalyticsContext must be used within an AnalyticsProvider");
  return ctx;
}
