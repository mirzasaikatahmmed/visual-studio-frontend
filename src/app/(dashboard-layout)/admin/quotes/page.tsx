"use client";

import {
  Search, Trash2, Eye, Clock, CalendarCheck, CheckCircle2, X, RefreshCw,
} from "lucide-react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Modal } from "@/components/ui/modal";
import {
  fetchQuotes, updateInquiry, deleteInquiry, type Inquiry,
} from "@/lib/quotesApi";
import { type InquiryStatus } from "@/lib/inquiriesApi";

// ── helpers ────────────────────────────────────────────────────────────────────

function parseQuoteMessage(msg: string): Record<string, string> {
  const result: Record<string, string> = {};
  for (const line of msg.split("\n")) {
    if (!line.trim()) continue;
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim();
    if (key && value) result[key] = value;
  }
  return result;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

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

// ── package detail rows ────────────────────────────────────────────────────────

const PACKAGE_KEYS = [
  "Coverage", "Hours", "Days", "Add-ons",
  "Second photographer", "Second videographer",
  "Crew preference", "Deliverables", "Estimate shown",
];
const CONTACT_KEYS = ["Couple's name", "Email", "Phone / WhatsApp", "Wedding date", "Notes"];

function DetailSection({
  title, keys, data,
}: { title: string; keys: string[]; data: Record<string, string> }) {
  const rows = keys.filter(k => data[k]);
  if (rows.length === 0) return null;
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
        {title}
      </div>
      <div className="bg-muted/30 border border-border rounded overflow-hidden divide-y divide-border">
        {rows.map(k => (
          <div key={k} className="flex text-sm">
            <div className="w-44 shrink-0 px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
              {k}
            </div>
            <div className="px-3 py-2 text-foreground font-medium">
              {k === "Estimate shown"
                ? <span className="text-brand-400 font-bold">{data[k]}</span>
                : data[k]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── page ───────────────────────────────────────────────────────────────────────

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [detailModal, setDetailModal] = useState(false);
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [noteInput, setNoteInput] = useState("");
  const [savingNote, setSavingNote] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setQuotes(await fetchQuotes());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const filtered = useMemo(() => quotes.filter(q => {
    const term = searchTerm.toLowerCase();
    const matchSearch = !term ||
      q.name.toLowerCase().includes(term) ||
      q.email.toLowerCase().includes(term);
    const matchStatus = statusFilter === "All" || q.status === statusFilter;
    return matchSearch && matchStatus;
  }), [quotes, searchTerm, statusFilter]);

  const counts = {
    total: quotes.length,
    Pending: quotes.filter(q => q.status === "Pending").length,
    Booked: quotes.filter(q => q.status === "Booked").length,
  };

  const handleStatusChange = async (id: number, status: InquiryStatus) => {
    try {
      const updated = await updateInquiry(id, { status });
      setQuotes(prev => prev.map(q => q.id === id ? updated : q));
      if (selected?.id === id) setSelected(updated);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to update status");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this quote request?")) return;
    try {
      await deleteInquiry(id);
      setQuotes(prev => prev.filter(q => q.id !== id));
      if (selected?.id === id) setDetailModal(false);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to delete");
    }
  };

  const openDetail = (q: Inquiry) => {
    setSelected(q);
    setNoteInput(q.notes ?? "");
    setDetailModal(true);
  };

  const handleSaveNote = async () => {
    if (!selected) return;
    setSavingNote(true);
    try {
      const updated = await updateInquiry(selected.id, { notes: noteInput });
      setQuotes(prev => prev.map(q => q.id === selected.id ? updated : q));
      setSelected(updated);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to save notes");
    } finally {
      setSavingNote(false);
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
      <div className="flex items-center justify-center h-64 text-red-500 text-sm gap-3">
        {error}
        <button onClick={() => void load()} className="underline flex items-center gap-1">
          <RefreshCw size={13} /> Retry
        </button>
      </div>
    );
  }

  const selectedParsed = selected ? parseQuoteMessage(selected.message) : {};

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-tight">Quote Requests</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Package estimator submissions from couples.
          </p>
        </div>
        <button
          onClick={() => void load()}
          className="p-2 text-muted-foreground hover:text-brand-400 hover:bg-brand-400/10 rounded transition-colors"
        >
          <RefreshCw size={15} />
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="border border-border rounded-md p-4 bg-background">
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
            Total
          </div>
          <div className="text-2xl font-bold">{counts.total}</div>
        </div>
        <button
          onClick={() => setStatusFilter(statusFilter === "Pending" ? "All" : "Pending")}
          className={`border rounded-md p-4 text-left transition-colors ${statusFilter === "Pending" ? "border-yellow-500 bg-yellow-500/5" : "bg-background border-border hover:border-yellow-500/50"}`}
        >
          <div className="flex items-center gap-2 mb-1">
            <Clock size={14} className="text-yellow-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Pending</span>
          </div>
          <div className="text-2xl font-bold text-yellow-600">{counts.Pending}</div>
        </button>
        <button
          onClick={() => setStatusFilter(statusFilter === "Booked" ? "All" : "Booked")}
          className={`border rounded-md p-4 text-left transition-colors ${statusFilter === "Booked" ? "border-blue-500 bg-blue-500/5" : "bg-background border-border hover:border-blue-500/50"}`}
        >
          <div className="flex items-center gap-2 mb-1">
            <CalendarCheck size={14} className="text-blue-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Booked</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">{counts.Booked}</div>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex items-center gap-3 flex-1 bg-muted px-4 py-2.5 rounded-sm">
          <Search size={15} className="text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="Search by couple name or email..."
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
      </div>

      {/* Table */}
      <div className="bg-background border border-border rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-muted/50 text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border">
                <th className="p-4 font-bold">Couple</th>
                <th className="p-4 font-bold hidden md:table-cell">Coverage</th>
                <th className="p-4 font-bold hidden lg:table-cell">Wedding Date</th>
                <th className="p-4 font-bold hidden sm:table-cell">Estimate</th>
                <th className="p-4 font-bold hidden lg:table-cell">Received</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(q => {
                const parsed = parseQuoteMessage(q.message);
                return (
                  <tr key={q.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="font-semibold text-sm">{q.name}</div>
                      <div className="text-xs text-muted-foreground">{q.email}</div>
                      {q.phone && <div className="text-xs text-muted-foreground">{q.phone}</div>}
                      {q.notes && <div className="text-[10px] text-brand-400 mt-0.5">Has notes</div>}
                    </td>
                    <td className="p-4 text-xs text-muted-foreground hidden md:table-cell">
                      {parsed["Coverage"] ?? "—"}
                    </td>
                    <td className="p-4 text-xs text-muted-foreground hidden lg:table-cell">
                      {q.eventDate ?? "—"}
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      <span className="text-sm font-bold text-brand-400">
                        {parsed["Estimate shown"] ?? "—"}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-muted-foreground hidden lg:table-cell">
                      {formatDate(q.createdAt)}
                    </td>
                    <td className="p-4">
                      <select
                        className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border-none outline-none cursor-pointer ${statusStyles[q.status]}`}
                        value={q.status}
                        onChange={(e) => void handleStatusChange(q.id, e.target.value as InquiryStatus)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Replied">Replied</option>
                        <option value="Booked">Booked</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-1.5">
                        <button
                          onClick={() => openDetail(q)}
                          className="p-1.5 text-muted-foreground hover:text-brand-400 hover:bg-brand-400/10 rounded transition-colors"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          onClick={() => void handleDelete(q.id)}
                          className="p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-10 text-center text-muted-foreground">
                    <Search size={24} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm font-medium">
                      {quotes.length === 0 ? "No quote requests yet." : "No results match your filters."}
                    </p>
                    {quotes.length > 0 && searchTerm && (
                      <button
                        onClick={() => { setSearchTerm(""); setStatusFilter("All"); }}
                        className="text-xs text-brand-400 mt-2 hover:text-brand-500"
                      >
                        Clear filters
                      </button>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-border text-xs text-muted-foreground">
          Showing {filtered.length} of {quotes.length} quote requests
        </div>
      </div>

      {/* Detail Modal */}
      <Modal isOpen={detailModal} onClose={() => setDetailModal(false)} title="Quote Request Details">
        {selected && (
          <div className="space-y-5">
            {/* Status + date */}
            <div className="flex items-center justify-between">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider ${statusStyles[selected.status]}`}>
                <StatusIcon status={selected.status} />
                {selected.status}
              </span>
              <span className="text-xs text-muted-foreground">
                Received: {formatDate(selected.createdAt)}
              </span>
            </div>

            {/* Package details */}
            <DetailSection
              title="Package Details"
              keys={PACKAGE_KEYS}
              data={selectedParsed}
            />

            {/* Contact info */}
            <DetailSection
              title="Contact Info"
              keys={CONTACT_KEYS}
              data={{ ...selectedParsed, "Couple's name": selected.name }}
            />

            {/* Status change */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Update Status
              </label>
              <select
                className="w-full mt-1.5 bg-muted border border-border px-4 py-2.5 outline-none focus:border-brand-400 text-sm rounded-sm"
                value={selected.status}
                onChange={(e) => void handleStatusChange(selected.id, e.target.value as InquiryStatus)}
              >
                <option value="Pending">Pending</option>
                <option value="Replied">Replied</option>
                <option value="Booked">Booked</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Internal Notes
              </label>
              <textarea
                rows={3}
                className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors resize-none rounded-sm text-sm"
                placeholder="Add private notes about this quote..."
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
              />
            </div>

            <div className="flex gap-3 pt-1">
              <button
                onClick={() => void handleSaveNote()}
                disabled={savingNote}
                className="flex-1 bg-brand-400 text-white font-bold tracking-widest uppercase text-sm py-3 hover:bg-brand-500 transition-colors rounded-sm disabled:opacity-60"
              >
                {savingNote ? "Saving..." : "Save Notes"}
              </button>
              <a
                href={`mailto:${selected.email}?subject=Re: Your Wedding Photography Quote — Visual Studio`}
                className="flex-1 text-center border border-border py-3 font-bold tracking-widest uppercase text-xs hover:border-brand-400 hover:text-brand-400 transition-colors rounded-sm flex items-center justify-center"
              >
                Reply via Email
              </a>
              <button
                onClick={() => void handleDelete(selected.id)}
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
