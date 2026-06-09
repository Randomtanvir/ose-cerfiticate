"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteCertificate } from "@/lib/api";
import Link from "next/link";

function getQueryParams() {
  if (typeof window === "undefined") return { page: 1, search: "" };

  const params = new URLSearchParams(window.location.search);

  return {
    page: parseInt(params.get("page")) || 1,
    search: params.get("search") || "",
  };
}

export default function ListsClient() {
  const router = useRouter();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [tempSearch, setTempSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  // INIT FROM URL (CLIENT ONLY SAFE)
  useEffect(() => {
    const q = getQueryParams();
    setPage(q.page);
    setSearch(q.search);
    setTempSearch(q.search);
  }, []);

  // FETCH DATA
  const fetchData = async (p = page, s = search) => {
    const res = await fetch(`/api/certificates?page=${p}&limit=5&search=${s}`);

    const result = await res.json();

    setData(result.data || []);
    setTotalPages(result.totalPages || 1);
  };

  useEffect(() => {
    fetchData(page, search);
  }, [page, search]);

  // UPDATE URL
  const updateURL = (p, s) => {
    router.push(`/dashboard/lists?page=${p}&search=${s}`);
  };

  // SEARCH
  const handleSearch = () => {
    setPage(1);
    setSearch(tempSearch);
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

      {/* HOME */}
      <Link
        href="/dashboard"
        className="bg-green-500 px-3 py-2 rounded text-white inline-block mb-4"
      >
        Home
      </Link>

      {/* SEARCH */}
      <div className="flex gap-2 mb-4">
        <input
          value={tempSearch}
          onChange={(e) => setTempSearch(e.target.value)}
          className="border px-3 py-2 w-full rounded"
        />

        <button
          onClick={handleSearch}
          className="bg-black text-white px-4 rounded"
        >
          Search
        </button>
      </div>

      {/* TABLE */}
      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Code</th>
            <th className="p-2">Name</th>
            <th className="p-2">Field</th>
            <th className="p-2">Link</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item._id} className="border-t">
              <td className="p-2">{item.code}</td>
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.field}</td>
              <td className="p-2">{item.link}</td>

              <td className="p-2 flex gap-2">
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

                <button
                  onClick={() => router.push(`/dashboard/edit/${item._id}`)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

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
          className="px-3 py-1 border"
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => handlePage(page + 1)}
          className="px-3 py-1 border"
        >
          Next
        </button>
      </div>
    </div>
  );
}
