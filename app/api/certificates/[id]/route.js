import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Certificate from "@/models/Certificate";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";

// UPDATE
export async function PUT(req, { params }) {
  await connectDB();

  const formData = await req.formData();

  const existing = await Certificate.findById(params.id);

  const file = formData.get("qrImage");

  let qrImage = existing.qrImage;

  if (file && file.size > 0) {
    // delete old image
    if (existing.qrImage?.public_id) {
      await deleteFromCloudinary(existing.qrImage.public_id);
    }

    const result = await uploadToCloudinary(file, "certificates");

    qrImage = {
      url: result.secure_url,
      public_id: result.public_id,
    };
  }

  const updated = await Certificate.findByIdAndUpdate(
    params.id,
    {
      code: formData.get("code"),
      name: formData.get("name"),
      namear: formData.get("namear"),
      field: formData.get("field"),
      issueDate: formData.get("issueDate"),
      expiryDate: formData.get("expiryDate"),
      classificationAr: formData.get("classificationAr"),
      classificationEn: formData.get("classificationEn"),
      recommendationAr: formData.get("recommendationAr"),
      recommendationEn1: formData.get("recommendationEn1"),
      recommendationEn2: formData.get("recommendationEn2"),
      titleAr: formData.get("titleAr"),
      titleEn: formData.get("titleEn"),
      gradeAr: formData.get("gradeAr"),
      gradeEn: formData.get("gradeEn"),
      issueEn: formData.get("issueEn"),
      expiryEn: formData.get("expiryEn"),
      issueAr: formData.get("issueAr"),
      expiryAr: formData.get("expiryAr"),
      chairmanAr: formData.get("chairmanAr"),
      link: formData.get("link"),
      qrImage,
    },
    { new: true },
  );

  return NextResponse.json(updated);
}

// DELETE
export async function DELETE(req, { params }) {
  await connectDB();

  const existing = await Certificate.findById(params.id);

  if (existing?.qrImage?.public_id) {
    await deleteFromCloudinary(existing.qrImage.public_id);
  }

  await Certificate.findByIdAndDelete(params.id);

  return NextResponse.json({ message: "Deleted successfully" });
}
export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const certificate = await Certificate.findById(id).lean();

    if (!certificate) {
      return NextResponse.json(
        { message: "Certificate not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(certificate);
  } catch (error) {
    console.error("GET certificate error:", error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
