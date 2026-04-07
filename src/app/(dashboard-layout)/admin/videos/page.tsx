"use client";

import { Plus, Video, PlayCircle, MoreVertical, Trash } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";

const initialVideos = [
  { id: 1, title: "Artisan Coffee Commercial", category: "Commercial", source: "YouTube" },
  { id: 2, title: "Emily & David Wedding", category: "Event", source: "Vimeo" },
  { id: 3, title: "Atlas Tech Summit", category: "Corporate", source: "YouTube" },
];

export default function VideosPage() {
  const [videos, setVideos] = useState(initialVideos);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newVideo, setNewVideo] = useState({ title: "", category: "Commercial", source: "YouTube" });
  
  const [mainLink, setMainLink] = useState("https://youtube.com/@visualstudio");
  const [saved, setSaved] = useState(false);

  const handleSaveMainLink = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVideo.title) return;
    setVideos([{ id: Date.now(), ...newVideo }, ...videos]);
    setIsModalOpen(false);
    setNewVideo({ title: "", category: "Commercial", source: "YouTube" });
  };

  const handleDelete = (id: number) => {
    setVideos(videos.filter(v => v.id !== id));
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold uppercase tracking-tight">Video Gallery</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-foreground text-background font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:opacity-90"
        >
          <Plus size={16} /> Add Video Link
        </button>
      </div>

      <div className="bg-background border border-border p-8 mb-12 flex items-start justify-between">
         <div>
            <h2 className="text-xl font-bold uppercase tracking-tight mb-2">Main YouTube Link</h2>
            <p className="text-muted-foreground text-sm">Directs users to your full YouTube channel.</p>
         </div>
         <div className="flex flex-col items-end gap-4 w-1/2">
            <div className="flex gap-4 w-full">
               <input 
                 type="url" 
                 value={mainLink}
                 onChange={(e) => setMainLink(e.target.value)}
                 className="flex-1 bg-muted border border-border px-4 py-2 outline-none" 
               />
               <button onClick={handleSaveMainLink} className="px-6 py-2 bg-foreground text-background font-bold tracking-widest uppercase text-xs hover:opacity-90">Save</button>
            </div>
            {saved && <span className="text-green-500 font-bold text-xs uppercase tracking-widest block">Saved successfully!</span>}
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {videos.map((video) => (
            <div key={video.id} className="bg-background border border-border group">
               <div className="aspect-video bg-muted relative flex items-center justify-center">
                  <PlayCircle size={32} className="text-muted-foreground" />
                  <button 
                    onClick={() => handleDelete(video.id)}
                    className="absolute top-2 right-2 bg-black/50 p-2 text-white backdrop-blur-sm cursor-pointer hover:bg-red-500 opacity-0 group-hover:opacity-100 transition-all"
                  >
                     <Trash size={16} />
                  </button>
               </div>
               <div className="p-4">
                  <div className="font-bold uppercase tracking-tight truncate">{video.title}</div>
                  <div className="flex justify-between items-center mt-2">
                     <div className="text-xs text-muted-foreground uppercase tracking-widest">{video.category}</div>
                     <div className="text-xs font-bold px-2 py-1 bg-muted">{video.source}</div>
                  </div>
               </div>
            </div>
         ))}
         {videos.length === 0 && <div className="col-span-3 text-center p-8 text-muted-foreground border border-dashed border-border">No videos found.</div>}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Featured Video">
        <form onSubmit={handleAddVideo} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Video Title</label>
            <input 
              type="text" 
              placeholder="e.g. Wedding Highlight Reel" 
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-foreground"
              value={newVideo.title}
              onChange={(e) => setNewVideo({...newVideo, title: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Category</label>
            <select 
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-foreground appearance-none cursor-pointer"
              value={newVideo.category}
              onChange={(e) => setNewVideo({...newVideo, category: e.target.value})}
            >
              <option value="Commercial">Commercial</option>
              <option value="Event">Event</option>
              <option value="Corporate">Corporate</option>
              <option value="Fashion">Fashion</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Platform Source</label>
            <select 
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-foreground appearance-none cursor-pointer"
              value={newVideo.source}
              onChange={(e) => setNewVideo({...newVideo, source: e.target.value})}
            >
              <option value="YouTube">YouTube</option>
              <option value="Vimeo">Vimeo</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-foreground text-background font-bold tracking-widest uppercase text-sm py-4 hover:opacity-90">
            Save Video
          </button>
        </form>
      </Modal>
    </>
  );
}
