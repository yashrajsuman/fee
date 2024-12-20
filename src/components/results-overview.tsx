"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import Cookies from "js-cookie"; 

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

// Define types for the data
interface SemesterData {
  semester: number;
  sgpa: number;
}

interface PerformanceData {
  cgpa: number;
  semesterData: SemesterData[];
}

export function ResultsOverview() {
  const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null);
  const [usn, setUsn] = useState<string | null>(null);

  useEffect(() => {
    // Ensure that the code runs only on the client side (avoid SSR issues)
    if (typeof window !== "undefined") {
      const id =Cookies.get("authToken");
      if (id) {
        setUsn(id.substring(0, 10)); // Extract USN from the ID stored in localStorage
      }
    }
  }, []); // Empty dependency array ensures this runs only once after initial render

  useEffect(() => {
    if (usn) {
      // Fetch performance data from the backend if usn is available
      axios
        .get(`${url}/api/performance/${usn}`)
        .then((response) => {
          setPerformanceData(response.data); // Set the performance data received from the backend
        })
        .catch((error) => {
          console.error("There was an error fetching the performance data:", error);
        });
    }
  }, [usn]); // Dependency on `usn` so the fetch is triggered when it changes

  if (!performanceData) {
    return <div>Loading...</div>; // Show loading state until the data is fetched
  }

  const { cgpa, semesterData } = performanceData;

  if (!semesterData || semesterData.length === 0) {
    return <div>No performance data available.</div>; // Show if there is no semester data
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Academic Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Overall CGPA</p>
              <p className="text-3xl font-bold">{cgpa}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Latest SGPA</p>
              <p className="text-3xl font-bold">
                {semesterData[semesterData.length - 1]?.sgpa || "N/A"}
              </p>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={semesterData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="semester" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sgpa"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
