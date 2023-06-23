import { PieChart, Pie, Legend, Cell, ResponsiveContainer } from "recharts";

const colors = [
  "#FF6633",
  "#FFB399",
  "#FF33FF",
  "#FFFF99",
  "#00B3E6",
  "#E6B333",
  "#3366E6",
  "#999966",
  "#99FF99",
  "#B34D4D",
  "#80B300",
  "#809900",
  "#E6B3B3",
  "#6680B3",
  "#66991A",
  "#FF99E6",
  "#CCFF1A",
  "#FF1A66",
  "#E6331A",
  "#33FFCC",
  "#66994D",
  "#B366CC",
  "#4D8000",
  "#B33300",
  "#CC80CC",
  "#66664D",
  "#991AFF",
  "#E666FF",
  "#4DB3FF",
  "#1AB399",
  "#E666B3",
  "#33991A",
  "#CC9999",
  "#B3B31A",
  "#00E680",
  "#4D8066",
  "#809980",
  "#E6FF80",
  "#1AFF33",
  "#999933",
  "#FF3380",
  "#CCCC00",
  "#66E64D",
  "#4D80CC",
  "#9900B3",
  "#E64D66",
  "#4DB380",
  "#FF4D4D",
  "#99E6E6",
  "#6666FF",
];

const Chart = ({ data, showchart, handlechartClose }) => {
  if (!showchart) return null;
  if (data.length === 0) return;
  console.log(data);
  return (
    <>
      <div
        id="modal-body"
        onClick={(e) => e.target.id === "modal-body" && handlechartClose()}
        className="fixed z-10 top-0 left-0 w-screen h-screen flex justify-center items-center cursor-pointer bg-[rgba(0,0,0,0.5)]"
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
              dataKey={data[0].frequency?"paymentDetails[0].amount":"paymentDetails.amount"}
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
              align="center"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Chart;
