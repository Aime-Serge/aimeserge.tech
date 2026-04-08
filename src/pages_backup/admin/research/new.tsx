import AdminLayout from "@/components/layout/AdminLayout";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { addResearch } from "@/store/slices/researchSlice";
import { useRouter } from "next/router";

export default function NewResearchPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");

  function handlePdfFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setPdfUrl(`/uploads/${f.name}`);
    alert(`Please copy ${f.name} into public/uploads/ to make it available.`);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const id = `res-${Date.now()}`;
    dispatch(addResearch({ id, title, abstract, pdfUrl, createdAt: new Date().toISOString() }));
    router.push("/admin/research");
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Add Research</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full p-2 border rounded" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
          <textarea className="w-full p-2 border rounded" placeholder="Abstract" value={abstract} onChange={e => setAbstract(e.target.value)} rows={6} />
          <div>
            <label className="block text-sm mb-1">Upload PDF</label>
            <input type="file" accept="application/pdf" onChange={handlePdfFile} />
            <p className="text-xs text-gray-500">After upload, copy the file into public/uploads/ with the same filename.</p>
          </div>

          <div className="flex gap-2">
            <button className="px-4 py-2 bg-green-600 text-white rounded">Save</button>
            <button type="button" onClick={() => router.back()} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
