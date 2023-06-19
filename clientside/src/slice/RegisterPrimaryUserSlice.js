import axios from 'axios'

const apiEndPoint=process.env.REACT_APP_API_URL+"users"

export const RegisterPrimaryUserSlice = (set) => ({
    primaryUser: {},
    error_msg:"",
    addPrimaryUser: async(userData) =>  {
      const {data}=userData
      const newData={...data,role:"Primaryuser",isActive:true}

      // console.log(newData);
      try {
        const response=await axios.post(apiEndPoint,newData,{
          headers: {
            'Content-Type': 'application/json'
          }
        })
        set({ error_msg:"",primaryUser: response.data },false,"addPrimaryUser")
     
        
      } catch (error) {
        const {response}=error
        const {data}=response
        set({ error_msg: data.message,primaryUser: {}},false,"addPrimaryUserErrorMsg")
      }
    
},

  })