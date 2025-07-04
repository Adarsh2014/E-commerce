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

export async function resetCart(userId) {
  try {
    const response = await fetchItemByUserid(userId);

    const items = response.data;

    if (!Array.isArray(items)) {
      console.error(
        "resetCart: Expected items to be an array, but received:",
        items
      );
      throw new Error("Invalid data format received for cart items.");
    }

    const deletePromises = items.map((item) => deleteCart(item.id));
    await Promise.all(deletePromises);

    console.log(`Cart for user ${userId} reset successfully.`);

    return { data: [] };
  } catch (error) {
    console.error("Error resetting cart:", error.message);
    throw error;
  }
}
