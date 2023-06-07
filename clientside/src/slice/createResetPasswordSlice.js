import axios from 'axios';

const apiEndPoint = process.env.REACT_APP_API_URL + 'reset-password';

export const createResetPasswordSlice = (set) => ({
  resetPasswordResponse: {},
  error_msg: '',
  resetPassword: async (userData) => {
    const { data } = userData;
    
      // console.log(data);
     
      // const token = sessionStorage.getItem("token")
      try {
        const response=await axios.post(apiEndPoint,data,{
          headers: {
            'Content-Type': 'application/json'
            // "Authorization": "Bearer "+token
          }

        })
        // console.log(response);
        set({ error_msg:"",resetPasswordResponse: response.data },false,"resetPassword")
     
        
      } catch (error) {
        const {response}=error
        const {data}=response
        set({ error_msg: data.message},false,"Reset Password Error Message")
      }
    
},
resetPasswordReset: () => {
  set({ error_msg:"",resetPasswordResponse: {} },false,"Reset reset Password State")
},

  })
