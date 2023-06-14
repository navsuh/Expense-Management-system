import axios from "axios";

const apiEndPoint = process.env.REACT_APP_API_URL + "households";

export const HouseholdSlice = (set) => ({
  households: [],
  error_msg: "",

  getAllHouseholds: async () => {
    const token = sessionStorage.getItem("token");
    //    console.log(token);
    try {
      const response = await axios.get(apiEndPoint, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const { data } = response.data;
      
      set(
        (store) => ({ error_msg: "", households: data }),
        false,
        "getAllHouseholds"
      );
    } catch (error) {
      const { response } = error;
      const { data } = response;
      set({ error_msg: data.message }, false, "getAllHouseholdsErrorMsg");
    }
  },

  createHouseholds: async (userData) => {
    const { data } = userData;
    const token = sessionStorage.getItem("token");
    
    const {name, addressLine1, addressLine2, area, city, state, zipcode}=data
    const newData={name, addressLine1, addressLine2, area, city, state, zipcode}
       console.log(newData);
    try {
      const response = await axios.post(apiEndPoint, newData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      console.log(response.data);
      set(
        (state) => ({
          error_msg: "",
          households: [...state.households, response.data],
        }),
        false,
        "createHouseholds"
      );
    } catch (error) {
      const { response } = error;
      const { data } = response;
      set({ error_msg: data.message }, false, "createHouseholdsErrorMsg");
    }
  },

  updateHouseholds: async (userData) => {
    const { data } = userData;

    const { name, addressLine1, addressLine2, area, city, state, zipcode } =data;
    //   console.log(data);
    const { _id } = data;

    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.patch(
        `${apiEndPoint}/${_id}`,
        { name, addressLine1, addressLine2, area, city, state, zipcode },
        
        {
          headers: {
            // 'Content-Type': 'application/json',
            Authorization: "Bearer " + token,
          },
        }
      );
      // console.log(response.data.accessToken);
      // console.log(response.data.users.role);

      set(
        (state) => ({
          error_msg: "",
          households: state.households.map((eachHousehold) => {
            if (eachHousehold._id === response.data._id) {
              return {
                _id: response.data._id,
                name: response.data.name,
                addressLine1: response.data.addressLine1,
                addressLine2: response.data.addressLine2,
                area: response.data.area,
                state: response.data.state,
                city: response.data.city,
                zipcode: response.data.zipcode,
              };
            } else {
              return eachHousehold;
            }
          }),
        }),
        false,
        "updatehouseholds"
      );
    } catch (error) {
      const { response } = error;
      const { data } = response;
      set({ error_msg: data.message }, false, "updatehouseholdsErrorMsg");
    }
  },

  deleteHouseholds: async (id) => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await axios.delete(`${apiEndPoint}/${id}`, {
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: "Bearer " + token,
        },
      });
      // console.log(response.data.accessToken);
      // console.log(response.data.users.role);

      console.log(response.data);

      set(
        (state) => ({
          error_msg: "",
          households: state.households.filter((eachHousehold) => {
            return eachHousehold._id !== response.data._id;
          }),
        }),
        false,
        "deletehouseholds"
      );
    } catch (error) {
      const { response } = error;
      const { data } = response;
      set({ error_msg: data.message }, false, "deletehouseholdsErrorMsg");
    }
  },
});
