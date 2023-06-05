import axios from 'axios'

const apiEndPoint=process.env.REACT_APP_API_URL+"authentication"

export const createUserLoginSlice = (set) => ({
    token: "",
    error_msg:"",
    role:"",
    loginUser: async(userData) =>  {
      const {data}=userData
      const newData={...data,strategy:"local"}

      // console.log(newData);
      try {
        const response=await axios.post(apiEndPoint,newData,{
          headers: {
            'Content-Type': 'application/json'
          }
        })
        console.log(response.data.accessToken);
        console.log(response.data.users.role);
        sessionStorage.setItem("token",response.data.accessToken)
        set({error_msg: "", token: response.data.accessToken,role:response.data.users.role})
        
      } catch (error) {
        const {response}=error
        const {data}=response
        set({ error_msg: data.message})
      }
    
},

  })