import { createContext, useContext, useState } from "react";
import { mockRequests } from "../data/requestData";

const RequestContext = createContext(undefined);

export function RequestProvider({ children }) {
  const [requests, setRequests] = useState(mockRequests);

  const updateRequestStatus = (id, status, extra = {}) =>
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status, ...extra } : r))
    );

  const updateRequestPriority = (id, priority) =>
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, priority } : r))
    );

  return (
    <RequestContext.Provider
      value={{ requests, updateRequestStatus, updateRequestPriority }}
    >
      {children}
    </RequestContext.Provider>
  );
}

export function useRequestContext() {
  const ctx = useContext(RequestContext);
  if (!ctx) throw new Error("useRequestContext must be used within a RequestProvider");
  return ctx;
}
