import axios from "axios";

const apiEndPoint = process.env.REACT_APP_API_URL + "daily-expenses";

export const createDailyExpenseSlice = (set) => ({
  dailyExpense: [],
  error_msg: "",

  getAllDailyExpense: async () => {
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
        (store) => ({ error_msg: "", dailyExpense: data }),
        false,
        "getAllDailyExpense"
      );
    } catch (error) {
      const { response } = error;
      const { data } = response;
      set({ error_msg: data.message }, false, "getAllDailyExpenseErrorMsg");
    }
  },

  createDailyExpense: async (userData) => {
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
        (store) => ({
          error_msg: "",
          dailyExpense: [...store.dailyExpense, response.data],
        }),
        false,
        "createDailyExpense"
      );
    } catch (error) {
      const { response } = error;
      const { data } = response;
      set({ error_msg: data.message }, false, "createDailyExpenseErrorMsg");
    }
  },

  updateDailyExpense: async (userData) => {
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
        (store) => ({
          error_msg: "",
          dailyExpense: store.dailyExpense.map((eachExpense) => {
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
        "updateDailyExpense"
      );
    } catch (error) {
      const { response } = error;
      const { data } = response;
      set({ error_msg: data.message }, false, "updateDailyExpenseErrorMsg");
    }
  },

  deleteDailyExpense: async (id) => {
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
        (store) => ({
          error_msg: "",
          dailyExpense: store.dailyExpense.filter((eachHousehold) => {
            return eachHousehold._id !== response.data._id;
          }),
        }),
        false,
        "deleteDailyExpense"
      );
    } catch (error) {
      const { response } = error;
      const { data } = response;
      set({ error_msg: data.message }, false, "deleteDailyExpenseErrorMsg");
    }
  },
});
