import { apiClient } from "./apiClient";
import { aiClient } from "./aiClient";

export type ApiType = "default" | "ai";

export const resolveClient = (api: ApiType = "default") => {
  return api === "ai" ? aiClient : apiClient;
};
