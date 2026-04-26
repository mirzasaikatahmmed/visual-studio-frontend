"use client";

import { Search, Trash2, Eye, Clock, CheckCircle2, CalendarCheck, X } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";

type InquiryStatus = "Pending" | "Replied" | "Booked" | "Closed";

type Inquiry = {
  id: number;
  name: string;
  email: string;
  phone: string;
  type: string;
  message: string;
  date: string;
  eventDate: string;
  status: InquiryStatus;
  notes: string;
};

const inquiryTypes = ["Wedding Coverage", "Brand Photography", "Event Decoration", "Maternity Session", "Baby Photography", "Studio Photoshoot", "Corporate Event", "Birthday Ceremony", "Henna Ceremony", "Other"];

const initialInquiries: Inquiry[] = [
  { id: 1, name: "David & Emily", email: "david@example.com", phone: "+1 (929) 555-0101", type: "Wedding Coverage", message: "Hi, we are looking for a full day coverage for our October wedding near Brooklyn. We have about 150 guests and would love to include ceremony, cocktail hour, and reception. Do you offer video as well?", date: "Apr 24, 2026", eventDate: "Oct 15, 2026", status: "Pending", notes: "" },
  { id: 2, name: "Atlas Tech Corp", email: "marketing@atlas.com", phone: "+1 (212) 555-0202", type: "Brand Photography", message: "We need headshots for 15 executives plus product photography for our upcoming marketing campaign. Budget is flexible. Timeline: end of May.", date: "Apr 23, 2026", eventDate: "May 30, 2026", status: "Replied", notes: "Sent pricing PDF. Waiting for their approval on the proposal." },
  { id: 3, name: "Sophia R.", email: "sophia.r@gmail.com", phone: "+1 (347) 555-0303", type: "Event Decoration", message: "I would love the luxury package for my sweet 16 birthday party. I have a venue in Queens for about 80 guests. Theme is garden party with blush and gold. Can we schedule a consultation?", date: "Apr 21, 2026", eventDate: "Jul 20, 2026", status: "Booked", notes: "Booked Luxury Dream package. Deposit received. Consultation scheduled May 5." },
  { id: 4, name: "James & Sarah", email: "james@example.com", phone: "+1 (718) 555-0404", type: "Maternity Session", message: "We are expecting our first baby in August and would love to capture this special time. Looking for an outdoor session in a park setting if possible. How far in advance should we book?", date: "Apr 20, 2026", eventDate: "Jun 15, 2026", status: "Replied", notes: "" },
  { id: 5, name: "The Grand Hotel", email: "events@grandhotel.com", phone: "+1 (212) 555-0505", type: "Corporate Event", message: "We host quarterly executive dinners and are looking for a regular photography partner to document these events. We estimate 6-8 events per year, each about 3 hours.", date: "Apr 18, 2026", eventDate: "Recurring", status: "Pending", notes: "" },
  { id: 6, name: "Maria & Carlos", email: "mariacarlos@gmail.com", phone: "+1 (646) 555-0606", type: "Henna Ceremony", message: "We are planning a traditional mehndi night the day before our wedding. About 60 guests, in our backyard. Looking for coverage from setup through the evening.", date: "Apr 16, 2026", eventDate: "Sep 5, 2026", status: "Booked", notes: "Add-on to their wedding package. Both events booked." },
  { id: 7, name: "Michelle T.", email: "michelle.t@gmail.com", phone: "+1 (917) 555-0707", type: "Baby Photography", message: "Looking to book a newborn session for our baby due in May. Interested in the lifestyle newborn package with the white backdrop options.", date: "Apr 14, 2026", eventDate: "May/Jun 2026", status: "Closed", notes: "Went with another photographer." },
];

const statusStyles: Record<InquiryStatus, string> = {
  Pending: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400",
  Replied: "bg-green-500/15 text-green-700 dark:text-green-400",
  Booked: "bg-blue-500/15 text-blue-700 dark:text-blue-400",
  Closed: "bg-muted text-muted-foreground",
};

const StatusIcon = ({ status }: { status: InquiryStatus }) => {
  if (status === "Booked") return <CalendarCheck size={12} className="text-blue-500" />;
  if (status === "Replied") return <CheckCircle2 size={12} className="text-green-500" />;
  if (status === "Pending") return <Clock size={12} className="text-yellow-500" />;
  return <X size={12} className="text-muted-foreground" />;
};

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All Types");

  const [detailModal, setDetailModal] = useState(false);
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [noteInput, setNoteInput] = useState("");

  const filtered = inquiries.filter(iq => {
    const matchSearch = iq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      iq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      iq.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "All" || iq.status === statusFilter;
    const matchType = typeFilter === "All Types" || iq.type === typeFilter;
    return matchSearch && matchStatus && matchType;
  });

  const handleStatusChange = (id: number, status: InquiryStatus) => {
    setInquiries(prev => prev.map(iq => iq.id === id ? { ...iq, status } : iq));
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : prev);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Delete this inquiry?")) {
      setInquiries(prev => prev.filter(iq => iq.id !== id));
      if (selected?.id === id) setDetailModal(false);
    }
  };

  const openDetail = (iq: Inquiry) => {
    setSelected(iq);
    setNoteInput(iq.notes);
    setDetailModal(true);
  };

  const handleSaveNote = () => {
    if (!selected) return;
    setInquiries(prev => prev.map(iq => iq.id === selected.id ? { ...iq, notes: noteInput } : iq));
    setSelected({ ...selected, notes: noteInput });
  };

  const counts = {
    Pending: inquiries.filter(i => i.status === "Pending").length,
    Replied: inquiries.filter(i => i.status === "Replied").length,
    Booked: inquiries.filter(i => i.status === "Booked").length,
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-tight">Inquiries & Bookings</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage all client inquiries from the contact form.</p>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <button onClick={() => setStatusFilter(statusFilter === "Pending" ? "All" : "Pending")}
          className={`border rounded-md p-4 text-left transition-colors ${statusFilter === "Pending" ? "border-yellow-500 bg-yellow-500/5" : "bg-background border-border hover:border-yellow-500/50"}`}
        >
          <div className="flex items-center gap-2 mb-1">
            <Clock size={14} className="text-yellow-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Pending</span>
          </div>
          <div className="text-2xl font-bold text-yellow-600">{counts.Pending}</div>
        </button>
        <button onClick={() => setStatusFilter(statusFilter === "Replied" ? "All" : "Replied")}
          className={`border rounded-md p-4 text-left transition-colors ${statusFilter === "Replied" ? "border-green-500 bg-green-500/5" : "bg-background border-border hover:border-green-500/50"}`}
        >
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2 size={14} className="text-green-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Replied</span>
          </div>
          <div className="text-2xl font-bold text-green-600">{counts.Replied}</div>
        </button>
        <button onClick={() => setStatusFilter(statusFilter === "Booked" ? "All" : "Booked")}
          className={`border rounded-md p-4 text-left transition-colors ${statusFilter === "Booked" ? "border-blue-500 bg-blue-500/5" : "bg-background border-border hover:border-blue-500/50"}`}
        >
          <div className="flex items-center gap-2 mb-1">
            <CalendarCheck size={14} className="text-blue-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Booked</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">{counts.Booked}</div>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex items-center gap-3 flex-1 bg-muted px-4 py-2.5 rounded-sm">
          <Search size={15} className="text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="Search by name, email, or service type..."
            className="bg-transparent border-none outline-none w-full text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm("")} className="text-muted-foreground hover:text-foreground">
              <X size={14} />
            </button>
          )}
        </div>
        <select
          className="bg-muted px-4 py-2.5 outline-none border-none text-xs font-bold uppercase tracking-widest cursor-pointer rounded-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Replied">Replied</option>
          <option value="Booked">Booked</option>
          <option value="Closed">Closed</option>
        </select>
        <select
          className="bg-muted px-4 py-2.5 outline-none border-none text-xs font-bold uppercase tracking-widest cursor-pointer rounded-sm"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="All Types">All Types</option>
          {inquiryTypes.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-background border border-border rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-muted/50 text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border">
                <th className="p-4 font-bold">Client</th>
                <th className="p-4 font-bold hidden sm:table-cell">Service</th>
                <th className="p-4 font-bold hidden md:table-cell">Event Date</th>
                <th className="p-4 font-bold hidden lg:table-cell">Received</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((iq) => (
                <tr key={iq.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <div className="font-semibold text-sm">{iq.name}</div>
                    <div className="text-xs text-muted-foreground">{iq.email}</div>
                    {iq.notes && <div className="text-[10px] text-brand-400 mt-0.5">Has notes</div>}
                  </td>
                  <td className="p-4 text-sm text-muted-foreground hidden sm:table-cell">{iq.type}</td>
                  <td className="p-4 text-xs text-muted-foreground hidden md:table-cell">{iq.eventDate}</td>
                  <td className="p-4 text-xs text-muted-foreground hidden lg:table-cell">{iq.date}</td>
                  <td className="p-4">
                    <select
                      className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border-none outline-none cursor-pointer ${statusStyles[iq.status]}`}
                      value={iq.status}
                      onChange={(e) => handleStatusChange(iq.id, e.target.value as InquiryStatus)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Replied">Replied</option>
                      <option value="Booked">Booked</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-1.5">
                      <button onClick={() => openDetail(iq)} className="p-1.5 text-muted-foreground hover:text-brand-400 hover:bg-brand-400/10 rounded transition-colors">
                        <Eye size={15} />
                      </button>
                      <button onClick={() => handleDelete(iq.id)} className="p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-muted-foreground">
                    <Search size={24} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm font-medium">No inquiries match your filters.</p>
                    <button onClick={() => { setSearchTerm(""); setStatusFilter("All"); setTypeFilter("All Types"); }} className="text-xs text-brand-400 mt-2 hover:text-brand-500">
                      Clear filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-border text-xs text-muted-foreground">
          Showing {filtered.length} of {inquiries.length} inquiries
        </div>
      </div>

      {/* Detail Modal */}
      <Modal isOpen={detailModal} onClose={() => setDetailModal(false)} title="Inquiry Details">
        {selected && (
          <div className="space-y-5">
            {/* Status Badge */}
            <div className="flex items-center justify-between">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider ${statusStyles[selected.status]}`}>
                <StatusIcon status={selected.status} />
                {selected.status}
              </span>
              <span className="text-xs text-muted-foreground">Received: {selected.date}</span>
            </div>

            {/* Client Info */}
            <div className="bg-muted/50 rounded-md p-4 grid grid-cols-2 gap-3">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">Name</div>
                <div className="font-semibold text-sm">{selected.name}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">Email</div>
                <div className="text-sm">{selected.email}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">Phone</div>
                <div className="text-sm">{selected.phone}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">Event Date</div>
                <div className="text-sm">{selected.eventDate}</div>
              </div>
              <div className="col-span-2">
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">Service Type</div>
                <div className="text-sm font-medium">{selected.type}</div>
              </div>
            </div>

            {/* Message */}
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Message</div>
              <p className="text-sm leading-relaxed text-muted-foreground bg-muted/30 rounded p-3 border border-border">{selected.message}</p>
            </div>

            {/* Status Change */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Update Status</label>
              <select
                className="w-full mt-1.5 bg-muted border border-border px-4 py-2.5 outline-none focus:border-brand-400 text-sm rounded-sm"
                value={selected.status}
                onChange={(e) => handleStatusChange(selected.id, e.target.value as InquiryStatus)}
              >
                <option value="Pending">Pending</option>
                <option value="Replied">Replied</option>
                <option value="Booked">Booked</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Internal Notes</label>
              <textarea
                rows={3}
                className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors resize-none rounded-sm text-sm"
                placeholder="Add private notes about this client..."
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
              />
            </div>

            <div className="flex gap-3 pt-1">
              <button onClick={handleSaveNote} className="flex-1 bg-brand-400 text-white font-bold tracking-widest uppercase text-sm py-3 hover:bg-brand-500 transition-colors rounded-sm">
                Save Notes
              </button>
              <a
                href={`mailto:${selected.email}?subject=Re: ${selected.type} Inquiry — Visual Studio`}
                className="flex-1 text-center border border-border py-3 font-bold tracking-widest uppercase text-xs hover:border-brand-400 hover:text-brand-400 transition-colors rounded-sm flex items-center justify-center"
              >
                Reply via Email
              </a>
              <button
                onClick={() => handleDelete(selected.id)}
                className="p-3 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-colors rounded-sm"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
