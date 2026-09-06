// import useFetchWithAuth from "../hooks/useFetchWithAuth";

export const getUserAllUrls = async (page, limit, FetchWithAuth) => {
  const response = await FetchWithAuth(
    `/api/user/my-urls?page=${page}&limit=${limit}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch URLs");
  }
  const data = await response.json();
  return data;
};

export const createShortUrl = async (
  originalUrl,
  customCode,
  FetchWithAuth,
) => {
  const response = await FetchWithAuth("/api/user/generateShortUrl", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ originalUrl, customCode }),
  });
  if (!response.ok) {
    console.error("Error creating short URL:", response.statusText);
    throw new Error("Failed to create short URL");
  }
  const data = await response.json();
  return data;
};
