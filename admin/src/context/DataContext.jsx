// DataContext composes all domain providers into one tree.
// Pages import directly from their specific context (e.g. BranchContext, ProductContext).
// useData() is kept for any legacy usage but delegates to each sub-context internally.

import { useContext } from "react";
import { BranchProvider, useBranchContext } from "./BranchContext";
import { ProductProvider, useProductContext } from "./ProductContext";
import { RequestProvider, useRequestContext } from "./RequestContext";
import { AnalyticsProvider, useAnalyticsContext } from "./AnalyticsContext";
import { FinanceProvider, useFinanceContext } from "./FinanceContext";

// Compose all providers — order matters: inner providers can rely on outer ones
export function DataProvider({ children }) {
  return (
    <AnalyticsProvider>
      <FinanceProvider>
        <BranchProvider>
          <ProductProvider>
            <RequestProvider>{children}</RequestProvider>
          </ProductProvider>
        </BranchProvider>
      </FinanceProvider>
    </AnalyticsProvider>
  );
}

// useData() aggregates all contexts — kept for convenience / backward compat
export function useData() {
  const analytics = useAnalyticsContext();
  const finance = useFinanceContext();
  const branch = useBranchContext();
  const product = useProductContext();
  const request = useRequestContext();

  return {
    ...analytics,
    ...finance,
    ...branch,
    ...product,
    ...request,
  };
}
