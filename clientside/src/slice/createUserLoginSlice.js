import axios from 'axios'

const apiEndPoint=process.env.REACT_APP_API_URL+"authentication"

export const createUserLoginSlice = (set) => ({
    token: "",
    error_msg:"",
    loginUser: async(userData) =>  {
      const {data}=userData
      const newData={...data,strategy:"strategy"}

      // console.log(newData);
      try {
        const response=await axios.post(apiEndPoint,newData,{
          headers: {
            'Content-Type': 'application/json'
          }
        })
        set({ token: response.data })
        
      } catch (error) {
        const {response}=error
        const {data}=response
        set({ error_msg: data.message})
      }
    
},

  })