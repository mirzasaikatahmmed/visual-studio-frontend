"use client";

import { Plus, Trash2, Edit2, Image as ImageIcon, Briefcase } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";

type Client = {
  id: number;
  name: string;
  logoUrl: string;
};

type WorkImage = {
  id: number;
  title: string;
  category: string;
  url: string;
};

const initialClients: Client[] = [
  { id: 1, name: "Vogue", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Vogue_logo.svg/1024px-Vogue_logo.svg.png" },
  { id: 2, name: "Nike", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png" },
];

const initialWork: WorkImage[] = [
  { id: 1, title: "Summer Campaign", category: "Commercial", url: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=400" },
  { id: 2, title: "Tech Summit", category: "Corporate", url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=400" },
];

const categories = ["Commercial", "Corporate", "Fashion", "Product", "Other"];

export default function VisualMarketingPage() {
  const [activeTab, setActiveTab] = useState<"clients" | "work">("clients");
  const [clients, setClients] = useState(initialClients);
  const [work, setWork] = useState(initialWork);

  // Client Modal State
  const [clientModal, setClientModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [clientForm, setClientForm] = useState({ name: "", logoUrl: "" });

  // Work Modal State
  const [workModal, setWorkModal] = useState(false);
  const [editingWork, setEditingWork] = useState<WorkImage | null>(null);
  const [workForm, setWorkForm] = useState({ title: "", category: "Commercial", url: "" });

  // Client actions
  const openAddClient = () => {
    setEditingClient(null);
    setClientForm({ name: "", logoUrl: "" });
    setClientModal(true);
  };
  const openEditClient = (c: Client) => {
    setEditingClient(c);
    setClientForm({ name: c.name, logoUrl: c.logoUrl });
    setClientModal(true);
  };
  const handleSaveClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingClient) {
      setClients(clients.map(c => c.id === editingClient.id ? { ...clientForm, id: editingClient.id } : c));
    } else {
      setClients([{ ...clientForm, id: Date.now() }, ...clients]);
    }
    setClientModal(false);
  };
  const handleDeleteClient = (id: number) => {
    if (window.confirm("Delete this client logo?")) setClients(clients.filter(c => c.id !== id));
  };

  // Work actions
  const openAddWork = () => {
    setEditingWork(null);
    setWorkForm({ title: "", category: "Commercial", url: "" });
    setWorkModal(true);
  };
  const openEditWork = (w: WorkImage) => {
    setEditingWork(w);
    setWorkForm({ title: w.title, category: w.category, url: w.url });
    setWorkModal(true);
  };
  const handleSaveWork = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingWork) {
      setWork(work.map(w => w.id === editingWork.id ? { ...workForm, id: editingWork.id } : w));
    } else {
      setWork([{ ...workForm, id: Date.now() }, ...work]);
    }
    setWorkModal(false);
  };
  const handleDeleteWork = (id: number) => {
    if (window.confirm("Delete this work image?")) setWork(work.filter(w => w.id !== id));
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-tight">Visual Marketing</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage past clients and marketing portfolio.</p>
        </div>
        <button
          onClick={activeTab === "clients" ? openAddClient : openAddWork}
          className="px-5 py-2.5 bg-brand-400 text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-brand-500 transition-colors rounded-sm"
        >
          <Plus size={15} /> {activeTab === "clients" ? "Add Client" : "Add Work"}
        </button>
      </div>

      <div className="flex gap-1 mb-6 border-b border-border">
        {(["clients", "work"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors -mb-px border-b-2 ${
              activeTab === tab
                ? "border-brand-400 text-brand-400"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "clients" ? "We've Worked With" : "Our Work"}
          </button>
        ))}
      </div>

      {activeTab === "clients" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {clients.map((client) => (
            <div key={client.id} className="bg-background border border-border rounded-md p-4 group relative flex flex-col items-center justify-center aspect-square">
              <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button onClick={() => openEditClient(client)} className="bg-muted p-1.5 text-muted-foreground hover:text-foreground hover:bg-brand-400/20 rounded">
                  <Edit2 size={12} />
                </button>
                <button onClick={() => handleDeleteClient(client.id)} className="bg-muted p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded">
                  <Trash2 size={12} />
                </button>
              </div>
              <img src={client.logoUrl} alt={client.name} className="max-w-[70%] max-h-[50%] object-contain mb-3" />
              <div className="text-xs font-bold uppercase tracking-widest text-center text-muted-foreground">{client.name}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "work" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {work.map((w) => (
            <div key={w.id} className="bg-background border border-border rounded-md overflow-hidden group">
              <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${w.url}')` }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEditWork(w)} className="bg-black/60 p-2 text-white backdrop-blur-sm hover:bg-brand-400 rounded-sm">
                    <Edit2 size={13} />
                  </button>
                  <button onClick={() => handleDeleteWork(w.id)} className="bg-black/60 p-2 text-white backdrop-blur-sm hover:bg-red-500 rounded-sm">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="font-bold text-sm uppercase tracking-tight truncate">{w.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{w.category}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={clientModal} onClose={() => setClientModal(false)} title={editingClient ? "Edit Client" : "Add Client"}>
        <form onSubmit={handleSaveClient} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Client Name *</label>
            <input type="text" className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm" value={clientForm.name} onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })} required />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Logo URL *</label>
            <input type="url" className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm" value={clientForm.logoUrl} onChange={(e) => setClientForm({ ...clientForm, logoUrl: e.target.value })} required />
          </div>
          {clientForm.logoUrl && (
            <div className="h-32 bg-muted flex items-center justify-center p-4 border border-border rounded">
              <img src={clientForm.logoUrl} alt="Preview" className="max-h-full max-w-full object-contain" />
            </div>
          )}
          <button type="submit" className="w-full bg-brand-400 text-white font-bold tracking-widest uppercase text-sm py-3.5 hover:bg-brand-500 rounded-sm">
            Save Client
          </button>
        </form>
      </Modal>

      <Modal isOpen={workModal} onClose={() => setWorkModal(false)} title={editingWork ? "Edit Work Image" : "Add Work Image"}>
        <form onSubmit={handleSaveWork} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Image Title *</label>
            <input type="text" className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm" value={workForm.title} onChange={(e) => setWorkForm({ ...workForm, title: e.target.value })} required />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Image URL *</label>
            <input type="url" className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm" value={workForm.url} onChange={(e) => setWorkForm({ ...workForm, url: e.target.value })} required />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Category</label>
            <select className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 rounded-sm text-sm" value={workForm.category} onChange={(e) => setWorkForm({ ...workForm, category: e.target.value })}>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button type="submit" className="w-full bg-brand-400 text-white font-bold tracking-widest uppercase text-sm py-3.5 hover:bg-brand-500 rounded-sm">
            Save Work Image
          </button>
        </form>
      </Modal>
    </>
  );
}
