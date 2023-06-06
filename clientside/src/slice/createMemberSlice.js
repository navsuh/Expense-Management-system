import axios from "axios";


const apiEndPoint = process.env.REACT_APP_API_URL+"users"

export const createMemberSlice =(set)=>({
   member:{},
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
   }










})