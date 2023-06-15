import axios from "axios";

const apiEndPoint = process.env.REACT_APP_API_URL + "daily-expenses";

export const DailyExpenseSlice = (set) => ({
  dailyExpense: [],
  error_msg: "",

  getAllDailyExpense: async (querydate) => {
    const token = sessionStorage.getItem("token");
    const NewApiEndPoint=querydate?apiEndPoint+"?paymentDetailsDate="+querydate:apiEndPoint
    console.log(NewApiEndPoint);
    try {
      const response = await axios.get(NewApiEndPoint, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const { data } = response.data;
      // console.log(data);
      set(
        (state) => ({ error_msg: "", dailyExpense: data }),
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
    console.log(userData);
    const { newData } = userData;
    const token = sessionStorage.getItem("token");
      //  console.log(newData);
    try {
      const response = await axios.post(apiEndPoint, newData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      set(
        (state) => ({
          error_msg: "",
          dailyExpense: [...state.dailyExpense, response.data],
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
    const { newData } = userData;

    const { households, expensetypes, description, paidThrough, paidBy, paymentDetails } =newData;
    //   console.log(data);
    const { _id } = newData;

    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.patch(
        `${apiEndPoint}/${_id}`,
        { households, expensetypes, description, paidThrough, paidBy, paymentDetails},
        
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
          dailyExpense: state.dailyExpense.map((eachExpense) => {
            if (eachExpense._id === response.data._id) {
              return {
                _id: response.data._id,
                households: response.data.households,
                expensetypes: response.data.expensetypes,
                description: response.data.description,
                paidThrough: response.data.paidThrough,
                paidBy: response.data.paidBy,
                paymentDetails: response.data.paymentDetails,
                selectExpense:response.data.selectExpense,
                household:response.data.household

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
        (state) => ({
          error_msg: "",
          dailyExpense: state.dailyExpense.filter((eachdailyExpense) => {
            return eachdailyExpense._id !== response.data._id;
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
