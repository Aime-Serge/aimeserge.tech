import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { addCaseStudy } from "@/store/slices/caseStudiesSlice";
import AdminLayout from "@/components/layout/AdminLayout";
import { CaseStudy } from "@/types/caseStudy";
import { useRouter } from "next/router";

export default function NewCaseStudyPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [form, setForm] = useState<Partial<CaseStudy>>({
    title: "",
    tagline: "",
    role: "",
    summary: "",
    tools: [],
    features: [],
    pdfUrl: "",
    slug: ""
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleArrayChange(field: "tools" | "features", value: string) {
    setForm(prev => ({ ...prev, [field]: value.split(",").map(v => v.trim()) }));
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      // quick: use filename as pdfUrl (you must copy to public/uploads/)
      setForm(prev => ({ ...prev, pdfUrl: `/uploads/${file.name}` }));
      alert(`Place the file ${file.name} into public/uploads/`);
    }
  }

  function handleFileAutoFill(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const fakeTitle = file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ");
      const fakeDate = new Date().toISOString().split("T")[0];
      setForm(prev => ({
        ...prev,
        title: fakeTitle,
        slug: fakeTitle.toLowerCase().replace(/\s+/g, "-"),
        pdfUrl: `/uploads/${file.name}`,
        createdAt: fakeDate,
        tagline: "Generated from PDF"
      }));
      alert(`Auto-filled from filename: ${fakeTitle}`);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.slug || !form.pdfUrl) return alert("Title, slug and PDF required");
    const newCase: CaseStudy = {
      id: `cs-${Date.now()}`,
      slug: form.slug!,
      title: form.title!,
      tagline: form.tagline || "",
      role: form.role || "Software Engineer / Student",
      url: form.url || "",
      summary: form.summary || "",
      tools: form.tools || [],
      features: form.features || [],
      pdfUrl: form.pdfUrl!,
      createdAt: form.createdAt || new Date().toISOString()
    };
    dispatch(addCaseStudy(newCase));
    router.push("/admin/case-studies");
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Add Case Study</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" value={form.title || ""} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded" />
          <input name="slug" value={form.slug || ""} onChange={handleChange} placeholder="Slug" className="w-full p-2 border rounded" />
          <input name="tagline" value={form.tagline || ""} onChange={handleChange} placeholder="Tagline" className="w-full p-2 border rounded" />
          <input name="role" value={form.role || ""} onChange={handleChange} placeholder="Role" className="w-full p-2 border rounded" />
          <textarea name="summary" value={form.summary || ""} onChange={handleChange} placeholder="Summary" className="w-full p-2 border rounded" rows={4} />
          <input placeholder="Tools (comma separated)" onChange={(e) => handleArrayChange("tools", e.target.value)} className="w-full p-2 border rounded" />
          <input placeholder="Features (comma separated)" onChange={(e) => handleArrayChange("features", e.target.value)} className="w-full p-2 border rounded" />

          <div>
            <label className="block text-sm font-medium">Upload PDF (manual)</label>
            <input type="file" accept="application/pdf" onChange={handleFileUpload} />
          </div>

          <div>
            <label className="block text-sm font-medium">Create from PDF (auto-fill)</label>
            <input type="file" accept="application/pdf" onChange={handleFileAutoFill} />
            <p className="text-xs text-gray-500">Simulated OCR (filename-based)</p>
          </div>

          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Save</button>
        </form>
      </div>
    </AdminLayout>
  );
}
