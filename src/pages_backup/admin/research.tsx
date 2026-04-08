import AdminLayout from "@/components/layout/AdminLayout";
import { exportJSON } from "@/utils/dataExport";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import { deleteResearch, importResearch, resetResearch } from "@/store/slices/researchSlice";
import Link from "next/link";
import { useToast } from "@/components/ui/ToastProvider";

export default function AdminResearch() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s: RootState) => s.research.items);
  const toast = useToast();

  function handleExport() {
    exportJSON("research.json", items);
  }

  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      const text = await f.text();
      const parsed = JSON.parse(text);
      if (!Array.isArray(parsed)) throw new Error("JSON must be an array of research items");
      dispatch(importResearch(parsed));
      toast.success("Research items imported (replaced current list).");
    } catch {
      toast.error("Import failed — invalid JSON.");
    }
  }

  function handleDelete(rId: string) {
    const item = items.find((r) => r.id === rId);
    if (!item) return;
    dispatch(deleteResearch(rId));
    toast.info("Research item deleted.");
    // If you want undo, use a custom toast or update ToastProvider to support actions.
    // Example for react-hot-toast:
    // toast((t) => (
    //   <span>
    //     Research item deleted.
    //     <button
    //       onClick={() => {
    //         dispatch(addResearch(item));
    //         toast.success("Research restored.");
    //         toast.dismiss(t.id);
    //       }}
    //       style={{ marginLeft: 8, color: 'blue' }}
    //     >
    //       Undo
    //     </button>
    //   </span>
    // ));
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex gap-2 items-center mb-4">
          <button onClick={handleExport} className="px-3 py-2 bg-blue-600 text-white rounded">Export</button>
          <input type="file" accept="application/json" onChange={handleImport} />
          <button onClick={() => { if (confirm("Reset research (clear all)?")) { dispatch(resetResearch()); toast.info("Research cleared."); } }} className="px-3 py-2 bg-gray-200 rounded">Reset</button>
          <Link href="/admin/research/new" className="ml-auto text-blue-600">Add New Research</Link>
        </div>

        <div className="space-y-3">
          {!items.length && <div className="p-4 bg-white rounded shadow">No research items yet.</div>}
          {items.map(r => (
            <div key={r.id} className="p-4 bg-white rounded shadow flex justify-between items-center">
              <div>
                <div className="font-semibold">{r.title}</div>
                <div className="text-xs text-gray-500 line-clamp-2">{r.abstract}</div>
              </div>
              <div className="flex gap-3 items-center">
                {r.pdfUrl && <a href={r.pdfUrl} target="_blank" rel="noreferrer" className="text-sm text-blue-600">PDF</a>}
                <Link href={`/admin/research/edit/${r.id}`} className="text-sm text-blue-600">Edit</Link>
                <Link href={`/research/${r.id}`} className="text-sm text-blue-600">View</Link>
                <button className="text-red-600" onClick={() => { if (confirm("Delete research item?")) handleDelete(r.id); }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}