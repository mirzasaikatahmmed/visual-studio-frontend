"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Trash2, Edit2, HelpCircle } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { fetchFaqs, createFaq, updateFaq, deleteFaq, type Faq } from "@/lib/faqApi";

const CATEGORIES = ["General", "Booking", "Delivery", "Pricing", "Other"];

const blankForm = () => ({ question: "", answer: "", category: "General" });

export default function FAQPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modal, setModal] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<Faq | null>(null);
  const [form, setForm] = useState(blankForm());
  const [saving, setSaving] = useState(false);

  const loadFaqs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setFaqs(await fetchFaqs());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void loadFaqs(); }, [loadFaqs]);

  const openAdd = () => {
    setEditingFAQ(null);
    setForm(blankForm());
    setModal(true);
  };

  const openEdit = (f: Faq) => {
    setEditingFAQ(f);
    setForm({ question: f.question, answer: f.answer, category: f.category ?? "General" });
    setModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingFAQ) {
        const updated = await updateFaq(editingFAQ.id, form);
        setFaqs(prev => prev.map(f => f.id === editingFAQ.id ? updated : f));
      } else {
        const created = await createFaq(form);
        setFaqs(prev => [created, ...prev]);
      }
      setModal(false);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this FAQ?")) return;
    try {
      await deleteFaq(id);
      setFaqs(prev => prev.filter(f => f.id !== id));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to delete");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-500 text-sm">
        {error}
        <button onClick={() => void loadFaqs()} className="ml-2 underline">Retry</button>
      </div>
    );
  }

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
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-bold text-sm">{faq.question}</h3>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <button onClick={() => openEdit(faq)} className="text-muted-foreground hover:text-foreground">
                    <Edit2 size={15} />
                  </button>
                  <button onClick={() => handleDelete(faq.id)} className="text-muted-foreground hover:text-red-500">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{faq.answer}</p>
              {faq.category && (
                <div className="mt-3 inline-block px-2 py-1 bg-muted rounded text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {faq.category}
                </div>
              )}
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
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-brand-400 text-white font-bold tracking-widest uppercase text-sm py-3.5 hover:bg-brand-500 transition-colors rounded-sm disabled:opacity-60"
          >
            {saving ? "Saving..." : editingFAQ ? "Save Changes" : "Add FAQ"}
          </button>
        </form>
      </Modal>
    </>
  );
}
