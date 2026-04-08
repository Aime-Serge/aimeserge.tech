import AdminLayout from "@/components/layout/AdminLayout";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { addProject } from "@/store/slices/projectsSlice";
import { useRouter } from "next/router";

export default function NewProjectPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const id = `proj-${Date.now()}`;
    dispatch(addProject({
      id,
      title,
      description,
      link,
      createdAt: new Date().toISOString()
    }));
    router.push("/admin/projects");
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Add Project</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full p-2 border rounded" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
          <textarea className="w-full p-2 border rounded" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} rows={4} />
          <input className="w-full p-2 border rounded" placeholder="Link (optional)" value={link} onChange={e => setLink(e.target.value)} />
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-green-600 text-white rounded">Save</button>
            <button type="button" onClick={() => router.back()} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
