import { API } from "../../backend";

export const addBrand = (name, token, id) => {
  return fetch(`${API}/brands/create/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify(name),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getAllBrands = () => {
  return fetch(`${API}/brands`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllBrandsofAdmin = (id) => {
  return fetch(`${API}/brands/admin/${id}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//deletebrand

export const deleteBrand = (brandId, id, token) => {
  return fetch(`${API}/brand/${brandId}/user/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err.message);
    });
};
//get a brand
export const getBrand = (brandId) => {
  return fetch(`${API}/brand/${brandId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
//update brand

export const updateBrand = (brandId, id, token, newBrand) => {
  return fetch(`${API}/brand/${brandId}/user/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify(newBrand),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//prosucts api calls
export const createProduct = (product, token, id) => {
  return fetch(`${API}/product/create/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",

      Authorization: `bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//delete a  product

export const deleteProduct = (productId, token, id) => {
  return fetch(`${API}/product/delete/${productId}/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",

      Authorization: `bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//get a product

export const getProduct = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getPhoto = (productId) => {
  return fetch(`${API}/product/photo/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
//update a product
export const updateProduct = (productId, token, id, newproduct) => {
  return fetch(`${API}/product/update/${productId}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `bearer ${token}`,
    },
    body: newproduct,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//get All products
export const getAllProducts = () => {
  return fetch(`${API}/allProducts`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllProductsOfAdmin = (id) => {
  return fetch(`${API}/allProducts/admin/${id}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllProductswithQuery = (query) => {
  return fetch(`${API}/allProducts/?sortby=${query}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
