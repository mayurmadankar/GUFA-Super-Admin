import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const data = [
    { name: "2013", value: 25.9 },
    { name: "2014", value: 30.3 },
    { name: "2015", value: 17.1 },
    { name: "2016", value: 26.7 },
];

const COLORS = ["#4185F4", "#DB4437", "#F4B400", "#0F9D58"];

const Graph = () => {
    return (
        <PieChart width={300} height={150}>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                label
                outerRadius={50}
                dataKey="value"
                nameKey="name"
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            {/* Tooltip component for hover functionality */}
            <Tooltip 
                formatter={(value, name) => [`${value}%`, name]} // Custom format: percentage and name
                contentStyle={{ backgroundColor: "#fff", borderRadius: "5px", padding: "5px" }} 
            />
            <Legend />
        </PieChart>
    );
};

export default Graph;
