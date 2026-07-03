import { apiRequest } from "./api";

/* =========================
   GET DASHBOARD ANALYTICS
========================= */
export const getAnalytics = async () => {
  return await apiRequest(
    "/analytics",
    "GET"
  );
};

/* =========================
   TOP RESOURCES
========================= */
export const getTopResources = async () => {
  return await apiRequest(
    "/analytics/top-resources",
    "GET"
  );
};

/* =========================
   MOST DOWNLOADED
========================= */
export const getMostDownloaded = async () => {
  return await apiRequest(
    "/analytics/downloads",
    "GET"
  );
};

/* =========================
   SEARCH ANALYTICS
========================= */
export const getSearchAnalytics = async () => {
  return await apiRequest(
    "/analytics/searches",
    "GET"
  );
};

/* =========================
   ACTIVE USERS
========================= */
export const getActiveUsers = async () => {
  return await apiRequest(
    "/analytics/active-users",
    "GET"
  );
};