"use client";

import { Plus, Trash2, Edit2, HelpCircle } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";

type FAQ = {
  id: number;
  question: string;
  answer: string;
  category: string;
};

const initialFAQs: FAQ[] = [
  { id: 1, question: "How far in advance should we book?", answer: "We recommend booking 6-12 months in advance for weddings and 1-2 months for portrait sessions.", category: "Booking" },
  { id: 2, question: "Do you travel for weddings?", answer: "Yes! We love capturing love stories worldwide. Travel fees may apply depending on the destination.", category: "General" },
  { id: 3, question: "When will we get our photos?", answer: "Wedding galleries are typically delivered within 6-8 weeks. Portrait sessions take 2-3 weeks.", category: "Delivery" },
];

const blankFAQ = (): Omit<FAQ, "id"> => ({
  question: "", answer: "", category: "General"
});

const categories = ["General", "Booking", "Delivery", "Pricing", "Other"];

export default function FAQPage() {
  const [faqs, setFaqs] = useState(initialFAQs);
  const [modal, setModal] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [form, setForm] = useState(blankFAQ());

  const openAdd = () => {
    setEditingFAQ(null);
    setForm(blankFAQ());
    setModal(true);
  };

  const openEdit = (f: FAQ) => {
    setEditingFAQ(f);
    setForm({ question: f.question, answer: f.answer, category: f.category });
    setModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.question || !form.answer) return;
    if (editingFAQ) {
      setFaqs(faqs.map(f => f.id === editingFAQ.id ? { ...form, id: editingFAQ.id } : f));
    } else {
      setFaqs([{ ...form, id: Date.now() }, ...faqs]);
    }
    setModal(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Delete this FAQ?")) setFaqs(faqs.filter(f => f.id !== id));
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-tight">Frequently Asked Questions</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage FAQs displayed on the website.</p>
        </div>
        <button
          onClick={openAdd}
          className="px-5 py-2.5 bg-brand-400 text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-brand-500 transition-colors rounded-sm"
        >
          <Plus size={15} /> Add FAQ
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="bg-background border border-border rounded-md p-5 flex gap-4 group">
            <div className="mt-1">
              <HelpCircle size={20} className="text-brand-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm">{faq.question}</h3>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(faq)} className="text-muted-foreground hover:text-foreground">
                    <Edit2 size={15} />
                  </button>
                  <button onClick={() => handleDelete(faq.id)} className="text-muted-foreground hover:text-red-500">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{faq.answer}</p>
              <div className="mt-3 inline-block px-2 py-1 bg-muted rounded text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {faq.category}
              </div>
            </div>
          </div>
        ))}
        {faqs.length === 0 && (
          <div className="text-center p-12 text-muted-foreground border border-dashed border-border rounded-md">
            <HelpCircle size={32} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm font-medium">No FAQs yet. Add your first question.</p>
          </div>
        )}
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editingFAQ ? "Edit FAQ" : "Add FAQ"}>
        <form onSubmit={handleSave} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Question *</label>
            <input
              type="text"
              placeholder="e.g. How far in advance should we book?"
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
              value={form.question}
              onChange={(e) => setForm({ ...form, question: e.target.value })}
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Answer *</label>
            <textarea
              placeholder="Provide the answer here..."
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm h-32 resize-none"
              value={form.answer}
              onChange={(e) => setForm({ ...form, answer: e.target.value })}
              required
            />
          </div>
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
          <button type="submit" className="w-full bg-brand-400 text-white font-bold tracking-widest uppercase text-sm py-3.5 hover:bg-brand-500 transition-colors rounded-sm">
            {editingFAQ ? "Save Changes" : "Add FAQ"}
          </button>
        </form>
      </Modal>
    </>
  );
}
