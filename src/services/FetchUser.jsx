import axios from "axios";

const URL = "https://646e0e319c677e23218af732.mockapi.io/users/user";

export const fetchUser = async () => {
  try {
    const users = await axios.get(URL);
    return users.data;
  } catch (error) {
    console.log(error);
  }
};

export const putUser = async (id, user) => {
    try {
      const response = await axios.put(`${URL}/${id}`, user);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  export function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }