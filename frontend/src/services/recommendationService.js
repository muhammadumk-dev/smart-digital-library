import { apiRequest } from "./api";

/* =========================
   GET PERSONALIZED RECOMMENDATIONS
========================= */
export const getRecommendations = async () => {
  return await apiRequest(
    "/recommendations",
    "GET"
  );
};

/* =========================
   RECOMMENDATIONS BY RESOURCE
========================= */
export const getSimilarResources = async (
  resourceId
) => {
  return await apiRequest(
    `/recommendations/${resourceId}`,
    "GET"
  );
};

/* =========================
   RECOMMENDATIONS BY DEPARTMENT
========================= */
export const getDepartmentRecommendations =
  async () => {
    return await apiRequest(
      "/recommendations/department",
      "GET"
    );
  };

/* =========================
   TRENDING RESOURCES
========================= */
export const getTrendingResources =
  async () => {
    return await apiRequest(
      "/recommendations/trending",
      "GET"
    );
  };