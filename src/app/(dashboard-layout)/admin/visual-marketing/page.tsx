"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Plus, Trash2, Edit2, Upload, Link as LinkIcon } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import {
  fetchWorks,
  createWork,
  updateWork,
  deleteWork,
  uploadWorkImage,
  type VisualMarketingWork,
} from "@/lib/visualMarketingApi";
import {
  fetchPortfolios,
  fetchCategories,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  createCategory,
  uploadImage,
  type Portfolio,
  type PortfolioCategory,
} from "@/lib/portfolioApi";

const CLIENT_CAT_SLUG = "client-logos";
const CLIENT_CAT_NAME = "Client Logos";
const WORK_TAGS = ["Brand Photography", "Campaign", "Social Media", "Product Shoots", "Campaign Visuals", "Corporate", "Other"];

export default function VisualMarketingPage() {
  const [activeTab, setActiveTab] = useState<"clients" | "work">("work");

  // Work (visual-marketing API)
  const [works, setWorks] = useState<VisualMarketingWork[]>([]);
  const [worksLoading, setWorksLoading] = useState(true);
  const [worksError, setWorksError] = useState<string | null>(null);

  // Clients (portfolios with client-logos category)
  const [, setAllCategories] = useState<PortfolioCategory[]>([]);
  const [clientCatId, setClientCatId] = useState<number | null>(null);
  const [clients, setClients] = useState<Portfolio[]>([]);
  const [clientsLoading, setClientsLoading] = useState(true);
  const [clientsError, setClientsError] = useState<string | null>(null);

  // Work modal
  const [workModal, setWorkModal] = useState(false);
  const [editingWork, setEditingWork] = useState<VisualMarketingWork | null>(null);
  const [workForm, setWorkForm] = useState({ title: "", tag: WORK_TAGS[0], imageUrl: "" });
  const [workMode, setWorkMode] = useState<"url" | "upload">("url");
  const [isWorkDragging, setIsWorkDragging] = useState(false);
  const [workUploading, setWorkUploading] = useState(false);
  const [workSaving, setWorkSaving] = useState(false);
  const workFileRef = useRef<HTMLInputElement>(null);

  // Client modal
  const [clientModal, setClientModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Portfolio | null>(null);
  const [clientForm, setClientForm] = useState({ name: "", logoUrl: "" });
  const [logoMode, setLogoMode] = useState<"url" | "upload">("url");
  const [isDragging, setIsDragging] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);
  const [clientSaving, setClientSaving] = useState(false);
  const logoFileRef = useRef<HTMLInputElement>(null);

  const loadWorks = useCallback(async () => {
    setWorksLoading(true);
    setWorksError(null);
    try {
      setWorks(await fetchWorks());
    } catch (e) {
      setWorksError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setWorksLoading(false);
    }
  }, []);

  const loadClients = useCallback(async () => {
    setClientsLoading(true);
    setClientsError(null);
    try {
      let cats = await fetchCategories();
      let clientCat = cats.find(c => c.slug === CLIENT_CAT_SLUG);
      if (!clientCat) {
        clientCat = await createCategory({ name: CLIENT_CAT_NAME, slug: CLIENT_CAT_SLUG });
        cats = [...cats, clientCat];
      }
      setAllCategories(cats);
      setClientCatId(clientCat.id);
      const all = await fetchPortfolios();
      setClients(all.filter(p => p.categoryId === clientCat!.id));
    } catch (e) {
      setClientsError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setClientsLoading(false);
    }
  }, []);

  useEffect(() => { void loadWorks(); }, [loadWorks]);
  useEffect(() => { void loadClients(); }, [loadClients]);

  // Work CRUD
  const openAddWork = () => {
    setEditingWork(null);
    setWorkForm({ title: "", tag: WORK_TAGS[0], imageUrl: "" });
    setWorkMode("url");
    setWorkModal(true);
  };
  const openEditWork = (w: VisualMarketingWork) => {
    setEditingWork(w);
    setWorkForm({ title: w.title, tag: w.tag ?? WORK_TAGS[0], imageUrl: w.imageUrl });
    setWorkMode("url");
    setWorkModal(true);
  };
  const handleWorkUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setWorkUploading(true);
    try {
      const url = await uploadWorkImage(file);
      setWorkForm(f => ({ ...f, imageUrl: url }));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setWorkUploading(false);
    }
  };
  const handleSaveWork = async (e: React.FormEvent) => {
    e.preventDefault();
    setWorkSaving(true);
    try {
      if (editingWork) {
        const updated = await updateWork(editingWork.id, {
          title: workForm.title,
          tag: workForm.tag,
          imageUrl: workForm.imageUrl,
        });
        setWorks(prev => prev.map(w => w.id === editingWork.id ? updated : w));
      } else {
        const created = await createWork({
          title: workForm.title,
          tag: workForm.tag,
          imageUrl: workForm.imageUrl,
        });
        setWorks(prev => [created, ...prev]);
      }
      setWorkModal(false);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setWorkSaving(false);
    }
  };
  const handleDeleteWork = async (id: number) => {
    if (!window.confirm("Delete this work item?")) return;
    try {
      await deleteWork(id);
      setWorks(prev => prev.filter(w => w.id !== id));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to delete");
    }
  };

  // Client CRUD
  const openAddClient = () => {
    setEditingClient(null);
    setClientForm({ name: "", logoUrl: "" });
    setLogoMode("url");
    setClientModal(true);
  };
  const openEditClient = (c: Portfolio) => {
    setEditingClient(c);
    setClientForm({ name: c.title, logoUrl: c.url });
    setLogoMode("url");
    setClientModal(true);
  };
  const handleLogoUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setLogoUploading(true);
    try {
      const url = await uploadImage(file);
      setClientForm(f => ({ ...f, logoUrl: url }));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setLogoUploading(false);
    }
  };
  const handleSaveClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientCatId) return;
    setClientSaving(true);
    try {
      if (editingClient) {
        const updated = await updatePortfolio(editingClient.id, {
          title: clientForm.name,
          url: clientForm.logoUrl,
          categoryId: clientCatId,
        });
        setClients(prev => prev.map(c => c.id === editingClient.id ? updated : c));
      } else {
        const created = await createPortfolio({
          title: clientForm.name,
          url: clientForm.logoUrl,
          categoryId: clientCatId,
        });
        setClients(prev => [created, ...prev]);
      }
      setClientModal(false);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setClientSaving(false);
    }
  };
  const handleDeleteClient = async (id: number) => {
    if (!window.confirm("Delete this client logo?")) return;
    try {
      await deletePortfolio(id);
      setClients(prev => prev.filter(c => c.id !== id));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to delete");
    }
  };

  const loading = activeTab === "work" ? worksLoading : clientsLoading;
  const error = activeTab === "work" ? worksError : clientsError;
  const retry = activeTab === "work" ? loadWorks : loadClients;

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-tight">Visual Marketing</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage past clients and marketing portfolio.</p>
        </div>
        <button
          onClick={activeTab === "clients" ? openAddClient : openAddWork}
          className="px-5 py-2.5 bg-brand-400 text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-brand-500 transition-colors rounded-sm"
        >
          <Plus size={15} /> {activeTab === "clients" ? "Add Client" : "Add Work"}
        </button>
      </div>

      <div className="flex gap-1 mb-6 border-b border-border">
        {(["work", "clients"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors -mb-px border-b-2 ${
              activeTab === tab
                ? "border-brand-400 text-brand-400"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "clients" ? "We've Worked With" : "Our Work"}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">Loading...</div>
      ) : error ? (
        <div className="flex items-center justify-center h-64 text-red-500 text-sm">
          {error}
          <button onClick={() => void retry()} className="ml-2 underline">Retry</button>
        </div>
      ) : (
        <>
          {activeTab === "work" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {works.map((w) => (
                <div key={w.id} className="bg-background border border-border rounded-md overflow-hidden group">
                  <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url('${w.imageUrl}')` }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openEditWork(w)}
                        className="bg-black/60 p-2 text-white backdrop-blur-sm hover:bg-brand-400 rounded-sm"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        onClick={() => handleDeleteWork(w.id)}
                        className="bg-black/60 p-2 text-white backdrop-blur-sm hover:bg-red-500 rounded-sm"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="font-bold text-sm uppercase tracking-tight truncate">{w.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">{w.tag ?? "—"}</div>
                  </div>
                </div>
              ))}
              {works.length === 0 && (
                <div className="col-span-full flex items-center justify-center h-32 text-muted-foreground text-sm border border-dashed border-border rounded-md">
                  No work items added yet.
                </div>
              )}
            </div>
          )}

          {activeTab === "clients" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {clients.map((client) => (
                <div
                  key={client.id}
                  className="bg-background border border-border rounded-md p-4 group relative flex flex-col items-center justify-center aspect-square"
                >
                  <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button
                      onClick={() => openEditClient(client)}
                      className="bg-muted p-1.5 text-muted-foreground hover:text-foreground hover:bg-brand-400/20 rounded"
                    >
                      <Edit2 size={12} />
                    </button>
                    <button
                      onClick={() => handleDeleteClient(client.id)}
                      className="bg-muted p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={client.url} alt={client.title} className="max-w-[70%] max-h-[50%] object-contain mb-3" />
                  <div className="text-xs font-bold uppercase tracking-widest text-center text-muted-foreground">
                    {client.title}
                  </div>
                </div>
              ))}
              {clients.length === 0 && (
                <div className="col-span-full flex items-center justify-center h-32 text-muted-foreground text-sm border border-dashed border-border rounded-md">
                  No clients added yet.
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Work Modal */}
      <Modal isOpen={workModal} onClose={() => setWorkModal(false)} title={editingWork ? "Edit Work Item" : "Add Work Item"}>
        <form onSubmit={handleSaveWork} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Title *</label>
            <input
              type="text"
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
              value={workForm.title}
              onChange={(e) => setWorkForm({ ...workForm, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Tag / Category</label>
            <select
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 rounded-sm text-sm"
              value={workForm.tag}
              onChange={(e) => setWorkForm({ ...workForm, tag: e.target.value })}
            >
              {WORK_TAGS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Image *</label>
            <div className="flex gap-1 p-1 bg-muted rounded-sm w-fit">
              <button
                type="button"
                onClick={() => setWorkMode("url")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-widest rounded-sm transition-colors ${workMode === "url" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                <LinkIcon size={11} /> Paste URL
              </button>
              <button
                type="button"
                onClick={() => setWorkMode("upload")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-widest rounded-sm transition-colors ${workMode === "upload" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Upload size={11} /> Upload File
              </button>
            </div>

            {workMode === "url" ? (
              <input
                type="url"
                placeholder="https://..."
                className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
                value={workForm.imageUrl}
                onChange={(e) => setWorkForm({ ...workForm, imageUrl: e.target.value })}
                required={!workForm.imageUrl}
              />
            ) : (
              <div
                onClick={() => workFileRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsWorkDragging(true); }}
                onDragLeave={() => setIsWorkDragging(false)}
                onDrop={(e) => { e.preventDefault(); setIsWorkDragging(false); const f = e.dataTransfer.files?.[0]; if (f) void handleWorkUpload(f); }}
                className={`w-full border-2 border-dashed rounded-sm py-8 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${isWorkDragging ? "border-brand-400 bg-brand-400/5" : "border-border hover:border-brand-400/50 hover:bg-muted/50"}`}
              >
                <Upload size={22} className="text-muted-foreground" />
                {workUploading ? (
                  <p className="text-sm font-medium text-brand-400">Uploading...</p>
                ) : (
                  <>
                    <p className="text-sm font-medium">Drop image here or <span className="text-brand-400">browse</span></p>
                    <p className="text-xs text-muted-foreground">PNG, JPG, WEBP supported</p>
                  </>
                )}
                <input
                  ref={workFileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) void handleWorkUpload(f); }}
                />
              </div>
            )}

            {workForm.imageUrl && (
              <div className="aspect-video bg-muted rounded-sm overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={workForm.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setWorkForm(f => ({ ...f, imageUrl: "" }))}
                  className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded hover:bg-red-500 transition-colors"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={workSaving || workUploading}
            className="w-full bg-brand-400 text-white font-bold tracking-widest uppercase text-sm py-3.5 hover:bg-brand-500 rounded-sm disabled:opacity-60"
          >
            {workSaving ? "Saving..." : "Save Work Item"}
          </button>
        </form>
      </Modal>

      {/* Client Modal */}
      <Modal isOpen={clientModal} onClose={() => setClientModal(false)} title={editingClient ? "Edit Client" : "Add Client"}>
        <form onSubmit={handleSaveClient} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Client Name *</label>
            <input
              type="text"
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
              value={clientForm.name}
              onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Logo *</label>
            <div className="flex gap-1 p-1 bg-muted rounded-sm w-fit">
              <button
                type="button"
                onClick={() => setLogoMode("url")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-widest rounded-sm transition-colors ${logoMode === "url" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                <LinkIcon size={11} /> Paste URL
              </button>
              <button
                type="button"
                onClick={() => setLogoMode("upload")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-widest rounded-sm transition-colors ${logoMode === "upload" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Upload size={11} /> Upload File
              </button>
            </div>

            {logoMode === "url" ? (
              <input
                type="url"
                placeholder="https://cdn.example.com/logo.png"
                className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
                value={clientForm.logoUrl}
                onChange={(e) => setClientForm({ ...clientForm, logoUrl: e.target.value })}
                required={!clientForm.logoUrl}
              />
            ) : (
              <div
                onClick={() => logoFileRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files?.[0]; if (f) void handleLogoUpload(f); }}
                className={`w-full border-2 border-dashed rounded-sm py-8 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${isDragging ? "border-brand-400 bg-brand-400/5" : "border-border hover:border-brand-400/50 hover:bg-muted/50"}`}
              >
                <Upload size={22} className="text-muted-foreground" />
                {logoUploading ? (
                  <p className="text-sm font-medium text-brand-400">Uploading...</p>
                ) : (
                  <>
                    <p className="text-sm font-medium">Drop logo here or <span className="text-brand-400">browse</span></p>
                    <p className="text-xs text-muted-foreground">PNG, JPG, SVG, WEBP supported</p>
                  </>
                )}
                <input
                  ref={logoFileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) void handleLogoUpload(f); }}
                />
              </div>
            )}

            {clientForm.logoUrl && (
              <div className="h-28 bg-muted flex items-center justify-center p-4 border border-border rounded-sm relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={clientForm.logoUrl} alt="Logo preview" className="max-h-full max-w-full object-contain" />
                <button
                  type="button"
                  onClick={() => setClientForm(f => ({ ...f, logoUrl: "" }))}
                  className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded hover:bg-red-500 transition-colors"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={clientSaving || logoUploading}
            className="w-full bg-brand-400 text-white font-bold tracking-widest uppercase text-sm py-3.5 hover:bg-brand-500 rounded-sm disabled:opacity-60"
          >
            {clientSaving ? "Saving..." : "Save Client"}
          </button>
        </form>
      </Modal>
    </>
  );
}
