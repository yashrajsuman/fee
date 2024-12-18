import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
  
  const results = [
    {
      subject: "Data Structures",
      code: "CS201",
      credits: 4,
      grade: "A+",
    },
    {
      subject: "Database Management",
      code: "CS202",
      credits: 4,
      grade: "A",
    },
    {
      subject: "Operating Systems",
      code: "CS203",
      credits: 4,
      grade: "A+",
    },
    {
      subject: "Computer Networks",
      code: "CS204",
      credits: 3,
      grade: "A",
    },
    {
      subject: "Web Development",
      code: "CS205",
      credits: 3,
      grade: "A+",
    },
  ]
  
  export function SemesterResults() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Current Semester Results</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead>Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result) => (
                <TableRow key={result.code}>
                  <TableCell>{result.subject}</TableCell>
                  <TableCell>{result.code}</TableCell>
                  <TableCell>{result.credits}</TableCell>
                  <TableCell>{result.grade}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
  }
  
  