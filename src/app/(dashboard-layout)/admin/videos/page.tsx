"use client";

import { Plus, Trash2, Edit2, PlayCircle, ExternalLink, Video, Link as LinkIcon } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";

type Video = {
  id: number;
  title: string;
  category: string;
  platform: string;
  embedUrl: string;
  thumbnailUrl: string;
  featured: boolean;
};

const initialVideos: Video[] = [
  { id: 1, title: "Artisan Coffee Commercial", category: "Commercial", platform: "YouTube", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", thumbnailUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=400", featured: true },
  { id: 2, title: "Emily & David Wedding Highlight", category: "Wedding", platform: "YouTube", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", thumbnailUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400", featured: true },
  { id: 3, title: "Atlas Tech Summit Coverage", category: "Corporate", platform: "Vimeo", embedUrl: "https://player.vimeo.com/video/123456789", thumbnailUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=400", featured: false },
  { id: 4, title: "Baby Shower Moments", category: "Event", platform: "YouTube", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", thumbnailUrl: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=400", featured: false },
];

const blankVideo = (): Omit<Video, "id"> => ({
  title: "", category: "Wedding", platform: "YouTube", embedUrl: "", thumbnailUrl: "", featured: false
});

const categories = ["Wedding", "Commercial", "Corporate", "Event", "Fashion", "Maternity", "Other"];

export default function VideosPage() {
  const [videos, setVideos] = useState(initialVideos);
  const [youtubeChannel, setYoutubeChannel] = useState("https://youtube.com/@visualstudio");
  const [vimeoProfile, setVimeoProfile] = useState("https://vimeo.com/visualstudio");
  const [linksSaved, setLinksSaved] = useState(false);

  const [modal, setModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [form, setForm] = useState(blankVideo());

  const openAdd = () => {
    setEditingVideo(null);
    setForm(blankVideo());
    setModal(true);
  };

  const openEdit = (v: Video) => {
    setEditingVideo(v);
    setForm({ title: v.title, category: v.category, platform: v.platform, embedUrl: v.embedUrl, thumbnailUrl: v.thumbnailUrl, featured: v.featured });
    setModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.embedUrl) return;
    if (editingVideo) {
      setVideos(videos.map(v => v.id === editingVideo.id ? { ...form, id: editingVideo.id } : v));
    } else {
      setVideos([{ ...form, id: Date.now() }, ...videos]);
    }
    setModal(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Delete this video?")) setVideos(videos.filter(v => v.id !== id));
  };

  const toggleFeatured = (id: number) => {
    setVideos(videos.map(v => v.id === id ? { ...v, featured: !v.featured } : v));
  };

  const handleSaveLinks = () => {
    setLinksSaved(true);
    setTimeout(() => setLinksSaved(false), 2500);
  };

  const platformColor = (platform: string) =>
    platform === "YouTube" ? "bg-red-500/10 text-red-600" : "bg-blue-500/10 text-blue-600";

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-tight">Video Gallery</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage video links, thumbnails, and channel integrations.</p>
        </div>
        <button
          onClick={openAdd}
          className="px-5 py-2.5 bg-brand-400 text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-brand-500 transition-colors rounded-sm"
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
              <Video size={13} className="text-red-500" /> YouTube Channel URL
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={youtubeChannel}
                onChange={(e) => setYoutubeChannel(e.target.value)}
                className="flex-1 bg-muted border border-border px-3 py-2.5 outline-none focus:border-brand-400 transition-colors text-sm rounded-sm"
              />
              <a href={youtubeChannel} target="_blank" rel="noopener noreferrer" className="px-3 py-2.5 border border-border hover:border-brand-400 rounded-sm transition-colors">
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <LinkIcon size={13} className="text-blue-500" /> Vimeo Profile URL
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={vimeoProfile}
                onChange={(e) => setVimeoProfile(e.target.value)}
                className="flex-1 bg-muted border border-border px-3 py-2.5 outline-none focus:border-brand-400 transition-colors text-sm rounded-sm"
              />
              <a href={vimeoProfile} target="_blank" rel="noopener noreferrer" className="px-3 py-2.5 border border-border hover:border-brand-400 rounded-sm transition-colors">
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-background border border-border rounded-md p-4 text-center">
          <div className="text-2xl font-bold">{videos.length}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Total Videos</div>
        </div>
        <div className="bg-background border border-border rounded-md p-4 text-center">
          <div className="text-2xl font-bold">{videos.filter(v => v.featured).length}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Featured</div>
        </div>
        <div className="bg-background border border-border rounded-md p-4 text-center">
          <div className="text-2xl font-bold">{videos.filter(v => v.platform === "YouTube").length}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">YouTube</div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {videos.map((video) => (
          <div key={video.id} className="bg-background border border-border rounded-md overflow-hidden group">
            <div className="aspect-video bg-muted relative overflow-hidden">
              {video.thumbnailUrl ? (
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${video.thumbnailUrl}')` }}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayCircle size={32} className="text-muted-foreground/50" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
              <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(video)} className="bg-black/60 p-1.5 text-white backdrop-blur-sm hover:bg-brand-400 transition-colors rounded-sm">
                  <Edit2 size={13} />
                </button>
                <button onClick={() => handleDelete(video.id)} className="bg-black/60 p-1.5 text-white backdrop-blur-sm hover:bg-red-500 transition-colors rounded-sm">
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
                <span className="text-xs text-muted-foreground">{video.category}</span>
                <button
                  onClick={() => toggleFeatured(video.id)}
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
        {videos.length === 0 && (
          <div className="col-span-3 text-center p-12 text-muted-foreground border border-dashed border-border rounded-md">
            <PlayCircle size={32} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm font-medium">No videos yet. Add your first video.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal isOpen={modal} onClose={() => setModal(false)} title={editingVideo ? "Edit Video" : "Add Video"}>
        <form onSubmit={handleSave} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Video Title *</label>
            <input
              type="text"
              placeholder="e.g. Wedding Highlight Reel 2026"
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Embed URL *</label>
            <input
              type="url"
              placeholder="https://www.youtube.com/embed/VIDEO_ID"
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm font-mono"
              value={form.embedUrl}
              onChange={(e) => setForm({ ...form, embedUrl: e.target.value })}
              required
            />
            <p className="text-xs text-muted-foreground">Use YouTube embed URL (youtube.com/embed/ID) or Vimeo player URL.</p>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Thumbnail URL</label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
              value={form.thumbnailUrl}
              onChange={(e) => setForm({ ...form, thumbnailUrl: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Category</label>
              <select
                className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 appearance-none cursor-pointer rounded-sm text-sm"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Platform</label>
              <select
                className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 appearance-none cursor-pointer rounded-sm text-sm"
                value={form.platform}
                onChange={(e) => setForm({ ...form, platform: e.target.value })}
              >
                <option value="YouTube">YouTube</option>
                <option value="Vimeo">Vimeo</option>
              </select>
            </div>
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 cursor-pointer accent-[#dd9454]"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            />
            <span className="text-sm font-semibold">Mark as Featured</span>
          </label>
          <button type="submit" className="w-full bg-brand-400 text-white font-bold tracking-widest uppercase text-sm py-3.5 hover:bg-brand-500 transition-colors rounded-sm">
            {editingVideo ? "Save Changes" : "Add Video"}
          </button>
        </form>
      </Modal>
    </>
  );
}
