import { useRouter } from "next/router";
import AdminLayout from "@/components/layout/AdminLayout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import { useState, useEffect } from "react";
import { editProject } from "@/store/slices/projectsSlice";

export default function EditProjectPage() {
  const { query } = useRouter();
  const id = Array.isArray(query.id) ? query.id[0] : query.id;
  const dispatch = useAppDispatch();
  const project = useAppSelector((s: RootState) => s.projects.items.find(p => p.id === id));
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description);
      setLink(project.link || "");
    }
  }, [project]);

  if (!project) return <AdminLayout><div className="p-6">Project not found.</div></AdminLayout>;

  function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      if (!project) return;
      dispatch(editProject({ ...project, title, description, link, id: project.id, createdAt: project.createdAt }));
      window.location.href = "/admin/projects";
    }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Edit Project</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded" />
          <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full p-2 border rounded" rows={5} />
          <input value={link} onChange={e => setLink(e.target.value)} className="w-full p-2 border rounded" placeholder="Live link (optional)" />
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-green-600 text-white rounded">Save</button>
            <button type="button" onClick={() => history.back()} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
