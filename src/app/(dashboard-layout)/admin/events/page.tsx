"use client";

import { Plus, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";

const initialPackages = [
  { id: 1, name: "Classic Elegance", price: "$499", popular: false },
  { id: 2, name: "Luxury Dream", price: "$999", popular: true },
  { id: 3, name: "Custom Grandeur", price: "Custom", popular: false }
];

export default function EventsAdminPage() {
  const [packages, setPackages] = useState(initialPackages);
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [newPackage, setNewPackage] = useState({ name: "", price: "", popular: false });

  const handleAddPackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPackage.name || !newPackage.price) return;
    setPackages([...packages, { id: Date.now(), ...newPackage }]);
    setIsPackageModalOpen(false);
    setNewPackage({ name: "", price: "", popular: false });
  };

  const handleDeletePackage = (id: number) => {
    setPackages(packages.filter(p => p.id !== id));
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold uppercase tracking-tight">Events Packages</h1>
        <button 
          onClick={() => setIsPackageModalOpen(true)}
          className="px-6 py-3 bg-foreground text-background font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:opacity-90"
        >
          <Plus size={16} /> New Package
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {packages.map((pkg) => (
          <div key={pkg.id} className={`bg-background border p-6 flex flex-col ${pkg.popular ? 'border-foreground shadow-lg relative' : 'border-border'}`}>
             {pkg.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-foreground text-background px-3 py-1 text-[10px] uppercase font-bold tracking-widest">Popular</span>}
             <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold uppercase tracking-tight pr-4">{pkg.name}</h3>
                <div className="flex gap-2 text-muted-foreground">
                   <button className="hover:text-foreground"><Edit2 size={16} /></button>
                   <button onClick={() => handleDeletePackage(pkg.id)} className="hover:text-red-500"><Trash2 size={16} /></button>
                </div>
             </div>
             <div className="text-3xl font-bold mb-4">{pkg.price}</div>
             <p className="text-sm text-muted-foreground mb-6 flex-1">Features: Setup, Breakdown, Consultation, Basic Decor, Lighting</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold uppercase tracking-tight">Transformation Gallery (Before/After)</h2>
        <button className="text-sm font-bold uppercase tracking-widest border-b border-foreground">Upload Pair</button>
      </div>

      <div className="bg-background border border-border p-6 flex gap-6 overflow-x-auto">
         <div className="min-w-[300px] border border-border">
            <div className="aspect-video bg-muted relative border-b border-dashed border-border flex items-center justify-center text-muted-foreground text-sm uppercase tracking-widest">
               Before Image
            </div>
            <div className="aspect-video bg-muted relative flex items-center justify-center text-muted-foreground text-sm uppercase tracking-widest">
               After Image
            </div>
            <div className="p-3 bg-red-500/10 text-red-500 text-center font-bold text-xs uppercase tracking-widest cursor-pointer hover:bg-red-500 hover:text-white transition-colors">Delete Pair</div>
         </div>
         {/* Add button placeholder */}
         <div className="min-w-[300px] border border-border border-dashed flex flex-col items-center justify-center text-muted-foreground cursor-pointer hover:bg-muted/50 transition-colors py-12">
            <Plus size={32} className="mb-2" />
            <span className="text-xs uppercase font-bold tracking-widest">Add New Pair</span>
         </div>
      </div>

      <Modal isOpen={isPackageModalOpen} onClose={() => setIsPackageModalOpen(false)} title="Add Event Package">
        <form onSubmit={handleAddPackage} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Package Name</label>
            <input 
              type="text" 
              placeholder="e.g. Silver Package" 
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-foreground"
              value={newPackage.name}
              onChange={(e) => setNewPackage({...newPackage, name: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Price</label>
            <input 
              type="text" 
              placeholder="e.g. $499 or Custom" 
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-foreground"
              value={newPackage.price}
              onChange={(e) => setNewPackage({...newPackage, price: e.target.value})}
              required
            />
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
             <input 
               type="checkbox" 
               className="w-5 h-5 cursor-pointer accent-foreground"
               checked={newPackage.popular}
               onChange={(e) => setNewPackage({...newPackage, popular: e.target.checked})}
             />
             <span className="text-sm font-bold tracking-widest uppercase">Mark as Popular</span>
          </label>
          <button type="submit" className="w-full bg-foreground text-background font-bold tracking-widest uppercase text-sm py-4 hover:opacity-90">
            Save Package
          </button>
        </form>
      </Modal>
    </>
  );
}
