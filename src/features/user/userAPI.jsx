export async function fetchLoggedInUserOrder(userId) {
  try {
    const response = await fetch("http://localhost:3000/orders/?user.id=" + userId);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error fetching all products:", error.message);
    return { data: [] };
  }
}