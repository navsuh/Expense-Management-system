import axios from "axios";


const apiEndPoint = process.env.REACT_APP_API_URL+"householdmembers"

export const MemberSlice =(set)=>({
   memberData:[],
   error_msg:"",
  
  getAllMembers:async()=>{
    const token = sessionStorage.getItem("token");
      //  console.log(token);
    try {
      const response = await axios.get(apiEndPoint, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const { data } = response.data;
   
      set({ error_msg: "", memberData: data },
        false,
        "getAllMembers"
      );
    } catch (error) {
      const { response } = error;
      const { data } = response;
      set({ error_msg: data.message }, false, "getAllMembersErrorMsg");
    }
  },

   addMember:async(userData)=>{
    const {data} =userData
    const {email,firstName,householdName,lastName,password,phone,userName}=data
    const newData={firstName,lastName,email,phone,userName,password,role:"member",householdName}
    const token = sessionStorage.getItem("token");
    console.log(newData);
    try {
        const response=await axios.post(apiEndPoint,newData,{
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        console.log(response.data);
        set(
          (state) => ({
            error_msg: "",
            memberData: [...state.memberData, response.data],
          }),
          false,
          "addMember"
        );
        
      } catch (error) {
        const {response}=error
        const {data}=response
        set({ error_msg: data.message},false,"addMemberErrorMsg")
      }
   },

   updateMember: async (memberuserData) => {
    const {newData}=memberuserData
    const { _id } = newData;
    
    const token = sessionStorage.getItem("token");
    
    try {
      await axios.patch(
        `${apiEndPoint}/${_id}`,
        newData,
        {
          headers: {
            // 'Content-Type': 'application/json',
            Authorization: "Bearer " + token,
          },
        }
      );


   
    } catch (error) {
      const { response } = error;
      const { data } = response;
      set({ error_msg: data.message }, false, "updateMemberErrorMsg");
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
          error_msg: "",
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
      set({ error_msg: data.message }, false, "deleteMemberErrorMsg");
    }
  },

})