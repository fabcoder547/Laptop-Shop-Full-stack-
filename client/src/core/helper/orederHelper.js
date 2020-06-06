import { API } from "../../backend";

export const createOrder = (id, token, orderData) => {
  console.log("order called");
  return fetch(`${API}/order/create/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify({ order: orderData }),
  })
    .then((response) => {
      console.log("order creted");
      return response.json();
    })
    .catch((err) => {
      console.log("Error", err.message);
    });
};
