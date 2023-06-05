
import axios from 'axios'

const apiEndPoint=process.env.REACT_APP_API_URL+"expensetypes"



export const createExpenseTypeSlice = (set) => ({
    expenseTypes: [],
    error_msg:"",

    getAllExpenseTypes: async() =>  {
      
     
     const token=sessionStorage.getItem("token")
     
      try {
        
        const response=await axios.get(apiEndPoint,{
          headers: {
            // 'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
          }
        })
        // console.log(response.data.accessToken);
        // console.log(response.data.users.role);
        
        const {data}=response.data
        console.log(data);
        set((store)=>({error_msg: "", expenseTypes: data}))
        
      } catch (error) {
        const {response}=error
        const {data}=response
        set({ error_msg: data.message})
      }
    
},
    
    createExpenseTypes: async(userData) =>  {
      const {data}=userData
     
     const token=sessionStorage.getItem("token")
     
      try {
        
        const response=await axios.post(apiEndPoint,data,{
          headers: {
            // 'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
          }
        })
        // console.log(response.data.accessToken);
        // console.log(response.data.users.role);
        console.log(response.data);
        set((store)=>({error_msg: "", expenseTypes: [...store.expenseTypes,response.data]}))
        
      } catch (error) {
        const {response}=error
        const {data}=response
        set({ error_msg: data.message})
      }
    
},

updateExpenseTypes: async(userData) =>  {
  const {data}=userData

 
 const {name}=data
 const {_id}=data
 
 const token=sessionStorage.getItem("token")
 
  try {
    
    const response=await axios.patch(`${apiEndPoint}/${_id}`,{name},{
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
      }
    })
    // console.log(response.data.accessToken);
    // console.log(response.data.users.role);
  
    console.log(response.data);
    
    set((store)=>({error_msg: "", expenseTypes:   store.expenseTypes.map(eachExpense=>{
    
      if(eachExpense._id===response.data._id){
      return {_id:response.data._id,name:response.data._id.name}
  }else{
return eachExpense
  }
})
  
  }))
    
  } catch (error) {
    const {response}=error
    const {data}=response
    set({ error_msg: data.message})
  }

},
deleteExpenseTypes: async(id) =>  {
  
 
 const token=sessionStorage.getItem("token")
 
  try {
    
    const response=await axios.delete(`${apiEndPoint}/${id}`,{
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
      }
    })
    // console.log(response.data.accessToken);
    // console.log(response.data.users.role);
  
    console.log(response.data);
    
    set((store)=>({error_msg: "", expenseTypes: store.expenseTypes.filter((eachExpense)=>{
      return eachExpense._id!==response.data._id
    })}))
    
  } catch (error) {
    const {response}=error
    const {data}=response
    set({ error_msg: data.message})
  }

},

  })