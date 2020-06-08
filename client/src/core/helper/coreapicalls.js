import { API } from "../../backend";
import { signin } from "../../auth/helper";
export const getAllProducts = () => {
  return fetch(`api/allProducts`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
