const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

/* =========================
   GET ALL (pagination + search)
========================= */
export async function getCertificates({ page = 1, search = "" }) {
  try {
    const res = await fetch(
      `${API_URL}/api/certificates?page=${page}&limit=5&search=${search}`,
      { cache: "no-store" },
    );

    if (!res.ok) throw new Error("Failed to fetch list");

    return await res.json();
  } catch (error) {
    console.error("getCertificates error:", error);
    return { data: [], total: 0 };
  }
}

/* =========================
   DELETE
========================= */
export async function deleteCertificate(id) {
  try {
    const res = await fetch(`${API_URL}/api/certificates/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Delete failed");

    return await res.json();
  } catch (error) {
    console.error("deleteCertificate error:", error);
    return { error: true };
  }
}

/* =========================
   GET SINGLE
========================= */

export async function getCertificateById(id) {
  console.log(id, "ID FROM API CALL");
  try {
    if (!id) throw new Error("ID is required");

    const res = await fetch(`${API_URL}/api/certificates/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch certificate. Status: ${res.status}`);
    }

    const data = await res.json();

    return data || null;
  } catch (error) {
    console.error("❌ getCertificateById error:", error);

    return null;
  }
}

/* =========================
   UPDATE
========================= */
export async function updateCertificate(id, formData) {
  try {
    const res = await fetch(`${API_URL}/api/certificates/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (!res.ok) throw new Error("Update failed");

    return await res.json();
  } catch (error) {
    console.error("updateCertificate error:", error);
    return { error: true };
  }
}
