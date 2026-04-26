"use client";

import { Plus, Trash2, Edit2, Check, Image as ImageIcon, X } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";

type Feature = string;

type EventPackage = {
  id: number;
  name: string;
  price: string;
  description: string;
  features: Feature[];
  popular: boolean;
};

type GalleryPair = {
  id: number;
  label: string;
  beforeUrl: string;
  afterUrl: string;
};

type GalleryImage = {
  id: number;
  title: string;
  url: string;
};

const initialPackages: EventPackage[] = [
  {
    id: 1, name: "Classic Elegance", price: "$499", popular: false,
    description: "Perfect for intimate gatherings and smaller events.",
    features: ["Up to 50 guests", "4-hour setup window", "Balloon & floral arrangements", "Table centerpieces", "Basic lighting"],
  },
  {
    id: 2, name: "Luxury Dream", price: "$999", popular: true,
    description: "Our most popular package for weddings & milestone events.",
    features: ["Up to 150 guests", "Full-day event support", "Premium floral & decor", "Custom backdrop & arch", "Uplighting & draping", "Consultation session"],
  },
  {
    id: 3, name: "Custom Grandeur", price: "Custom", popular: false,
    description: "Fully tailored — we build your dream from scratch.",
    features: ["Unlimited guest capacity", "Dedicated event designer", "Bespoke theme creation", "Full venue transformation", "Day-of coordination", "Post-event cleanup"],
  },
];

const initialGalleryPairs: GalleryPair[] = [
  { id: 1, label: "Ballroom Transformation", beforeUrl: "", afterUrl: "" },
];

const initialGallery: GalleryImage[] = [
  { id: 1, title: "Rose Garden Setup", url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400" },
  { id: 2, title: "Fairy Light Ceiling", url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=400" },
];

const blankPackage = (): Omit<EventPackage, "id"> => ({
  name: "", price: "", description: "", features: [""], popular: false
});

export default function EventsAdminPage() {
  const [packages, setPackages] = useState(initialPackages);
  const [galleryPairs, setGalleryPairs] = useState(initialGalleryPairs);
  const [gallery, setGallery] = useState(initialGallery);
  const [activeTab, setActiveTab] = useState<"packages" | "gallery" | "before-after">("packages");

  const [pkgModal, setPkgModal] = useState(false);
  const [editingPkg, setEditingPkg] = useState<EventPackage | null>(null);
  const [pkgForm, setPkgForm] = useState(blankPackage());

  const [galleryModal, setGalleryModal] = useState(false);
  const [galleryForm, setGalleryForm] = useState({ title: "", url: "" });

  const openAddPkg = () => { setEditingPkg(null); setPkgForm(blankPackage()); setPkgModal(true); };
  const openEditPkg = (pkg: EventPackage) => {
    setEditingPkg(pkg);
    setPkgForm({ name: pkg.name, price: pkg.price, description: pkg.description, features: [...pkg.features], popular: pkg.popular });
    setPkgModal(true);
  };

  const handleSavePkg = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = { ...pkgForm, features: pkgForm.features.filter(f => f.trim()) };
    if (!cleaned.name || !cleaned.price) return;
    if (editingPkg) {
      setPackages(packages.map(p => p.id === editingPkg.id ? { ...cleaned, id: editingPkg.id } : p));
    } else {
      setPackages([...packages, { ...cleaned, id: Date.now() }]);
    }
    setPkgModal(false);
  };

  const handleDeletePkg = (id: number) => {
    if (window.confirm("Delete this package?")) setPackages(packages.filter(p => p.id !== id));
  };

  const addFeatureField = () => setPkgForm({ ...pkgForm, features: [...pkgForm.features, ""] });
  const updateFeature = (index: number, value: string) => {
    const updated = [...pkgForm.features];
    updated[index] = value;
    setPkgForm({ ...pkgForm, features: updated });
  };
  const removeFeature = (index: number) => {
    setPkgForm({ ...pkgForm, features: pkgForm.features.filter((_, i) => i !== index) });
  };

  const handleSaveGalleryImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryForm.title || !galleryForm.url) return;
    setGallery([...gallery, { id: Date.now(), ...galleryForm }]);
    setGalleryForm({ title: "", url: "" });
    setGalleryModal(false);
  };

  const handleDeleteGalleryImage = (id: number) => {
    setGallery(gallery.filter(g => g.id !== id));
  };

  const addPair = () => {
    setGalleryPairs([...galleryPairs, { id: Date.now(), label: "New Venue", beforeUrl: "", afterUrl: "" }]);
  };

  const updatePair = (id: number, field: keyof GalleryPair, value: string) => {
    setGalleryPairs(galleryPairs.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const deletePair = (id: number) => {
    setGalleryPairs(galleryPairs.filter(p => p.id !== id));
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-tight">Events & Decor — Dreams Decor</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage decoration packages, gallery, and before/after showcases.</p>
        </div>
        {activeTab === "packages" && (
          <button onClick={openAddPkg} className="px-5 py-2.5 bg-brand-400 text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-brand-500 transition-colors rounded-sm">
            <Plus size={15} /> New Package
          </button>
        )}
        {activeTab === "gallery" && (
          <button onClick={() => setGalleryModal(true)} className="px-5 py-2.5 bg-brand-400 text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-brand-500 transition-colors rounded-sm">
            <Plus size={15} /> Add Image
          </button>
        )}
        {activeTab === "before-after" && (
          <button onClick={addPair} className="px-5 py-2.5 bg-brand-400 text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-brand-500 transition-colors rounded-sm">
            <Plus size={15} /> Add Pair
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-border">
        {(["packages", "gallery", "before-after"] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors -mb-px border-b-2 ${
              activeTab === tab ? "border-brand-400 text-brand-400" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "before-after" ? "Before / After" : tab}
          </button>
        ))}
      </div>

      {/* Packages Tab */}
      {activeTab === "packages" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div key={pkg.id} className={`bg-background border rounded-md p-6 flex flex-col relative ${pkg.popular ? "border-brand-400 shadow-md" : "border-border"}`}>
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-400 text-white px-3 py-0.5 text-[10px] uppercase font-bold tracking-widest rounded-full">
                  Most Popular
                </span>
              )}
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-base font-bold uppercase tracking-tight">{pkg.name}</h3>
                <div className="flex gap-1.5 text-muted-foreground">
                  <button onClick={() => openEditPkg(pkg)} className="p-1.5 hover:text-brand-400 hover:bg-brand-400/10 rounded transition-colors">
                    <Edit2 size={14} />
                  </button>
                  <button onClick={() => handleDeletePkg(pkg.id)} className="p-1.5 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="text-3xl font-bold mb-2">{pkg.price}</div>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{pkg.description}</p>
              <ul className="space-y-2 flex-1">
                {pkg.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs">
                    <Check size={13} className="text-brand-400 mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-border">
                <button
                  onClick={() => setPackages(packages.map(p => p.id === pkg.id ? { ...p, popular: !p.popular } : p))}
                  className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded transition-colors ${
                    pkg.popular ? "bg-brand-400/15 text-brand-500" : "bg-muted text-muted-foreground hover:bg-brand-400/10"
                  }`}
                >
                  {pkg.popular ? "★ Popular" : "Mark Popular"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Gallery Tab */}
      {activeTab === "gallery" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {gallery.map((img) => (
            <div key={img.id} className="bg-background border border-border rounded-md overflow-hidden group">
              <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${img.url}')` }} />
                <button onClick={() => handleDeleteGalleryImage(img.id)} className="absolute top-2 right-2 bg-black/60 p-1.5 text-white backdrop-blur-sm hover:bg-red-500 transition-colors rounded-sm opacity-0 group-hover:opacity-100">
                  <Trash2 size={13} />
                </button>
              </div>
              <div className="p-3">
                <div className="font-semibold text-sm uppercase tracking-tight">{img.title}</div>
              </div>
            </div>
          ))}
          {gallery.length === 0 && (
            <div className="col-span-3 p-12 text-center text-muted-foreground border border-dashed border-border rounded-md">
              <ImageIcon size={32} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No gallery images. Add your event decoration photos.</p>
            </div>
          )}
        </div>
      )}

      {/* Before/After Tab */}
      {activeTab === "before-after" && (
        <div className="space-y-6">
          {galleryPairs.map((pair) => (
            <div key={pair.id} className="bg-background border border-border rounded-md p-5">
              <div className="flex items-center justify-between mb-4">
                <input
                  type="text"
                  value={pair.label}
                  onChange={(e) => updatePair(pair.id, "label", e.target.value)}
                  className="font-bold text-sm uppercase tracking-widest bg-transparent border-none outline-none focus:underline underline-offset-4 flex-1"
                />
                <button onClick={() => deletePair(pair.id)} className="p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Before Image URL</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={pair.beforeUrl}
                    onChange={(e) => updatePair(pair.id, "beforeUrl", e.target.value)}
                    className="w-full bg-muted border border-border px-3 py-2 outline-none focus:border-brand-400 transition-colors text-xs rounded-sm"
                  />
                  <div className="aspect-video bg-muted rounded overflow-hidden border border-border">
                    {pair.beforeUrl ? (
                      <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${pair.beforeUrl}')` }} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground/50 text-xs uppercase tracking-widest">Before</div>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">After Image URL</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={pair.afterUrl}
                    onChange={(e) => updatePair(pair.id, "afterUrl", e.target.value)}
                    className="w-full bg-muted border border-border px-3 py-2 outline-none focus:border-brand-400 transition-colors text-xs rounded-sm"
                  />
                  <div className="aspect-video bg-muted rounded overflow-hidden border border-brand-400/30">
                    {pair.afterUrl ? (
                      <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${pair.afterUrl}')` }} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-brand-400/50 text-xs uppercase tracking-widest">After</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {galleryPairs.length === 0 && (
            <div className="p-12 text-center text-muted-foreground border border-dashed border-border rounded-md">
              <p className="text-sm">No before/after pairs. Add venue transformation photos.</p>
            </div>
          )}
        </div>
      )}

      {/* Package Modal */}
      <Modal isOpen={pkgModal} onClose={() => setPkgModal(false)} title={editingPkg ? "Edit Package" : "Add Event Package"}>
        <form onSubmit={handleSavePkg} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Package Name *</label>
              <input type="text" placeholder="e.g. Silver Package" className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
                value={pkgForm.name} onChange={(e) => setPkgForm({ ...pkgForm, name: e.target.value })} required />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Price *</label>
              <input type="text" placeholder="e.g. $499 or Custom" className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
                value={pkgForm.price} onChange={(e) => setPkgForm({ ...pkgForm, price: e.target.value })} required />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Short Description</label>
            <textarea rows={2} placeholder="Brief description of this package..." className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors resize-none rounded-sm text-sm"
              value={pkgForm.description} onChange={(e) => setPkgForm({ ...pkgForm, description: e.target.value })} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Package Features</label>
              <button type="button" onClick={addFeatureField} className="text-xs text-brand-400 font-bold flex items-center gap-1 hover:text-brand-500">
                <Plus size={12} /> Add Feature
              </button>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {pkgForm.features.map((f, i) => (
                <div key={i} className="flex gap-2">
                  <input type="text" placeholder={`Feature ${i + 1}`} className="flex-1 bg-muted border border-border px-3 py-2 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
                    value={f} onChange={(e) => updateFeature(i, e.target.value)} />
                  <button type="button" onClick={() => removeFeature(i)} className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded transition-colors">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 cursor-pointer accent-[#dd9454]"
              checked={pkgForm.popular} onChange={(e) => setPkgForm({ ...pkgForm, popular: e.target.checked })} />
            <span className="text-sm font-semibold">Mark as Most Popular</span>
          </label>
          <button type="submit" className="w-full bg-brand-400 text-white font-bold tracking-widest uppercase text-sm py-3.5 hover:bg-brand-500 transition-colors rounded-sm">
            {editingPkg ? "Save Changes" : "Add Package"}
          </button>
        </form>
      </Modal>

      {/* Gallery Image Modal */}
      <Modal isOpen={galleryModal} onClose={() => setGalleryModal(false)} title="Add Gallery Image">
        <form onSubmit={handleSaveGalleryImage} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Image Title *</label>
            <input type="text" placeholder="e.g. Rose Garden Setup" className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
              value={galleryForm.title} onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })} required />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Image URL *</label>
            <input type="url" placeholder="https://..." className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
              value={galleryForm.url} onChange={(e) => setGalleryForm({ ...galleryForm, url: e.target.value })} required />
          </div>
          {galleryForm.url && (
            <div className="aspect-video bg-muted rounded overflow-hidden">
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${galleryForm.url}')` }} />
            </div>
          )}
          <button type="submit" className="w-full bg-brand-400 text-white font-bold tracking-widest uppercase text-sm py-3.5 hover:bg-brand-500 transition-colors rounded-sm">
            Add Image
          </button>
        </form>
      </Modal>
    </>
  );
}
