import axios from "axios";

const apiEndPoint = process.env.REACT_APP_API_URL + "householdmembers";

export const MemberSlice = (set) => ({
  memberData: [],
  error_msg_member: "",

  getAllMembers: async () => {
    const token = sessionStorage.getItem("token");
    //  console.log(token);
    try {
      const response = await axios.get(apiEndPoint, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const { data } = response.data;
      console.log(data);
      set({ error_msg_member: "", memberData: data }, false, "getAllMembers");
    } catch (error) {
      const { response } = error;
      const { data } = response;
      set({ error_msg_member: data.message }, false, "getAllMembersErrorMsg");
    }
  },

  addMember: async (userData) => {
    const { data } = userData;
    const {
      email,
      firstName,
      householdName,
      lastName,
      password,
      phone,
      userName,
    } = data;
    const newData = {
      firstName,
      lastName,
      email,
      phone,
      userName,
      password,
      role: "member",
      householdName,
    };
    const token = sessionStorage.getItem("token");
    // console.log(newData);
    try {
      const response = await axios.post(apiEndPoint, newData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      set(
        (state) => ({
          error_msg_member: "",
          memberData: [...state.memberData, response.data],
        }),
        false,
        "addMember"
      );
    } catch (error) {
      const { response } = error;
      const { data } = response;
      set({ error_msg_member: data.message }, false, "addMemberErrorMsg");
    }
  },

  updateMember: async (memberuserData) => {
    const { newData } = memberuserData;
    // console.log("1");
    // console.log(memberuserData);
    // console.log("1");
    const {
      _id,
      email,
      firstName,
      lastName,
      householdName,
      householdId,
      memberUserId,
      primaryuserId,
      phone,
      userName,
    } = newData;

    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.patch(
        `${apiEndPoint}/${_id}`,
        {
          email,
          firstName,
          lastName,
          householdName,
          householdId,
          memberUserId,
          phone,
          userName,
          primaryuserId,
        },
        {
          headers: {
            // 'Content-Type': 'application/json',
            Authorization: "Bearer " + token,
          },
        }
      );

      set(
        (state) => ({
          error_msg_member: "",
          memberData: state.memberData.map((eachMember) => {
            if (eachMember._id === response.data._id) {
              return {
                _id: response.data._id,
                email: response.data.email,
                household: response.data.household,
                householdId: response.data.householdId,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                memberUserId: response.data.memberUserId,
                phone: response.data.phone,
                userName: response.data.userName,
              };
            } else {
              return eachMember;
            }
          }),
        }),
        false,
        "updateDailyExpense"
      );
    } catch (error) {
      const { response } = error;
      const { data } = response;
      set({ error_msg_member: data.message }, false, "updateMemberErrorMsg");
    }
  },

  deleteMember: async (id) => {
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
          error_msg_member: "",
          memberData: state.memberData.filter((eachMemberData) => {
            return eachMemberData._id !== response.data._id;
          }),
        }),
        false,
        "deleteMember"
      );
    } catch (error) {
      const { response } = error;
      const { data } = response;
      set({ error_msg_member: data.message }, false, "deleteMemberErrorMsg");
    }
  },
});
