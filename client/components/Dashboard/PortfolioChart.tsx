"use client";

import { useEffect, useState } from "react";
import {ResponsiveContainer, Tooltip, XAxis, YAxis, Area, AreaChart } from "recharts";

interface PortfolioChartProps {
    timeFrame: string;
}

export function PortfolioChart({ timeFrame }: PortfolioChartProps) {
    const [data, setData] = useState<any[]>([]);

    // Generate mock chart data based on the selected time frame
    useEffect(() => {
        // Define parameters for different time frames
        const dataPoints =
            timeFrame === "1D" ? 24 :
                timeFrame === "1W" ? 7 :
                    timeFrame === "1M" ? 30 :
                        timeFrame === "1Y" ? 12 : 7;

        const labels =
            timeFrame === "1D" ? Array.from({ length: dataPoints }, (_, i) => `${i}:00`) :
                timeFrame === "1W" ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] :
                    timeFrame === "1M" ? Array.from({ length: dataPoints }, (_, i) => `${i + 1}`) :
                        timeFrame === "1Y" ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] :
                            ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

        // Generate random data with a trend
        const startValue = 2000 + Math.random() * 1000;
        const volatility =
            timeFrame === "1D" ? 0.005 :
                timeFrame === "1W" ? 0.02 :
                    timeFrame === "1M" ? 0.05 :
                        timeFrame === "1Y" ? 0.15 : 0.02;

        // Generate mock data with trend
        const newData = labels.map((label, index) => {
            const random = (Math.random() - 0.5) * 2 * volatility;
            const trendFactor = index / dataPoints; // Upward trend as index increases
            const value = startValue * (1 + (random + trendFactor * 0.2));

            return {
                name: label,
                value: parseFloat(value.toFixed(2)),
            };
        });

        setData(newData);
    }, [timeFrame]);

    return (
        <div className="h-[250px] w-full p-2 sm:h-[300px] sm:p-4 lg:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{ 
                        top: 10, 
                        right: 10, 
                        left: 10, 
                        bottom: 10 
                    }}
                >
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis
                        dataKey="name"
                        tickLine={false}
                        axisLine={false}
                        padding={{ left: 10, right: 10 }}
                        tick={{ 
                            fontSize: 11, 
                            fill: '#94a3b8' 
                        }}
                        dy={10}
                        interval="preserveStartEnd"
                    />
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => {
                            if (value >= 1000) {
                                return `$${(value / 1000).toFixed(1)}k`;
                            }
                            return `$${value}`;
                        }}
                        tick={{ 
                            fontSize: 11, 
                            fill: '#94a3b8' 
                        }}
                        width={60}
                    />
                    <Tooltip
                        content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                                return (
                                    <div className="rounded-lg border border-slate-700 bg-slate-800/95 p-3 shadow-lg backdrop-blur-sm">
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between gap-4">
                                                <span className="text-sm font-medium text-slate-300">
                                                    Portfolio Value
                                                </span>
                                                <span className="font-mono text-sm font-bold text-white">
                                                    ${payload[0].value?.toLocaleString()}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between gap-4">
                                                <span className="text-xs text-slate-400">
                                                    {timeFrame === "1D" ? "Time" : 
                                                     timeFrame === "1Y" ? "Month" : "Period"}
                                                </span>
                                                <span className="text-xs font-medium text-slate-300">
                                                    {label}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        fill="url(#colorValue)"
                        dot={false}
                        activeDot={{ 
                            r: 4, 
                            strokeWidth: 2, 
                            stroke: "#3b82f6",
                            fill: "#1e293b"
                        }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}