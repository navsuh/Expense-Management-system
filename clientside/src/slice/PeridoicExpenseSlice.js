import axios from "axios";

const apiEndPoint = process.env.REACT_APP_API_URL + "periodic-expenses";

export const PeriodicExpenseSlice = (set) => ({
  periodicExpense: [],
  error_msg_periodic_expense: "",
  dueDateNotificationIds: [],

  getAllPeriodicExpense: async (querydate) => {
    const token = sessionStorage.getItem("token");
    console.log(querydate);
    const NewApiEndPoint = querydate
      ? apiEndPoint + "?dueDate[$gte]=" + querydate
      : apiEndPoint;
    console.log(NewApiEndPoint);
    try {
      const response = await axios.get(NewApiEndPoint, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const { data } = response.data;
      console.log(data);
      set(
        (state) => ({ error_msg_periodic_expense: "", periodicExpense: data }),
        false,
        "getAllPeriodicExpense"
      );
    } catch (error) {
      const { response } = error;
      const { data } = response;
      set(
        { error_msg_periodic_expense: data.message },
        false,
        "getAllPeriodicExpenseErrorMsg"
      );
    }
  },

  createPeriodicExpense: async (userData) => {
    const { newData } = userData;
    const token = sessionStorage.getItem("token");
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
          error_msg_periodic_expense: "",
          periodicExpense: [...state.periodicExpense, response.data],
        }),
        false,
        "createPeriodicExpense"
      );
    } catch (error) {
      const { response } = error;
      const { data } = response;
      set(
        { error_msg_periodic_expense: data.message },
        false,
        "createPeriodicExpenseErrorMsg"
      );
    }
  },

  updatePeriodicExpense: async (userData) => {
    const { newData } = userData;

    const {
      households,
      expensetypes,
      description,
      paidThrough,
      paidBy,
      paymentDetails,
      frequency,
      amount,
      dueDate,
    } = newData;
    //   //   console.log(data);
    const { _id } = newData;

    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.patch(
        `${apiEndPoint}/${_id}`,
        {
          households,
          expensetypes,
          description,
          paidThrough,
          paidBy,
          paymentDetails,
          frequency,
          amount,
          dueDate,
        },

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
          error_msg_periodic_expense: "",
          periodicExpense: state.periodicExpense.map((eachExpense) => {
            if (eachExpense._id === response.data._id) {
              return {
                _id: response.data._id,
                households: response.data.households,
                expensetypes: response.data.expensetypes,
                description: response.data.description,
                paidThrough: response.data.paidThrough,
                paidBy: response.data.paidBy,
                frequency: response.data.frequency,
                amount: response.data.amount,
                dueDate: response.data.dueDate,
                paymentDetails: response.data.paymentDetails,
                selectExpense: response.data.selectExpense,
                household: response.data.household,
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
      set(
        { error_msg_periodic_expense: data.message },
        false,
        "updatePeriodicExpenseErrorMsg"
      );
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
          error_msg_periodic_expense: "",
          periodicExpense: state.periodicExpense.filter(
            (eachPeriodicExpense) => {
              return eachPeriodicExpense._id !== response.data._id;
            }
          ),
          dueDateNotificationIds: state.dueDateNotificationIds.filter(
            (eachdueDateNotificationId) => {
              return eachdueDateNotificationId._id !== response.data._id;
            }
          ),
        }),
        false,
        "deletePeriodicExpense"
      );
    } catch (error) {
      const { response } = error;
      const { data } = response;
      set(
        { error_msg_periodic_expense: data.message },
        false,
        "deletePeriodicExpenseErrorMsg"
      );
    }
  },

  sendDueDateNotification: async (userData) => {
    const {
      amount,
      description,
      dueDate,
      expensetypes,
      frequency,
      households,
      paidBy,
      paidThrough,
      paymentDetails,
    } = userData;
    const token = sessionStorage.getItem("token");

    const sendNotificationApiEndPoint =
      process.env.REACT_APP_API_URL + "send-due-date-notification";
    try {
      const response = await axios.post(
        sendNotificationApiEndPoint,
        {
          amount,
          description,
          dueDate,
          expensetypes,
          frequency,
          households,
          paidBy,
          paidThrough,
          paymentDetails,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      console.log(response.data);
      set(
        (state) => ({
          error_msg_periodic_expense: "",
          dueDateNotificationIds: [
            ...state.dueDateNotificationIds,
            userData._id,
          ],
        }),
        false,
        "createPeriodicExpense"
      );
    } catch (error) {
      const { response } = error;
      const { data } = response;
      set(
        { error_msg_periodic_expense: data.message },
        false,
        "sendDueDateNotificationErrorMsg"
      );
    }
  },
  ResetErrorMsgPeriodicExpense: () => {
    set(
      { error_msg_periodic_expense: "" },
      false,
      "ResetErrorMsg"
    );
  },
});
