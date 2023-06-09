import axios from 'axios';

const apiEndPoint = process.env.REACT_APP_API_URL + 'changepassword';

export const changepasswordSlice = (set) => ({
  changePasswordResponse: {},
  error_msg: '',
  changePassword: async (userData) => {
    const { data } = userData;
    
      console.log(data);
     
      const token = sessionStorage.getItem("token")
      try {
        const response=await axios.post(apiEndPoint,data,{
          headers: {
            // 'Content-Type': 'application/json'
            "Authorization": "Bearer "+token
          }

        })
        console.log(response);
        set({ error_msg:"",changePasswordResponse: response.data },false,"changePassword")
     
        
      } catch (error) {
        const {response}=error
        const {data}=response
        set({ error_msg: data.message},false,"Changepassword Error Message")
      }
    
},
changePasswordReset: () => {
  set({ error_msg:"",changePasswordResponse: {} },false,"changePasswordReset")
},

  })