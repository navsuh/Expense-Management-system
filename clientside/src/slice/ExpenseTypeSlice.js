import axios from "axios";

const apiEndPoint = process.env.REACT_APP_API_URL + "expensetypes";

export const ExpenseTypeSlice = (set) => ({
  expenseTypes: [],
  error_msg: "",

  getAllExpenseTypes: async () => {
    const token = sessionStorage.getItem("token");

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
      // console.log(data);
      set(
        (store) => ({ error_msg: "", expenseTypes: data }),
        false,
        "getAllExpenseTypes"
      );
    } catch (error) {
      const { response } = error;
      const { data } = response;
      set({ error_msg: data.message }, false, "getAllExpenseTypesErrorMsg");
    }
  },

  createExpenseTypes: async (userData) => {
    const { data } = userData;

    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.post(apiEndPoint, data, {
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
          expenseTypes: [...state.expenseTypes, response.data],
        }),
        false,
        "createExpenseTypes"
      );
    } catch (error) {
      const { response } = error;
      const { data } = response;
      set({ error_msg: data.message }, false, "createExpenseTypesErrorMsg");
    }
  },

  updateExpenseTypes: async (userData) => {
    const { data } = userData;

    const { name } = data;
    const { _id } = data;

    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.patch(
        `${apiEndPoint}/${_id}`,
        { name },
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
          expenseTypes: state.expenseTypes.map((eachExpense) => {
            if (eachExpense._id === response.data._id) {
              return { _id: response.data._id, name: response.data._id.name };
            } else {
              return eachExpense;
            }
          }),
        }),
        false,
        "updateExpenseTypes"
      );
    } catch (error) {
      const { response } = error;
      const { data } = response;
      set({ error_msg: data.message }, false, "updateExpenseTypesErrorMsg");
    }
  },
  deleteExpenseTypes: async (id) => {
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
          expenseTypes: state.expenseTypes.filter((eachExpense) => {
            return eachExpense._id !== response.data._id;
          }),
        }),
        false,
        "deleteExpenseTypes"
      );
    } catch (error) {
      const { response } = error;
      const { data } = response;
      set({ error_msg: data.message }, false, "deleteExpenseTypesErrorMsg");
    }
  },
});
