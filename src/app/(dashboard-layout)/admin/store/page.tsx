"use client";

import { Search, Filter, MoreHorizontal, Edit2 } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";

const initialQueries = [
  { id: "10492", name: "Adam Smith", email: "adam@example.com", spec: "Custom Album", details: "Size: 12x12, Pages: 40", status: "Needs Quote", statusColor: "yellow" },
  { id: "10491", name: "Jessica W.", email: "jess@gmail.com", spec: "Gold Package", details: "Size: 10x10 pre-set", status: "In Production", statusColor: "blue" },
];

const initialPrices = [
  { id: 1, name: "Silver Album", price: "299" },
  { id: 2, name: "Gold Album", price: "599" },
  { id: 3, name: "Premium Heirloom", price: "999" }
];

export default function StoreAdminPage() {
  const [queries, setQueries] = useState(initialQueries);
  const [prices, setPrices] = useState(initialPrices);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [editingPrice, setEditingPrice] = useState({ id: 0, name: "", price: "" });

  const filteredQueries = queries.filter(q => 
    q.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    q.id.includes(searchTerm)
  );

  const handleStatusChange = (id: string, newStatus: string) => {
    let color = "yellow";
    if (newStatus === "In Production") color = "blue";
    if (newStatus === "Completed") color = "green";
    
    setQueries(queries.map(q => q.id === id ? { ...q, status: newStatus, statusColor: color } : q));
  };

  const handleEditPrice = (pkg: typeof initialPrices[0]) => {
    setEditingPrice(pkg);
    setIsPriceModalOpen(true);
  };

  const handleSavePrice = (e: React.FormEvent) => {
    e.preventDefault();
    setPrices(prices.map(p => p.id === editingPrice.id ? editingPrice : p));
    setIsPriceModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold uppercase tracking-tight">Print Store Orders & Queries</h1>
      </div>

      <div className="bg-background border border-border p-6 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4 w-full max-w-md bg-muted px-4 py-2">
          <Search size={18} className="text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search customer queries (Name, ID)..." 
            className="bg-transparent border-none outline-none w-full font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-background border border-border overflow-hidden mb-12">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted text-xs uppercase tracking-widest text-muted-foreground border-b border-border">
              <th className="p-4 font-bold">Query ID</th>
              <th className="p-4 font-bold">Customer Details</th>
              <th className="p-4 font-bold">Specs Details</th>
              <th className="p-4 font-bold">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredQueries.map((q) => (
              <tr key={q.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="p-4 font-bold tracking-widest text-xs">#Q-{q.id}</td>
                <td className="p-4">
                  <div className="font-bold">{q.name}</div>
                  <div className="text-muted-foreground text-xs">{q.email}</div>
                </td>
                <td className="p-4">
                  <div className="font-bold">{q.spec}</div>
                  <div className="text-muted-foreground text-xs">{q.details}</div>
                </td>
                <td className="p-4">
                   <select 
                     className={`px-2 py-1 bg-${q.statusColor}-500/20 text-${q.statusColor}-600 rounded text-xs font-bold uppercase outline-none cursor-pointer border-none appearance-none hover:opacity-80`}
                     value={q.status}
                     onChange={(e) => handleStatusChange(q.id, e.target.value)}
                   >
                     <option value="Needs Quote" className="text-black bg-white">Needs Quote</option>
                     <option value="In Production" className="text-black bg-white">In Production</option>
                     <option value="Completed" className="text-black bg-white">Completed</option>
                   </select>
                </td>
              </tr>
            ))}
            {filteredQueries.length === 0 && (
               <tr><td colSpan={4} className="p-8 text-center text-muted-foreground font-medium">No queries match your search.</td></tr>
            )}
          </tbody>
        </table>
      </div>

       <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold uppercase tracking-tight">Preset Packages Pricing</h2>
      </div>
      <div className="bg-background border border-border p-6 flex flex-col gap-4 max-w-xl">
         {prices.map((p) => (
            <div key={p.id} className="flex justify-between items-center pb-4 border-b border-border border-dashed">
               <span className="font-bold uppercase tracking-widest text-sm">{p.name}</span>
               <div className="flex items-center gap-6">
                  <span className="font-medium">${p.price}</span>
                  <button onClick={() => handleEditPrice(p)} className="text-muted-foreground hover:text-foreground transition-colors"><Edit2 size={16} /></button>
               </div>
            </div>
         ))}
      </div>

      <Modal isOpen={isPriceModalOpen} onClose={() => setIsPriceModalOpen(false)} title="Edit Package Pricing">
        <form onSubmit={handleSavePrice} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Package Name</label>
            <input 
              type="text" 
              className="w-full bg-muted border border-border px-4 py-3 outline-none opacity-50"
              value={editingPrice.name}
              disabled
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">New Price ($)</label>
            <input 
              type="number" 
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-foreground"
              value={editingPrice.price}
              onChange={(e) => setEditingPrice({...editingPrice, price: e.target.value})}
              required
            />
          </div>
          <button type="submit" className="w-full bg-foreground text-background font-bold tracking-widest uppercase text-sm py-4 hover:opacity-90">
            Save Price
          </button>
        </form>
      </Modal>
    </>
  );
}
