import AdminLayout from "@/components/layout/AdminLayout";
import { exportJSON } from "@/utils/dataExport";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import { deleteCaseStudy, importCaseStudies, resetCaseStudies} from "@/store/slices/caseStudiesSlice";
import Link from "next/link";
import { useToast } from "@/components/ui/ToastProvider";

export default function CaseStudiesAdmin() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s: RootState) => s.caseStudies.items);
  const toast = useToast();

  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      const text = await f.text();
      const parsed = JSON.parse(text);
      if (!Array.isArray(parsed)) throw new Error("JSON must be an array");
      dispatch(importCaseStudies(parsed));
      toast.success("Case studies imported (replaced current list).");
    } catch {
      toast.error("Import failed — invalid JSON.");
    }
  }

  function handleDelete(itemId: string) {
    const item = items.find((i) => i.id === itemId);
    if (!item) return;
    dispatch(deleteCaseStudy(itemId));
    // Show a simple toast message (works with most toast libraries)
    toast.info("Case study deleted.");
    // If you want an Undo button, you need a custom toast implementation.
    // Example for react-hot-toast (requires installation):
    // npm install react-hot-toast
    // import toast from "react-hot-toast";
    // toast((t) => (
    //   <span>
    //     Case study deleted.
    //     <button
    //       onClick={() => {
    //         dispatch(addCaseStudy(item));
    //         toast.success("Restored.");
    //         toast.dismiss(t.id);
    //       }}
    //       style={{ marginLeft: 8, color: 'blue', background: 'none', border: 'none', cursor: 'pointer' }}
    //     >
    //       Undo
    //     </button>
    //   </span>
    // ));
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-2 items-center mb-4">
          <button onClick={() => exportJSON("case-studies.json", items)} className="px-3 py-2 bg-blue-600 text-white rounded">Export</button>
          <input type="file" accept="application/json" onChange={handleImport} />
          <button onClick={() => { if (confirm("Reset to seed?")) { dispatch(resetCaseStudies()); toast.info("Reset to seed data."); } }} className="px-3 py-2 bg-gray-200 rounded">Reset</button>
          <Link href="/admin/case-studies/new" className="ml-auto text-blue-600">Add New</Link>
        </div>

        <div className="space-y-3">
          {items.map(i => (
            <div key={i.id} className="p-4 bg-white rounded shadow flex justify-between items-center">
              <div>
                <div className="font-semibold">{i.title}</div>
                <div className="text-xs text-gray-500">{i.tagline}</div>
              </div>
              <div className="flex gap-2">
                <Link href={`/projects/${i.slug}`} className="text-blue-600">View</Link>
                <button className="text-red-600" onClick={() => { if (confirm("Delete?")) handleDelete(i.id); }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}