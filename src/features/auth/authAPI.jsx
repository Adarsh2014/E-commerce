export async function createUser(userData) {
  try {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      body: JSON.stringify(userData),
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

export async function checkUser(loginInfo) {
  try {
    const email = loginInfo.email;
    const password = loginInfo.password;
    const response = await fetch("http://localhost:3000/users?email=" + email);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    if (data.length) {
      const user = data[0];
      if (user.password === password) {
        return { data: user };
      } else {
        return { error: "Invalid password" };
      }
    } else {
      return { error: "User not found" };
    }
  } catch (error) {
    return { error: error.message };
  }
}


