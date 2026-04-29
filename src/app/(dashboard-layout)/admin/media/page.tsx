"use client";

import {
  Upload, Search, Grid3X3, List, X, Copy, Check, Trash2,
  Image as ImageIcon, Film, FileText, Music, ChevronDown,
  Info, CalendarDays, HardDrive, Maximize2,
  Plus, Filter
} from "lucide-react";
import { useState, useRef, useCallback } from "react";

type MediaType = "image" | "video" | "document" | "audio";
type ViewMode = "grid" | "list";
type FilterType = "all" | MediaType;

type MediaItem = {
  id: number;
  name: string;
  type: MediaType;
  url: string;
  uploadedAt: string;
  size: string;
  dimensions?: string;
  mimeType: string;
  altText: string;
  title: string;
  caption: string;
  uploadedBy: string;
};

const initialMedia: MediaItem[] = [
  { id: 1, name: "wedding-ceremony-hero.jpg", type: "image", url: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=400", uploadedAt: "2026-04-28", size: "2.4 MB", dimensions: "4096 × 2731", mimeType: "image/jpeg", altText: "Bride and groom at ceremony", title: "Wedding Ceremony Hero", caption: "", uploadedBy: "Admin" },
  { id: 2, name: "studio-portrait-01.jpg", type: "image", url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=400", uploadedAt: "2026-04-27", size: "1.8 MB", dimensions: "3840 × 2560", mimeType: "image/jpeg", altText: "Studio portrait photography", title: "Studio Portrait 01", caption: "Professional studio shoot", uploadedBy: "Admin" },
  { id: 3, name: "maternity-glow.jpg", type: "image", url: "https://images.unsplash.com/photo-1519895009398-30e8d6bccc58?q=80&w=400", uploadedAt: "2026-04-26", size: "3.1 MB", dimensions: "5000 × 3333", mimeType: "image/jpeg", altText: "Maternity photography outdoors", title: "Maternity Glow", caption: "", uploadedBy: "Admin" },
  { id: 4, name: "henna-ceremony-detail.jpg", type: "image", url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=400", uploadedAt: "2026-04-25", size: "1.2 MB", dimensions: "2400 × 1600", mimeType: "image/jpeg", altText: "Henna ceremony close-up", title: "Henna Ceremony Detail", caption: "", uploadedBy: "Admin" },
  { id: 5, name: "baby-shower-decor.jpg", type: "image", url: "https://images.unsplash.com/photo-1544126592-807ade215a0b?q=80&w=400", uploadedAt: "2026-04-24", size: "980 KB", dimensions: "2000 × 1333", mimeType: "image/jpeg", altText: "Baby shower decoration setup", title: "Baby Shower Decor", caption: "Elegant baby shower styling", uploadedBy: "Admin" },
  { id: 6, name: "group-wedding-party.jpg", type: "image", url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=400", uploadedAt: "2026-04-23", size: "4.2 MB", dimensions: "6000 × 4000", mimeType: "image/jpeg", altText: "Full wedding party group photo", title: "Wedding Party Group", caption: "", uploadedBy: "Admin" },
  { id: 7, name: "birthday-cake-moment.jpg", type: "image", url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=400", uploadedAt: "2026-04-22", size: "1.5 MB", dimensions: "3200 × 2133", mimeType: "image/jpeg", altText: "Birthday cake moment", title: "Birthday Cake Moment", caption: "", uploadedBy: "Admin" },
  { id: 8, name: "gender-reveal-balloon.jpg", type: "image", url: "https://images.unsplash.com/photo-1576482930497-e8e4b72b1b89?q=80&w=400", uploadedAt: "2026-04-21", size: "2.0 MB", dimensions: "4000 × 2667", mimeType: "image/jpeg", altText: "Gender reveal balloon pop", title: "Gender Reveal Balloons", caption: "The big reveal moment", uploadedBy: "Admin" },
  { id: 9, name: "newborn-baby-portrait.jpg", type: "image", url: "https://images.unsplash.com/photo-1519689373023-dd07c7988603?q=80&w=400", uploadedAt: "2026-04-20", size: "1.7 MB", dimensions: "3500 × 2333", mimeType: "image/jpeg", altText: "Newborn baby portrait", title: "Newborn Portrait", caption: "", uploadedBy: "Admin" },
  { id: 10, name: "engagement-sunset.jpg", type: "image", url: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=400", uploadedAt: "2026-04-19", size: "2.9 MB", dimensions: "4800 × 3200", mimeType: "image/jpeg", altText: "Engagement session at sunset", title: "Engagement Sunset", caption: "Golden hour engagement", uploadedBy: "Admin" },
  { id: 11, name: "corporate-event-cover.jpg", type: "image", url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=400", uploadedAt: "2026-04-18", size: "1.3 MB", dimensions: "2800 × 1867", mimeType: "image/jpeg", altText: "Corporate event photography", title: "Corporate Event Cover", caption: "", uploadedBy: "Admin" },
  { id: 12, name: "bridal-detail-ring.jpg", type: "image", url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=400", uploadedAt: "2026-04-17", size: "880 KB", dimensions: "2200 × 1467", mimeType: "image/jpeg", altText: "Bridal ring detail shot", title: "Bridal Ring Detail", caption: "The perfect ring shot", uploadedBy: "Admin" },
  { id: 13, name: "promo-highlight-reel.mp4", type: "video", url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=400", uploadedAt: "2026-04-16", size: "48.2 MB", mimeType: "video/mp4", altText: "", title: "Promo Highlight Reel 2026", caption: "", uploadedBy: "Admin" },
  { id: 14, name: "wedding-highlight-2025.mp4", type: "video", url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400", uploadedAt: "2026-04-15", size: "124 MB", mimeType: "video/mp4", altText: "", title: "Wedding Highlight 2025", caption: "", uploadedBy: "Admin" },
  { id: 15, name: "studio-outdoor-golden.jpg", type: "image", url: "https://images.unsplash.com/photo-1504703395950-b89145a5425b?q=80&w=400", uploadedAt: "2026-04-14", size: "2.1 MB", dimensions: "4200 × 2800", mimeType: "image/jpeg", altText: "Outdoor golden hour photoshoot", title: "Golden Hour Studio", caption: "", uploadedBy: "Admin" },
  { id: 16, name: "price-guide-2026.pdf", type: "document", url: "", uploadedAt: "2026-04-13", size: "380 KB", mimeType: "application/pdf", altText: "", title: "Price Guide 2026", caption: "", uploadedBy: "Admin" },
  { id: 17, name: "behind-scenes-bts.jpg", type: "image", url: "https://images.unsplash.com/photo-1452802447250-470a88ac82bc?q=80&w=400", uploadedAt: "2026-04-12", size: "1.9 MB", dimensions: "3800 × 2533", mimeType: "image/jpeg", altText: "Behind the scenes at a shoot", title: "Behind The Scenes", caption: "", uploadedBy: "Admin" },
  { id: 18, name: "ambient-ceremony.mp3", type: "audio", url: "", uploadedAt: "2026-04-11", size: "6.7 MB", mimeType: "audio/mp3", altText: "", title: "Ambient Ceremony Audio", caption: "", uploadedBy: "Admin" },
];

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
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default function MediaPage() {
  const [media, setMedia] = useState<MediaItem[]>(initialMedia);
  const [selected, setSelected] = useState<MediaItem | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [search, setSearch] = useState("");
  const [bulkMode, setBulkMode] = useState(false);
  const [bulkSelected, setBulkSelected] = useState<Set<number>>(new Set());
  const [copied, setCopied] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [editForm, setEditForm] = useState<{ title: string; altText: string; caption: string } | null>(null);
  const [detailSaved, setDetailSaved] = useState(false);
  const [sortBy, setSortBy] = useState<"date" | "name" | "size">("date");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  const filtered = media
    .filter(m => filterType === "all" || m.type === filterType)
    .filter(m => !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "size") return a.size.localeCompare(b.size);
      return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
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
        next.has(item.id) ? next.delete(item.id) : next.add(item.id);
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
      navigator.clipboard.writeText(selected.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDeleteSelected = () => {
    if (!selected) return;
    if (window.confirm(`Delete "${selected.name}"?`)) {
      setMedia(prev => prev.filter(m => m.id !== selected.id));
      setSelected(null);
      setEditForm(null);
    }
  };

  const handleBulkDelete = () => {
    if (bulkSelected.size === 0) return;
    if (window.confirm(`Delete ${bulkSelected.size} item${bulkSelected.size > 1 ? "s" : ""}?`)) {
      setMedia(prev => prev.filter(m => !bulkSelected.has(m.id)));
      setBulkSelected(new Set());
      setBulkMode(false);
    }
  };

  const handleSaveDetail = () => {
    if (!selected || !editForm) return;
    setMedia(prev => prev.map(m => m.id === selected.id ? { ...m, ...editForm } : m));
    setSelected(prev => prev ? { ...prev, ...editForm } : null);
    setDetailSaved(true);
    setTimeout(() => setDetailSaved(false), 2000);
  };

  const handleFileUpload = useCallback((files: FileList) => {
    Array.from(files).forEach(file => {
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");
      const isAudio = file.type.startsWith("audio/");
      const type: MediaType = isImage ? "image" : isVideo ? "video" : isAudio ? "audio" : "document";

      const sizeKB = file.size / 1024;
      const sizeFmt = sizeKB < 1024 ? `${sizeKB.toFixed(0)} KB` : `${(sizeKB / 1024).toFixed(1)} MB`;

      if (isImage) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const url = e.target?.result as string;
          const img = new window.Image();
          img.onload = () => {
            const newItem: MediaItem = {
              id: Date.now() + Math.random(),
              name: file.name,
              type,
              url,
              uploadedAt: new Date().toISOString().split("T")[0],
              size: sizeFmt,
              dimensions: `${img.naturalWidth} × ${img.naturalHeight}`,
              mimeType: file.type,
              altText: "",
              title: file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
              caption: "",
              uploadedBy: "Admin",
            };
            setMedia(prev => [newItem, ...prev]);
          };
          img.src = url;
        };
        reader.readAsDataURL(file);
      } else {
        setMedia(prev => [{
          id: Date.now() + Math.random(),
          name: file.name,
          type,
          url: "",
          uploadedAt: new Date().toISOString().split("T")[0],
          size: sizeFmt,
          mimeType: file.type,
          altText: "",
          title: file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
          caption: "",
          uploadedBy: "Admin",
        }, ...prev]);
      }
    });
    setUploadOpen(false);
  }, []);

  const handlePageDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
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
      {/* Page-level drag overlay */}
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
            {media.length} items &mdash; drag files onto the page to upload
          </p>
        </div>
        <button
          onClick={() => setUploadOpen(true)}
          className="px-5 py-2.5 bg-brand-400 text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-brand-500 transition-colors rounded-sm"
        >
          <Plus size={15} /> Add New
        </button>
      </div>

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
          {/* Sort */}
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

          {/* Bulk Mode */}
          <button
            onClick={() => { setBulkMode(p => !p); setBulkSelected(new Set()); }}
            className={`px-3 py-2 text-xs font-bold uppercase tracking-widest border rounded-sm transition-colors ${
              bulkMode ? "bg-brand-400 text-white border-brand-400" : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
            }`}
          >
            <Filter size={13} />
          </button>

          {/* View toggle */}
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
            onClick={() => { setBulkSelected(new Set(filtered.map(m => m.id))); }}
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

        {/* Media Grid / List */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="border-2 border-dashed border-border rounded-md py-20 text-center text-muted-foreground">
              <ImageIcon size={40} className="mx-auto mb-3 opacity-20" />
              <p className="text-sm font-medium">No media found.</p>
              {search && <p className="text-xs mt-1">Try a different search term.</p>}
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

          {/* Result count */}
          {filtered.length > 0 && (
            <p className="text-xs text-muted-foreground mt-4">
              Showing {filtered.length} of {media.length} items
            </p>
          )}
        </div>

        {/* Detail Panel */}
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

      {/* Upload Modal */}
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

/* ── Grid Item ──────────────────────────────────────────────── */
function GridItem({
  item, isSelected, bulkMode, onClick
}: {
  item: MediaItem;
  isSelected: boolean;
  bulkMode: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative aspect-square group overflow-hidden bg-muted focus:outline-none ${
        isSelected ? "ring-2 ring-brand-400 ring-offset-1" : ""
      }`}
    >
      {/* Thumbnail */}
      {item.type === "image" && item.url ? (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundImage: `url('${item.url}')` }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/60">
          {typeIcon[item.type]}
        </div>
      )}

      {/* Hover overlay */}
      <div className={`absolute inset-0 transition-colors ${isSelected ? "bg-brand-400/25" : "bg-black/0 group-hover:bg-black/40"}`} />

      {/* Checkbox */}
      <div className={`absolute top-1 left-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
        isSelected ? "bg-brand-400 border-brand-400 opacity-100" : `border-white bg-black/30 ${bulkMode ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`
      }`}>
        {isSelected && <Check size={11} className="text-white" strokeWidth={3} />}
      </div>

      {/* Video badge */}
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
  items, selected, bulkMode, bulkSelected, onSelect
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
            return (
              <tr
                key={item.id}
                onClick={() => onSelect(item)}
                className={`cursor-pointer transition-colors group ${active ? "bg-brand-400/8" : "hover:bg-muted/40"}`}
              >
                <td className="p-3">
                  <div className={`w-9 h-9 rounded-sm overflow-hidden bg-muted relative flex-shrink-0 ${active ? "ring-2 ring-brand-400" : ""}`}>
                    {item.type === "image" && item.url ? (
                      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${item.url}')` }} />
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
                <td className="p-3 hidden md:table-cell text-xs text-muted-foreground">{formatDate(item.uploadedAt)}</td>
                <td className="p-3 hidden lg:table-cell text-xs text-muted-foreground">{item.size}</td>
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
  item, editForm, setEditForm, onClose, onDelete, onCopyUrl, onSave, copied, saved
}: {
  item: MediaItem;
  editForm: { title: string; altText: string; caption: string };
  setEditForm: React.Dispatch<React.SetStateAction<{ title: string; altText: string; caption: string } | null>>;
  onClose: () => void;
  onDelete: () => void;
  onCopyUrl: () => void;
  onSave: () => void;
  copied: boolean;
  saved: boolean;
}) {
  return (
    <div className="w-72 shrink-0 bg-background border border-border rounded-sm overflow-hidden sticky top-[73px] max-h-[calc(100vh-90px)] flex flex-col">
      {/* Panel header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
        <span className="text-xs font-bold uppercase tracking-widest">Attachment Details</span>
        <button onClick={onClose} className="p-1 hover:bg-muted rounded transition-colors">
          <X size={14} />
        </button>
      </div>

      <div className="overflow-y-auto flex-1">
        {/* Preview */}
        <div className="aspect-video bg-muted/50 relative flex items-center justify-center">
          {item.type === "image" && item.url ? (
            <div className="absolute inset-0 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url('${item.url}')` }} />
          ) : (
            <div className="text-muted-foreground">
              {typeIcon[item.type]}
            </div>
          )}
        </div>

        {/* File Info */}
        <div className="p-4 border-b border-border space-y-2.5">
          <div className="flex items-start gap-2.5">
            <CalendarDays size={13} className="text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-0.5">Uploaded</div>
              <div className="text-xs">{formatDate(item.uploadedAt)}</div>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <HardDrive size={13} className="text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-0.5">File Size</div>
              <div className="text-xs">{item.size}</div>
            </div>
          </div>
          {item.dimensions && (
            <div className="flex items-start gap-2.5">
              <Maximize2 size={13} className="text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-0.5">Dimensions</div>
                <div className="text-xs">{item.dimensions}</div>
              </div>
            </div>
          )}
          <div className="flex items-start gap-2.5">
            <Info size={13} className="text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-0.5">MIME Type</div>
              <div className="text-xs font-mono">{item.mimeType}</div>
            </div>
          </div>
        </div>

        {/* File URL */}
        {item.url && (
          <div className="p-4 border-b border-border">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-2">File URL</div>
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={item.url}
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
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1.5">Title</label>
            <input
              type="text"
              value={editForm.title}
              onChange={e => setEditForm(f => f ? { ...f, title: e.target.value } : f)}
              className="w-full bg-muted border border-border px-3 py-2 text-xs outline-none focus:border-brand-400 transition-colors rounded-sm"
            />
          </div>
          {item.type === "image" && (
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1.5">Alt Text</label>
              <input
                type="text"
                value={editForm.altText}
                onChange={e => setEditForm(f => f ? { ...f, altText: e.target.value } : f)}
                placeholder="Describe the image..."
                className="w-full bg-muted border border-border px-3 py-2 text-xs outline-none focus:border-brand-400 transition-colors rounded-sm"
              />
              <p className="text-[10px] text-muted-foreground mt-1">Used for accessibility and SEO.</p>
            </div>
          )}
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1.5">Caption</label>
            <textarea
              value={editForm.caption}
              onChange={e => setEditForm(f => f ? { ...f, caption: e.target.value } : f)}
              placeholder="Optional caption..."
              rows={2}
              className="w-full bg-muted border border-border px-3 py-2 text-xs outline-none focus:border-brand-400 transition-colors rounded-sm resize-none"
            />
          </div>
        </div>
      </div>

      {/* Panel Footer */}
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

/* ── Upload Modal ─────────────────────────────────────────────── */
function UploadModal({
  onClose, onUpload, fileInputRef
}: {
  onClose: () => void;
  onUpload: (files: FileList) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}) {
  const [isDragging, setIsDragging] = useState(false);

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
              <p className="text-xs text-muted-foreground mt-1">Images, Videos, Documents — max 100 MB each</p>
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
                <div className="flex justify-center mb-1">{typeIcon[t]}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{typeLabel[t]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
