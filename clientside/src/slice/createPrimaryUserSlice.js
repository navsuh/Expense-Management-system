import axios from 'axios'

const apiEndPoint=process.env.REACT_APP_API_URL+"users"

export const createPrimaryUserSlice = (set) => ({
    primaryUser: [],
    addPrimaryUser: async(userData) =>  {
      const {data}=userData
      const newData={...data,role:"Primaryuser"}

      console.log(newData);
      
        const response=await axios.post(apiEndPoint,newData,{
          headers: {
            'Content-Type': 'application/json'
          }
        })
        // set({ primaryUser: response.data })
console.log(response);

},

  })