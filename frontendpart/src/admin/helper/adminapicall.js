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
  fetch(`${API}/brands`, {
    method: "GET",
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
  return fetch(`${API}/product/delete/${productId}/:${id}`, {
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

//update a product
export const updateProduct = (productId, token, id, newproduct) => {
  return fetch(`${API}/product/update/${productId}/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",

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
