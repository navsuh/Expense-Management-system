import axios from "axios";


const apiEndPoint = process.env.REACT_APP_API_URL+"users"

export const createMemberSlice =(set)=>({
   member:{},
   error_msg:"",
  

  getAllMembers:async(userData)=>{

    




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