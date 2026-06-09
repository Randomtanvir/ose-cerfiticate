"use client";

import Image from "next/image";

// const certificateData = {
//   code: "E-OSE/26/1032",
//   name: "Raghad Muneb Sharaf",
//   namear: " رغد منيب شرف",
//   field: "Architectural Engineering",
//   issueDate: "05/04/2026",
//   expiryDate: "04/04/2028",
//   classificationAr: "تصنيف المهندسين",
//   classificationEn: "Engineers Classification",
//   recommendationAr:
//     "بناء على توصية مجلس تصنيف المهندسين - تمنح جمعية المهندسين العمانية",
//   recommendationEn1:
//     "On the recommendation of the Engineers Classification Board,",
//   recommendationEn2: "The Oman Society of Engineers Grants",
//   titleAr: "المهندسة",
//   titleEn: "ENG",
//   gradeAr: "درجة: مهندس في تخصص : مهندسة معمارية",
//   gradeEn: "The grade of : Engineer In the field of :",
//   issueEn: "This certificate issues on :",
//   expiryEn: "This certificate expires on :",
//   issueAr: "حررت هذه الشهادة بتاريخ :",
//   expiryAr: "انتهاء هذه الشهادة بتاريخ :",
//   chairmanAr: "رئيس مجلس الإدارة",
// };

export default function OSECertificate({ certificateData }) {
  return (
    <div className="overflow-auto bg-gray-100 md:pt-[135px] pt-20">
      <div
        className="relative mx-auto w-[1700px] h-[1200px]"
        style={{
          backgroundImage: "url('/crtf.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* QR CODE */}
        <div className="absolute top-[180px] left-[135px]">
          <Image
            src={certificateData?.qrImage?.url}
            alt="QR"
            width={160}
            height={160}
            className="object-contain"
          />
        </div>

        {/* Certificate ID */}
        <div className="absolute top-[365px] left-[130px]">
          <h2 className="text-[30px] font-poppins text-[#26313d]">
            <b>{certificateData?.code}</b>
          </h2>
        </div>

        {/* Main Content */}
        <div className="absolute left-1/2 top-[410px] w-[1100px] -translate-x-1/2 text-center text-[#26313d]">
          {/* Arabic Title */}
          <h2 dir="rtl" className="text-[40px] font-extrabold leading-none">
            {certificateData?.classificationAr}
          </h2>

          {/* English Title */}
          <h1 className="mt-2 text-[40px] font-extrabold">
            {certificateData?.classificationEn}
          </h1>

          {/* Arabic Content */}
          <div className="">
            <p dir="rtl" className="text-[35px] font-bold leading-[1.8]">
              {certificateData?.recommendationAr}
            </p>

            <p dir="rtl" className="text-[35px] font-bold">
              {certificateData?.titleAr} / {certificateData?.namear}
            </p>

            <p dir="rtl" className="mt-2 text-[35px] font-bold">
              {certificateData?.gradeAr}
            </p>
          </div>

          {/* English Content */}
          <div className="mt-1">
            <p className="text-[35px] font-semibold">
              {certificateData?.recommendationEn1}
            </p>

            <p className="text-[35px] font-semibold">
              {certificateData?.recommendationEn2}
            </p>

            <p className="text-[35px] font-extrabold">
              {certificateData?.titleEn} / {certificateData?.name}
            </p>

            <p className="mt-4 text-[35px] font-semibold">
              {certificateData?.gradeEn} {certificateData?.field}
            </p>
          </div>
        </div>

        {/* Footer Left */}
        <div className="absolute bottom-[145px] left-[120px]">
          <div className="space-y-8 text-[25px] font-mono text-[#26313d]">
            <p>
              <b>
                {certificateData?.issueEn} {certificateData?.issueDate}
              </b>
            </p>

            <p>
              <b>
                {certificateData?.expiryEn} {certificateData?.expiryDate}
              </b>
            </p>
          </div>
        </div>

        {/* Footer Right */}
        <div
          dir="rtl"
          className="absolute bottom-[145px] right-[120px] text-right mr-6"
        >
          <div className="space-y-8 text-[25px] font-mono text-[#26313d]">
            <p>
              <b>
                {certificateData?.issueAr} {certificateData?.issueDate}
              </b>
            </p>

            <p>
              <b>
                {certificateData?.expiryAr} {certificateData?.expiryDate}
              </b>
            </p>
          </div>
        </div>

        {/* Chairman */}
        <div className="absolute bottom-[150px] left-1/2 -translate-x-1/2">
          <p dir="rtl" className="text-[25px] font-extrabold text-[#26313d]">
            {certificateData?.chairmanAr}
          </p>
        </div>
      </div>
    </div>
  );
}
