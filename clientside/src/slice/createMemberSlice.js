import axios from "axios";


const apiEndPoint = process.env.REACT_APP_API_URL+"householdmembers"

export const createMemberSlice =(set)=>({
   member:[],
   error_msg:"",
  
  getAllMembers:async()=>{
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
        (store) => ({ error_msg: "", member: data }),
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
    const newData={...data,role:"member"}
    try {
        const response=await axios.post(apiEndPoint,newData,{
          headers: {
            'Content-Type': 'application/json'
          }
        })
        set({ error_msg:"",member: response.data },false,"addMember")
     
        
      } catch (error) {
        const {response}=error
        const {data}=response
        set({ error_msg: data.message},false,"addMemberErrorMsg")
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
        (store) => ({
          error_msg: "",
          member: store.member.filter((eachHousehold) => {
            return eachHousehold._id !== response.data._id;
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