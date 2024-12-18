'use client';  // Add this line at the top of the file

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const url=process.env.NEXT_PUBLIC_BACKEND_URL;

export function StudentInfo() {
  const [studentData, setStudentData] = useState({ name: '', usn: '' });
  const id = localStorage.getItem('id'); // Get ID from localStorage
  const usn = id ? id.substring(0, 10) : ''; // Extract USN from the ID

  useEffect(() => {
    if (usn) {
      fetch(`${url}/api/getNameByUsn/${usn}`) // Backend API to fetch name by USN
        .then((response) => response.json())
        .then((data) => {
          setStudentData((prevState) => ({
            ...prevState,
            name: data.name,
            usn: usn,
          }));
        })
        .catch((error) => console.error('Error fetching data:', error));
    }
  }, [usn]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Information</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Name</p>
          <p className="font-medium">{studentData.name || 'Loading...'}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">USN</p>
          <p className="font-medium">{studentData.usn || 'Loading...'}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Department</p>
          <p className="font-medium">Information Science</p> {/* Static data, can be fetched dynamically if needed */}
        </div>
      </CardContent>
    </Card>
  );
}
