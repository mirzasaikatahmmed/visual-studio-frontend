"use client";

import { Plus, Trash2, Edit2, ExternalLink, Tag, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";

type PortfolioImage = {
  id: number;
  title: string;
  category: string;
  url: string;
  alt: string;
};

type Category = { id: number; name: string; slug: string; count: number };

const initialCategories: Category[] = [
  { id: 1, name: "Wedding Ceremony", slug: "wedding-ceremony", count: 24 },
  { id: 2, name: "Henna Ceremony", slug: "henna-ceremony", count: 18 },
  { id: 3, name: "Group Pictures", slug: "group-pictures", count: 12 },
  { id: 4, name: "Studio Photoshoot", slug: "studio-photoshoot", count: 30 },
  { id: 5, name: "Gender Reveal", slug: "gender-reveal", count: 8 },
  { id: 6, name: "Baby Shower Ceremony", slug: "baby-shower", count: 15 },
  { id: 7, name: "Maternity Ceremony", slug: "maternity", count: 20 },
  { id: 8, name: "Baby Photography", slug: "baby-photography", count: 16 },
  { id: 9, name: "Birthday Ceremony", slug: "birthday", count: 10 },
];

const initialImages: PortfolioImage[] = [
  { id: 1, title: "Wedding Hero Shot", category: "Wedding Ceremony", url: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=400", alt: "Bride and groom at ceremony" },
  { id: 2, title: "Corporate Campaign", category: "Studio Photoshoot", url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=400", alt: "Corporate photography" },
  { id: 3, title: "Maternity Glow", category: "Maternity Ceremony", url: "https://images.unsplash.com/photo-1519895009398-30e8d6bccc58?q=80&w=400", alt: "Maternity photography" },
];

const blankImage = (): Omit<PortfolioImage, "id"> => ({
  title: "", category: "Wedding Ceremony", url: "", alt: ""
});

export default function PortfoliosPage() {
  const [activeTab, setActiveTab] = useState<"images" | "categories">("images");
  const [images, setImages] = useState(initialImages);
  const [categories, setCategories] = useState(initialCategories);
  const [pixiesetLink, setPixiesetLink] = useState("https://gallery.visualstudioslens.com/");
  const [pixiesetSaved, setPixiesetSaved] = useState(false);

  const [imageModal, setImageModal] = useState(false);
  const [editingImage, setEditingImage] = useState<PortfolioImage | null>(null);
  const [imageForm, setImageForm] = useState(blankImage());

  const [catModal, setCatModal] = useState(false);
  const [catForm, setCatForm] = useState({ name: "", slug: "" });

  const openAddImage = () => {
    setEditingImage(null);
    setImageForm(blankImage());
    setImageModal(true);
  };

  const openEditImage = (img: PortfolioImage) => {
    setEditingImage(img);
    setImageForm({ title: img.title, category: img.category, url: img.url, alt: img.alt });
    setImageModal(true);
  };

  const handleSaveImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageForm.title || !imageForm.url) return;
    if (editingImage) {
      setImages(images.map(i => i.id === editingImage.id ? { ...imageForm, id: editingImage.id } : i));
    } else {
      setImages([{ ...imageForm, id: Date.now() }, ...images]);
    }
    setImageModal(false);
  };

  const handleDeleteImage = (id: number) => {
    if (window.confirm("Delete this image?")) setImages(images.filter(i => i.id !== id));
  };

  const handleSavePixieset = () => {
    setPixiesetSaved(true);
    setTimeout(() => setPixiesetSaved(false), 2500);
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catForm.name) return;
    const slug = catForm.slug || catForm.name.toLowerCase().replace(/\s+/g, "-");
    setCategories([...categories, { id: Date.now(), name: catForm.name, slug, count: 0 }]);
    setCatForm({ name: "", slug: "" });
    setCatModal(false);
  };

  const handleDeleteCategory = (id: number) => {
    if (window.confirm("Delete this category?")) setCategories(categories.filter(c => c.id !== id));
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-tight">Portfolio Management</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage categories, featured images, and gallery links.</p>
        </div>
        <button
          onClick={activeTab === "images" ? openAddImage : () => setCatModal(true)}
          className="px-5 py-2.5 bg-brand-400 text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-brand-500 transition-colors rounded-sm"
        >
          <Plus size={15} /> {activeTab === "images" ? "Add Image" : "Add Category"}
        </button>
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
              <a
                href={pixiesetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 border border-border hover:border-brand-400 hover:text-brand-400 transition-colors text-sm rounded-sm"
              >
                <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-border">
        {(["images", "categories"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors -mb-px border-b-2 ${
              activeTab === tab
                ? "border-brand-400 text-brand-400"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "images" ? "Featured Images" : "Categories"}
          </button>
        ))}
      </div>

      {/* Images Tab */}
      {activeTab === "images" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {images.map((img) => (
            <div key={img.id} className="bg-background border border-border rounded-md overflow-hidden group">
              <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${img.url}')` }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openEditImage(img)}
                    className="bg-black/60 p-2 text-white backdrop-blur-sm hover:bg-brand-400 transition-colors rounded-sm"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    onClick={() => handleDeleteImage(img.id)}
                    className="bg-black/60 p-2 text-white backdrop-blur-sm hover:bg-red-500 transition-colors rounded-sm"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="font-bold text-sm uppercase tracking-tight truncate">{img.title}</div>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <Tag size={11} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{img.category}</span>
                </div>
              </div>
            </div>
          ))}
          {images.length === 0 && (
            <div className="col-span-3 text-center p-12 text-muted-foreground border border-dashed border-border rounded-md">
              <ImageIcon size={32} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium">No featured images yet.</p>
              <p className="text-xs mt-1">Add images to showcase on the portfolio page.</p>
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
                <th className="p-4 font-bold">Category Name</th>
                <th className="p-4 font-bold">Slug</th>
                <th className="p-4 font-bold text-center">Photo Count</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4 font-semibold text-sm">{cat.name}</td>
                  <td className="p-4 text-xs text-muted-foreground font-mono">{cat.slug}</td>
                  <td className="p-4 text-center">
                    <span className="px-2 py-1 bg-brand-400/10 text-brand-500 text-xs font-bold rounded">{cat.count}</span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Image Modal */}
      <Modal isOpen={imageModal} onClose={() => setImageModal(false)} title={editingImage ? "Edit Featured Image" : "Add Featured Image"}>
        <form onSubmit={handleSaveImage} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Image Title *</label>
            <input
              type="text"
              placeholder="e.g. Summer Wedding Ceremony"
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
              value={imageForm.title}
              onChange={(e) => setImageForm({ ...imageForm, title: e.target.value })}
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Image URL *</label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
              value={imageForm.url}
              onChange={(e) => setImageForm({ ...imageForm, url: e.target.value })}
              required
            />
            <p className="text-xs text-muted-foreground">Enter a direct image URL (Unsplash, Pixieset CDN, etc.)</p>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Alt Text (SEO)</label>
            <input
              type="text"
              placeholder="Describe the image for accessibility"
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
              value={imageForm.alt}
              onChange={(e) => setImageForm({ ...imageForm, alt: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Category</label>
            <select
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 appearance-none cursor-pointer rounded-sm text-sm"
              value={imageForm.category}
              onChange={(e) => setImageForm({ ...imageForm, category: e.target.value })}
            >
              {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
          </div>
          {imageForm.url && (
            <div className="aspect-video bg-muted rounded overflow-hidden relative">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${imageForm.url}')` }} />
            </div>
          )}
          <button type="submit" className="w-full bg-brand-400 text-white font-bold tracking-widest uppercase text-sm py-3.5 hover:bg-brand-500 transition-colors rounded-sm">
            {editingImage ? "Save Changes" : "Add Image"}
          </button>
        </form>
      </Modal>

      {/* Category Modal */}
      <Modal isOpen={catModal} onClose={() => setCatModal(false)} title="Add Portfolio Category">
        <form onSubmit={handleAddCategory} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Category Name *</label>
            <input
              type="text"
              placeholder="e.g. Engagement Session"
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
              value={catForm.name}
              onChange={(e) => setCatForm({ ...catForm, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">URL Slug (optional)</label>
            <input
              type="text"
              placeholder="e.g. engagement-session"
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm font-mono"
              value={catForm.slug}
              onChange={(e) => setCatForm({ ...catForm, slug: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">Auto-generated from name if left blank.</p>
          </div>
          <button type="submit" className="w-full bg-brand-400 text-white font-bold tracking-widest uppercase text-sm py-3.5 hover:bg-brand-500 transition-colors rounded-sm">
            Add Category
          </button>
        </form>
      </Modal>
    </>
  );
}
