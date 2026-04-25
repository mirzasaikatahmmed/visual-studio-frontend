"use client";

import { Plus, Trash } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";

const initialImages = [
  { id: 1, title: "Wedding Hero Shot 1", category: "Home", url: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=400" },
  { id: 2, title: "Corporate Campaign", category: "Marketing", url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=400" },
];

export default function PortfoliosPage() {
  const [images, setImages] = useState(initialImages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newImage, setNewImage] = useState({ title: "", category: "Home", url: "" });
  
  const [pixiesetLink, setPixiesetLink] = useState("https://visualstudionyc.pixieset.com/portfolio/");
  const [saved, setSaved] = useState(false);

  const handleSavePixieset = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImage.title || !newImage.url) return;
    setImages([{ id: Date.now(), ...newImage }, ...images]);
    setIsModalOpen(false);
    setNewImage({ title: "", category: "Home", url: "" });
  };

  const handleDelete = (id: number) => {
    setImages(images.filter(img => img.id !== id));
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold uppercase tracking-tight">Portfolios Setup</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-foreground text-background font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <Plus size={16} /> Add Featured Image
        </button>
      </div>

      <div className="bg-background border border-border p-8 mb-12 relative overflow-hidden">
         <h2 className="text-xl font-bold uppercase tracking-tight mb-4">Pixieset Integration</h2>
         <p className="text-muted-foreground mb-6">Manage the primary link that connects to your Pixieset Gallery for easy client delivery.</p>
         
         <div className="flex gap-4">
            <input 
              type="url" 
              value={pixiesetLink} 
              onChange={(e) => setPixiesetLink(e.target.value)}
              className="flex-1 bg-muted border border-border px-4 py-3 outline-none" 
            />
            <button 
              onClick={handleSavePixieset}
              className="px-8 py-3 bg-foreground text-background font-bold tracking-widest uppercase text-xs hover:opacity-90 relative"
            >
              Update Link
            </button>
         </div>
         {saved && <span className="text-green-500 font-bold text-xs uppercase tracking-widest mt-4 block">Link Saved Successfully!</span>}
      </div>

      <h2 className="text-xl font-bold uppercase tracking-tight mb-6">Featured Web Images</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {images.map((img) => (
            <div key={img.id} className="bg-background border border-border group overflow-hidden flex flex-col">
               <div className="aspect-[4/3] bg-muted relative">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${img.url}')` }} />
                  <button 
                    onClick={() => handleDelete(img.id)}
                    className="absolute top-2 right-2 bg-black/50 p-2 text-white backdrop-blur-sm cursor-pointer hover:bg-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                     <Trash size={16} />
                  </button>
               </div>
               <div className="p-4 flex-1">
                  <div className="font-bold uppercase tracking-tight">{img.title}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Category: {img.category}</div>
               </div>
            </div>
         ))}
         {images.length === 0 && <div className="col-span-3 text-center p-8 text-muted-foreground border border-dashed border-border">No images found. Add some!</div>}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Featured Image">
        <form onSubmit={handleAddImage} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Image Title</label>
            <input 
              type="text" 
              placeholder="e.g. Summer Wedding" 
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-foreground"
              value={newImage.title}
              onChange={(e) => setNewImage({...newImage, title: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Image URL</label>
            <input 
              type="url" 
              placeholder="https://images.unsplash..." 
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-foreground"
              value={newImage.url}
              onChange={(e) => setNewImage({...newImage, url: e.target.value})}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">Enter a direct image link (Unsplash, Pixabay etc.) for now.</p>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">UI Placement / Category</label>
            <select 
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-foreground appearance-none cursor-pointer"
              value={newImage.category}
              onChange={(e) => setNewImage({...newImage, category: e.target.value})}
            >
              <option value="Home">Home Hero</option>
              <option value="Marketing">Visual Marketing</option>
              <option value="Events">Events</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-foreground text-background font-bold tracking-widest uppercase text-sm py-4 hover:opacity-90">
            Save Image
          </button>
        </form>
      </Modal>
    </>
  );
}
