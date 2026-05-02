"use client";

import { useState, useEffect, useMemo } from "react";
import { Trash2, Download, Search, Loader2, Mail, Users, UserCheck, AlertCircle } from "lucide-react";
import { fetchSubscribers, deleteSubscriber, type Subscriber } from "@/lib/newsletterApi";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });
}

export default function StayInspiredPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");
  const [deleting, setDeleting] = useState<number | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchSubscribers();
      setSubscribers(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load subscribers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Permanently delete this subscriber?")) return;
    setDeleting(id);
    try {
      await deleteSubscriber(id);
      setSubscribers(prev => prev.filter(s => s.id !== id));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to delete");
    } finally {
      setDeleting(null);
    }
  };

  const handleExport = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    const url = `${BASE}/newsletter/export`;
    const a = document.createElement("a");
    a.href = url;
    a.download = "subscribers.csv";
    if (token) {
      fetch(url, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => res.blob())
        .then(blob => {
          const blobUrl = URL.createObjectURL(blob);
          a.href = blobUrl;
          a.click();
          URL.revokeObjectURL(blobUrl);
        });
    }
  };

  const filtered = useMemo(() => {
    return subscribers.filter(s => {
      const matchesSearch = s.email.toLowerCase().includes(search.toLowerCase());
      const matchesFilter =
        filter === "all" ||
        (filter === "active" && s.isActive) ||
        (filter === "inactive" && !s.isActive);
      return matchesSearch && matchesFilter;
    });
  }, [subscribers, search, filter]);

  const activeCount = subscribers.filter(s => s.isActive).length;
  const inactiveCount = subscribers.filter(s => !s.isActive).length;

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-tight">Stay Inspired</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage newsletter subscribers from the footer signup form.</p>
        </div>
        <button
          onClick={handleExport}
          disabled={subscribers.length === 0}
          className="flex items-center gap-2 px-5 py-2.5 border border-border text-foreground font-bold uppercase tracking-widest text-xs hover:border-brand-400 hover:text-brand-400 transition-colors rounded-sm disabled:opacity-40"
        >
          <Download size={14} /> Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total", value: subscribers.length, icon: Users, color: "text-foreground" },
          { label: "Active", value: activeCount, icon: UserCheck, color: "text-green-500" },
          { label: "Inactive", value: inactiveCount, icon: Mail, color: "text-muted-foreground" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-background border border-border rounded-md p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center shrink-0">
              <Icon size={18} className={color} />
            </div>
            <div>
              <div className={`text-2xl font-bold ${color}`}>{value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest font-medium">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-background border border-border pl-9 pr-4 py-2.5 text-sm outline-none focus:border-brand-400 transition-colors rounded-sm"
          />
        </div>
        <div className="flex gap-1 p-1 bg-muted rounded-sm">
          {(["all", "active", "inactive"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-sm transition-colors ${filter === f ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 mb-5 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-sm text-red-500">
          <AlertCircle size={16} />
          <span className="text-sm font-medium">{error}</span>
          <button onClick={load} className="ml-auto text-xs font-bold uppercase tracking-widest underline">Retry</button>
        </div>
      )}

      {/* Table */}
      <div className="bg-background border border-border rounded-md overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-24 text-muted-foreground">
            <Loader2 size={24} className="animate-spin mr-3" />
            <span className="text-sm font-medium">Loading subscribers…</span>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-muted/50 text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border">
                <th className="p-4 font-bold">Email</th>
                <th className="p-4 font-bold text-center">Status</th>
                <th className="p-4 font-bold">Subscribed</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(sub => (
                <tr key={sub.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-brand-400/10 flex items-center justify-center shrink-0">
                        <Mail size={12} className="text-brand-400" />
                      </div>
                      <span className="text-sm font-medium">{sub.email}</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full ${sub.isActive ? "bg-green-500/10 text-green-500" : "bg-muted text-muted-foreground"}`}>
                      {sub.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{formatDate(sub.subscribedAt)}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(sub.id)}
                      disabled={deleting === sub.id}
                      className="p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded transition-colors disabled:opacity-40"
                      title="Delete subscriber"
                    >
                      {deleting === sub.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && !loading && (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-muted-foreground">
                    <Mail size={28} className="mx-auto mb-3 opacity-20" />
                    <p className="text-sm font-medium">{search || filter !== "all" ? "No subscribers match your filter." : "No subscribers yet."}</p>
                    <p className="text-xs mt-1 opacity-60">Subscribers from the footer form will appear here.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {filtered.length > 0 && !loading && (
        <p className="text-xs text-muted-foreground mt-3 text-right">
          Showing {filtered.length} of {subscribers.length} subscriber{subscribers.length !== 1 ? "s" : ""}
        </p>
      )}
    </>
  );
}
