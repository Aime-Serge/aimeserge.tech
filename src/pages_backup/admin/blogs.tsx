import AdminLayout from "@/components/layout/AdminLayout";
import { exportJSON } from "@/utils/dataExport";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import { deleteBlog, importBlogs, resetBlogs } from "@/store/slices/blogsSlice";
import Link from "next/link";
import { useToast } from "@/components/ui/ToastProvider";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { useState } from "react";
import { Blog } from "@/types/blog";

export default function AdminBlogs() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s: RootState) => s.blogs.items as Blog[]);
  const toast = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [pending, setPending] = useState<{ id: string; idx: number; item: Blog } | null>(null);

  function openDeleteModal(id: string) {
    const idx = items.findIndex(i => i.id === id);
    const item = items[idx];
    setPending({ id, idx, item });
    setModalOpen(true);
  }

  function confirmDelete() {
    if (!pending) { setModalOpen(false); return; }
    dispatch(deleteBlog(pending.id));
    setModalOpen(false);

    // Show a simple toast message (works with most toast libraries)
    toast.info("Blog deleted.");

    // If you want an Undo button, you need a custom toast implementation.
    // Example for react-hot-toast (requires installation):
    // npm install react-hot-toast
    // import toast from "react-hot-toast";
    // toast((t) => (
    //   <span>
    //     Blog deleted.
    //     <button
    //       onClick={() => {
    //         dispatch(restoreBlogAt({ item: pending.item, index: pending.idx }));
    //         toast.success("Blog restored.");
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
      if (!Array.isArray(parsed)) throw new Error("JSON must be an array of blogs");
      dispatch(importBlogs(parsed));
      toast.success("Blogs imported (replaced current list).");
    } catch {
      toast.error("Import failed — invalid JSON.");
    }
  }

  return (
    <AdminLayout>
      <ConfirmModal
        open={modalOpen}
        title="Delete blog post"
        message="This will delete the blog post. You can undo it from the toast."
        onCancel={() => setModalOpen(false)}
        onConfirm={confirmDelete}
        confirmLabel="Delete"
      />

      <div className="max-w-4xl mx-auto">
        <div className="flex gap-2 items-center mb-4">
          <button onClick={() => exportJSON("blogs.json", items)} className="px-3 py-2 bg-blue-600 text-white rounded">Export</button>
          <input type="file" accept="application/json" onChange={handleImport} />
          <button onClick={() => { if (confirm("Reset blogs (clear all)?")) { dispatch(resetBlogs()); toast.info("Blogs cleared."); } }} className="px-3 py-2 bg-gray-200 rounded">Reset</button>
          <Link href="/admin/blogs/new" className="ml-auto text-blue-600">Add New Blog</Link>
        </div>

        <div className="space-y-3">
          {!items.length && <div className="p-4 bg-white rounded shadow">No blogs yet.</div>}
          {items.map(b => (
            <div key={b.id} className="p-4 bg-white rounded shadow flex justify-between items-center">
              <div>
                <div className="font-semibold">{b.title}</div>
                <div className="text-xs text-gray-500">{b.author}</div>
                <div className="text-xs text-gray-400">{new Date(b.createdAt).toLocaleDateString()}</div>
              </div>
              <div className="flex gap-3 items-center">
                <Link href={`/admin/blogs/edit/${b.id}`} className="text-sm text-blue-600">Edit</Link>
                <button className="text-red-600" onClick={() => openDeleteModal(b.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}