import axios from 'axios'

const apiEndPoint=process.env.REACT_APP_API_URL+"users"

export const createPrimaryUserSlice = (set) => ({
    primaryUser: {},
    addPrimaryUser: async(userData) =>  {
      console.log(userData);
        const response=await axios.post(apiEndPoint,userData,{
          headers: {
            'Content-Type': 'application/json'
          }
        })
        set({ primaryUser: await response.json() })


},
  })