"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const defaultData = {
  code: "E-OSE/26/1032",
  name: "Raghad Muneb Sharaf",
  namear: "رغد منيب شرف",
  field: "Architectural Engineering",
  issueDate: "05/04/2026",
  expiryDate: "04/04/2028",
  classificationAr: "تصنيف المهندسين",
  classificationEn: "Engineers Classification",
  recommendationAr:
    "بناء على توصية مجلس تصنيف المهندسين - تمنح جمعية المهندسين العمانية",
  recommendationEn1:
    "On the recommendation of the Engineers Classification Board,",
  recommendationEn2: "The Oman Society of Engineers Grants",
  titleAr: "المهندسة",
  titleEn: "ENG",
  gradeAr: "درجة: مهندس في تخصص : مهندسة معمارية",
  gradeEn: "The grade of : Engineer In the field of :",
  issueEn: "This certificate issues on :",
  expiryEn: "This certificate expires on :",
  issueAr: "حررت هذه الشهادة بتاريخ :",
  expiryAr: "انتهاء هذه الشهادة بتاريخ :",
  chairmanAr: "رئيس مجلس الإدارة",
  link: "39340",
};

export default function CertificateForm({ certificate, id }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: certificate || defaultData,
  });

  // RESET WHEN EDIT DATA ARRIVES
  useEffect(() => {
    if (certificate) {
      reset(certificate);
      setPreview(certificate?.qrImage?.url || null);
    }
  }, [certificate, reset]);

  // SUBMIT CREATE / UPDATE
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (key !== "qrImage") {
          formData.append(key, data[key]);
        }
      });

      if (data.qrImage?.[0]) {
        formData.append("qrImage", data.qrImage[0]);
      }

      const isEdit = !!id;

      const res = await fetch(
        isEdit ? `/api/certificates/${id}` : `/api/certificates`,
        {
          method: isEdit ? "PUT" : "POST",
          body: formData,
        },
      );

      if (!res.ok) throw new Error("Request failed");

      await res.json();

      toast.success(
        isEdit ? "Updated successfully 🎉" : "Created successfully 🎉",
      );

      router.push("/dashboard/lists");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "code", label: "Certificate Code" },
    { name: "name", label: "English Name" },
    { name: "namear", label: "Arabic Name" },
    { name: "field", label: "Field" },
    { name: "issueDate", label: "Issue Date" },
    { name: "expiryDate", label: "Expiry Date" },
    { name: "classificationAr", label: "Classification Arabic" },
    { name: "classificationEn", label: "Classification English" },
    { name: "recommendationAr", label: "Recommendation Arabic" },
    { name: "recommendationEn1", label: "Recommendation English 1" },
    { name: "recommendationEn2", label: "Recommendation English 2" },
    { name: "titleAr", label: "Title Arabic" },
    { name: "titleEn", label: "Title English" },
    { name: "gradeAr", label: "Grade Arabic" },
    { name: "gradeEn", label: "Grade English" },
    { name: "issueEn", label: "Issue English" },
    { name: "expiryEn", label: "Expiry English" },
    { name: "issueAr", label: "Issue Arabic" },
    { name: "expiryAr", label: "Expiry Arabic" },
    { name: "chairmanAr", label: "Chairman Arabic" },
    { name: "link", label: "Link" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="border rounded-lg bg-white p-6 shadow-sm">
        {/* TITLE */}
        <h2 className="text-2xl font-semibold mb-6">
          {id ? "Edit Certificate" : "Create Certificate"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* FIELDS */}
            {fields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium mb-1">
                  {field.label}
                </label>

                <input
                  {...register(field.name)}
                  className="w-full border rounded-md px-3 py-2 focus:border-blue-500 outline-none"
                />
              </div>
            ))}

            {/* QR IMAGE */}
            <div>
              <label className="block text-sm font-medium mb-1">
                QR Code Image
              </label>

              <input
                type="file"
                accept="image/*"
                {...register("qrImage")}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setPreview(URL.createObjectURL(file));
                  }
                }}
                className="w-full border rounded-md px-3 py-2"
              />

              {preview && (
                <img
                  src={preview}
                  alt="QR Preview"
                  className="mt-3 w-32 h-32 object-contain border rounded"
                />
              )}
            </div>
          </div>

          {/* BUTTON WITH ANIMATION */}
          <button
            type="submit"
            disabled={loading}
            className={`mt-6 px-6 py-2 rounded-md text-white transition-all duration-300
              ${
                loading
                  ? "bg-gray-500 scale-95 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800 hover:scale-105"
              }
            `}
          >
            {loading
              ? id
                ? "Updating..."
                : "Saving..."
              : id
                ? "Update Certificate"
                : "Save Certificate"}
          </button>
        </form>
      </div>
    </div>
  );
}
