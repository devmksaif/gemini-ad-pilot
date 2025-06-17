
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";

export const PerformanceChart = () => {
  const data = [
    { date: '2024-01', roas: 3.2, cpa: 28, conversions: 145 },
    { date: '2024-02', roas: 3.8, cpa: 25, conversions: 189 },
    { date: '2024-03', roas: 4.1, cpa: 23, conversions: 234 },
    { date: '2024-04', roas: 3.9, cpa: 26, conversions: 198 },
    { date: '2024-05', roas: 4.5, cpa: 21, conversions: 267 },
    { date: '2024-06', roas: 4.2, cpa: 23.5, conversions: 247 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Trends</CardTitle>
        <CardDescription>Key metrics over the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="roas" 
                stroke="#2563eb" 
                strokeWidth={2}
                name="ROAS"
              />
              <Line 
                type="monotone" 
                dataKey="cpa" 
                stroke="#dc2626" 
                strokeWidth={2}
                name="CPA ($)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
