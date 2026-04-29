"use client";

import {
  Plus, Trash2, Edit2, PlayCircle, ExternalLink, Video as VideoIcon,
  Link as LinkIcon, Upload, Image as ImageIcon, Loader2, AlertCircle,
} from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import {
  fetchVideos, createVideo, updateVideo, deleteVideo, uploadThumbnail,
  type Video, type VideoPayload,
} from "@/lib/videoApi";

type VideoForm = {
  title: string;
  category: string;
  platform: "YouTube" | "Vimeo";
  embedUrl: string;
  thumbnailUrl: string;
  featured: boolean;
};

const blankForm = (): VideoForm => ({
  title: "", category: "Wedding", platform: "YouTube", embedUrl: "", thumbnailUrl: "", featured: false,
});

const categories = ["Wedding", "Commercial", "Corporate", "Event", "Fashion", "Maternity", "Other"];

const platformColor = (platform: string) =>
  platform === "YouTube" ? "bg-red-500/10 text-red-600" : "bg-blue-500/10 text-blue-600";

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [youtubeChannel, setYoutubeChannel] = useState("https://youtube.com/@visualstudio");
  const [vimeoProfile, setVimeoProfile] = useState("https://vimeo.com/visualstudio");
  const [linksSaved, setLinksSaved] = useState(false);

  const [modal, setModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [form, setForm] = useState<VideoForm>(blankForm());
  const [thumbMode, setThumbMode] = useState<"url" | "upload">("url");
  const [isDragging, setIsDragging] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [thumbUploading, setThumbUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setVideos(await fetchVideos());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load videos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => {
    setEditingVideo(null);
    setForm(blankForm());
    setThumbMode("url");
    setSubmitError(null);
    setModal(true);
  };

  const openEdit = (v: Video) => {
    setEditingVideo(v);
    setForm({
      title: v.title,
      category: v.category ?? "Wedding",
      platform: v.platform,
      embedUrl: v.embedUrl,
      thumbnailUrl: v.thumbnailUrl ?? "",
      featured: v.featured,
    });
    setThumbMode("url");
    setSubmitError(null);
    setModal(true);
  };

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setThumbUploading(true);
    try {
      const url = await uploadThumbnail(file);
      setForm(f => ({ ...f, thumbnailUrl: url }));
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : "Thumbnail upload failed");
    } finally {
      setThumbUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    const payload: VideoPayload = {
      title: form.title,
      category: form.category,
      platform: form.platform,
      embedUrl: form.embedUrl,
      thumbnailUrl: form.thumbnailUrl || undefined,
      featured: form.featured,
    };
    try {
      if (editingVideo) {
        const updated = await updateVideo(editingVideo.id, payload);
        setVideos(prev => prev.map(v => v.id === updated.id ? updated : v));
      } else {
        const created = await createVideo(payload);
        setVideos(prev => [created, ...prev]);
      }
      setModal(false);
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : "Failed to save video");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this video?")) return;
    try {
      await deleteVideo(id);
      setVideos(prev => prev.filter(v => v.id !== id));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Delete failed");
    }
  };

  const toggleFeatured = async (video: Video) => {
    try {
      const updated = await updateVideo(video.id, { featured: !video.featured });
      setVideos(prev => prev.map(v => v.id === updated.id ? updated : v));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to update");
    }
  };

  const handleSaveLinks = () => {
    setLinksSaved(true);
    setTimeout(() => setLinksSaved(false), 2500);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-tight">Video Gallery</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage video links, thumbnails, and channel integrations.</p>
        </div>
        <button
          onClick={openAdd}
          disabled={loading}
          className="px-5 py-2.5 bg-brand-400 text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-brand-500 transition-colors rounded-sm disabled:opacity-50"
        >
          <Plus size={15} /> Add Video
        </button>
      </div>

      {/* Channel Links */}
      <div className="bg-background border border-border rounded-md p-6 mb-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-bold uppercase tracking-tight text-sm">Platform Integrations</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Set your main channel links displayed on the website.</p>
          </div>
          <button
            onClick={handleSaveLinks}
            className="px-5 py-2 bg-foreground text-background font-bold tracking-widest uppercase text-xs hover:opacity-85 transition-opacity rounded-sm"
          >
            {linksSaved ? "Saved ✓" : "Save Links"}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <VideoIcon size={13} className="text-red-500" /> YouTube Channel URL
            </label>
            <div className="flex gap-2">
              <input type="url" value={youtubeChannel} onChange={(e) => setYoutubeChannel(e.target.value)}
                className="flex-1 bg-muted border border-border px-3 py-2.5 outline-none focus:border-brand-400 transition-colors text-sm rounded-sm" />
              <a href={youtubeChannel} target="_blank" rel="noopener noreferrer"
                className="px-3 py-2.5 border border-border hover:border-brand-400 rounded-sm transition-colors">
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <LinkIcon size={13} className="text-blue-500" /> Vimeo Profile URL
            </label>
            <div className="flex gap-2">
              <input type="url" value={vimeoProfile} onChange={(e) => setVimeoProfile(e.target.value)}
                className="flex-1 bg-muted border border-border px-3 py-2.5 outline-none focus:border-brand-400 transition-colors text-sm rounded-sm" />
              <a href={vimeoProfile} target="_blank" rel="noopener noreferrer"
                className="px-3 py-2.5 border border-border hover:border-brand-400 rounded-sm transition-colors">
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Videos", value: videos.length },
          { label: "Featured", value: videos.filter(v => v.featured).length },
          { label: "YouTube", value: videos.filter(v => v.platform === "YouTube").length },
        ].map(stat => (
          <div key={stat.label} className="bg-background border border-border rounded-md p-4 text-center">
            <div className="text-2xl font-bold">{loading ? "—" : stat.value}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 mb-5 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-sm text-red-500">
          <AlertCircle size={16} />
          <span className="text-sm font-medium">{error}</span>
          <button onClick={load} className="ml-auto text-xs font-bold uppercase tracking-widest underline">Retry</button>
        </div>
      )}

      {/* Video Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-24 text-muted-foreground">
          <Loader2 size={28} className="animate-spin mr-3" />
          <span className="text-sm font-medium">Loading…</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {videos.map((video) => (
            <div key={video.id} className="bg-background border border-border rounded-md overflow-hidden group">
              <div className="aspect-video bg-muted relative overflow-hidden">
                {video.thumbnailUrl ? (
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${video.thumbnailUrl}')` }} />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlayCircle size={32} className="text-muted-foreground/50" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
                <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(video)}
                    className="bg-black/60 p-1.5 text-white backdrop-blur-sm hover:bg-brand-400 transition-colors rounded-sm">
                    <Edit2 size={13} />
                  </button>
                  <button onClick={() => handleDelete(video.id)}
                    className="bg-black/60 p-1.5 text-white backdrop-blur-sm hover:bg-red-500 transition-colors rounded-sm">
                    <Trash2 size={13} />
                  </button>
                </div>
                <div className="absolute bottom-2 left-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${platformColor(video.platform)}`}>
                    {video.platform}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="font-bold text-sm uppercase tracking-tight truncate">{video.title}</div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">{video.category ?? "—"}</span>
                  <button
                    onClick={() => toggleFeatured(video)}
                    className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded transition-colors ${
                      video.featured ? "bg-brand-400/20 text-brand-500" : "bg-muted text-muted-foreground hover:bg-brand-400/10"
                    }`}
                  >
                    {video.featured ? "Featured" : "Feature"}
                  </button>
                </div>
              </div>
            </div>
          ))}
          {videos.length === 0 && !loading && (
            <div className="col-span-3 text-center p-12 text-muted-foreground border border-dashed border-border rounded-md">
              <PlayCircle size={32} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium">No videos yet. Add your first video.</p>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      <Modal isOpen={modal} onClose={() => !submitting && setModal(false)} title={editingVideo ? "Edit Video" : "Add Video"}>
        <form onSubmit={handleSave} className="space-y-5">
          {submitError && (
            <div className="flex items-center gap-2 px-3 py-2.5 bg-red-500/10 border border-red-500/30 rounded-sm text-red-500 text-sm">
              <AlertCircle size={14} /> {submitError}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Video Title *</label>
            <input type="text" placeholder="e.g. Wedding Highlight Reel 2026" required
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
              value={form.title} onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))} />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Embed URL *</label>
            <input type="url" placeholder="https://www.youtube.com/embed/VIDEO_ID" required
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm font-mono"
              value={form.embedUrl} onChange={(e) => setForm(f => ({ ...f, embedUrl: e.target.value }))} />
            <p className="text-xs text-muted-foreground">Use YouTube embed URL (youtube.com/embed/ID) or Vimeo player URL.</p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Thumbnail</label>
            <div className="flex gap-1 p-1 bg-muted rounded-sm w-fit">
              <button type="button" onClick={() => setThumbMode("url")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-widest rounded-sm transition-colors ${thumbMode === "url" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                <LinkIcon size={11} /> Paste URL
              </button>
              <button type="button" onClick={() => setThumbMode("upload")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-widest rounded-sm transition-colors ${thumbMode === "upload" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                <Upload size={11} /> Upload File
              </button>
            </div>

            {thumbMode === "url" ? (
              <input type="url" placeholder="https://images.unsplash.com/..."
                className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
                value={form.thumbnailUrl} onChange={(e) => setForm(f => ({ ...f, thumbnailUrl: e.target.value }))} />
            ) : (
              <div
                onClick={() => !thumbUploading && fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files?.[0]; if (f) handleFileSelect(f); }}
                className={`w-full border-2 border-dashed rounded-sm py-7 flex flex-col items-center justify-center gap-2 transition-colors ${thumbUploading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${isDragging ? "border-brand-400 bg-brand-400/5" : "border-border hover:border-brand-400/50 hover:bg-muted/50"}`}
              >
                {thumbUploading
                  ? <><Loader2 size={22} className="animate-spin text-brand-400" /><p className="text-sm font-medium">Uploading…</p></>
                  : <><ImageIcon size={22} className="text-muted-foreground" /><p className="text-sm font-medium">Drop thumbnail here or <span className="text-brand-400">browse</span></p><p className="text-xs text-muted-foreground">PNG, JPG, WEBP — max 10 MB</p></>
                }
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileSelect(f); e.target.value = ""; }} />
              </div>
            )}

            {form.thumbnailUrl && (
              <div className="aspect-video bg-muted rounded-sm overflow-hidden relative mt-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.thumbnailUrl} alt="Thumbnail preview" className="w-full h-full object-cover" />
                <button type="button" onClick={() => setForm(f => ({ ...f, thumbnailUrl: "" }))}
                  className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded hover:bg-red-500 transition-colors">
                  Remove
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Category</label>
              <select className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 appearance-none cursor-pointer rounded-sm text-sm"
                value={form.category} onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Platform</label>
              <select className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 appearance-none cursor-pointer rounded-sm text-sm"
                value={form.platform} onChange={(e) => setForm(f => ({ ...f, platform: e.target.value as "YouTube" | "Vimeo" }))}>
                <option value="YouTube">YouTube</option>
                <option value="Vimeo">Vimeo</option>
              </select>
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 cursor-pointer accent-brand-400"
              checked={form.featured} onChange={(e) => setForm(f => ({ ...f, featured: e.target.checked }))} />
            <span className="text-sm font-semibold">Mark as Featured</span>
          </label>

          <button type="submit" disabled={submitting}
            className="w-full bg-brand-400 text-white font-bold tracking-widest uppercase text-sm py-3.5 hover:bg-brand-500 transition-colors rounded-sm flex items-center justify-center gap-2 disabled:opacity-60">
            {submitting && <Loader2 size={15} className="animate-spin" />}
            {editingVideo ? "Save Changes" : "Add Video"}
          </button>
        </form>
      </Modal>
    </>
  );
}
