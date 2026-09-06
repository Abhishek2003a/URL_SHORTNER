import { useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import { fetchWithAuth } from "../api/fetchWithAuth";

const useFetchWithAuth = () => {
  const { accessToken, setAccessToken } = useAuth();

  const request = useCallback(async (endpoint, options = {}) => {
    return fetchWithAuth(endpoint, options, accessToken, setAccessToken);
  }, [accessToken, setAccessToken]);

  return request;
};

export default useFetchWithAuth;
