import { useRouter } from "next/router";
import AdminLayout from "@/components/layout/AdminLayout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import { useState, useEffect } from "react";
import { editResearch } from "@/store/slices/researchSlice";

export default function EditResearchPage() {
  const { query } = useRouter();
  const id = Array.isArray(query.id) ? query.id[0] : query.id;
  const dispatch = useAppDispatch();
  const item = useAppSelector((s: RootState) => s.research.items.find(r => r.id === id));
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setAbstract(item.abstract);
      setPdfUrl(item.pdfUrl || "");
    }
  }, [item]);

  if (!item) return <AdminLayout><div className="p-6">Research item not found.</div></AdminLayout>;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    dispatch(editResearch({ ...item!, title, abstract, pdfUrl, createdAt: item!.createdAt }));
    window.location.href = "/admin/research";
  }

  function handlePdfFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setPdfUrl(`/uploads/${f.name}`);
    alert(`Please copy ${f.name} into public/uploads/ to make it available.`);
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Edit Research</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded" />
          <textarea value={abstract} onChange={e => setAbstract(e.target.value)} className="w-full p-2 border rounded" rows={6} />
          <div>
            <label className="block text-sm mb-1">Upload PDF (optional)</label>
            <input type="file" accept="application/pdf" onChange={handlePdfFile} />
            <p className="text-xs text-gray-500">After upload, copy the file into public/uploads/ with the same filename.</p>
            {pdfUrl && <div className="text-xs mt-2">Preview path: {pdfUrl}</div>}
          </div>

          <div className="flex gap-2">
            <button className="px-4 py-2 bg-green-600 text-white rounded">Save</button>
            <button type="button" onClick={() => history.back()} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
