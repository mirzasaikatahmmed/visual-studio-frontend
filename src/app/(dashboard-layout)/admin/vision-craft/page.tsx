"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Trash2, Edit2, Eye, EyeOff, Layers } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import {
  fetchVisionCraftItems,
  createVisionCraftItem,
  updateVisionCraftItem,
  deleteVisionCraftItem,
  type VisionCraftItem,
} from "@/lib/visionCraftApi";

const blankForm = () => ({
  title: "",
  description: "",
  imageUrl: "",
  sortOrder: 0,
  isActive: true,
});

type FormState = ReturnType<typeof blankForm>;

export default function VisionCraftPage() {
  const [items, setItems] = useState<VisionCraftItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<VisionCraftItem | null>(null);
  const [form, setForm] = useState<FormState>(blankForm());
  const [saving, setSaving] = useState(false);

  const loadItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setItems(await fetchVisionCraftItems());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void loadItems(); }, [loadItems]);

  const openAdd = () => {
    setEditing(null);
    setForm(blankForm());
    setModal(true);
  };

  const openEdit = (item: VisionCraftItem) => {
    setEditing(item);
    setForm({
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl ?? "",
      sortOrder: item.sortOrder,
      isActive: item.isActive,
    });
    setModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        imageUrl: form.imageUrl || undefined,
      };
      if (editing) {
        const updated = await updateVisionCraftItem(editing.id, payload);
        setItems(prev => prev.map(i => i.id === editing.id ? updated : i));
      } else {
        const created = await createVisionCraftItem(payload);
        setItems(prev => [created, ...prev]);
      }
      setModal(false);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await deleteVisionCraftItem(id);
      setItems(prev => prev.filter(i => i.id !== id));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to delete");
    }
  };

  const handleToggleActive = async (item: VisionCraftItem) => {
    try {
      const updated = await updateVisionCraftItem(item.id, { isActive: !item.isActive });
      setItems(prev => prev.map(i => i.id === item.id ? updated : i));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to update");
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
        <button onClick={() => void loadItems()} className="ml-2 underline">Retry</button>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-tight">Where Vision Meets Craft</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage the craft highlights displayed in this homepage section.
          </p>
        </div>
        <button
          onClick={openAdd}
          className="px-5 py-2.5 bg-brand-400 text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-brand-500 transition-colors rounded-sm"
        >
          <Plus size={15} /> Add Item
        </button>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-background border border-border rounded-md p-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Total Items</p>
          <p className="text-2xl font-bold">{items.length}</p>
        </div>
        <div className="bg-background border border-border rounded-md p-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Active</p>
          <p className="text-2xl font-bold">{items.filter(i => i.isActive).length}</p>
        </div>
      </div>

      {/* Items list */}
      <div className="grid grid-cols-1 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className={`bg-background border rounded-md p-5 flex gap-4 group transition-opacity ${
              item.isActive ? "border-border" : "border-border opacity-50"
            }`}
          >
            {item.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-14 h-14 rounded-md object-cover shrink-0 mt-0.5"
              />
            ) : (
              <div className="w-14 h-14 rounded-md bg-muted flex items-center justify-center shrink-0 mt-0.5">
                <Layers size={22} className="text-brand-400" />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="font-bold text-sm">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <button
                    onClick={() => handleToggleActive(item)}
                    title={item.isActive ? "Deactivate" : "Activate"}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {item.isActive ? <Eye size={15} /> : <EyeOff size={15} />}
                  </button>
                  <button
                    onClick={() => openEdit(item)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Edit2 size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-muted-foreground hover:text-red-500"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-3">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${
                  item.isActive
                    ? "bg-green-500/10 text-green-600"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {item.isActive ? "Active" : "Hidden"}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Order: {item.sortOrder}
                </span>
              </div>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-center p-12 text-muted-foreground border border-dashed border-border rounded-md">
            <Layers size={32} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm font-medium">No items yet. Add your first craft highlight.</p>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={modal}
        onClose={() => setModal(false)}
        title={editing ? "Edit Item" : "Add Item"}
      >
        <form onSubmit={handleSave} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Title *</label>
            <input
              type="text"
              placeholder="e.g. Precision Lighting"
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Description *</label>
            <textarea
              placeholder="Describe this craft highlight..."
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm h-28 resize-none"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Image URL</label>
            <input
              type="url"
              placeholder="https://..."
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Sort Order</label>
              <input
                type="number"
                min={0}
                className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
                value={form.sortOrder}
                onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Status</label>
              <select
                className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 appearance-none cursor-pointer rounded-sm text-sm"
                value={form.isActive ? "true" : "false"}
                onChange={(e) => setForm({ ...form, isActive: e.target.value === "true" })}
              >
                <option value="true">Active</option>
                <option value="false">Hidden</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-brand-400 text-white font-bold tracking-widest uppercase text-sm py-3.5 hover:bg-brand-500 transition-colors rounded-sm disabled:opacity-60"
          >
            {saving ? "Saving..." : editing ? "Save Changes" : "Add Item"}
          </button>
        </form>
      </Modal>
    </>
  );
}
