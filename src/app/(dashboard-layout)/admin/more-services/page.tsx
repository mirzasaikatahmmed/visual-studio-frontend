"use client";

import { Plus, Trash2, Edit2, Link as LinkIcon, Upload } from "lucide-react";
import { useState, useRef } from "react";
import { Modal } from "@/components/ui/modal";

type Service = {
  id: number;
  title: string;
  url: string;
  imageUrl: string;
};

const initialServices: Service[] = [
  { id: 1, title: "Photo Booth Rental", url: "/services/photo-booth", imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400" },
  { id: 2, title: "Drone Videography", url: "/services/drone", imageUrl: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=400" },
  { id: 3, title: "Album Printing", url: "/store", imageUrl: "https://images.unsplash.com/photo-1544473244-f6895e69ce8d?q=80&w=400" },
];

const blankService = (): Omit<Service, "id"> => ({ title: "", url: "", imageUrl: "" });

export default function MoreServicesPage() {
  const [services, setServices] = useState(initialServices);
  const [modal, setModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [form, setForm] = useState(blankService());
  const [imgMode, setImgMode] = useState<"url" | "upload">("url");
  const [isDragging, setIsDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileRead = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setForm(f => ({ ...f, imageUrl: e.target?.result as string }));
    reader.readAsDataURL(file);
  };

  const openAdd = () => {
    setEditingService(null);
    setForm(blankService());
    setImgMode("url");
    setModal(true);
  };

  const openEdit = (s: Service) => {
    setEditingService(s);
    setForm({ title: s.title, url: s.url, imageUrl: s.imageUrl });
    setImgMode(s.imageUrl.startsWith("data:") ? "upload" : "url");
    setModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.imageUrl) return;
    if (editingService) {
      setServices(services.map(s => s.id === editingService.id ? { ...form, id: editingService.id } : s));
    } else {
      setServices([{ ...form, id: Date.now() }, ...services]);
    }
    setModal(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Delete this service?")) setServices(services.filter(s => s.id !== id));
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-tight">More Services</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage additional services offered to clients.</p>
        </div>
        <button
          onClick={openAdd}
          className="px-5 py-2.5 bg-brand-400 text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-brand-500 transition-colors rounded-sm"
        >
          <Plus size={15} /> Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((service) => (
          <div key={service.id} className="bg-background border border-border rounded-md overflow-hidden group">
            <div className="aspect-[4/3] bg-muted relative overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${service.imageUrl}')` }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(service)} className="bg-black/60 p-2 text-white backdrop-blur-sm hover:bg-brand-400 rounded-sm">
                  <Edit2 size={13} />
                </button>
                <button onClick={() => handleDelete(service.id)} className="bg-black/60 p-2 text-white backdrop-blur-sm hover:bg-red-500 rounded-sm">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="font-bold text-sm uppercase tracking-tight">{service.title}</div>
              {service.url && (
                <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                  <LinkIcon size={12} />
                  <span className="truncate">{service.url}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editingService ? "Edit Service" : "Add Service"}>
        <form onSubmit={handleSave} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Service Title *</label>
            <input
              type="text"
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Image *</label>
            <div className="flex gap-1 p-1 bg-muted rounded-sm w-fit">
              <button
                type="button"
                onClick={() => setImgMode("url")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-widest rounded-sm transition-colors ${imgMode === "url" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                <LinkIcon size={11} /> Paste URL
              </button>
              <button
                type="button"
                onClick={() => setImgMode("upload")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-widest rounded-sm transition-colors ${imgMode === "upload" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Upload size={11} /> Upload File
              </button>
            </div>

            {imgMode === "url" ? (
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
                value={form.imageUrl.startsWith("data:") ? "" : form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                required={imgMode === "url" && !form.imageUrl}
              />
            ) : (
              <div
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files?.[0]; if (f) handleFileRead(f); }}
                className={`w-full border-2 border-dashed rounded-sm py-8 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${isDragging ? "border-brand-400 bg-brand-400/5" : "border-border hover:border-brand-400/50 hover:bg-muted/50"}`}
              >
                <Upload size={22} className="text-muted-foreground" />
                <p className="text-sm font-medium">Drop image here or <span className="text-brand-400">browse</span></p>
                <p className="text-xs text-muted-foreground">PNG, JPG, WEBP supported</p>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileRead(f); }} />
              </div>
            )}

            {form.imageUrl && (
              <div className="aspect-video bg-muted rounded-sm overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setForm(f => ({ ...f, imageUrl: "" }))}
                  className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded hover:bg-red-500 transition-colors"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Link URL (optional)</label>
            <input
              type="text"
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm font-mono"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
            />
          </div>

          <button type="submit" className="w-full bg-brand-400 text-white font-bold tracking-widest uppercase text-sm py-3.5 hover:bg-brand-500 rounded-sm">
            Save Service
          </button>
        </form>
      </Modal>
    </>
  );
}
