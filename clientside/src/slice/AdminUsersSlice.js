import axios from "axios";

const apiEndPoint = process.env.REACT_APP_API_URL + "users";

export const AdminUsersSlice = (set) => ({
  usersData: [],
  error_msg_Admin_user: "",
  
  getAllUsers: async () => {
    const token = sessionStorage.getItem("token");
    // const newApiPoint =apiEndPoint+"?$limit="+limit+"&"+"$skip="+skip                  
    
    try {
      const response = await axios.get(apiEndPoint, {
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: "Bearer " + token,
        },
      });
      // console.log(response.data.accessToken);
      // console.log(response.data.users.role);

      const { data } = response.data;

      set(
        (state) => ({ error_msg_Admin_user: "", usersData: data }),
        false,
        "getAllUsers"
      );
    } catch (error) {
      const { response } = error;
      const { data } = response;
      set({ error_msg_Admin_user: data.message }, false, "getAllUsersErrorMsg");
    }
  },

  updateUser: async (userData,AdminUserId) => {
    const { data } = userData;

    const { _id } = data;
    console.log(data);
    const token = sessionStorage.getItem("token");
    const { firstName, isActive, lastName, phone, userName } = data;
    try {
      const response = await axios.patch(
        `${apiEndPoint}/${_id}`,
        {  _id,firstName, isActive, lastName, phone, userName,updatedBy:AdminUserId,updatedAt:new Date() },
        {
          headers: {
            // 'Content-Type': 'application/json',
            Authorization: "Bearer " + token,
          },
        }
      );
      // console.log(response.data.accessToken);
      // console.log(response.data.users.role);

      console.log(response.data);

      set(
        (state) => ({
          error_msg_Admin_user: "",
          usersData: state.usersData.map((eachUser) => {
            if (eachUser._id === response.data._id) {
              return response.data;
            } else {
              return eachUser;
            }
          }),
        }),
        false,
        "Update User"
      );
      
      
    } catch (error) {
      const { response } = error;
      const { data } = response;
      set({ error_msg_Admin_user: data.message }, false, "update User ErrorMsg");
    }
  },

  softdeleteUser: async (id) => {
    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.patch(
        `${apiEndPoint}/${id}`,
        { isActive: false },
        {
          headers: {
            // 'Content-Type': 'application/json',
            Authorization: "Bearer " + token,
          },
        }
      );
      // console.log(response.data.accessToken);
      // console.log(response.data.users.role);

      console.log(response.data);

      set(
        (state) => ({
          error_msg_Admin_user: "",
          usersData: state.usersData.map((eachUser) => {
            if (eachUser._id === response.data._id) {
              return response.data;
            } else {
              return eachUser;
            }
          }),
        }),
        false,
        "soft Delete User"
      );
    } catch (error) {
      const { response } = error;
      const { data } = response;
      set({ error_msg_Admin_user: data.message }, false, "soft Delete User ErrorMsg");
    }
  },
});
