'use client'; // Ensure the component is client-side

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
const url=process.env.NEXT_PUBLIC_BACKEND_URL;

export function FeeStatus() {
  const [feeData, setFeeData] = useState({
    totalFee: 0,
    amountPaid: 0,
    remainingBalance: 0,
  });

  const id = localStorage.getItem('id'); // Assuming student ID is stored in localStorage
  const usn = id ? id.substring(0, 10) : ''; // Extract USN from the student ID

  useEffect(() => {
    if (usn) {
      // Fetch fee data by USN
      fetch(`${url}/api/feeS/getFeesByUsn/${usn}`)
        .then((response) => response.json())
        .then((data) => {
          setFeeData({
            totalFee: data.total_fee || 0,
            amountPaid: (data.total_fee-data.remaining_balance) || 0,
            remainingBalance: data.remaining_balance || 0,
          });
        })
        .catch((error) => {
          console.error('Error fetching fee data:', error);
        });
    }
  }, [usn]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fee Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="grid gap-1">
              <p className="text-sm font-medium">Total Fee</p>
              <p className="text-2xl font-bold">₹{feeData.totalFee}</p>
            </div>
            <div className="grid gap-1 text-right">
              <p className="text-sm font-medium">Amount Paid</p>
              <p className="text-2xl font-bold">₹{feeData.amountPaid}</p>
            </div>
          </div>
          <Progress value={(feeData.amountPaid / feeData.totalFee) * 100} />
          <p className="text-sm text-muted-foreground">Remaining Balance: ₹{feeData.remainingBalance}</p>
        </div>
      </CardContent>
    </Card>
  );
}
