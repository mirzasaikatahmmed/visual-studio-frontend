"use client";

import {
  Plus, Trash2, Edit2, ExternalLink, Tag, Image as ImageIcon,
  Upload, Link as LinkIcon, Loader2, AlertCircle, Images, CheckCircle2, XCircle, GripVertical,
} from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import {
  fetchPortfolios, fetchCategories,
  createPortfolio, updatePortfolio, deletePortfolio,
  createCategory, deleteCategory, reorderCategories,
  uploadImage, resolveUrl,
  type Portfolio, type PortfolioCategory,
} from "@/lib/portfolioApi";

type ImageForm = {
  url: string;
  alt: string;
  categoryId: number | undefined;
  featured: boolean;
};

type BulkFile = {
  id: string;
  file: File;
  status: "pending" | "uploading" | "done" | "error";
  error?: string;
};

const blankImage = (): ImageForm => ({ url: "", alt: "", categoryId: undefined, featured: false });

function autoTitle(categoryName: string, serial: number) {
  return `${categoryName}_${serial}`;
}

export default function PortfoliosPage() {
  const [activeTab, setActiveTab] = useState<"images" | "categories">("images");
  const [images, setImages] = useState<Portfolio[]>([]);
  const [categories, setCategories] = useState<PortfolioCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterCategoryId, setFilterCategoryId] = useState<number | null>(null);

  const [pixiesetLink, setPixiesetLink] = useState("https://gallery.visualstudioslens.com/");
  const [pixiesetSaved, setPixiesetSaved] = useState(false);

  // Single image modal
  const [imageModal, setImageModal] = useState(false);
  const [editingImage, setEditingImage] = useState<Portfolio | null>(null);
  const [imageForm, setImageForm] = useState<ImageForm>(blankImage());
  const [imageInputMode, setImageInputMode] = useState<"url" | "upload">("url");
  const [isDragging, setIsDragging] = useState(false);
  const [imageSubmitting, setImageSubmitting] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  // Bulk upload modal
  const [bulkModal, setBulkModal] = useState(false);
  const [bulkCategoryId, setBulkCategoryId] = useState<number | undefined>(undefined);
  const [bulkFiles, setBulkFiles] = useState<BulkFile[]>([]);
  const [bulkUploading, setBulkUploading] = useState(false);
  const [bulkDragging, setBulkDragging] = useState(false);
  const bulkInputRef = useRef<HTMLInputElement>(null);

  // Category modal
  const [catModal, setCatModal] = useState(false);
  const [catForm, setCatForm] = useState({ name: "", slug: "" });
  const [catSubmitting, setCatSubmitting] = useState(false);
  const [catError, setCatError] = useState<string | null>(null);

  // Drag-and-drop state
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [imgs, cats] = await Promise.all([fetchPortfolios(), fetchCategories()]);
      const clientLogoCatId = cats.find(c => c.slug === "client-logos")?.id;
      setImages(imgs.filter(i => i.categoryId !== clientLogoCatId));
      setCategories(cats.filter(c => c.slug !== "client-logos"));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  // ── helpers ──────────────────────────────────────────────────────────────

  const categoryName = (id: number | undefined) =>
    categories.find(c => c.id === id)?.name ?? "Uncategorised";

  const nextSerial = (catId: number | undefined) =>
    images.filter(i => i.categoryId === catId).length + 1;

  // ── single image modal ────────────────────────────────────────────────────

  const openAddImage = () => {
    setEditingImage(null);
    setImageForm(blankImage());
    setImageInputMode("url");
    setPendingFile(null);
    setPreviewUrl("");
    setImageError(null);
    setImageModal(true);
  };

  const openEditImage = (img: Portfolio) => {
    setEditingImage(img);
    const fullUrl = resolveUrl(img.url);
    setImageForm({
      url: fullUrl,
      alt: img.alt ?? "",
      categoryId: img.categoryId ?? undefined,
      featured: img.featured,
    });
    setImageInputMode("url");
    setPendingFile(null);
    setPreviewUrl(fullUrl);
    setImageError(null);
    setImageModal(true);
  };

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setPendingFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setImageForm(f => ({ ...f, url: "" }));
  };

  const handleSaveImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageForm.categoryId) { setImageError("Please select a category."); return; }
    setImageSubmitting(true);
    setImageError(null);

    try {
      let url = imageForm.url;
      if (imageInputMode === "upload" && pendingFile) {
        url = await uploadImage(pendingFile);
      }
      if (!url) { setImageError("Please provide an image URL or upload a file."); return; }

      const payload = {
        url,
        alt: imageForm.alt,
        featured: imageForm.featured,
        categoryId: imageForm.categoryId,
        title: editingImage
          ? editingImage.title
          : autoTitle(categoryName(imageForm.categoryId), nextSerial(imageForm.categoryId)),
      };

      if (editingImage) {
        const updated = await updatePortfolio(editingImage.id, payload);
        setImages(prev => prev.map(i => i.id === updated.id ? updated : i));
      } else {
        const created = await createPortfolio(payload);
        setImages(prev => [created, ...prev]);
      }
      setImageModal(false);
    } catch (e) {
      setImageError(e instanceof Error ? e.message : "Failed to save image");
    } finally {
      setImageSubmitting(false);
    }
  };

  const handleDeleteImage = async (id: number) => {
    if (!window.confirm("Delete this image?")) return;
    try {
      await deletePortfolio(id);
      setImages(prev => prev.filter(i => i.id !== id));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Delete failed");
    }
  };

  // ── bulk upload ───────────────────────────────────────────────────────────

  const openBulkModal = () => {
    setBulkCategoryId(undefined);
    setBulkFiles([]);
    setBulkUploading(false);
    setBulkModal(true);
  };

  const addBulkFiles = (incoming: FileList) => {
    const valid = Array.from(incoming).filter(f => f.type.startsWith("image/"));
    setBulkFiles(prev => [
      ...prev,
      ...valid.map(f => ({ id: `${f.name}-${f.size}-${Date.now()}`, file: f, status: "pending" as const })),
    ]);
  };

  const removeBulkFile = (id: string) => {
    setBulkFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleBulkUpload = async () => {
    if (!bulkCategoryId) return;
    const catName = categoryName(bulkCategoryId);
    const baseSerial = nextSerial(bulkCategoryId);
    const pending = bulkFiles.filter(f => f.status === "pending");
    if (pending.length === 0) return;

    setBulkUploading(true);
    const created: Portfolio[] = [];

    for (let i = 0; i < pending.length; i++) {
      const item = pending[i];
      setBulkFiles(prev => prev.map(f => f.id === item.id ? { ...f, status: "uploading" } : f));
      try {
        const url = await uploadImage(item.file);
        const portfolio = await createPortfolio({
          title: autoTitle(catName, baseSerial + i),
          url,
          categoryId: bulkCategoryId,
          alt: "",
        });
        created.push(portfolio);
        setBulkFiles(prev => prev.map(f => f.id === item.id ? { ...f, status: "done" } : f));
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Upload failed";
        setBulkFiles(prev => prev.map(f => f.id === item.id ? { ...f, status: "error", error: msg } : f));
      }
    }

    if (created.length) setImages(prev => [...created, ...prev]);
    setBulkUploading(false);
  };

  // ── pixieset ─────────────────────────────────────────────────────────────

  const handleSavePixieset = () => {
    setPixiesetSaved(true);
    setTimeout(() => setPixiesetSaved(false), 2500);
  };

  // ── category ─────────────────────────────────────────────────────────────

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catForm.name) return;
    setCatSubmitting(true);
    setCatError(null);
    const slug = catForm.slug || catForm.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    try {
      const created = await createCategory({ name: catForm.name, slug, sortOrder: categories.length });
      setCategories(prev => [...prev, { ...created, count: 0 }]);
      setCatForm({ name: "", slug: "" });
      setCatModal(false);
    } catch (e) {
      setCatError(e instanceof Error ? e.message : "Failed to create category");
    } finally {
      setCatSubmitting(false);
    }
  };

  const handleDrop = async (dropIndex: number) => {
    if (dragIndex === null || dragIndex === dropIndex) {
      setDragIndex(null);
      setDragOverIndex(null);
      return;
    }
    const reordered = [...categories];
    const [moved] = reordered.splice(dragIndex, 1);
    reordered.splice(dropIndex, 0, moved);
    const withOrder = reordered.map((c, i) => ({ ...c, sortOrder: i }));
    setCategories(withOrder);
    setDragIndex(null);
    setDragOverIndex(null);
    try {
      await reorderCategories(withOrder.map(c => ({ id: c.id, sortOrder: c.sortOrder })));
    } catch {
      // revert on failure
      load();
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!window.confirm("Delete this category? Images in this category will be uncategorised.")) return;
    try {
      await deleteCategory(id);
      setCategories(prev => prev.filter(c => c.id !== id));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Delete failed");
    }
  };

  // ── render ────────────────────────────────────────────────────────────────

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-tight">Portfolio Management</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage categories, featured images, and gallery links.</p>
        </div>
        <div className="flex gap-2">
          {activeTab === "images" && (
            <button
              onClick={openBulkModal}
              disabled={loading}
              className="px-5 py-2.5 border border-border text-foreground font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:border-brand-400 hover:text-brand-400 transition-colors rounded-sm disabled:opacity-50"
            >
              <Images size={15} /> Bulk Upload
            </button>
          )}
          <button
            onClick={activeTab === "images" ? openAddImage : () => { setCatForm({ name: "", slug: "" }); setCatError(null); setCatModal(true); }}
            disabled={loading}
            className="px-5 py-2.5 bg-brand-400 text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-brand-500 transition-colors rounded-sm disabled:opacity-50"
          >
            <Plus size={15} /> {activeTab === "images" ? "Add Image" : "Add Category"}
          </button>
        </div>
      </div>

      {/* Pixieset Integration */}
      <div className="bg-background border border-border p-6 rounded-md mb-8">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-brand-400/10 rounded-md flex items-center justify-center shrink-0">
            <ExternalLink size={18} className="text-brand-400" />
          </div>
          <div className="flex-1">
            <h2 className="font-bold uppercase tracking-tight text-sm mb-1">Pixieset Gallery Link</h2>
            <p className="text-muted-foreground text-xs mb-4">This link directs clients to your full Pixieset delivery gallery.</p>
            <div className="flex gap-3">
              <input
                type="url"
                value={pixiesetLink}
                onChange={(e) => setPixiesetLink(e.target.value)}
                className="flex-1 bg-muted border border-border px-4 py-2.5 outline-none focus:border-brand-400 transition-colors text-sm rounded-sm"
                placeholder="https://gallery.visualstudioslens.com/"
              />
              <button
                onClick={handleSavePixieset}
                className="px-6 py-2.5 bg-foreground text-background font-bold tracking-widest uppercase text-xs hover:opacity-85 transition-opacity rounded-sm whitespace-nowrap"
              >
                {pixiesetSaved ? "Saved ✓" : "Update Link"}
              </button>
              <a href={pixiesetLink} target="_blank" rel="noopener noreferrer"
                className="px-4 py-2.5 border border-border hover:border-brand-400 hover:text-brand-400 transition-colors text-sm rounded-sm">
                <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="flex items-center gap-3 mb-5 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-sm text-red-500">
          <AlertCircle size={16} />
          <span className="text-sm font-medium">{error}</span>
          <button onClick={load} className="ml-auto text-xs font-bold uppercase tracking-widest underline">Retry</button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-border">
        {(["images", "categories"] as const).map(tab => (
          <button key={tab} onClick={() => { setActiveTab(tab); setFilterCategoryId(null); }}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors -mb-px border-b-2 ${
              activeTab === tab ? "border-brand-400 text-brand-400" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}>
            {tab === "images" ? "Featured Images" : "Categories"}
          </button>
        ))}
      </div>

      {/* Category filter — only shown on images tab */}
      {!loading && activeTab === "images" && categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          <button
            onClick={() => setFilterCategoryId(null)}
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-widest rounded-sm transition-colors ${filterCategoryId === null ? "bg-brand-400 text-white" : "bg-muted text-muted-foreground hover:text-foreground"}`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilterCategoryId(cat.id)}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-widest rounded-sm transition-colors ${filterCategoryId === cat.id ? "bg-brand-400 text-white" : "bg-muted text-muted-foreground hover:text-foreground"}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-24 text-muted-foreground">
          <Loader2 size={28} className="animate-spin mr-3" />
          <span className="text-sm font-medium">Loading…</span>
        </div>
      ) : (
        <>
          {/* Images Tab */}
          {activeTab === "images" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {(filterCategoryId ? images.filter(img => img.categoryId === filterCategoryId) : images).map((img) => (
                <div key={img.id} className="bg-background border border-border rounded-md overflow-hidden group">
                  <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url('${resolveUrl(img.url)}')` }} />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openEditImage(img)}
                        className="bg-black/60 p-2 text-white backdrop-blur-sm hover:bg-brand-400 transition-colors rounded-sm">
                        <Edit2 size={13} />
                      </button>
                      <button onClick={() => handleDeleteImage(img.id)}
                        className="bg-black/60 p-2 text-white backdrop-blur-sm hover:bg-red-500 transition-colors rounded-sm">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="font-bold text-sm uppercase tracking-tight truncate">{img.title}</div>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Tag size={11} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{img.category?.name ?? "Uncategorised"}</span>
                    </div>
                  </div>
                </div>
              ))}
              {(filterCategoryId ? images.filter(img => img.categoryId === filterCategoryId) : images).length === 0 && (
                <div className="col-span-3 text-center p-12 text-muted-foreground border border-dashed border-border rounded-md">
                  <ImageIcon size={32} className="mx-auto mb-3 opacity-30" />
                  <p className="text-sm font-medium">{filterCategoryId ? "No images in this category." : "No featured images yet."}</p>
                  <p className="text-xs mt-1">{filterCategoryId ? "Try selecting a different category." : "Add images to showcase on the portfolio page."}</p>
                </div>
              )}
            </div>
          )}

          {/* Categories Tab */}
          {activeTab === "categories" && (
            <div className="bg-background border border-border rounded-md overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-muted/50 text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border">
                    <th className="p-4 font-bold w-10"></th>
                    <th className="p-4 font-bold w-16 text-center">#</th>
                    <th className="p-4 font-bold">Category Name</th>
                    <th className="p-4 font-bold">Slug</th>
                    <th className="p-4 font-bold text-center">Photo Count</th>
                    <th className="p-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {categories.map((cat, index) => (
                    <tr
                      key={cat.id}
                      draggable
                      onDragStart={() => setDragIndex(index)}
                      onDragOver={(e) => { e.preventDefault(); setDragOverIndex(index); }}
                      onDrop={() => handleDrop(index)}
                      onDragEnd={() => { setDragIndex(null); setDragOverIndex(null); }}
                      className={`transition-colors ${
                        dragOverIndex === index && dragIndex !== index
                          ? "bg-brand-400/10 border-t-2 border-brand-400"
                          : dragIndex === index
                          ? "opacity-40"
                          : "hover:bg-muted/30"
                      }`}
                    >
                      <td className="pl-3 pr-1 py-4 text-muted-foreground cursor-grab active:cursor-grabbing">
                        <GripVertical size={16} />
                      </td>
                      <td className="p-4 text-center text-xs font-mono text-muted-foreground">{index + 1}</td>
                      <td className="p-4 font-semibold text-sm">{cat.name}</td>
                      <td className="p-4 text-xs text-muted-foreground font-mono">{cat.slug}</td>
                      <td className="p-4 text-center">
                        <span className="px-2 py-1 bg-brand-400/10 text-brand-500 text-xs font-bold rounded">{cat.count}</span>
                      </td>
                      <td className="p-4 text-right">
                        <button onClick={() => handleDeleteCategory(cat.id)}
                          className="p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {categories.length === 0 && (
                    <tr><td colSpan={6} className="p-8 text-center text-sm text-muted-foreground">No categories yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* ── Single Image Modal ─────────────────────────────────────────── */}
      <Modal isOpen={imageModal} onClose={() => setImageModal(false)} title={editingImage ? "Edit Image" : "Add Featured Image"}>
        <form onSubmit={handleSaveImage} className="space-y-5">
          {imageError && (
            <div className="flex items-center gap-2 px-3 py-2.5 bg-red-500/10 border border-red-500/30 rounded-sm text-red-500 text-sm">
              <AlertCircle size={14} /> {imageError}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Category *</label>
            <select
              required
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 appearance-none cursor-pointer rounded-sm text-sm"
              value={imageForm.categoryId ?? ""}
              onChange={(e) => setImageForm(f => ({ ...f, categoryId: e.target.value ? Number(e.target.value) : undefined }))}
            >
              <option value="">— Select a category —</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            {!editingImage && imageForm.categoryId && (
              <p className="text-[11px] text-muted-foreground">
                Title will be auto-set to <span className="font-mono font-bold text-foreground">{autoTitle(categoryName(imageForm.categoryId), nextSerial(imageForm.categoryId))}</span>
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Image *</label>
            <div className="flex gap-1 p-1 bg-muted rounded-sm w-fit">
              <button type="button" onClick={() => { setImageInputMode("url"); setPendingFile(null); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-widest rounded-sm transition-colors ${imageInputMode === "url" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                <LinkIcon size={11} /> Paste URL
              </button>
              <button type="button" onClick={() => setImageInputMode("upload")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-widest rounded-sm transition-colors ${imageInputMode === "upload" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                <Upload size={11} /> Upload File
              </button>
            </div>

            {imageInputMode === "url" ? (
              <input type="url" placeholder="https://images.unsplash.com/…"
                className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
                value={imageForm.url}
                onChange={(e) => { setImageForm(f => ({ ...f, url: e.target.value })); setPreviewUrl(e.target.value); }} />
            ) : (
              <div onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files?.[0]; if (f) handleFileSelect(f); }}
                className={`w-full border-2 border-dashed rounded-sm py-8 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${isDragging ? "border-brand-400 bg-brand-400/5" : "border-border hover:border-brand-400/50 hover:bg-muted/50"}`}>
                {pendingFile ? (
                  <p className="text-sm font-medium text-brand-400">{pendingFile.name}</p>
                ) : (
                  <>
                    <Upload size={22} className="text-muted-foreground" />
                    <p className="text-sm font-medium">Drop image here or <span className="text-brand-400">browse</span></p>
                    <p className="text-xs text-muted-foreground">PNG, JPG, WEBP — max 10 MB</p>
                  </>
                )}
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileSelect(f); }} />
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Alt Text (SEO)</label>
            <input type="text" placeholder="Describe the image for accessibility"
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
              value={imageForm.alt}
              onChange={(e) => setImageForm(f => ({ ...f, alt: e.target.value }))} />
          </div>

          <div className="flex items-center gap-3">
            <input id="featured" type="checkbox" checked={imageForm.featured}
              onChange={(e) => setImageForm(f => ({ ...f, featured: e.target.checked }))}
              className="w-4 h-4 accent-brand-400" />
            <label htmlFor="featured" className="text-sm font-medium cursor-pointer">Feature on homepage</label>
          </div>

          {previewUrl && (
            <div className="aspect-video bg-muted rounded overflow-hidden relative">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${previewUrl}')` }} />
            </div>
          )}

          <button type="submit" disabled={imageSubmitting}
            className="w-full bg-brand-400 text-white font-bold tracking-widest uppercase text-sm py-3.5 hover:bg-brand-500 transition-colors rounded-sm flex items-center justify-center gap-2 disabled:opacity-60">
            {imageSubmitting && <Loader2 size={15} className="animate-spin" />}
            {editingImage ? "Save Changes" : "Add Image"}
          </button>
        </form>
      </Modal>

      {/* ── Bulk Upload Modal ──────────────────────────────────────────── */}
      <Modal isOpen={bulkModal} onClose={() => !bulkUploading && setBulkModal(false)} title="Bulk Upload Images">
        <div className="space-y-5">
          {/* Category selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Category *</label>
            <select
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 appearance-none cursor-pointer rounded-sm text-sm"
              value={bulkCategoryId ?? ""}
              onChange={(e) => setBulkCategoryId(e.target.value ? Number(e.target.value) : undefined)}
              disabled={bulkUploading}
            >
              <option value="">— Select a category —</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            {bulkCategoryId && (
              <p className="text-[11px] text-muted-foreground">
                Images will be titled <span className="font-mono font-bold text-foreground">{categoryName(bulkCategoryId)}_{nextSerial(bulkCategoryId)}</span>, <span className="font-mono font-bold text-foreground">{categoryName(bulkCategoryId)}_{nextSerial(bulkCategoryId) + 1}</span>, …
              </p>
            )}
          </div>

          {/* Drop zone */}
          <div
            onClick={() => !bulkUploading && bulkInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setBulkDragging(true); }}
            onDragLeave={() => setBulkDragging(false)}
            onDrop={(e) => { e.preventDefault(); setBulkDragging(false); if (!bulkUploading && e.dataTransfer.files.length) addBulkFiles(e.dataTransfer.files); }}
            className={`w-full border-2 border-dashed rounded-sm py-8 flex flex-col items-center justify-center gap-2 transition-colors ${bulkUploading ? "opacity-40 cursor-not-allowed" : "cursor-pointer"} ${bulkDragging ? "border-brand-400 bg-brand-400/5" : "border-border hover:border-brand-400/50 hover:bg-muted/50"}`}
          >
            <Images size={26} className="text-muted-foreground" />
            <p className="text-sm font-medium">Drop images here or <span className="text-brand-400">browse</span></p>
            <p className="text-xs text-muted-foreground">Select multiple files — PNG, JPG, WEBP — max 10 MB each</p>
            <input ref={bulkInputRef} type="file" accept="image/*" multiple className="hidden"
              onChange={(e) => { if (e.target.files?.length) addBulkFiles(e.target.files); e.target.value = ""; }} />
          </div>

          {/* File queue */}
          {bulkFiles.length > 0 && (
            <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1">
              {bulkFiles.map((item) => (
                <div key={item.id} className="flex items-center gap-3 px-3 py-2 bg-muted/50 rounded-sm">
                  {item.status === "pending" && <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/40 shrink-0" />}
                  {item.status === "uploading" && <Loader2 size={16} className="animate-spin text-brand-400 shrink-0" />}
                  {item.status === "done" && <CheckCircle2 size={16} className="text-green-500 shrink-0" />}
                  {item.status === "error" && <XCircle size={16} className="text-red-500 shrink-0" />}
                  <span className="text-xs flex-1 truncate font-medium">{item.file.name}</span>
                  {item.status === "error" && <span className="text-[10px] text-red-500 shrink-0">{item.error}</span>}
                  {item.status === "pending" && !bulkUploading && (
                    <button onClick={() => removeBulkFile(item.id)} className="text-muted-foreground hover:text-red-500 transition-colors shrink-0">
                      <XCircle size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Summary */}
          {bulkFiles.length > 0 && (
            <p className="text-xs text-muted-foreground">
              {bulkFiles.filter(f => f.status === "done").length} done ·{" "}
              {bulkFiles.filter(f => f.status === "error").length} failed ·{" "}
              {bulkFiles.filter(f => f.status === "pending").length} pending
            </p>
          )}

          <button
            onClick={handleBulkUpload}
            disabled={bulkUploading || !bulkCategoryId || bulkFiles.filter(f => f.status === "pending").length === 0}
            className="w-full bg-brand-400 text-white font-bold tracking-widest uppercase text-sm py-3.5 hover:bg-brand-500 transition-colors rounded-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {bulkUploading ? <><Loader2 size={15} className="animate-spin" /> Uploading…</> : (
              <><Upload size={15} /> Upload {bulkFiles.filter(f => f.status === "pending").length} Image{bulkFiles.filter(f => f.status === "pending").length !== 1 ? "s" : ""}</>
            )}
          </button>
        </div>
      </Modal>

      {/* ── Category Modal ─────────────────────────────────────────────── */}
      <Modal isOpen={catModal} onClose={() => setCatModal(false)} title="Add Portfolio Category">
        <form onSubmit={handleAddCategory} className="space-y-5">
          {catError && (
            <div className="flex items-center gap-2 px-3 py-2.5 bg-red-500/10 border border-red-500/30 rounded-sm text-red-500 text-sm">
              <AlertCircle size={14} /> {catError}
            </div>
          )}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Category Name *</label>
            <input type="text" placeholder="e.g. Engagement Session"
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
              value={catForm.name}
              onChange={(e) => setCatForm(f => ({ ...f, name: e.target.value }))} required />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">URL Slug (optional)</label>
            <input type="text" placeholder="e.g. engagement-session"
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm font-mono"
              value={catForm.slug}
              onChange={(e) => setCatForm(f => ({ ...f, slug: e.target.value }))} />
            <p className="text-xs text-muted-foreground">Auto-generated from name if left blank. Lowercase, numbers, hyphens only.</p>
          </div>
          <button type="submit" disabled={catSubmitting}
            className="w-full bg-brand-400 text-white font-bold tracking-widest uppercase text-sm py-3.5 hover:bg-brand-500 transition-colors rounded-sm flex items-center justify-center gap-2 disabled:opacity-60">
            {catSubmitting && <Loader2 size={15} className="animate-spin" />}
            Add Category
          </button>
        </form>
      </Modal>
    </>
  );
}
