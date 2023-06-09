import axios from "axios";

const apiEndPoint = process.env.REACT_APP_API_URL + "periodic-expenses";

export const PeriodicExpenseSlice = (set) => ({
  periodicExpense: [],
  error_msg: "",

  getAllPeriodicExpense: async () => {
    const token = sessionStorage.getItem("token");
    //    console.log(token);
    try {
      const response = await axios.get(apiEndPoint, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const { data } = response.data;
      console.log(data);
      set(
        (store) => ({ error_msg: "", periodicExpense: data }),
        false,
        "getAllPeriodicExpense"
      );
    } catch (error) {
      const { response } = error;
      const { data } = response;
      set({ error_msg: data.message }, false, "getAllPeriodicExpenseErrorMsg");
    }
  },

  createPeriodicExpense: async (userData) => {
    const { data } = userData;
    const token = sessionStorage.getItem("token");
    //    console.log(token);
    try {
      const response = await axios.post(apiEndPoint, data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      console.log(response.data);
      set(
        (state) => ({
          error_msg: "",
          periodicExpense: [...state.periodicExpense, response.data],
        }),
        false,
        "createPeriodicExpense"
      );
    } catch (error) {
      const { response } = error;
      const { data } = response;
      set({ error_msg: data.message }, false, "createPeriodicExpenseErrorMsg");
    }
  },

  updatePeriodicExpense: async (userData) => {
    const { data } = userData;

    const { households, expensetypes, description, paidThrough, paidBy, paymentDetails } =data;
    //   console.log(data);
    const { _id } = data;

    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.patch(
        `${apiEndPoint}/${_id}`,
        { households, expensetypes, description, paidThrough, paidBy, paymentDetails  },
        
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
          error_msg: "",
          periodicExpense: state.periodicExpense.map((eachExpense) => {
            if (eachExpense._id === response.data._id) {
              return {
                _id: response.data._id,
                households: response.data._id.households,
                expensetypes: response.data._id.expensetypes,
                description: response.data._id.description,
                paidThrough: response.data._id.paidThrough,
                paidBy: response.data._id.paidBy,
                paymentDetails: response.data._id.paymentDetails,
              };
            } else {
              return eachExpense;
            }
          }),
        }),
        false,
        "updatePeriodicExpense"
      );
    } catch (error) {
      const { response } = error;
      const { data } = response;
      set({ error_msg: data.message }, false, "updatePeriodicExpenseErrorMsg");
    }
  },

  deletePeriodicExpense: async (id) => {
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
          periodicExpense: state.periodicExpense.filter((eachHousehold) => {
            return eachHousehold._id !== response.data._id;
          }),
        }),
        false,
        "deletePeriodicExpense"
      );
    } catch (error) {
      const { response } = error;
      const { data } = response;
      set({ error_msg: data.message }, false, "deletePeriodicExpenseErrorMsg");
    }
  },
});
