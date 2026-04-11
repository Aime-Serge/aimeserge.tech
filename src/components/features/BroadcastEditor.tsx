"use client";

import { useState } from "react";
import { Radio, Save, X, Tag, FileEdit, Cpu } from "lucide-react";
import { upsertContent } from "@/actions/admin-actions";
import { toast } from "react-hot-toast";

export default function BroadcastEditor({ initialData, onClose }: { initialData?: any; onClose: () => void }) {
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState({
    id: initialData?.id || undefined,
    title: initialData?.title || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    category: initialData?.category || "Engineering",
    tags: initialData?.tags || [],
    read_time: initialData?.read_time || "5 min read",
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    const result = await upsertContent('broadcasts', formData, '/blog');
    if (result.success) {
      toast.success("Broadcast live on all nodes.");
      onClose();
    }
    setIsPending(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
      <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-cyan-600/20 flex items-center justify-center border border-cyan-500/30">
            <Radio className="h-5 w-5 text-cyan-400" />
          </div>
          <h2 className="text-xl font-bold text-white uppercase tracking-tighter">Broadcast_Transmitter</h2>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors"><X className="h-5 w-5 text-slate-500" /></button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-[1fr_200px]">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Transmission_Title</label>
            <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Category</label>
            <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as any})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500 outline-none">
              <option value="Security">Security</option>
              <option value="Cloud">Cloud</option>
              <option value="AI">AI</option>
              <option value="Engineering">Engineering</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Signal_Excerpt</label>
          <input required value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500 outline-none" />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2"><FileEdit className="h-3 w-3" /> Full_Payload (Markdown)</label>
          <textarea required value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-400 font-mono focus:border-cyan-500 outline-none min-h-[250px]" />
        </div>

        <div className="flex justify-end gap-4 pt-6 border-t border-slate-800">
          <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:text-white transition-colors">ABORT</button>
          <button type="submit" disabled={isPending} className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-2.5 rounded-xl font-bold transition-all shadow-lg flex items-center gap-3 text-xs">
            {isPending ? <Cpu className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            TRANSMIT_BROADCAST
          </button>
        </div>
      </form>
    </div>
  );
}
