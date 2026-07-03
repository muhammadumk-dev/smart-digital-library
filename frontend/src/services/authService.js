import { apiRequest } from "./api";

export const registerUser = (data) =>
  apiRequest("/auth/register", "POST", data, false);

export const loginUser = (data) =>
  apiRequest("/auth/login", "POST", data, false);

export const getMe = () =>
  apiRequest("/auth/me");

export function saveSession(data) {
  localStorage.setItem("token", data.token);
  localStorage.setItem(
    "user",
    JSON.stringify(data.user)
  );
}

export function getUser() {
  try {
    return JSON.parse(
      localStorage.getItem("user")
    );
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return !!localStorage.getItem("token");
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
}