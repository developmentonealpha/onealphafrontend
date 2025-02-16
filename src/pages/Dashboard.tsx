"use client";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { AUTH_TOKEN } from "@/constants/auth";


const containerVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.3,
    },
  },
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      // Adjust spring or duration for a snappier or smoother feel
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
}

interface Data {
  label: string;
  value: number;
}
interface CompareData {
  label: string;
  value1: number;
  value2: number;
}
interface GraphData {
  name: string;
  value1: number;
  value2: number;
}

interface FinancialData {
  stats: Data[];
  compareStats: CompareData[];
  performance: GraphData[];
  comparePerformance: GraphData[];
  labels: string[];
  comparisonSummary: string;
  dashboardSummary?: string;
}

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [wholeData, setWholeData] = useState<FinancialData>();
  const [showHiddenData, setShowHiddenData] = useState(false);

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
        description: "Failed to fetch data. Something went wrong!",
        duration: 2500,
      });
      console.log(`error while fetching data ${error}`);
    }
  };

  console.log("wholeData", wholeData);

  return (
    <div className="min-h-screen bg-background relative">
      <Navigation />
      <main className="container mx-auto px-2 pt-24 pb-3 items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold font-funnel mt-2">Summary</h1>
          <p className="text-lg text-gray-300 font-funnel mb-0 mt-3">
            {wholeData?.dashboardSummary?.split("\n").map((paragraph, index) => (
              <span key={index} className="block mb-2 w-[95%]">
                {paragraph}
              </span>
            ))}
          </p>
          {/* <p className="text-lg text-gray-300 font-funnel mb-0 mt-3 preserve-newlines">
            {wholeData?.dashboardSummary}
          </p> */}
        </motion.div>

        {/* Hidden data container */}
        {showHiddenData && (
          <div className="sm:mt-12 md:mt-12 lg:mt-12 mt-16 fixed inset-0 flex flex-col items-center justify-center bg-background/95 md:bg-transparent md:static z-20">

            <div className="max-h-screen w-[95%] relative md:-left-4 lg:-left-9 sm:-left-9">

              <p className="text-md lg:mt-5 mt-7 sm:text-xl text-[17px] mb-2 sm:mb-4 font-funnel mx-3">
                Performance Comparison
              </p>
              <button
                onClick={() => setShowHiddenData(false)}
                className="absolute top-5 right-4 text-2xl text-gray-400 hover:text-gray-500 block sm:hidden"
              >
                &times;
              </button>
              {/* compareStats Section */}


              <div style={{ backgroundColor: "rgb(107 114 128 / var(--tw-bg-opacity))" }}>
                <Card className="w-full mt-6 lg:py-1 lg:px-1 sm:py-0 sm:px-0 mb-0 md:mb-8">
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    // A "tile" wrapper with a background, rounded corners, and shadow for elevation
                    className="rounded-lg shadow-lg p-2"
                    style={{ backgroundColor: "rgb(107 114 128 / var(--tw-bg-opacity))" }} // Added background color style
                  >
                    <table className="w-full text-center border-collapse">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left py-3 px-3 font-semibold text-[15px] text-gray-200">Metric</th>
                          <th className=" py-3 px-1 font-semibold text-[15px] text-gray-200 border-l border-gray-700">Your <br></br>Strategy</th>
                          <th className="py-3 px-1 font-semibold text-[15px] text-center text-gray-200 align-middle border-l border-gray-700">Mutual<br></br> Fund</th>
                        </tr>
                      </thead>
                      <tbody>
                        {wholeData?.compareStats?.map((comparison, index) => (
                          <motion.tr
                            key={index}
                            variants={itemVariants}
                            whileHover={{
                              scale: 1.03,
                              boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
                            }}
                            whileTap={{ scale: 0.98 }}
                            className="border-b border-gray-700"
                          >
                            {/* Metric */}
                            <td className="text-left py-1 px-3 text-sm text-gray-200">
                              {comparison.label}
                            </td>

                            {/* Your Strategy */}
                            <td className="py-1 px-3 text-md font-bold text-blue-500 border-l border-gray-700">
                              {comparison.value1}
                            </td>

                            {/* Mutual Fund */}
                            <td className="py-1 px-3 text-md font-bold text-red-500 border-l border-gray-700">
                              {comparison.value2}
                            </td>
                            {/* <td className="py-1 px-3 text-lg font-bold text-blue-500">
                              {comparison.value2}
                            </td> */}
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </motion.div>
                </Card>
              </div>

              <div style={{ backgroundColor: "rgb(107 114 128 / var(--tw-bg-opacity))" }}>
                <Card className="w-full mt-8 lg:p-2 sm:p-0 p-1 mb-1 md:mb-8">

                  <div className="h-[300px] sm:h-[400px] ">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={wholeData?.comparePerformance?.slice(1)}
                        margin={{ top: 20, right: -39, left: -26, bottom: 1 }}
                      >

                        {/* --- Grid & Axes --- */}
                        <CartesianGrid
                          // strokeDasharray="3 3"
                          stroke="hsl(var(--muted-foreground) / 0)"
                        />
                        <XAxis
                          dataKey="name"
                          type="category"
                          padding={{ left: 0, right: 0 }}
                          stroke="hsl(var(--muted-foreground))"
                          tickFormatter={(value) => {
                            // Convert Excel serial to JavaScript Date
                            const jsDate = new Date((value - 25569) * 86400 * 1000);
                            // Format the date to "Jan 21"
                            return jsDate.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
                          }}
                          tick={{ fontSize: 13, angle: 320, textAnchor: 'end', fill: '#ccc' }}
                          tickMargin={0}
                        />

                        <YAxis
                          domain={[0, 'auto']}
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 13, fontWeight: 300, fill: '#ccc' }}
                          tickMargin={0}
                        />


                        {/* --- Tooltip & Legend --- */}
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            border: "3px solid hsl(var(--border))",
                            borderRadius: "var(--radius)",
                            fontSize: "11px",
                          }}
                          labelFormatter={(label) => {
                            // Convert the label (assumed to be an Excel serial date) to a JS Date
                            const serial = Number(label);
                            if (!isNaN(serial)) {
                              const jsDate = new Date((serial - 25569) * 86400 * 1000);
                              return jsDate.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
                            }
                            return label;
                          }}
                        />
                        <YAxis yAxisId="right" orientation="right" />
                        <Legend
                          wrapperStyle={{
                            paddingTop: "20px",
                            fontSize: "11px",
                          }}
                        />

                        {/* --- Area lines (one for each dataKey) --- */}
                        <Area
                          type="monotone"
                          dataKey="value1"
                          name={wholeData?.labels?.[0] ?? "Value 1"}
                          stroke="hsl(210, 100%, 56%)" // Directly using HSL for primary
                          strokeWidth={3}
                          fill="url(#gradient1)"

                        // baseValue={0}
                        />
                        <Area
                          type="monotone"
                          dataKey="value2"
                          name={wholeData?.labels?.[1] ?? "Value 2"}
                          stroke="hsl(0, 80%, 60%)" // Directly using HSL for failure
                          strokeWidth={3}
                          fill="url(#gradient2)"
                        // baseValue={0}
                        />
                        <Area
                          type="monotone"
                          dataKey="value3"
                          name={wholeData?.labels?.[2] ?? "Value 3"}
                          stroke="#16a34a"
                          strokeWidth={3}
                          fill="url(#gradient3)"
                        // baseValue={0}
                        />

                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>

            </div>
          </div>
        )
        }

        {/* Toggle Button */}
        <div className="text-center">
          <Button
            onClick={() => setShowHiddenData(!showHiddenData)}
            className="bg-trading-primary hover:bg-trading-primary text-white px-4 py-2 rounded-lg mb-5"
          >
            {showHiddenData ? "Hide Stats and Graph" : "Show Stats and Graph"}
          </Button>
        </div>
      </main >
    </div >
  );
};

export default Dashboard;
