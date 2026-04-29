"use client";

import {
  Upload, Search, Grid3X3, List, X, Copy, Check, Trash2,
  Image as ImageIcon, Film, FileText, Music, ChevronDown,
  Info, CalendarDays, HardDrive, Maximize2,
  Plus, Filter, Loader2, AlertCircle,
} from "lucide-react";
import Image from "next/image";
import { useState, useRef, useCallback, useEffect } from "react";
import {
  fetchMedia, uploadMedia, updateMedia, deleteMedia, bulkDeleteMedia,
  formatSize, resolveUrl,
  type MediaItem, type MediaType, type UpdatePayload,
} from "@/lib/mediaApi";

type ViewMode = "grid" | "list";
type FilterType = "all" | MediaType;

const typeIcon: Record<MediaType, React.ReactNode> = {
  image: <ImageIcon size={28} className="text-brand-400" />,
  video: <Film size={28} className="text-blue-500" />,
  document: <FileText size={28} className="text-green-500" />,
  audio: <Music size={28} className="text-purple-500" />,
};

const typeBadge: Record<MediaType, string> = {
  image: "bg-brand-400/15 text-brand-500",
  video: "bg-blue-500/15 text-blue-500",
  document: "bg-green-500/15 text-green-500",
  audio: "bg-purple-500/15 text-purple-500",
};

const typeLabel: Record<MediaType, string> = {
  image: "Image",
  video: "Video",
  document: "Document",
  audio: "Audio",
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });
}

export default function MediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const [selected, setSelected] = useState<MediaItem | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [search, setSearch] = useState("");
  const [bulkMode, setBulkMode] = useState(false);
  const [bulkSelected, setBulkSelected] = useState<Set<number>>(new Set());
  const [copied, setCopied] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [editForm, setEditForm] = useState<UpdatePayload | null>(null);
  const [detailSaved, setDetailSaved] = useState(false);
  const [sortBy, setSortBy] = useState<"date" | "name" | "size">("date");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMedia();
      setMedia(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load media");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = media
    .filter(m => filterType === "all" || m.type === filterType)
    .filter(m => !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "size") return b.size - a.size;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const counts = {
    all: media.length,
    image: media.filter(m => m.type === "image").length,
    video: media.filter(m => m.type === "video").length,
    document: media.filter(m => m.type === "document").length,
    audio: media.filter(m => m.type === "audio").length,
  };

  const handleSelect = (item: MediaItem) => {
    if (bulkMode) {
      setBulkSelected(prev => {
        const next = new Set(prev);
        if (next.has(item.id)) { next.delete(item.id); } else { next.add(item.id); }
        return next;
      });
      return;
    }
    if (selected?.id === item.id) {
      setSelected(null);
      setEditForm(null);
    } else {
      setSelected(item);
      setEditForm({ title: item.title, altText: item.altText, caption: item.caption });
    }
  };

  const handleCopyUrl = () => {
    if (selected?.url) {
      navigator.clipboard.writeText(resolveUrl(selected.url));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDeleteSelected = async () => {
    if (!selected) return;
    if (!window.confirm(`Delete "${selected.name}"?`)) return;
    try {
      await deleteMedia(selected.id);
      setMedia(prev => prev.filter(m => m.id !== selected.id));
      setSelected(null);
      setEditForm(null);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Delete failed");
    }
  };

  const handleBulkDelete = async () => {
    if (bulkSelected.size === 0) return;
    if (!window.confirm(`Delete ${bulkSelected.size} item${bulkSelected.size > 1 ? "s" : ""}?`)) return;
    try {
      await bulkDeleteMedia([...bulkSelected]);
      setMedia(prev => prev.filter(m => !bulkSelected.has(m.id)));
      setBulkSelected(new Set());
      setBulkMode(false);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Bulk delete failed");
    }
  };

  const handleSaveDetail = async () => {
    if (!selected || !editForm) return;
    try {
      const updated = await updateMedia(selected.id, editForm);
      setMedia(prev => prev.map(m => m.id === updated.id ? updated : m));
      setSelected(updated);
      setDetailSaved(true);
      setTimeout(() => setDetailSaved(false), 2000);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Update failed");
    }
  };

  const handleFileUpload = useCallback(async (files: FileList) => {
    setUploading(true);
    setUploadOpen(false);
    const newItems: MediaItem[] = [];
    for (const file of Array.from(files)) {
      try {
        let dimensions: string | undefined;
        if (file.type.startsWith("image/")) {
          dimensions = await getImageDimensions(file);
        }
        const item = await uploadMedia(file, { dimensions });
        newItems.push(item);
      } catch (e) {
        console.error(`Failed to upload ${file.name}:`, e);
      }
    }
    if (newItems.length) setMedia(prev => [...newItems, ...prev]);
    setUploading(false);
  }, []);

  const handlePageDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handlePageDragLeave = (e: React.DragEvent) => {
    if (!pageRef.current?.contains(e.relatedTarget as Node)) setIsDragging(false);
  };
  const handlePageDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length) handleFileUpload(e.dataTransfer.files);
  };

  const isSelected = (id: number) => bulkMode ? bulkSelected.has(id) : selected?.id === id;

  return (
    <div
      ref={pageRef}
      onDragOver={handlePageDragOver}
      onDragLeave={handlePageDragLeave}
      onDrop={handlePageDrop}
      className="relative"
    >
      {isDragging && (
        <div className="fixed inset-0 z-50 bg-brand-400/10 border-4 border-dashed border-brand-400 flex items-center justify-center pointer-events-none">
          <div className="bg-background rounded-xl px-10 py-8 shadow-2xl text-center">
            <Upload size={40} className="mx-auto mb-3 text-brand-400" />
            <p className="text-lg font-bold uppercase tracking-widest">Drop to upload</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-tight">Media Library</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {loading ? "Loading…" : `${media.length} items — drag files onto the page to upload`}
          </p>
        </div>
        <button
          onClick={() => setUploadOpen(true)}
          disabled={uploading}
          className="px-5 py-2.5 bg-brand-400 text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-brand-500 transition-colors rounded-sm disabled:opacity-60"
        >
          {uploading ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />}
          {uploading ? "Uploading…" : "Add New"}
        </button>
      </div>

      {/* Error banner */}
      {error && (
        <div className="flex items-center gap-3 mb-5 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-sm text-red-500">
          <AlertCircle size={16} />
          <span className="text-sm font-medium">{error}</span>
          <button onClick={load} className="ml-auto text-xs font-bold uppercase tracking-widest underline">Retry</button>
        </div>
      )}

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <div className="flex gap-0.5 bg-muted p-1 rounded-sm">
          {(["all", "image", "video", "document", "audio"] as const).map(t => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest rounded-sm transition-colors ${
                filterType === t
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "all" ? `All (${counts.all})` : `${t.charAt(0).toUpperCase() + t.slice(1)}s (${counts[t]})`}
            </button>
          ))}
        </div>

        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search media..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-muted border border-border pl-9 pr-4 py-2 text-sm outline-none focus:border-brand-400 transition-colors rounded-sm"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 ml-auto">
          <div className="relative">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as typeof sortBy)}
              className="appearance-none bg-muted border border-border pl-3 pr-7 py-2 text-xs font-medium outline-none focus:border-brand-400 cursor-pointer rounded-sm"
            >
              <option value="date">Date</option>
              <option value="name">Name</option>
              <option value="size">Size</option>
            </select>
            <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>

          <button
            onClick={() => { setBulkMode(p => !p); setBulkSelected(new Set()); }}
            className={`px-3 py-2 text-xs font-bold uppercase tracking-widest border rounded-sm transition-colors ${
              bulkMode ? "bg-brand-400 text-white border-brand-400" : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
            }`}
          >
            <Filter size={13} />
          </button>

          <div className="flex gap-0.5 bg-muted p-1 rounded-sm">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-sm transition-colors ${viewMode === "grid" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Grid3X3 size={15} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-sm transition-colors ${viewMode === "list" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <List size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {bulkMode && (
        <div className="flex items-center gap-4 mb-4 px-4 py-2.5 bg-brand-400/10 border border-brand-400/30 rounded-sm">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-500">
            {bulkSelected.size} selected
          </span>
          <button
            onClick={() => setBulkSelected(new Set(filtered.map(m => m.id)))}
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Select all ({filtered.length})
          </button>
          <button
            onClick={() => setBulkSelected(new Set())}
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Deselect all
          </button>
          <button
            onClick={handleBulkDelete}
            disabled={bulkSelected.size === 0}
            className="ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white text-xs font-bold uppercase tracking-widest rounded-sm disabled:opacity-40 hover:bg-red-600 transition-colors"
          >
            <Trash2 size={12} /> Delete ({bulkSelected.size})
          </button>
        </div>
      )}

      {/* Content */}
      <div className={`flex gap-6 ${selected && !bulkMode ? "items-start" : ""}`}>
        <div className="flex-1 min-w-0">
          {loading ? (
            <div className="flex items-center justify-center py-24 text-muted-foreground">
              <Loader2 size={28} className="animate-spin mr-3" />
              <span className="text-sm font-medium">Loading media library…</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="border-2 border-dashed border-border rounded-md py-20 text-center text-muted-foreground">
              <ImageIcon size={40} className="mx-auto mb-3 opacity-20" />
              <p className="text-sm font-medium">
                {search ? "No media found for your search." : "No media uploaded yet."}
              </p>
              {!search && (
                <button
                  onClick={() => setUploadOpen(true)}
                  className="mt-4 px-4 py-2 bg-brand-400 text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-brand-500 transition-colors"
                >
                  Upload your first file
                </button>
              )}
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-1">
              {filtered.map(item => (
                <GridItem
                  key={item.id}
                  item={item}
                  isSelected={isSelected(item.id)}
                  bulkMode={bulkMode}
                  onClick={() => handleSelect(item)}
                />
              ))}
            </div>
          ) : (
            <ListTable
              items={filtered}
              selected={selected}
              bulkMode={bulkMode}
              bulkSelected={bulkSelected}
              onSelect={handleSelect}
            />
          )}

          {!loading && filtered.length > 0 && (
            <p className="text-xs text-muted-foreground mt-4">
              Showing {filtered.length} of {media.length} items
            </p>
          )}
        </div>

        {selected && !bulkMode && editForm && (
          <DetailPanel
            item={selected}
            editForm={editForm}
            setEditForm={setEditForm}
            onClose={() => { setSelected(null); setEditForm(null); }}
            onDelete={handleDeleteSelected}
            onCopyUrl={handleCopyUrl}
            onSave={handleSaveDetail}
            copied={copied}
            saved={detailSaved}
          />
        )}
      </div>

      {uploadOpen && (
        <UploadModal
          onClose={() => setUploadOpen(false)}
          onUpload={handleFileUpload}
          fileInputRef={fileInputRef}
        />
      )}
    </div>
  );
}

/* ── helpers ──────────────────────────────────────────────────── */

function getImageDimensions(file: File): Promise<string> {
  return new Promise(resolve => {
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      resolve(`${img.naturalWidth} × ${img.naturalHeight}`);
      URL.revokeObjectURL(url);
    };
    img.onerror = () => { resolve(""); URL.revokeObjectURL(url); };
    img.src = url;
  });
}

/* ── Grid Item ──────────────────────────────────────────────── */
function GridItem({
  item, isSelected, bulkMode, onClick,
}: {
  item: MediaItem;
  isSelected: boolean;
  bulkMode: boolean;
  onClick: () => void;
}) {
  const thumbUrl = resolveUrl(item.url);
  return (
    <button
      onClick={onClick}
      className={`relative aspect-square group overflow-hidden bg-muted focus:outline-none ${isSelected ? "ring-2 ring-brand-400 ring-offset-1" : ""}`}
    >
      {item.type === "image" && thumbUrl ? (
        <Image
          src={thumbUrl}
          alt={item.altText || item.name}
          fill
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/60">
          {typeIcon[item.type]}
        </div>
      )}
      <div className={`absolute inset-0 transition-colors ${isSelected ? "bg-brand-400/25" : "bg-black/0 group-hover:bg-black/40"}`} />
      <div className={`absolute top-1 left-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
        isSelected ? "bg-brand-400 border-brand-400 opacity-100" : `border-white bg-black/30 ${bulkMode ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`
      }`}>
        {isSelected && <Check size={11} className="text-white" strokeWidth={3} />}
      </div>
      {item.type === "video" && (
        <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
          MP4
        </div>
      )}
    </button>
  );
}

/* ── List Table ──────────────────────────────────────────────── */
function ListTable({
  items, selected, bulkMode, bulkSelected, onSelect,
}: {
  items: MediaItem[];
  selected: MediaItem | null;
  bulkMode: boolean;
  bulkSelected: Set<number>;
  onSelect: (item: MediaItem) => void;
}) {
  return (
    <div className="bg-background border border-border rounded-sm overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-muted/50 border-b border-border text-[10px] uppercase tracking-widest text-muted-foreground">
            <th className="p-3 w-10"></th>
            <th className="p-3">File</th>
            <th className="p-3 hidden sm:table-cell">Type</th>
            <th className="p-3 hidden md:table-cell">Date</th>
            <th className="p-3 hidden lg:table-cell">Size</th>
            <th className="p-3 hidden xl:table-cell">Dimensions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {items.map(item => {
            const active = bulkMode ? bulkSelected.has(item.id) : selected?.id === item.id;
            const thumbUrl = resolveUrl(item.url);
            return (
              <tr
                key={item.id}
                onClick={() => onSelect(item)}
                className={`cursor-pointer transition-colors group ${active ? "bg-brand-400/8" : "hover:bg-muted/40"}`}
              >
                <td className="p-3">
                  <div className={`w-9 h-9 rounded-sm overflow-hidden bg-muted relative flex-shrink-0 ${active ? "ring-2 ring-brand-400" : ""}`}>
                    {item.type === "image" && thumbUrl ? (
                      <Image
                        src={thumbUrl}
                        alt={item.altText || item.name}
                        fill
                        className="object-cover object-center"
                        onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center scale-75">
                        {typeIcon[item.type]}
                      </div>
                    )}
                  </div>
                </td>
                <td className="p-3">
                  <div className="font-semibold text-sm truncate max-w-[200px]">{item.title || item.name}</div>
                  <div className="text-xs text-muted-foreground font-mono truncate max-w-[200px]">{item.name}</div>
                </td>
                <td className="p-3 hidden sm:table-cell">
                  <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded ${typeBadge[item.type]}`}>
                    {typeLabel[item.type]}
                  </span>
                </td>
                <td className="p-3 hidden md:table-cell text-xs text-muted-foreground">{formatDate(item.createdAt)}</td>
                <td className="p-3 hidden lg:table-cell text-xs text-muted-foreground">{formatSize(item.size)}</td>
                <td className="p-3 hidden xl:table-cell text-xs text-muted-foreground">{item.dimensions ?? "—"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ── Detail Panel ─────────────────────────────────────────────── */
function DetailPanel({
  item, editForm, setEditForm, onClose, onDelete, onCopyUrl, onSave, copied, saved,
}: {
  item: MediaItem;
  editForm: UpdatePayload;
  setEditForm: React.Dispatch<React.SetStateAction<UpdatePayload | null>>;
  onClose: () => void;
  onDelete: () => void;
  onCopyUrl: () => void;
  onSave: () => void;
  copied: boolean;
  saved: boolean;
}) {
  const thumbUrl = resolveUrl(item.url);
  return (
    <div className="w-72 shrink-0 bg-background border border-border rounded-sm overflow-hidden sticky top-[73px] max-h-[calc(100vh-90px)] flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
        <span className="text-xs font-bold uppercase tracking-widest">Attachment Details</span>
        <button onClick={onClose} className="p-1 hover:bg-muted rounded transition-colors">
          <X size={14} />
        </button>
      </div>

      <div className="overflow-y-auto flex-1">
        {/* Preview */}
        <div className="aspect-video bg-muted/50 relative flex items-center justify-center">
          {item.type === "image" && thumbUrl ? (
            <Image
              src={thumbUrl}
              alt={item.altText || item.title || item.name}
              fill
              className="object-contain object-center"
              onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          ) : (
            <div className="text-muted-foreground">{typeIcon[item.type]}</div>
          )}
        </div>

        {/* File Info */}
        <div className="p-4 border-b border-border space-y-2.5">
          <InfoRow icon={<CalendarDays size={13} />} label="Uploaded" value={formatDate(item.createdAt)} />
          <InfoRow icon={<HardDrive size={13} />} label="File Size" value={formatSize(item.size)} />
          {item.dimensions && (
            <InfoRow icon={<Maximize2 size={13} />} label="Dimensions" value={item.dimensions} />
          )}
          <InfoRow icon={<Info size={13} />} label="MIME Type" value={item.mimeType} mono />
        </div>

        {/* File URL */}
        {item.url && (
          <div className="p-4 border-b border-border">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-2">File URL</div>
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={resolveUrl(item.url)}
                className="flex-1 min-w-0 bg-muted border border-border px-2.5 py-1.5 text-[11px] font-mono rounded-sm outline-none truncate"
              />
              <button
                onClick={onCopyUrl}
                className={`p-1.5 border rounded-sm shrink-0 transition-colors ${copied ? "border-green-500 text-green-500 bg-green-500/10" : "border-border text-muted-foreground hover:border-brand-400 hover:text-brand-400"}`}
                title="Copy URL"
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
              </button>
            </div>
          </div>
        )}

        {/* Editable Fields */}
        <div className="p-4 space-y-3.5">
          <EditField
            label="Title"
            value={editForm.title ?? ""}
            onChange={v => setEditForm(f => f ? { ...f, title: v } : f)}
          />
          {item.type === "image" && (
            <EditField
              label="Alt Text"
              value={editForm.altText ?? ""}
              onChange={v => setEditForm(f => f ? { ...f, altText: v } : f)}
              hint="Used for accessibility and SEO."
              placeholder="Describe the image…"
            />
          )}
          <EditTextarea
            label="Caption"
            value={editForm.caption ?? ""}
            onChange={v => setEditForm(f => f ? { ...f, caption: v } : f)}
          />
        </div>
      </div>

      <div className="p-4 border-t border-border flex items-center justify-between gap-2">
        <button
          onClick={onDelete}
          className="flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-600 transition-colors"
        >
          <Trash2 size={13} /> Delete
        </button>
        <button
          onClick={onSave}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-sm transition-colors ${
            saved ? "bg-green-500 text-white" : "bg-brand-400 text-white hover:bg-brand-500"
          }`}
        >
          {saved ? "Saved ✓" : "Update"}
        </button>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value, mono }: { icon: React.ReactNode; label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="text-muted-foreground mt-0.5 shrink-0">{icon}</span>
      <div>
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-0.5">{label}</div>
        <div className={`text-xs ${mono ? "font-mono" : ""}`}>{value}</div>
      </div>
    </div>
  );
}

function EditField({ label, value, onChange, hint, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; hint?: string; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1.5">{label}</label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-muted border border-border px-3 py-2 text-xs outline-none focus:border-brand-400 transition-colors rounded-sm"
      />
      {hint && <p className="text-[10px] text-muted-foreground mt-1">{hint}</p>}
    </div>
  );
}

function EditTextarea({ label, value, onChange }: {
  label: string; value: string; onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1.5">{label}</label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Optional caption…"
        rows={2}
        className="w-full bg-muted border border-border px-3 py-2 text-xs outline-none focus:border-brand-400 transition-colors rounded-sm resize-none"
      />
    </div>
  );
}

/* ── Upload Modal ─────────────────────────────────────────────── */
function UploadModal({
  onClose, onUpload, fileInputRef,
}: {
  onClose: () => void;
  onUpload: (files: FileList) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const typeIconMap = typeIcon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-background border border-border shadow-2xl rounded-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
          <h2 className="text-base font-bold uppercase tracking-tight">Upload New Media</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="p-6">
          <div
            onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={e => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files.length) onUpload(e.dataTransfer.files); }}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-sm py-14 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors ${
              isDragging ? "border-brand-400 bg-brand-400/5" : "border-border hover:border-brand-400/60 hover:bg-muted/40"
            }`}
          >
            <div className="w-14 h-14 bg-brand-400/10 rounded-full flex items-center justify-center">
              <Upload size={24} className="text-brand-400" />
            </div>
            <div className="text-center">
              <p className="font-bold text-sm">Drop files here or <span className="text-brand-400 underline underline-offset-2">browse</span></p>
              <p className="text-xs text-muted-foreground mt-1">Images, Videos, Documents, Audio — max 100 MB each</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
              className="hidden"
              onChange={e => { if (e.target.files?.length) onUpload(e.target.files); }}
            />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2 text-center">
            {(["image", "video", "document", "audio"] as const).map(t => (
              <div key={t} className="p-2.5 bg-muted/50 rounded-sm">
                <div className="flex justify-center mb-1">{typeIconMap[t]}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{typeLabel[t]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
