"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import axios from 'axios'
const url=process.env.NEXT_PUBLIC_BACKEND_URL;

export function ResultsOverview() {
  const [isMounted, setIsMounted] = useState(false)
  const [performanceData, setPerformanceData] = useState(null)

  const id = localStorage.getItem('id');

  const usn = id.substring(0, 10); // This should come from the logged-in user's session or context

  useEffect(() => {
    setIsMounted(true)
    // Fetch performance data from the backend
    axios.get(`${url}/api/performance/${usn}`)
      .then(response => {
        setPerformanceData(response.data)
      })
      .catch(error => {
        console.error("There was an error fetching the performance data:", error)
      })
  }, [])

  if (!performanceData) {
    return <div>Loading...</div>
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
              <p className="text-3xl font-bold">{performanceData.cgpa}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Latest SGPA</p>
              <p className="text-3xl font-bold">{performanceData.semesterData[5].sgpa}</p>
            </div>
          </div>
          {isMounted && (
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData.semesterData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="semester" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="sgpa" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
