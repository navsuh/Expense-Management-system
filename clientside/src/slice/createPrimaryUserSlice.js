import axios from 'axios'

const apiEndPoint=process.env.REACT_APP_API_URL+"users"

export const createPrimaryUserSlice = (set) => ({
    primaryUser: {},
    error_msg:"",
    addPrimaryUser: async(userData) =>  {
      const {data}=userData
      const newData={...data,role:"Primaryuser"}

      // console.log(newData);
      try {
        const response=await axios.post(apiEndPoint,newData,{
          headers: {
            'Content-Type': 'application/json'
          }
        })
        set({ error_msg:"",primaryUser: response.data })
     
        
      } catch (error) {
        const {response}=error
        const {data}=response
        set({ error_msg: data.message})
      }
    
},

  })