import AdminLayout from "@/components/layout/AdminLayout";
import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { RootState } from "@/store";
import { editCaseStudy } from "@/store/slices/caseStudiesSlice";
import { useState } from "react";

export default function EditCaseStudy() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();
  const cs = useAppSelector((s: RootState) => s.caseStudies.items.find((x) => x.id === id));
  const [title, setTitle] = useState(cs?.title ?? "");
  const [slug, setSlug] = useState(cs?.slug ?? "");
  const [tagline, setTagline] = useState(cs?.tagline ?? "");
  const [summary, setSummary] = useState(cs?.summary ?? "");
  const [pdfUrl, setPdfUrl] = useState(cs?.pdfUrl ?? "");

  if (!cs) return <AdminLayout><div className="max-w-3xl mx-auto">Not found</div></AdminLayout>;

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) {
      setPdfUrl(`/uploads/${f.name}`);
      alert(`Copy the file into public/uploads/${f.name}`);
    }
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!cs) return;
    dispatch(editCaseStudy({ ...cs, title, slug, tagline, summary, pdfUrl, tools: cs.tools ?? [] }));
    router.push("/admin/case-studies");
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Edit Case Study</h1>
        <form onSubmit={handleSave} className="space-y-4">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
          <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="Slug" className="w-full p-2 border rounded" />
          <input value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="Tagline" className="w-full p-2 border rounded" />
          <textarea value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Summary" className="w-full p-2 border rounded" rows={4} />
          <div>
            <label className="block text-sm font-medium">Replace PDF (optional)</label>
            <input type="file" accept="application/pdf" onChange={handleFile} />
            <p className="text-xs text-gray-500">If you replace, copy the file to public/uploads/</p>
          </div>
          <button className="px-4 py-2 bg-green-600 text-white rounded">Save</button>
        </form>
      </div>
    </AdminLayout>
  );
}
