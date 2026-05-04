"use client";

import { Plus, Edit2, Trash2, Star, LayoutGrid, List } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
  location: string;
  featured: boolean;
  avatarUrl: string;
};

const displayLocations = ["Homepage", "Events Page", "Visual Marketing", "Portfolio Page", "Store Page"];

const initialTestimonials: Testimonial[] = [];

const blankTestimonial = (): Omit<Testimonial, "id"> => ({
  name: "", role: "", text: "", rating: 5, location: "Homepage", featured: false, avatarUrl: ""
});

function StarRating({ rating, onChange }: { rating: number; onChange?: (r: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange?.(star)}
          onMouseEnter={() => onChange && setHover(star)}
          onMouseLeave={() => onChange && setHover(0)}
          className={`transition-colors ${onChange ? "cursor-pointer" : "cursor-default"}`}
        >
          <Star
            size={onChange ? 20 : 13}
            className={star <= (hover || rating) ? "text-brand-400 fill-brand-400" : "text-muted-foreground/30"}
          />
        </button>
      ))}
    </div>
  );
}

export default function TestimonialsAdminPage() {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [locationFilter, setLocationFilter] = useState("All");
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState<Omit<Testimonial, "id"> & { id?: number }>(blankTestimonial());

  const openAdd = () => { setForm(blankTestimonial()); setModal(true); };
  const openEdit = (t: Testimonial) => {
    setForm({ id: t.id, name: t.name, role: t.role, text: t.text, rating: t.rating, location: t.location, featured: t.featured, avatarUrl: t.avatarUrl });
    setModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.text) return;
    if (form.id) {
      setTestimonials(testimonials.map(t => t.id === form.id ? { ...form, id: form.id! } : t));
    } else {
      setTestimonials([{ ...form, id: Date.now() }, ...testimonials]);
    }
    setModal(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Delete this testimonial?")) setTestimonials(testimonials.filter(t => t.id !== id));
  };

  const toggleFeatured = (id: number) => {
    setTestimonials(testimonials.map(t => t.id === id ? { ...t, featured: !t.featured } : t));
  };

  const filtered = testimonials.filter(t => locationFilter === "All" || t.location === locationFilter);

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-tight">Client Testimonials</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage reviews displayed across the website.</p>
        </div>
        <button onClick={openAdd} className="px-5 py-2.5 bg-brand-400 text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-brand-500 transition-colors rounded-sm">
          <Plus size={15} /> Add Testimonial
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-background border border-border rounded-md p-4 text-center">
          <div className="text-2xl font-bold">{testimonials.length}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Total Reviews</div>
        </div>
        <div className="bg-background border border-border rounded-md p-4 text-center">
          <div className="text-2xl font-bold text-brand-400">{testimonials.filter(t => t.featured).length}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Featured</div>
        </div>
        <div className="bg-background border border-border rounded-md p-4 text-center">
          <div className="text-2xl font-bold text-yellow-500">
            {(testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)}
          </div>
          <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Avg Rating</div>
        </div>
      </div>

      {/* Filters + View Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <select
          className="bg-muted px-4 py-2.5 outline-none border-none text-xs font-bold uppercase tracking-widest cursor-pointer rounded-sm"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        >
          <option value="All">All Locations</option>
          {displayLocations.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
        <div className="flex items-center gap-1 border border-border rounded-sm p-0.5">
          <button onClick={() => setViewMode("list")} className={`p-2 rounded-sm transition-colors ${viewMode === "list" ? "bg-brand-400 text-white" : "text-muted-foreground hover:bg-muted"}`}>
            <List size={15} />
          </button>
          <button onClick={() => setViewMode("grid")} className={`p-2 rounded-sm transition-colors ${viewMode === "grid" ? "bg-brand-400 text-white" : "text-muted-foreground hover:bg-muted"}`}>
            <LayoutGrid size={15} />
          </button>
        </div>
      </div>

      {/* List View */}
      {viewMode === "list" && (
        <div className="bg-background border border-border rounded-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-muted/50 text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border">
                  <th className="p-4 font-bold">Client</th>
                  <th className="p-4 font-bold">Review</th>
                  <th className="p-4 font-bold hidden sm:table-cell">Rating</th>
                  <th className="p-4 font-bold hidden md:table-cell">Location</th>
                  <th className="p-4 font-bold text-center hidden lg:table-cell">Featured</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((t) => (
                  <tr key={t.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {t.avatarUrl ? (
                          <div className="w-8 h-8 rounded-full bg-muted overflow-hidden shrink-0">
                            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${t.avatarUrl}')` }} />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-brand-400/20 flex items-center justify-center shrink-0 text-xs font-bold text-brand-500">
                            {t.name[0]}
                          </div>
                        )}
                        <div>
                          <div className="font-semibold text-sm whitespace-nowrap">{t.name}</div>
                          <div className="text-xs text-muted-foreground">{t.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground italic truncate max-w-xs">{t.text}</td>
                    <td className="p-4 hidden sm:table-cell"><StarRating rating={t.rating} /></td>
                    <td className="p-4 hidden md:table-cell">
                      <span className="px-2 py-0.5 bg-muted rounded text-xs font-semibold">{t.location}</span>
                    </td>
                    <td className="p-4 text-center hidden lg:table-cell">
                      <button onClick={() => toggleFeatured(t.id)}
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded transition-colors ${
                          t.featured ? "bg-brand-400/15 text-brand-500" : "bg-muted text-muted-foreground hover:bg-brand-400/10"
                        }`}
                      >
                        {t.featured ? "Featured" : "Feature"}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-1.5">
                        <button onClick={() => openEdit(t)} className="p-1.5 text-muted-foreground hover:text-brand-400 hover:bg-brand-400/10 rounded transition-colors">
                          <Edit2 size={14} />
                        </button>
                        <button onClick={() => handleDelete(t.id)} className="p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No testimonials for this location.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((t) => (
            <div key={t.id} className={`bg-background border rounded-md p-5 flex flex-col relative ${t.featured ? "border-brand-400/60" : "border-border"}`}>
              {t.featured && (
                <span className="absolute top-3 right-3 bg-brand-400/15 text-brand-500 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">
                  Featured
                </span>
              )}
              <div className="flex items-center gap-3 mb-3">
                {t.avatarUrl ? (
                  <div className="w-10 h-10 rounded-full bg-muted overflow-hidden shrink-0">
                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${t.avatarUrl}')` }} />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-brand-400/20 flex items-center justify-center text-sm font-bold text-brand-500">
                    {t.name[0]}
                  </div>
                )}
                <div>
                  <div className="font-bold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
              <StarRating rating={t.rating} />
              <p className="text-sm text-muted-foreground italic mt-3 flex-1 leading-relaxed line-clamp-3">{t.text}</p>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                <span className="px-2 py-0.5 bg-muted rounded text-[10px] font-semibold">{t.location}</span>
                <div className="flex gap-1.5">
                  <button onClick={() => openEdit(t)} className="p-1.5 text-muted-foreground hover:text-brand-400 hover:bg-brand-400/10 rounded transition-colors">
                    <Edit2 size={13} />
                  </button>
                  <button onClick={() => handleDelete(t.id)} className="p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded transition-colors">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-3 p-12 text-center text-muted-foreground border border-dashed border-border rounded-md">
              <Star size={32} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No testimonials for this location.</p>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      <Modal isOpen={modal} onClose={() => setModal(false)} title={form.id ? "Edit Testimonial" : "Add Testimonial"}>
        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Client Name *</label>
              <input type="text" placeholder="e.g. Emily & David" className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Client Role / Label</label>
              <input type="text" placeholder="e.g. Wedding Clients" className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
                value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Review Text *</label>
            <textarea rows={4} placeholder="Write the client's review..." className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors resize-none rounded-sm text-sm"
              value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} required />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Star Rating</label>
            <StarRating rating={form.rating} onChange={(r) => setForm({ ...form, rating: r })} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Avatar / Logo URL</label>
            <input type="url" placeholder="https://i.pravatar.cc/150?img=47" className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
              value={form.avatarUrl} onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Display Location</label>
            <select className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 appearance-none cursor-pointer rounded-sm text-sm"
              value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}>
              {displayLocations.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 cursor-pointer accent-[#dd9454]"
              checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
            <span className="text-sm font-semibold">Feature in homepage marquee</span>
          </label>
          <button type="submit" className="w-full bg-brand-400 text-white font-bold tracking-widest uppercase text-sm py-3.5 hover:bg-brand-500 transition-colors rounded-sm">
            {form.id ? "Save Changes" : "Add Testimonial"}
          </button>
        </form>
      </Modal>
    </>
  );
}
