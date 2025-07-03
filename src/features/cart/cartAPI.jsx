export async function addToCart(item) {
  try {
    const response = await fetch("http://localhost:3000/cart", {
      method: "POST",
      body: JSON.stringify(item),
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

export async function fetchItemByUserid(userId) {
  try {
    const response = await fetch("http://localhost:3000/cart?user=" + userId);
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

export async function updateCart(update) {
  try {
    const response = await fetch("http://localhost:3000/cart/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
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

export async function deleteCart(itemId) {
  try {
    const response = await fetch("http://localhost:3000/cart/" + itemId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    console.log("Item deleted successfully:", data);
    return { data: { id: itemId } };
  } catch (error) {
    console.error("Error fetching all products:", error.message);
    return { data: [] };
  }
}
