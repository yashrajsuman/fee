'use client';  // Ensure this component is client-side

import { useState, useEffect } from 'react';
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export function StudentStats() {
  const [feesData, setFeesData] = useState({ total: 0, remaining: 0 });
  const [performanceData, setPerformanceData] = useState({ latestSgpa: 'N/A', cgpa: 'N/A' });
  const [usn, setUsn] = useState(''); // State to store USN

  useEffect(() => {
    // Safely access localStorage after component mounts (client-side only)
    if (typeof window !== 'undefined') {
      const id = localStorage.getItem('id');
      const extractedUsn = id ? id.substring(0, 10) : '';
      setUsn(extractedUsn);
    }
  }, []); // Run once after initial render

  useEffect(() => {
    if (usn) {
      // Fetch fee data by USN
      fetch(`${url}/api/feeS/getFeesByUsn/${usn}`)
        .then((response) => response.json())
        .then((data) => {
          setFeesData({
            total: data.total_fee || 0,
            remaining: data.remaining_balance || 0,
          });
        })
        .catch((error) => console.error('Error fetching fee data:', error));

      // Fetch performance data by USN
      fetch(`${url}/api/performance/${usn}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // Log to check if data is valid

          if (data && data.semesterData && data.semesterData.length > 0) {
            const latestSgpa = data.semesterData[data.semesterData.length - 1].sgpa || 'N/A';
            setPerformanceData({
              latestSgpa,
              cgpa: data.cgpa || 'N/A',
            });
          } else {
            setPerformanceData({
              latestSgpa: 'N/A',
              cgpa: data.cgpa || 'N/A',
            });
          }
        })
        .catch((error) => console.error('Error fetching performance data:', error));
    }
  }, [usn]); // Trigger this effect whenever `usn` changes

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Fees</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{feesData.total}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Remaining Fees</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{feesData.remaining}</div>
          <Progress value={(feesData.remaining / feesData.total) * 100} className="mt-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Latest SGPA</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{performanceData.latestSgpa}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">CGPA</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{performanceData.cgpa}</div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Link
            href="/dashboard/fee-payment"
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1"
          >
            Pay Fees
          </Link>
          <Link
            href="/dashboard/results"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-4 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1"
          >
            Check Results
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
