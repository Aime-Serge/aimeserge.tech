import AdminLayout from "@/components/layout/AdminLayout";
import { exportJSON } from "@/utils/dataExport";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import { deleteProject, importProjects, resetProjects} from "@/store/slices/projectsSlice";
import Link from "next/link";
import { useToast } from "@/components/ui/ToastProvider";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { useState } from "react";
import { Project } from "@/types/project";

export default function AdminProjects() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s: RootState) => s.projects.items as Project[]);
  const toast = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [pending, setPending] = useState<{ id: string; idx: number; item: Project } | null>(null);

  function openDeleteModal(id: string) {
    const idx = items.findIndex(i => i.id === id);
    const item = items[idx];
    setPending({ id, idx, item });
    setModalOpen(true);
  }

  function confirmDelete() {
    if (!pending) { setModalOpen(false); return; }
    dispatch(deleteProject(pending.id));
    setModalOpen(false);

    // Show a simple toast message (works with most toast libraries)
    toast.info("Project deleted.");

    // If you want an Undo button, you need a custom toast implementation.
    // Example for react-hot-toast (requires installation):
    // npm install react-hot-toast
    // import toast from "react-hot-toast";
    // toast((t) => (
    //   <span>
    //     Project deleted.
    //     <button
    //       onClick={() => {
    //         dispatch(restoreProjectAt({ item: pending.item, index: pending.idx }));
    //         toast.success("Project restored.");
    //         toast.dismiss(t.id);
    //       }}
    //       style={{ marginLeft: 8, color: 'blue', background: 'none', border: 'none', cursor: 'pointer' }}
    //     >
    //       Undo
    //     </button>
    //   </span>
    // ));

    setPending(null);
  }

  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      const text = await f.text();
      const parsed = JSON.parse(text);
      if (!Array.isArray(parsed)) throw new Error("JSON must be an array of projects");
      dispatch(importProjects(parsed));
      toast.success("Projects imported (replaced current list).");
    } catch {
      toast.error("Import failed — invalid JSON.");
    }
  }

  return (
    <AdminLayout>
      <ConfirmModal
        open={modalOpen}
        title="Delete project"
        message="This will delete the project. You can undo it from the toast."
        onCancel={() => setModalOpen(false)}
        onConfirm={confirmDelete}
        confirmLabel="Delete"
      />

      <div className="max-w-5xl mx-auto">
        <div className="flex gap-2 items-center mb-4">
          <button onClick={() => exportJSON("projects.json", items)} className="px-3 py-2 bg-blue-600 text-white rounded">Export</button>
          <input type="file" accept="application/json" onChange={handleImport} />
          <button onClick={() => { if (confirm("Reset projects (clear all)?")) { dispatch(resetProjects()); toast.info("Projects cleared."); } }} className="px-3 py-2 bg-gray-200 rounded">Reset</button>
          <Link href="/admin/projects/new" className="ml-auto text-blue-600">Add New Project</Link>
        </div>

        <div className="space-y-3">
          {!items.length && <div className="p-4 bg-white rounded shadow">No projects yet.</div>}
          {items.map(p => (
            <div key={p.id} className="p-4 bg-white rounded shadow flex justify-between items-center">
              <div>
                <div className="font-semibold">{p.title}</div>
                <div className="text-xs text-gray-500">{p.description}</div>
              </div>
              <div className="flex gap-3 items-center">
                {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="text-sm text-blue-600">Live</a>}
                <Link href={`/admin/projects/edit/${p.id}`} className="text-sm text-blue-600">Edit</Link>
                <button className="text-red-600" onClick={() => openDeleteModal(p.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}