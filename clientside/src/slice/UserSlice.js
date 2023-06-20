import axios from "axios";

const apiEndPoint = process.env.REACT_APP_API_URL + "users";

export const UserSlice = (set) => ({
  error_msg: "",
  // user:[],
  lastLoginUser: async (id) => {
    const data = { lastLoggedIn: new Date() };
    console.log(data);
    const token = sessionStorage.getItem("token");
    // console.log(id);
    // console.log(newData);
    try {
      const response = await axios.patch(`${apiEndPoint}/${id}`, data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(response.data);
      // console.log(response.data.users.role);

      set({ error_msg: "" }, false, "lastloginUser");
    } catch (error) {
      const { response } = error;
      const { data } = response;
      set({ error_msg: data.message }, false, "lastloginUserErrorMsg");
    }
  },
});
