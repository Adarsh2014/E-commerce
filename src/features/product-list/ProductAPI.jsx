export async function fetchAllProducts() {
  try {
    const response = await fetch("http://localhost:3000/products");
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

export async function fetchProductByid(id) {
  try {
    const response = await fetch("http://localhost:3000/products/?id=" + id);
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

export async function fetchProductsByFilter(filter, sort, pagination) {
  //filter = {"category": ["smartPhone", "tablet"]}
  // sort ={_sort: "price", _order: "asc"}
  //pagination = {_page: 1, _limit: 10}
  let queryString = "";
  for (let key in filter) {
    const categoryValue = filter[key];
    if (categoryValue.length > 0) {
      const lastCategoryValue = categoryValue[categoryValue.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  if (queryString.endsWith("&")) {
    queryString = queryString.slice(0, -1);
  }
  const url = "http://localhost:3000/products?" + queryString;
  console.log("Final URL:", url);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();

    const totalItem = data.length;
    console.log("Total items:", totalItem);
    return { data: { products: data, totalItem: 35 } };
  } catch (error) {
    console.error("Error fetching all products:", error.message);
    return { data: [] };
  }
}

export async function fetchCategories() {
  try {
    const response = await fetch("http://localhost:3000/categories");
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

export async function fetchBrands() {
  try {
    const response = await fetch("http://localhost:3000/brands");
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

export async function fetchWeight() {
  try {
    const response = await fetch("http://localhost:3000/weight");
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

export async function addToProduct(product) {
  try {
    const response = await fetch("http://localhost:3000/products", {
      method: "POST",
      body: JSON.stringify(product),
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
