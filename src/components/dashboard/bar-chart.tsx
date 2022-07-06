import {getColor} from "functions/colors";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import {random} from "functions/numbers";

export type CustomTooltipProps = {
  active?: boolean;
  payload?: any;
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({active, payload}) => {
  if (active && payload && payload.length) {
    const {name, sales, conversions} = payload[0].payload;
    return (
      <div className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white shadow-lg rounded-lg p-2 text-xs">
        <div className="font-bold">{name}</div>
        <div>
          <span className="font-bold">Sales:</span>{" "}
          <span className="font-normal">{sales}</span>
        </div>
        <div>
          <span className="font-bold">Conversions:</span>{" "}
          <span className="font-normal">{conversions}</span>
        </div>
      </div>
    );
  }
  return null;
};

const RechartsBar1: React.FC = () => {
  const colors = [
    {dataKey: "sales", fill: getColor("blue-500")},
    {dataKey: "conversions", fill: getColor("red-500")},
    {dataKey: "clicks", fill: getColor("green-500")},
  ];
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const data = Array.from(Array(12).keys()).map((i) => {
    return {
      name: labels[i],
      sales: random(100, 200),
      conversions: random(150, 250),
      clicks: random(200, 300),
    };
  });

  return (
    <div style={{width: "100%", height: 240}}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 10,
          }}>
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis
            hide={true}
            axisLine={false}
            tickLine={false}
            width={30}
            type="number"
            domain={[0, "dataMax + 100"]}
          />
          <Tooltip content={<CustomTooltip />} cursor={{fill: "transparent"}} />
          <Legend verticalAlign="top" height={36} iconType="circle" />
          {colors.map((color, i) => (
            <Bar
              key={i}
              legendType="square"
              dataKey={color.dataKey}
              fill={color.fill}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RechartsBar1;
