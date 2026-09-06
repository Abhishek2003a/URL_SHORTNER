import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null,
  );

  const [loading, setLoading] = useState(false);

  /*
    ===================================
            CHECK AUTH ON LOAD
    ===================================
  */

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("Stored User:", storedUser);
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
      setToken(null);
    }
  }, [token]);

  /*
    ===================================
                LOGIN
    ===================================
  */

  const login = async (formData) => {
    try {
      setLoading(true);

      /*
        API CALL WILL COME HERE
      */
      // console.log("Login API Called with:", formData);
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!data.success) {
        return { success: false, message: data.message || "Login failed" };
      }
      console.log("Login successful, received data:", data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setToken(data.token);
      console.log("User set in context:", data.user);
      setUser(data.user);

      return { success: true };
    } catch (error) {
      console.log(error);

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

      /*
        API CALL WILL COME HERE
      */

      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!data.success) {
        return { success: false, message: data.message || "Signup failed" };
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setToken(data.token);
      setUser(data.user);

      return { success: true };
    } catch (error) {
      console.log(error);

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

  const logout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setToken(null);

    setUser(null);
  };

  /*
    ===================================
            CONTEXT VALUE
    ===================================
  */

  const value = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!token,
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
