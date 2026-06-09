import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Certificate from "@/models/Certificate";
import { uploadToCloudinary } from "@/lib/cloudinary";

// CREATE
export async function POST(req) {
  await connectDB();

  const formData = await req.formData();

  const file = formData.get("qrImage");

  let uploadedImage = null;

  if (file && file.size > 0) {
    const result = await uploadToCloudinary(file, "certificates");

    uploadedImage = {
      url: result.secure_url,
      public_id: result.public_id,
    };
  }

  const data = {
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

    qrImage: uploadedImage,
  };

  const created = await Certificate.create(data);

  return NextResponse.json(created);
}

// GET: list + search + pagination + single
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 5;
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    // SEARCH FILTER
    const filter = search ? { name: { $regex: search, $options: "i" } } : {};

    const total = await Certificate.countDocuments(filter);

    const data = await Certificate.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json({
      data,
      total,
      totalPages: Math.ceil(total / limit),
      page,
    });
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
