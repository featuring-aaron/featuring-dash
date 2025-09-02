const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getDiscover = async () => {
  console.log(API_BASE_URL);
  const response = await fetch(`${API_BASE_URL}/api/discover`);
  console.log(response);
  return response.json();
};
