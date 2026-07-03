import { apiRequest } from "./api";

export const getResources = (q = "") =>
  apiRequest(
    `/resources${q ? `?q=${encodeURIComponent(q)}` : ""}`,
    "GET",
    null,
    false
  );

export const getResource = (id) =>
  apiRequest(`/resources/${id}`, "GET", null, false);

export const createResource = (formData) =>
  apiRequest("/resources", "POST", formData, true);

export const downloadResource = (id) =>
  apiRequest(`/resources/${id}/download`, "POST", null, true);