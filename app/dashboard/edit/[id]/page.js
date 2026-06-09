import { getCertificateById } from "@/lib/api";
import CertificateForm from "../../_components/CertificateForm";

export default async function EditCertificatePage({ params }) {
  const { id } = params;

  const certificate = await getCertificateById(id);

  if (!certificate) {
    return <div className="p-6 text-red-500">Certificate not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Certificate</h1>

      <CertificateForm certificate={certificate} id={id} />
    </div>
  );
}
