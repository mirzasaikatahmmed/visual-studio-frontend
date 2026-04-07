"use client";

import { Plus, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";

const initialTestimonials = [
  { id: 1, name: "Emily & David", text: "\"Visual Studio captured our wedding beautifully. The album they delivered is breathtaking. A true masterpiece.\"", location: "Homepage" },
  { id: 2, name: "Sarah & Michael", text: "\"Dreams Decor completely blew us away. They took our vague ideas and Pinterest boards and created a venue that looked like it was out of a magazine. Absolutely stunning work!\"", location: "Events Decor Form" },
  { id: 3, name: "Atlas Tech Corp", text: "\"Incredible corporate headshots and event coverages. Our marketing materials look 10x better now.\"", location: "Visual Marketing" }
];

export default function TestimonialsAdminPage() {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ id: 0, name: "", text: "", location: "Homepage" });

  const handleOpenModal = (t?: typeof initialTestimonials[0]) => {
    if (t) {
      setForm(t);
    } else {
      setForm({ id: 0, name: "", text: "", location: "Homepage" });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.text) return;

    if (form.id === 0) {
      setTestimonials([{ ...form, id: Date.now() }, ...testimonials]);
    } else {
      setTestimonials(testimonials.map(t => t.id === form.id ? form : t));
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      setTestimonials(testimonials.filter(t => t.id !== id));
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold uppercase tracking-tight">Client Testimonials</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="px-6 py-3 bg-foreground text-background font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:opacity-90"
        >
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      <div className="bg-background border border-border overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted text-xs uppercase tracking-widest text-muted-foreground border-b border-border">
              <th className="p-4 font-bold">Client Name</th>
              <th className="p-4 font-bold">Review Text</th>
              <th className="p-4 font-bold">Location Displayed</th>
              <th className="p-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {testimonials.map((t) => (
               <tr key={t.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="p-4 font-bold uppercase tracking-widest text-xs whitespace-nowrap">{t.name}</td>
                  <td className="p-4 text-muted-foreground italic truncate max-w-sm">{t.text}</td>
                  <td className="p-4"><span className="px-2 py-1 bg-muted rounded text-xs font-bold uppercase">{t.location}</span></td>
                  <td className="p-4 text-right flex justify-end gap-3">
                     <button onClick={() => handleOpenModal(t)} className="hover:text-foreground text-muted-foreground"><Edit2 size={16} /></button>
                     <button onClick={() => handleDelete(t.id)} className="hover:text-red-500 text-muted-foreground"><Trash2 size={16} /></button>
                  </td>
               </tr>
            ))}
            {testimonials.length === 0 && (
               <tr><td colSpan={4} className="p-8 text-center text-muted-foreground font-medium">No testimonials found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={form.id ? "Edit Testimonial" : "Add Testimonial"}>
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Client Name</label>
            <input 
              type="text" 
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-foreground"
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Review Content</label>
            <textarea 
              rows={4}
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-foreground resize-none"
              value={form.text}
              onChange={(e) => setForm({...form, text: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Display Location</label>
            <select 
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-foreground appearance-none cursor-pointer"
              value={form.location}
              onChange={(e) => setForm({...form, location: e.target.value})}
            >
              <option value="Homepage">Homepage</option>
              <option value="Visual Marketing">Visual Marketing</option>
              <option value="Events Decor Form">Events Decor Form</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-foreground text-background font-bold tracking-widest uppercase text-sm py-4 hover:opacity-90">
            {form.id ? "Save Changes" : "Add Testimonial"}
          </button>
        </form>
      </Modal>
    </>
  );
}
