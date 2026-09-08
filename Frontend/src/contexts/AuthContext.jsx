/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useState } from "react";
import { getApiUrl } from "../config/api";

const AuthContext = createContext();

const normalizeUser = (user) => {
  if (!user) return null;

  return {
    id: user.id || user.userId,
    username: user.username || user.userName || "User",
    email: user.email || "",
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return null;

    try {
      return normalizeUser(JSON.parse(storedUser));
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  const [accessToken, setToken] = useState(
    () => localStorage.getItem("token") || null,
  );

  const [loading, setLoading] = useState(false);

  /*
    ===================================
                LOGIN
    ===================================
  */

  const login = async (formData) => {
    try {
      setLoading(true);
      const response = await fetch(getApiUrl("/api/auth/login"), {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!data.success) {
        return { success: false, message: data.message || "Login failed" };
      }
      const loggedInUser = normalizeUser(data.user);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(loggedInUser));

      setToken(data.token);
      setUser(loggedInUser);

      return { success: true };
    } catch {
      return {
        success: false,
        message: "Login failed",
      };
    } finally {
      setLoading(false);
    }
  };

  /*
    ===================================
                SIGNUP
    ===================================
  */

  const signup = async (formData) => {
    try {
      setLoading(true);
      const response = await fetch(getApiUrl("/api/auth/register"), {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!data.success) {
        return { success: false, message: data.message || "Signup failed" };
      }

      const signedUpUser = normalizeUser(data.user);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(signedUpUser));
      setToken(data.token);
      setUser(signedUpUser);

      return { success: true };
    } catch {
      return {
        success: false,
        message: "Signup failed",
      };
    } finally {
      setLoading(false);
    }
  };

  /*
    ===================================
                LOGOUT
    ===================================
  */
  const logout = async () => {
    try {
      const res = await fetch(getApiUrl("/api/auth/logout"), {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setToken(null);
      setUser(null);
    }

    return { success: true };
  };

  const setAccessToken = useCallback((newToken) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    }
    setToken(newToken);
  }, []);

  /*
    ===================================
            CONTEXT VALUE
    ===================================
  */

  const value = {
    user,
    accessToken,
    setAccessToken,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!accessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/*
  ===================================
            CUSTOM HOOK
  ===================================
*/

export const useAuth = () => {
  return useContext(AuthContext);
};
