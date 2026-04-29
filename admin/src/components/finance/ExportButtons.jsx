import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Download, FileText, Receipt, Building2 } from "lucide-react";

const EXPORT_OPTIONS = [
  { label: "Sales Summary", desc: "CSV format for Excel", icon: FileText, iconColor: "text-blue-600", key: "Sales Summary (CSV)" },
  { label: "VAT Report", desc: "PDF for BIR filing", icon: Receipt, iconColor: "text-orange-600", key: "VAT Report (PDF)" },
  { label: "Financial Statement", desc: "Complete P&L report", icon: Building2, iconColor: "text-green-600", key: "Financial Statement (PDF)" },
];

export default function ExportButtons({ onExport, headerActions }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Download className="size-5" />
              Export Options
            </CardTitle>
            <CardDescription>Download reports for accounting and tax compliance</CardDescription>
          </div>
          {headerActions}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {EXPORT_OPTIONS.map(({ label, desc, icon: Icon, iconColor, key }) => (
            <Button
              key={key}
              variant="outline"
              className="h-auto py-4 flex flex-col items-start gap-2"
              onClick={() => onExport?.(key)}
            >
              <Icon className={`size-5 ${iconColor}`} />
              <div className="text-left">
                <div className="font-medium">{label}</div>
                <div className="text-xs text-gray-500">{desc}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
