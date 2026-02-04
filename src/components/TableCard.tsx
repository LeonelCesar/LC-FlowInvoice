import { Card } from "../components/Card";
import { CardContent } from "../components/CardContent";

type TableCardProps = {
  title: string;
  headers: string[];
  rows: string[][];
};

export function TableCard({ title, headers, rows }: TableCardProps) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-6">
        <h3 className="font-semibold text-gray-600 mb-4">{title}</h3>

        <table className="w-full text-sm">
          <thead className="text-gray-600">
            <tr>
              {headers.map((header) => (
                <th key={header} className="text-left py-2 text-gray-500">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t text-gray-500">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="py-2">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
