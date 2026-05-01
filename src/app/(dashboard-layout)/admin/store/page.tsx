"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Plus, Trash2, Edit2, Link as LinkIcon, MessageCircle, Upload } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  fetchSettings,
  updateSettings,
  uploadCategoryImage,
  type StoreCategory,
} from "@/lib/storeApi";

const blankForm = (nextOrder = 1) => ({
  name: "", image: "", sortOrder: nextOrder, whatsappMessage: "",
});

export default function StoreAdminPage() {
  const [categories, setCategories] = useState<StoreCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [categoryModal, setCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<StoreCategory | null>(null);
  const [form, setForm] = useState(blankForm());
  const [saving, setSaving] = useState(false);
  const [imgMode, setImgMode] = useState<"url" | "upload">("url");
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [editingWhatsapp, setEditingWhatsapp] = useState(false);
  const [whatsappDraft, setWhatsappDraft] = useState("");
  const [savingWhatsapp, setSavingWhatsapp] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [cats, settings] = await Promise.all([fetchCategories(), fetchSettings()]);
      setCategories(cats);
      setWhatsappNumber(settings.whatsappNumber);
      setWhatsappDraft(settings.whatsappNumber);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setUploading(true);
    try {
      const url = await uploadCategoryImage(file);
      setForm(f => ({ ...f, image: url }));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const openAdd = () => {
    setEditingCategory(null);
    const maxOrder = categories.length ? Math.max(...categories.map(c => c.sortOrder)) : 0;
    setForm(blankForm(maxOrder + 1));
    setImgMode("url");
    setCategoryModal(true);
  };

  const openEdit = (c: StoreCategory) => {
    setEditingCategory(c);
    setForm({ name: c.name, image: c.image, sortOrder: c.sortOrder, whatsappMessage: c.whatsappMessage });
    setImgMode("url");
    setCategoryModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        image: form.image,
        sortOrder: form.sortOrder,
        whatsappMessage: form.whatsappMessage || undefined,
      };
      if (editingCategory) {
        const updated = await updateCategory(editingCategory.id, payload);
        setCategories(prev => prev.map(c => c.id === editingCategory.id ? updated : c));
      } else {
        const created = await createCategory(payload);
        setCategories(prev => [...prev, created]);
      }
      setCategoryModal(false);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Remove this category from the storefront?")) return;
    try {
      await deleteCategory(id);
      setCategories(prev => prev.filter(c => c.id !== id));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to delete");
    }
  };

  const handleSaveWhatsapp = async () => {
    setSavingWhatsapp(true);
    try {
      const result = await updateSettings(whatsappDraft);
      setWhatsappNumber(result.whatsappNumber);
      setEditingWhatsapp(false);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSavingWhatsapp(false);
    }
  };

  const sortedCategories = [...categories].sort((a, b) => a.sortOrder - b.sortOrder);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-500 text-sm">
        {error}
        <button onClick={() => void load()} className="ml-2 underline">Retry</button>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-tight">Print Store</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage the storefront categories displayed on the public store page.</p>
        </div>
        <button
          onClick={openAdd}
          className="px-5 py-2.5 bg-brand-400 text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-brand-500 transition-colors rounded-sm"
        >
          <Plus size={15} /> Add Category
        </button>
      </div>

      {/* WhatsApp Config */}
      <div className="bg-background border border-border rounded-md p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MessageCircle size={16} className="text-green-500" />
            <span className="text-xs font-bold uppercase tracking-widest">WhatsApp Inquiry Number</span>
          </div>
          {!editingWhatsapp && (
            <button
              onClick={() => { setWhatsappDraft(whatsappNumber); setEditingWhatsapp(true); }}
              className="p-1.5 text-muted-foreground hover:text-brand-400 hover:bg-brand-400/10 rounded transition-colors"
            >
              <Edit2 size={14} />
            </button>
          )}
        </div>
        {editingWhatsapp ? (
          <div className="flex gap-3 items-center">
            <input
              type="text"
              className="flex-1 bg-muted border border-border px-4 py-2.5 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm font-mono"
              value={whatsappDraft}
              onChange={(e) => setWhatsappDraft(e.target.value)}
              placeholder="e.g. 16175551234"
            />
            <button
              onClick={() => void handleSaveWhatsapp()}
              disabled={savingWhatsapp}
              className="px-4 py-2.5 bg-brand-400 text-white font-bold uppercase tracking-widest text-xs hover:bg-brand-500 transition-colors rounded-sm disabled:opacity-60"
            >
              {savingWhatsapp ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setEditingWhatsapp(false)}
              disabled={savingWhatsapp}
              className="px-4 py-2.5 bg-muted border border-border font-bold uppercase tracking-widest text-xs hover:border-brand-400 transition-colors rounded-sm disabled:opacity-60"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
            <span className="text-green-500">+</span>{whatsappNumber || <span className="italic">not set</span>}
            <span className="text-xs text-muted-foreground ml-2">— customers tap each category card to open WhatsApp with a pre-filled inquiry message.</span>
          </div>
        )}
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {sortedCategories.map((cat) => (
          <div key={cat.id} className="bg-background border border-border rounded-md overflow-hidden group">
            <div className="aspect-[4/3] bg-muted relative overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${cat.image}')` }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
              <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-sm font-mono backdrop-blur-sm">
                #{cat.sortOrder}
              </div>
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openEdit(cat)}
                  className="bg-black/60 p-2 text-white backdrop-blur-sm hover:bg-brand-400 rounded-sm"
                >
                  <Edit2 size={13} />
                </button>
                <button
                  onClick={() => void handleDelete(cat.id)}
                  className="bg-black/60 p-2 text-white backdrop-blur-sm hover:bg-red-500 rounded-sm"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
            <div className="p-4 space-y-2">
              <div className="font-bold text-sm uppercase tracking-tight">{cat.name}</div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground min-w-0">
                <LinkIcon size={11} className="shrink-0" />
                <span className="truncate">{cat.image}</span>
              </div>
              {cat.whatsappMessage && (
                <div className="flex items-start gap-1.5 text-xs text-muted-foreground min-w-0">
                  <MessageCircle size={11} className="shrink-0 mt-0.5 text-green-500" />
                  <span className="line-clamp-2">{cat.whatsappMessage}</span>
                </div>
              )}
            </div>
          </div>
        ))}
        {categories.length === 0 && (
          <div className="col-span-full flex items-center justify-center h-32 text-muted-foreground text-sm border border-dashed border-border rounded-md">
            No storefront categories yet.
          </div>
        )}
      </div>

      {/* Category Modal */}
      <Modal isOpen={categoryModal} onClose={() => setCategoryModal(false)} title={editingCategory ? "Edit Category" : "Add Category"}>
        <form onSubmit={(e) => void handleSave(e)} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Category Name *</label>
            <input
              type="text"
              placeholder="e.g. Albums & Books"
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
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
                type="text"
                placeholder="/images/album.png or https://..."
                className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm font-mono"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                required={!form.image}
              />
            ) : (
              <div
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files?.[0]; if (f) void handleImageUpload(f); }}
                className={`w-full border-2 border-dashed rounded-sm py-8 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${isDragging ? "border-brand-400 bg-brand-400/5" : "border-border hover:border-brand-400/50 hover:bg-muted/50"}`}
              >
                <Upload size={22} className="text-muted-foreground" />
                {uploading ? (
                  <p className="text-sm font-medium text-brand-400">Uploading...</p>
                ) : (
                  <>
                    <p className="text-sm font-medium">Drop image here or <span className="text-brand-400">browse</span></p>
                    <p className="text-xs text-muted-foreground">PNG, JPG, WEBP supported</p>
                  </>
                )}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) void handleImageUpload(f); }}
                />
              </div>
            )}

            {form.image && (
              <div className="aspect-video bg-muted rounded-sm overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setForm(f => ({ ...f, image: "" }))}
                  className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded hover:bg-red-500 transition-colors"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Sort Order</label>
            <input
              type="number"
              min={1}
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm font-mono"
              value={form.sortOrder}
              onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value, 10) || 1 })}
            />
            <p className="text-xs text-muted-foreground">Lower numbers appear first on the store page.</p>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <span className="flex items-center gap-1.5"><MessageCircle size={11} className="text-green-500" /> WhatsApp Message</span>
            </label>
            <textarea
              rows={3}
              placeholder={`Hi, I'm interested in inquiring about ${form.name || "this product"} from your store.`}
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors resize-none rounded-sm text-sm"
              value={form.whatsappMessage}
              onChange={(e) => setForm({ ...form, whatsappMessage: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">Sent when a customer taps this card. Leave blank to use the default message.</p>
          </div>
          <button
            type="submit"
            disabled={saving || uploading}
            className="w-full bg-brand-400 text-white font-bold tracking-widest uppercase text-sm py-3.5 hover:bg-brand-500 transition-colors rounded-sm disabled:opacity-60"
          >
            {saving ? "Saving..." : editingCategory ? "Save Changes" : "Add Category"}
          </button>
        </form>
      </Modal>
    </>
  );
}
