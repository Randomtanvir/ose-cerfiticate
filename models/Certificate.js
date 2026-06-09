import mongoose from "mongoose";

const CertificateSchema = new mongoose.Schema(
  {
    code: String,
    name: String,
    namear: String,
    field: String,
    issueDate: String,
    expiryDate: String,
    classificationAr: String,
    classificationEn: String,
    recommendationAr: String,
    recommendationEn1: String,
    recommendationEn2: String,
    titleAr: String,
    titleEn: String,
    gradeAr: String,
    gradeEn: String,
    issueEn: String,
    expiryEn: String,
    issueAr: String,
    expiryAr: String,
    chairmanAr: String,
    link: String,

    // 🆕 Cloudinary image field
    qrImage: {
      url: String,
      public_id: String,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Certificate ||
  mongoose.model("Certificate", CertificateSchema);
