// src/api/fetchWithAuth.js
let refreshPromise = null;
const API_URL = "http://localhost:3000";
const refreshAccessToken = async (setAccessToken) => {
  const response = await fetch(`${API_URL}/api/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("REFRESH_FAILED");
  }
  const data = await response.json();
  // New access token → AuthContext
  setAccessToken(data.token);
  return data.token;
};

export const fetchWithAuth = async (
  endpoint,
  options = {},
  currentAccessToken,
  setAccessToken,
) => {
  // 1. Original request
  let response = await fetch(`${API_URL}${endpoint}`, {
    ...options,

    headers: {
      ...options.headers,
      Authorization: `Bearer ${currentAccessToken}`,
    },

    credentials: "include",
  });
  // Access token valid
  if (response.status !== 401) {
    return response;
  }

  // 2. Check why 401 happened
  let errorData;

  try {
    errorData = await response.json();
  } catch {
    return response;
  }
  console.error(
    "Error from fetchWithAuth:",
    errorData.code,
    " ",
    errorData.message,
  );
  // Invalid/tampered token → DON'T refresh
  if (errorData.message !== "ACCESS_TOKEN_EXPIRED") {
    return response;
  }
  // 3. Single-refresh locking
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken(setAccessToken).finally(() => {
      refreshPromise = null;
    });
  }

  try {
    // Existing refresh request hai to uska result wait karega
    const newAccessToken = await refreshPromise;

    // 4. Retry original request
    return await fetch(`${API_URL}${endpoint}`, {
      ...options,

      headers: {
        ...options.headers,
        Authorization: `Bearer ${newAccessToken}`,
      },

      credentials: "include",
    });
  } catch (error) {
    // Refresh token invalid/expired
    setAccessToken(null);

    throw error;
  }
};
