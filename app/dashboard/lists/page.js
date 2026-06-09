"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { deleteCertificate } from "@/lib/api";
import Link from "next/link";

export default function CertificatesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageParam = parseInt(searchParams.get("page")) || 1;
  const searchParam = searchParams.get("search") || "";

  const [data, setData] = useState([]);
  const [page, setPage] = useState(pageParam);
  const [search, setSearch] = useState(searchParam);
  const [tempSearch, setTempSearch] = useState(searchParam);
  const [totalPages, setTotalPages] = useState(1);

  // FETCH FROM SERVER (WITH QUERY PARAMS)
  const fetchData = async (p = page, s = search) => {
    const res = await fetch(`/api/certificates?page=${p}&limit=5&search=${s}`);

    const result = await res.json();

    setData(result.data || []);
    setTotalPages(result.totalPages || 1);
  };

  // LOAD WHEN URL CHANGES
  useEffect(() => {
    fetchData(page, search);
  }, [page, search]);

  // UPDATE URL (IMPORTANT)
  const updateURL = (p, s) => {
    router.push(`/dashboard/lists?page=${p}&search=${s}`);
  };

  // SEARCH BUTTON
  const handleSearch = () => {
    setSearch(tempSearch);
    setPage(1);
    updateURL(1, tempSearch);
  };

  // PAGINATION
  const handlePage = (newPage) => {
    setPage(newPage);
    updateURL(newPage, search);
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!confirm("Delete this certificate?")) return;

    await deleteCertificate(id);
    fetchData(page, search);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Certificates List</h1>
      <Link
        className="bg-green-500 px-2 py-3 rounded-md my-4 flex items-center justify-center text-white"
        href="/dashboard"
      >
        Home
      </Link>
      {/* SEARCH */}
      <div className="flex gap-2 mb-4">
        <input
          value={tempSearch}
          onChange={(e) => setTempSearch(e.target.value)}
          className="border px-3 py-2 w-full rounded"
          placeholder="Search..."
        />

        <button
          onClick={handleSearch}
          className="bg-black text-white px-4 rounded"
        >
          Search
        </button>
      </div>

      {/* TABLE (NO DESIGN CHANGE) */}
      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Code</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Field</th>
            <th className="p-2 text-left">Link</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item._id} className="border-t">
              <td className="p-2">{item.code}</td>
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.field}</td>
              <td className="p-2">{item.link}</td>

              {/* ACTIONS (UNCHANGED DESIGN) */}
              <td className="p-2 flex gap-2">
                {/* VIEW */}
                <button
                  onClick={() =>
                    router.push(
                      `/ords/mercatono_001/r/ose/ose-certificate?p115_int_hist_id=${item._id}`,
                    )
                  }
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  View
                </button>

                {/* EDIT */}
                <button
                  onClick={() => router.push(`/dashboard/edit/${item._id}`)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                {/* DELETE */}
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="flex justify-center gap-2 mt-6">
        <button
          disabled={page === 1}
          onClick={() => handlePage(page - 1)}
          className="px-3 py-1 border rounded"
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => handlePage(page + 1)}
          className="px-3 py-1 border rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
