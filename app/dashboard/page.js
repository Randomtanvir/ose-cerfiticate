import Link from "next/link";
import { List, PlusCircle } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">
        {/* TITLE */}
        <h1 className="text-2xl font-bold text-center mb-8">Dashboard</h1>

        {/* LINKS */}
        <div className="space-y-4">
          {/* ADD */}
          <Link
            href="/dashboard/add"
            className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition"
          >
            <PlusCircle size={20} />
            Add Certificate
          </Link>
          {/* LIST */}
          <Link
            href="/dashboard/lists"
            className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            <List size={20} />
            View Certificates List
          </Link>
        </div>
      </div>
    </div>
  );
}
