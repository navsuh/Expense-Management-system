import axios from 'axios';

const apiEndPoint = process.env.REACT_APP_API_URL + 'forgot-password';

export const ForgetPasswordSlice = (set) => ({
  forgetPasswordResponse: {},
  error_msg: '',
  forgetPassword: async (userData) => {
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
        set({ error_msg:"",forgetPasswordResponse: response.data },false,"forgetPassword")
     
        
      } catch (error) {
        const {response}=error
        const {data}=response
        set({ error_msg: data.message},false,"Forget Password Error Message")
      }
    
},
forgetPasswordReset: () => {
  set({ error_msg:"",forgetPasswordResponse: {} },false,"Reset forget Password")
},

  })