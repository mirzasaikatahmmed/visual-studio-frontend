"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  MessageSquare, Camera, TrendingUp, ShoppingBag, ExternalLink,
  CalendarCheck, ArrowUpRight, Clock, CheckCircle2, Loader2, Rss,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { fetchDashboardStats, type DashboardStats } from "@/lib/dashboardApi";

const statusStyles: Record<string, string> = {
  Pending: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400",
  Replied: "bg-green-500/15 text-green-700 dark:text-green-400",
  Booked:  "bg-blue-500/15 text-blue-700 dark:text-blue-400",
  Closed:  "bg-muted text-muted-foreground",
};

const StatusIcon = ({ status }: { status: string }) => {
  if (status === "Booked")  return <CheckCircle2 size={12} className="text-blue-500" />;
  if (status === "Replied") return <CheckCircle2 size={12} className="text-green-500" />;
  return <Clock size={12} className="text-yellow-500" />;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats()
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const statusBreakdown = stats
    ? [
        { name: "Booked",  value: stats.inquiries.booked,  color: "#3b82f6" },
        { name: "Replied", value: stats.inquiries.replied, color: "#22c55e" },
        { name: "Pending", value: stats.inquiries.pending, color: "#eab308" },
        { name: "Closed",  value: stats.inquiries.closed,  color: "#6b7280" },
      ].filter(s => s.value > 0)
    : [];

  const statusTotal = statusBreakdown.reduce((s, d) => s + d.value, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32 text-muted-foreground">
        <Loader2 size={28} className="animate-spin mr-3" />
        <span className="text-sm font-medium">Loading dashboard…</span>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold uppercase tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground text-sm mt-1">Welcome back. Here&apos;s what&apos;s happening with Visual Studios & Events.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Link href="/admin/inquiries" className="bg-background border border-border p-5 rounded-md hover:border-brand-400 transition-colors group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Total Inquiries</span>
            <div className="w-8 h-8 bg-brand-400/10 rounded-md flex items-center justify-center">
              <MessageSquare size={16} className="text-brand-400" />
            </div>
          </div>
          <div className="text-3xl font-bold">{stats?.inquiries.total ?? 0}</div>
          <div className="flex items-center gap-1 mt-2">
            <Clock size={12} className="text-yellow-500" />
            <span className="text-xs text-yellow-600 dark:text-yellow-400 font-bold">{stats?.inquiries.pending ?? 0} pending</span>
          </div>
        </Link>

        <Link href="/admin/inquiries" className="bg-background border border-border p-5 rounded-md hover:border-brand-400 transition-colors group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Active Bookings</span>
            <div className="w-8 h-8 bg-blue-500/10 rounded-md flex items-center justify-center">
              <CalendarCheck size={16} className="text-blue-500" />
            </div>
          </div>
          <div className="text-3xl font-bold">{stats?.inquiries.booked ?? 0}</div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp size={12} className="text-green-500" />
            <span className="text-xs text-green-600 dark:text-green-400 font-bold">{stats?.inquiries.replied ?? 0} replied</span>
          </div>
        </Link>

        <Link href="/admin/portfolios" className="bg-background border border-border p-5 rounded-md hover:border-brand-400 transition-colors group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Portfolio Photos</span>
            <div className="w-8 h-8 bg-purple-500/10 rounded-md flex items-center justify-center">
              <Camera size={16} className="text-purple-500" />
            </div>
          </div>
          <div className="text-3xl font-bold">{stats?.portfolioPhotos ?? 0}</div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp size={12} className="text-green-500" />
            <span className="text-xs text-muted-foreground">in gallery</span>
          </div>
        </Link>

        <Link href="/admin/stay-inspired" className="bg-background border border-border p-5 rounded-md hover:border-brand-400 transition-colors group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Subscribers</span>
            <div className="w-8 h-8 bg-orange-500/10 rounded-md flex items-center justify-center">
              <Rss size={16} className="text-orange-500" />
            </div>
          </div>
          <div className="text-3xl font-bold">{stats?.newsletters.total ?? 0}</div>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-xs text-green-600 dark:text-green-400 font-bold">{stats?.newsletters.active ?? 0} active</span>
          </div>
        </Link>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-background border border-border p-6 rounded-md">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-bold uppercase tracking-tight text-sm">Monthly Activity</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Inquiries & bookings — last 12 months</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-brand-400 inline-block" />Bookings</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-brand-200 inline-block" />Inquiries</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={stats?.monthlyActivity ?? []} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip
                contentStyle={{ background: "var(--color-background)", border: "1px solid var(--color-border)", borderRadius: "6px", fontSize: "12px" }}
              />
              <Bar dataKey="bookings" fill="#dd9454" radius={[3, 3, 0, 0]} />
              <Bar dataKey="inquiries" fill="#ead0b8" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Status Breakdown */}
        <div className="bg-background border border-border p-6 rounded-md flex flex-col">
          <div className="mb-5">
            <h2 className="font-bold uppercase tracking-tight text-sm">Inquiry Status</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Current breakdown</p>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-4">
            {statusBreakdown.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center">No inquiries yet.</p>
            ) : (
              <>
                {statusBreakdown.map((item) => {
                  const pct = statusTotal > 0 ? Math.round((item.value / statusTotal) * 100) : 0;
                  return (
                    <div key={item.name} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-2 font-medium">
                          <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: item.color }} />
                          {item.name}
                        </span>
                        <span className="font-bold tabular-nums">{item.value} <span className="text-muted-foreground font-normal">({pct}%)</span></span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: item.color }} />
                      </div>
                    </div>
                  );
                })}
                <div className="mt-2 pt-4 border-t border-border text-xs text-muted-foreground">
                  Total: <span className="font-bold text-foreground">{statusTotal}</span> inquiries
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <a href="https://calendly.com/lens-xstudioslab/book-a-photography-session" target="_blank" rel="noopener noreferrer"
          className="bg-background border border-border p-4 rounded-md hover:border-brand-400 transition-colors group flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Booking Calendar</div>
            <div className="text-sm font-bold">Manage via Calendly</div>
          </div>
          <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-brand-400 transition-colors" />
        </a>
        <a href="https://gallery.visualstudioslens.com/" target="_blank" rel="noopener noreferrer"
          className="bg-background border border-border p-4 rounded-md hover:border-brand-400 transition-colors group flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Client Gallery</div>
            <div className="text-sm font-bold">Manage via Pixieset</div>
          </div>
          <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-brand-400 transition-colors" />
        </a>
        <Link href="/admin/store"
          className="bg-background border border-border p-4 rounded-md hover:border-brand-400 transition-colors group flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Store Orders</div>
            <div className="text-sm font-bold flex items-center gap-2">
              Print Store
              {(stats?.storeOrders.needsQuote ?? 0) > 0 && (
                <span className="text-[10px] bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 font-bold px-2 py-0.5 rounded-full">
                  {stats!.storeOrders.needsQuote} need quotes
                </span>
              )}
            </div>
          </div>
          <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-brand-400 transition-colors" />
        </Link>
      </div>

      {/* Recent Inquiries */}
      <div className="bg-background border border-border rounded-md overflow-hidden mb-8">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <h2 className="font-bold uppercase tracking-tight text-sm">Recent Inquiries</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Latest client messages</p>
          </div>
          <Link href="/admin/inquiries" className="text-xs font-bold uppercase tracking-widest text-brand-400 hover:text-brand-500 flex items-center gap-1">
            View All <ExternalLink size={12} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-muted/50 text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border">
                <th className="p-4 font-bold">Client</th>
                <th className="p-4 font-bold">Service</th>
                <th className="p-4 font-bold hidden md:table-cell">Date</th>
                <th className="p-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-border">
              {(stats?.recentInquiries ?? []).length === 0 ? (
                <tr><td colSpan={4} className="p-8 text-center text-sm text-muted-foreground">No inquiries yet.</td></tr>
              ) : (
                (stats?.recentInquiries ?? []).map((inq) => (
                  <tr key={inq.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="font-semibold text-sm">{inq.name}</div>
                      <div className="text-xs text-muted-foreground">{inq.email}</div>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{inq.type}</td>
                    <td className="p-4 text-xs text-muted-foreground hidden md:table-cell">{formatDate(inq.createdAt)}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${statusStyles[inq.status] ?? ""}`}>
                        <StatusIcon status={inq.status} />
                        {inq.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Quick Nav */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { href: "/admin/portfolios",     label: "Portfolios",   icon: Camera,       desc: "Manage featured images" },
          { href: "/admin/stay-inspired",  label: "Subscribers",  icon: Rss,          desc: `${stats?.newsletters.active ?? 0} active` },
          { href: "/admin/store",          label: "Print Store",  icon: ShoppingBag,  desc: `${stats?.storeOrders.total ?? 0} orders` },
          { href: "/admin/settings",       label: "Settings",     icon: MessageSquare, desc: "Brand configuration" },
        ].map(item => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}
              className="bg-background border border-border p-4 rounded-md hover:border-brand-400 transition-colors group">
              <Icon size={18} className="text-brand-400 mb-2" />
              <div className="text-xs font-bold uppercase tracking-widest">{item.label}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{item.desc}</div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
