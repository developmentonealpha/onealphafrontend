"use client";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { AUTH_TOKEN } from "@/constants/auth";

interface Data {
  label: string;
  value: number;
}
interface GraphData {
  name: string;
  value1: number;
  value2: number;
}

interface FinancialData {
  performance: GraphData[];
  dashboardSummary: string;
}

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [wholeData, setWholeData] = useState<FinancialData>();

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN);
    if (!token) {
      navigate("/", { replace: true });
      return;
    }
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const { data } = await axiosInstance.get("/data");
      if (data) {
        setWholeData(data);
      }
    } catch (error) {
      toast({
        title: "Data Failed",
        description: "Failed to fetch data. Something went wrong!.",
        duration: 2500,
      });
      console.log(`error while fetching data ${error}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-4 md:mb-8">
            <h1 className="text-3xl sm:text-3xl font-bold font-funnel">
              Dashboard
            </h1>
            <Button
              onClick={() => navigate("/comparison")}
              className="bg-trading-primary hover:bg-trading-secondary font-funnel"
            >
              View Comparison
            </Button>
          </div>
          <h1 className="text-2xl font-bold  font-funnel mt-2">Summary</h1>
          {/* Summary Text */}
          <p className="text-lg text-gray-300 font-funnel mb-4 md:mb-8">
            {wholeData?.dashboardSummary}
          </p>
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-2">
            {wholeData?.stats?.map((stat, index) => (
              <Card key={index} className="glass-card">
                <CardContent className="p-2 sm:p-6">
                  <p className="text-sm text-gray-400 font-funnel">
                    {stat.label}
                  </p>
                  <p className="text-lg sm:text-2xl font-bold font-funnel mt-0 sm:mt-2 ">
                    {stat.value}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Performance Graph */}
          <Card className="w-full mt-8 p-4 sm:p-6 mb-4 sm:mb-8 bg-background/80 backdrop-blur-sm border-muted">
            <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 font-sans">
              Performance Overview
            </h2>
            <div className="h-[300px] sm:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={wholeData?.performance}
                  margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--muted-foreground) / 0.2)"
                    vertical={true}
                    horizontal={true}
                  />
                  <XAxis
                    dataKey="name"
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fontSize: 12 }}
                    tickMargin={10}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fontSize: 12 }}
                    tickMargin={10}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                      fontSize: "12px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
