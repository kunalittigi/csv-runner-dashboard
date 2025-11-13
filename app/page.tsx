"use client";

import { useState } from "react";
import Papa from "papaparse";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface RunData {
  date: string;
  person: string;
  "miles run": number;
}

export default function Home() {
  const [csvData, setCsvData] = useState<RunData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const data = result.data as RunData[];
        const headers = Object.keys(data[0] || {});
        if (
          !headers.includes("date") ||
          !headers.includes("person") ||
          !headers.includes("miles run")
        ) {
          setError("❌ Invalid CSV. Required headers: date, person, miles run");
          setCsvData([]);
          return;
        }

        const validData = data.map((d) => ({
          date: d.date,
          person: d.person,
          "miles run": Number(d["miles run"]),
        }));

        setError(null);
        setCsvData(validData);
      },
      error: () => {
        setError("Error reading file");
      },
    });
  };

  const getMetrics = () => {
    if (csvData.length === 0) return null;

    const miles = csvData.map((d) => d["miles run"]);
    const avg = (miles.reduce((a, b) => a + b, 0) / miles.length).toFixed(2);
    const min = Math.min(...miles);
    const max = Math.max(...miles);
    return { avg, min, max };
  };

  const metrics = getMetrics();

  // Group data by person for per-person charts
  const people = [...new Set(csvData.map((d) => d.person))];
  const grouped = people.map((person) => ({
    person,
    data: csvData.filter((d) => d.person === person),
  }));

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        🏃 CSV Runner Dashboard
      </h1>

      <div className="flex justify-center mb-8">
        <Card className="w-full max-w-xl p-6">
          <CardHeader>
            <CardTitle>Upload CSV File</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input type="file" accept=".csv" onChange={handleFileUpload} />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {csvData.length > 0 && (
              <p className="text-sm text-gray-600">
                ✅ Loaded {csvData.length} records successfully.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-4 text-center">
            <CardTitle>Average Miles</CardTitle>
            <CardContent className="text-2xl font-bold">
              {metrics.avg}
            </CardContent>
          </Card>
          <Card className="p-4 text-center">
            <CardTitle>Minimum Miles</CardTitle>
            <CardContent className="text-2xl font-bold">
              {metrics.min}
            </CardContent>
          </Card>
          <Card className="p-4 text-center">
            <CardTitle>Maximum Miles</CardTitle>
            <CardContent className="text-2xl font-bold">
              {metrics.max}
            </CardContent>
          </Card>
        </div>
      )}

      {csvData.length > 0 && (
        <Card className="p-6 mb-10">
          <CardHeader>
            <CardTitle>📈 Overall Miles Run (All People)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={csvData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="miles run"
                  stroke="#2563eb"
                  name="Miles Run"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {grouped.map(({ person, data }) => (
        <Card key={person} className="p-6 mb-6">
          <CardHeader>
            <CardTitle>👟 {person}'s Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="miles run"
                  stroke="#10b981"
                  name="Miles Run"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
