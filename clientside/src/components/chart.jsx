import { PieChart, Pie, Legend, Cell, ResponsiveContainer } from "recharts";

const colors = [
   'blue','orange', 'fuchsia', 'gray', 'green', 'lime', 'maroon', 'navy', 
  'olive', "aqua", 'purple', 'red', 'silver', 'teal',  'yellow', 'black'
];

const Chart = ({ data, showchart, handlechartClose }) => {
  if (!showchart) return null;

  return (
    <>
     {data.length!==0?(
      <div
        id="modal-body"
        onClick={(e) => e.target.id === "modal-body" && handlechartClose()}
        className="fixed z-10 top-0 left-0 w-screen h-screen flex justify-center items-center bg-[rgba(0,0,0,0.5)]"
      >
       
        <div className="w-96 h-72 bg-white rounded-md px-6 py-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                cx="50%"
                cy="50%"
                data={data}
                startAngle={0}
                endAngle={360}
                innerRadius="40%"
                outerRadius="70%"
                dataKey="paymentDetails.amount"
              >
                {data.map((eachPeriodicExpense, index) => (
                  <Cell
                    key={eachPeriodicExpense._id}
                    name={eachPeriodicExpense.selectExpense}
                    fill={colors[index]}
                  />
                ))}
              </Pie>
              <Legend
                iconType="circle"
                layout="vertical"
                verticalAlign="middle"
                align="right" // Align the legend names to the right side
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>):(null)}
    </>
  );
};

export default Chart;
