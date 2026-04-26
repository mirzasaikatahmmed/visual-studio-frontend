"use client";

import Link from "next/link";
import {
  MessageSquare, Camera, TrendingUp, ShoppingBag, ExternalLink,
  CalendarCheck, Star, ArrowUpRight, Clock, CheckCircle2, AlertCircle
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid
} from "recharts";

const monthlyData = [
  { month: "Jan", bookings: 4, inquiries: 9 },
  { month: "Feb", bookings: 6, inquiries: 12 },
  { month: "Mar", bookings: 8, inquiries: 14 },
  { month: "Apr", bookings: 5, inquiries: 10 },
  { month: "May", bookings: 11, inquiries: 18 },
  { month: "Jun", bookings: 9, inquiries: 16 },
  { month: "Jul", bookings: 14, inquiries: 22 },
  { month: "Aug", bookings: 12, inquiries: 20 },
  { month: "Sep", bookings: 10, inquiries: 17 },
  { month: "Oct", bookings: 7, inquiries: 13 },
  { month: "Nov", bookings: 9, inquiries: 15 },
  { month: "Dec", bookings: 15, inquiries: 24 },
];

const statusData = [
  { name: "Booked", value: 12, color: "#3b82f6" },
  { name: "Replied", value: 8, color: "#22c55e" },
  { name: "Pending", value: 5, color: "#eab308" },
];

const recentInquiries = [
  { id: 1, name: "David & Emily", email: "david@example.com", type: "Wedding Coverage", date: "Apr 24, 2026", status: "Pending" },
  { id: 2, name: "Atlas Tech Corp", email: "marketing@atlas.com", type: "Brand Photography", date: "Apr 23, 2026", status: "Replied" },
  { id: 3, name: "Sophia R.", email: "sophia.r@gmail.com", type: "Event Decoration", date: "Apr 21, 2026", status: "Booked" },
  { id: 4, name: "James & Sarah", email: "james@example.com", type: "Maternity Session", date: "Apr 20, 2026", status: "Booked" },
  { id: 5, name: "The Grand Hotel", email: "events@grandhotel.com", type: "Corporate Event", date: "Apr 18, 2026", status: "Replied" },
];

const statusStyles: Record<string, string> = {
  Pending: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400",
  Replied: "bg-green-500/15 text-green-700 dark:text-green-400",
  Booked: "bg-blue-500/15 text-blue-700 dark:text-blue-400",
};

const StatusIcon = ({ status }: { status: string }) => {
  if (status === "Booked") return <CheckCircle2 size={12} className="text-blue-500" />;
  if (status === "Replied") return <CheckCircle2 size={12} className="text-green-500" />;
  return <Clock size={12} className="text-yellow-500" />;
};

export default function AdminDashboardPage() {
  const totalInquiries = 25;
  const activeBookings = 12;
  const totalPhotos = 240;
  const storeQueries = 7;

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold uppercase tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground text-sm mt-1">Welcome back. Here&apos;s what&apos;s happening with Visual Studio.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-background border border-border p-5 rounded-md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Total Inquiries</span>
            <div className="w-8 h-8 bg-brand-400/10 rounded-md flex items-center justify-center">
              <MessageSquare size={16} className="text-brand-400" />
            </div>
          </div>
          <div className="text-3xl font-bold">{totalInquiries}</div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp size={12} className="text-green-500" />
            <span className="text-xs text-green-600 font-bold">+18%</span>
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
        </div>

        <div className="bg-background border border-border p-5 rounded-md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Active Bookings</span>
            <div className="w-8 h-8 bg-blue-500/10 rounded-md flex items-center justify-center">
              <CalendarCheck size={16} className="text-blue-500" />
            </div>
          </div>
          <div className="text-3xl font-bold">{activeBookings}</div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp size={12} className="text-green-500" />
            <span className="text-xs text-green-600 font-bold">+5%</span>
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
        </div>

        <div className="bg-background border border-border p-5 rounded-md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Portfolio Photos</span>
            <div className="w-8 h-8 bg-purple-500/10 rounded-md flex items-center justify-center">
              <Camera size={16} className="text-purple-500" />
            </div>
          </div>
          <div className="text-3xl font-bold">{totalPhotos}</div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp size={12} className="text-green-500" />
            <span className="text-xs text-green-600 font-bold">+24</span>
            <span className="text-xs text-muted-foreground">added this month</span>
          </div>
        </div>

        <div className="bg-background border border-border p-5 rounded-md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Store Queries</span>
            <div className="w-8 h-8 bg-orange-500/10 rounded-md flex items-center justify-center">
              <ShoppingBag size={16} className="text-orange-500" />
            </div>
          </div>
          <div className="text-3xl font-bold">{storeQueries}</div>
          <div className="flex items-center gap-1 mt-2">
            <AlertCircle size={12} className="text-yellow-500" />
            <span className="text-xs text-yellow-600 font-bold">3 need quotes</span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-background border border-border p-6 rounded-md">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-bold uppercase tracking-tight text-sm">Monthly Activity</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Inquiries & bookings — 2026</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-brand-400 inline-block" />Bookings</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-brand-200 inline-block" />Inquiries</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
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
            {statusData.map((item) => {
              const total = statusData.reduce((s, d) => s + d.value, 0);
              const pct = Math.round((item.value / total) * 100);
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
              Total: <span className="font-bold text-foreground">{statusData.reduce((s, d) => s + d.value, 0)}</span> inquiries this period
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <a
          href="https://calendly.com/lens-xstudioslab/book-a-photography-session"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-background border border-border p-4 rounded-md hover:border-brand-400 transition-colors group flex items-center justify-between"
        >
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Booking Calendar</div>
            <div className="text-sm font-bold">Manage via Calendly</div>
          </div>
          <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-brand-400 transition-colors" />
        </a>
        <a
          href="https://gallery.visualstudioslens.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-background border border-border p-4 rounded-md hover:border-brand-400 transition-colors group flex items-center justify-between"
        >
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Client Gallery</div>
            <div className="text-sm font-bold">Manage via Pixieset</div>
          </div>
          <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-brand-400 transition-colors" />
        </a>
        <a
          href="https://youtube.com/@visualstudio"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-background border border-border p-4 rounded-md hover:border-brand-400 transition-colors group flex items-center justify-between"
        >
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Video Channel</div>
            <div className="text-sm font-bold">Manage via YouTube</div>
          </div>
          <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-brand-400 transition-colors" />
        </a>
      </div>

      {/* Recent Inquiries */}
      <div className="bg-background border border-border rounded-md overflow-hidden">
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
              {recentInquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <div className="font-semibold text-sm">{inq.name}</div>
                    <div className="text-xs text-muted-foreground">{inq.email}</div>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{inq.type}</td>
                  <td className="p-4 text-xs text-muted-foreground hidden md:table-cell">{inq.date}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${statusStyles[inq.status]}`}>
                      <StatusIcon status={inq.status} />
                      {inq.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Quick Nav */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {[
          { href: "/admin/portfolios", label: "Portfolios", icon: Camera, desc: "Manage featured images" },
          { href: "/admin/testimonials", label: "Testimonials", icon: Star, desc: "Client reviews" },
          { href: "/admin/store", label: "Print Store", icon: ShoppingBag, desc: "Orders & products" },
          { href: "/admin/settings", label: "Settings", icon: Star, desc: "Brand configuration" },
        ].map(item => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="bg-background border border-border p-4 rounded-md hover:border-brand-400 transition-colors group"
            >
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
