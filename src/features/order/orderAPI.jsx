export async function createOrder(order) {
  try {
    const response = await fetch("http://localhost:3000/orders", {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    });
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
