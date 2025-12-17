import apiClient from './Cliente.js';


export function signupUser({ fullName, email, password }) {
  return apiClient.post("/auth/signup", {
    fullName,
    email,
    password,
  });
}
export function loginUser({ email, password }) {
  return apiClient.post("/auth/signin", {
    email,
    password,
  });
}