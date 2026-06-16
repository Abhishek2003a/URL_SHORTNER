import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(
    localStorage.getItem("token") || null,
  );

  const [loading, setLoading] = useState(true);

  /*
    ===================================
            CHECK AUTH ON LOAD
    ===================================
  */

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
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

      // TEMP MOCK RESPONSE
      const mockResponse = {
        token: "mock-jwt-token",
        user: {
          id: "1",
          username: "Abhishek",
          email: formData.email,
        },
      };

      localStorage.setItem("token", mockResponse.token);

      localStorage.setItem(
        "user",
        JSON.stringify(mockResponse.user),
      );

      setToken(mockResponse.token);

      setUser(mockResponse.user);

      return {
        success: true,
      };
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

      // TEMP MOCK RESPONSE
      const mockResponse = {
        token: "mock-jwt-token",
        user: {
          id: "1",
          username: formData.username,
          email: formData.email,
        },
      };

      localStorage.setItem("token", mockResponse.token);

      localStorage.setItem(
        "user",
        JSON.stringify(mockResponse.user),
      );

      setToken(mockResponse.token);

      setUser(mockResponse.user);

      return {
        success: true,
      };
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

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/*
  ===================================
            CUSTOM HOOK
  ===================================
*/

export const useAuth = () => {
  return useContext(AuthContext);
};