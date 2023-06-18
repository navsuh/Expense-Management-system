import { PieChart, Pie, Legend, Cell, ResponsiveContainer } from "recharts"
const colors= ['aqua', 'blue', 'fuchsia', 'gray', 'green', 
'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red', 
'silver', 'teal', 'white', 'yellow', 'black'];

const Chart=({data,showchart, handlechartClose} )=>{
 
    if (!showchart) return null;
    return(<>
     <div
      id="modal-body"
      onClick={(e) => e.target.id === "modal-body" && handlechartClose()}
      className="fixed z-10 top-0 left-0 w-screen h-screen flex justify-center items-center bg-[rgba(0,0,0,0.5)]"
    >
    <ResponsiveContainer width="60%" height={250}>
      <PieChart>
        <Pie
          cx="70%"
          cy="40%"
          data={data}
          startAngle={0}
          endAngle={360}
          innerRadius="40%"
          outerRadius="70%"
          dataKey="paymentDetails.amount"
        >
            {data.map((eachPeriodicExpense,index)=><Cell key={eachPeriodicExpense._id} name={eachPeriodicExpense.selectExpense} fill={colors[index]} />)}
          
         
        </Pie>
        <Legend
          iconType="circle"
          layout="vertical"
          verticalAlign="middle"
          align="center"
        />
      </PieChart>
    </ResponsiveContainer>
    </div>
    </>)
  }

  export default Chart