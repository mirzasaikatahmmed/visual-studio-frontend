"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Users, Eye, Clock, Globe, ChevronLeft, ChevronRight, Loader2, Wifi } from "lucide-react";
import { io, Socket } from "socket.io-client";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";
const WS_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api").replace("/api", "");

function authHeaders(): HeadersInit {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  return token ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } : {};
}

function fmtDuration(seconds: number): string {
  if (!seconds) return "0s";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

type Stats = {
  activeVisitors: number;
  pageViewsToday: number;
  avgDurationSeconds: number;
  sessionsToday: number;
  totalSessions: number;
  topPages: { page: string; count: number }[];
  topReferrers: { referrer: string; count: number }[];
};

type Session = {
  id: number;
  sessionId: string;
  ip: string;
  page: string;
  browser: string;
  referrer: string;
  durationSeconds: number;
  isActive: boolean;
  lastSeen: string;
  createdAt: string;
};

type SessionsResponse = {
  data: Session[];
  total: number;
  page: number;
  totalPages: number;
};

export default function TrafficPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [sessions, setSessions] = useState<SessionsResponse | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [liveCount, setLiveCount] = useState<number | null>(null);
  const [wsConnected, setWsConnected] = useState(false);
  const wsRef = useRef<Socket | null>(null);

  const loadStats = useCallback(async () => {
    try {
      const res = await fetch(`${BASE}/visitors/stats`, { headers: authHeaders() });
      if (res.ok) setStats(await res.json());
    } catch { /* ignore */ }
  }, []);

  const loadSessions = useCallback(async (p: number) => {
    try {
      const res = await fetch(`${BASE}/visitors/sessions?page=${p}&limit=25`, { headers: authHeaders() });
      if (res.ok) setSessions(await res.json());
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    Promise.all([loadStats(), loadSessions(1)]).finally(() => setLoading(false));
  }, [loadStats, loadSessions]);

  useEffect(() => {
    loadSessions(page);
  }, [page, loadSessions]);

  // Socket.io for live count
  useEffect(() => {
    const socket = io(`${WS_BASE}/visitors`, {
      transports: ["websocket", "polling"],
      reconnectionDelay: 5000,
    });
    wsRef.current = socket;

    socket.on("connect", () => setWsConnected(true));
    socket.on("disconnect", () => setWsConnected(false));
    socket.on("live_count", (data: { count: number }) => setLiveCount(data.count));
    socket.on("session_update", () => {
      loadStats();
      loadSessions(page);
    });

    return () => { socket.disconnect(); };
  }, [loadStats, loadSessions, page]);

  // Fallback polling for stats every 30s
  useEffect(() => {
    const interval = setInterval(loadStats, 30_000);
    return () => clearInterval(interval);
  }, [loadStats]);

  const activeCount = liveCount ?? stats?.activeVisitors ?? 0;

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-tight">Live Traffic</h1>
          <p className="text-muted-foreground text-sm mt-1">Real-time visitor tracking and session analytics.</p>
        </div>
        <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border ${wsConnected ? "border-green-500/30 bg-green-500/10 text-green-500" : "border-muted text-muted-foreground"}`}>
          <span className={`w-2 h-2 rounded-full ${wsConnected ? "bg-green-500 animate-pulse" : "bg-muted-foreground"}`} />
          {wsConnected ? "Live" : "Connecting…"}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-32 text-muted-foreground">
          <Loader2 size={28} className="animate-spin mr-3" />
          <span className="text-sm font-medium">Loading traffic data…</span>
        </div>
      ) : (
        <>
          {/* Live stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Active Visitors", value: activeCount, sub: "right now", icon: Wifi, color: "text-green-500", bg: "bg-green-500/10", live: true },
              { label: "Page Views Today", value: stats?.pageViewsToday ?? 0, sub: "since midnight", icon: Eye, color: "text-brand-400", bg: "bg-brand-400/10" },
              { label: "Avg. Duration", value: fmtDuration(stats?.avgDurationSeconds ?? 0), sub: "per session today", icon: Clock, color: "text-blue-500", bg: "bg-blue-500/10" },
              { label: "Total Sessions", value: stats?.totalSessions ?? 0, sub: "all time", icon: Users, color: "text-purple-500", bg: "bg-purple-500/10" },
            ].map(({ label, value, sub, icon: Icon, color, bg, live }) => (
              <div key={label} className="bg-background border border-border p-5 rounded-md">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</span>
                  <div className={`w-8 h-8 ${bg} rounded-md flex items-center justify-center`}>
                    <Icon size={16} className={color} />
                  </div>
                </div>
                <div className={`text-3xl font-bold ${live ? color : ""}`}>{value}</div>
                <div className="text-xs text-muted-foreground mt-1">{sub}</div>
              </div>
            ))}
          </div>

          {/* Today stat row */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-background border border-border p-5 rounded-md">
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Sessions Today</div>
              <div className="text-2xl font-bold">{stats?.sessionsToday ?? 0}</div>
            </div>
            <div className="bg-background border border-border p-5 rounded-md">
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Avg. Duration (Today)</div>
              <div className="text-2xl font-bold">{fmtDuration(stats?.avgDurationSeconds ?? 0)}</div>
            </div>
          </div>

          {/* Top pages & referrers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-background border border-border rounded-md p-5">
              <h2 className="font-bold uppercase tracking-tight text-sm mb-4">Top Pages</h2>
              {stats?.topPages?.length === 0 ? (
                <p className="text-sm text-muted-foreground">No data yet.</p>
              ) : (
                <div className="space-y-2">
                  {stats?.topPages?.map((p) => (
                    <div key={p.page} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground font-mono truncate max-w-[70%]">{p.page || "/"}</span>
                      <span className="font-bold ml-2 shrink-0">{p.count} visit{p.count !== 1 ? "s" : ""}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="bg-background border border-border rounded-md p-5">
              <h2 className="font-bold uppercase tracking-tight text-sm mb-4">Top Referrers</h2>
              {stats?.topReferrers?.length === 0 ? (
                <p className="text-sm text-muted-foreground">No referrers recorded today.</p>
              ) : (
                <div className="space-y-2">
                  {stats?.topReferrers?.map((r) => (
                    <div key={r.referrer} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground truncate max-w-[70%]">{r.referrer}</span>
                      <span className="font-bold ml-2 shrink-0">{r.count} visit{r.count !== 1 ? "s" : ""}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Visitor Sessions table */}
          <div className="bg-background border border-border rounded-md overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div>
                <h2 className="font-bold uppercase tracking-tight text-sm">Visitor Sessions</h2>
                <p className="text-xs text-muted-foreground mt-0.5">{sessions?.total ?? 0} total sessions</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Globe size={14} />
                Page {sessions?.page ?? 1} of {sessions?.totalPages ?? 1}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-muted/50 text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border">
                    <th className="p-3 font-bold">IP</th>
                    <th className="p-3 font-bold">Page</th>
                    <th className="p-3 font-bold hidden md:table-cell">Browser</th>
                    <th className="p-3 font-bold hidden lg:table-cell">Referrer</th>
                    <th className="p-3 font-bold">Duration</th>
                    <th className="p-3 font-bold hidden sm:table-cell">Date</th>
                    <th className="p-3 font-bold text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-sm">
                  {sessions?.data.length === 0 ? (
                    <tr><td colSpan={7} className="p-10 text-center text-muted-foreground text-sm">No sessions yet.</td></tr>
                  ) : (
                    sessions?.data.map((s) => (
                      <tr key={s.id} className="hover:bg-muted/30 transition-colors">
                        <td className="p-3 font-mono text-xs">{s.ip}</td>
                        <td className="p-3 text-xs max-w-[120px] truncate font-mono">{s.page || "/"}</td>
                        <td className="p-3 hidden md:table-cell text-xs">{s.browser}</td>
                        <td className="p-3 hidden lg:table-cell text-xs text-muted-foreground max-w-[160px] truncate">{s.referrer || "—"}</td>
                        <td className="p-3 text-xs tabular-nums">{fmtDuration(s.durationSeconds)}</td>
                        <td className="p-3 hidden sm:table-cell text-xs text-muted-foreground whitespace-nowrap">{fmtDate(s.createdAt)}</td>
                        <td className="p-3 text-center">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${s.isActive ? "bg-green-500/10 text-green-500" : "bg-muted text-muted-foreground"}`}>
                            {s.isActive && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />}
                            {s.isActive ? "Active" : "Left"}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            {(sessions?.totalPages ?? 1) > 1 && (
              <div className="flex items-center justify-between px-5 py-3 border-t border-border">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-widest border border-border rounded-sm hover:border-brand-400 hover:text-brand-400 transition-colors disabled:opacity-40"
                >
                  <ChevronLeft size={12} /> Prev
                </button>
                <span className="text-xs text-muted-foreground">
                  {sessions?.total} sessions
                </span>
                <button
                  onClick={() => setPage(p => Math.min(sessions?.totalPages ?? 1, p + 1))}
                  disabled={page >= (sessions?.totalPages ?? 1)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-widest border border-border rounded-sm hover:border-brand-400 hover:text-brand-400 transition-colors disabled:opacity-40"
                >
                  Next <ChevronRight size={12} />
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
