import axios from "axios";
const API_URL = "http://www.zp11489.tld.122.155.167.85.no-domain.name/www/";
const register = (username: string, email: string, password: string) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};
const login = (username: string, password: string) => {
  return axios
    .post(API_URL + "login.php", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};
const logout = () => {
  localStorage.removeItem("user");
};
const authService = {
  register,
  login,
  logout,
};
export default authService;