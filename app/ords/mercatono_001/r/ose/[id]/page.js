import MainLear from "@/app/_components/MainLear";
import { getCertificateById } from "@/lib/api";

const DetailsPage = async ({ searchParams }) => {
  const id = searchParams?.p115_int_hist_id;

  // const certificate = await getCertificateByApexId(id);

  const certificate = await getCertificateById(id);
  return (
    <div>
      <MainLear certificate={certificate} />
    </div>
  );
};

export default DetailsPage;
