import axios from 'axios';

const apiEndPoint = process.env.REACT_APP_API_URL + 'changepassword';

export const changepasswordSlice = (set) => ({
  changepasswordresponse: {},
  error_msg: '',
  changePassword: async (userData) => {
    const { data } = userData;
    const newData = { ...data };

    const token = sessionStorage.getItem('token');
    try {
      const response = await axios.put(apiEndPoint, newData, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
      set({ error_msg: '', changepasswordresponse: response.data });
    } catch (error) {
      const { response } = error;
      const { data } = response;
      set({ error_msg: data.message, changepasswordresponse: {} });
    }
  }
});
