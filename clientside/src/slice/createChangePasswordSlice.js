import axios from 'axios'

const apiEndPoint=process.env.REACT_APP_API_URL+"changepasword"

export const changepasswordSlice = (set) => ({
    changepasswordresponse: {},
    error_msg:"",
    changePassword: async(userData) =>  {
      const {data}=userData
      const newData={...data}

      // console.log(newData);
      console.log(data);
      console.log(newData);
      const token = sessionStorage.getItem("token")
      try {
        const response=await axios.post(apiEndPoint,newData,{
          headers: {
            // 'Content-Type': 'application/json'
            "Authorization": "Bearer "+token
          }

        })
        set({ error_msg:"",changePassword: response.data })
     
        
      } catch (error) {
        const {response}=error
        const {data}=response
        set({ error_msg: data.message})
      }
    
},

  })