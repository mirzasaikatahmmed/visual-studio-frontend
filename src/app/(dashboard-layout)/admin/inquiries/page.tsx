"use client";

import { CheckCircle2, MoreHorizontal, Search, Trash } from "lucide-react";
import { useState } from "react";

const initialInquiries = [
  { id: 1, name: "David & Emily", email: "david@example.com", type: "Wedding Coverage", details: "Looking for a full day coverage near NY...", date: "Oct 24, 2023", status: "Pending", statusColor: "yellow" },
  { id: 2, name: "Atlas Tech Corp", email: "marketing@atlas.com", type: "Brand Photography", details: "Need headshots for 15 executives...", date: "Oct 23, 2023", status: "Replied", statusColor: "green" },
  { id: 3, name: "Sophia R.", email: "sophia.r@gmail.com", type: "Event Decoration Setup", details: "Want the luxury package for my sweet 16...", date: "Oct 21, 2023", status: "Booked", statusColor: "blue" },
];

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All Status");

  const filteredInquiries = inquiries.filter(iq => {
    const matchesSearch = iq.name.toLowerCase().includes(searchTerm.toLowerCase()) || iq.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All Status" || iq.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id: number, newStatus: string) => {
    let color = "yellow";
    if (newStatus === "Replied") color = "green";
    if (newStatus === "Booked") color = "blue";
    
    setInquiries(prev => prev.map(iq => iq.id === id ? { ...iq, status: newStatus, statusColor: color } : iq));
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold uppercase tracking-tight">Inquiries & Bookings</h1>
      </div>

      <div className="bg-background border border-border p-6 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4 w-full max-w-md bg-muted px-4 py-2">
          <Search size={18} className="text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search inquiries..." 
            className="bg-transparent border-none outline-none w-full font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <select 
            className="bg-muted px-4 py-2 outline-none border-none uppercase tracking-widest text-xs font-bold cursor-pointer"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option>All Status</option>
            <option>Pending</option>
            <option>Replied</option>
            <option>Booked</option>
          </select>
        </div>
      </div>

      <div className="bg-background border border-border overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted text-xs uppercase tracking-widest text-muted-foreground border-b border-border">
              <th className="p-4 font-bold">Client Details</th>
              <th className="p-4 font-bold">Inquiry Type</th>
              <th className="p-4 font-bold">Message preview</th>
              <th className="p-4 font-bold">Status</th>
              <th className="p-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredInquiries.length > 0 ? filteredInquiries.map((iq) => (
               <tr key={iq.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                 <td className="p-4">
                   <div className="font-bold">{iq.name}</div>
                   <div className="text-muted-foreground text-xs">{iq.email}</div>
                 </td>
                 <td className="p-4 text-muted-foreground">{iq.type}</td>
                 <td className="p-4 text-muted-foreground w-1/3 truncate max-w-xs">{iq.details}</td>
                 <td className="p-4">
                   <select 
                     className={`px-2 py-1 bg-${iq.statusColor}-500/20 text-${iq.statusColor}-600 rounded text-xs font-bold uppercase outline-none cursor-pointer border-none appearance-none hover:opacity-80`}
                     value={iq.status}
                     onChange={(e) => handleStatusChange(iq.id, e.target.value)}
                   >
                     <option value="Pending" className="text-black bg-white">Pending</option>
                     <option value="Replied" className="text-black bg-white">Replied</option>
                     <option value="Booked" className="text-black bg-white">Booked</option>
                   </select>
                 </td>
                 <td className="p-4 text-right">
                   <button className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded transition-colors" onClick={() => setInquiries(prev => prev.filter(item => item.id !== iq.id))}>
                     <Trash size={16} />
                   </button>
                 </td>
               </tr>
            )) : (
               <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground font-medium">No inquiries found.</td>
               </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
