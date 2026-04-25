import { Users, Image as ImageIcon, Video, Globe2 } from "lucide-react";

export const metadata = {
  title: "Admin Dashboard | Visual Studio",
};

export default function AdminDashboardPage() {
  return (
    <>
       <h1 className="text-3xl font-bold uppercase tracking-tight mb-8">Overview</h1>

       {/* Stats Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-background border border-border p-6 flex flex-col gap-4">
             <div className="flex items-center gap-3 text-muted-foreground">
                <Users size={20} /> <span className="uppercase text-xs font-bold tracking-widest">Visitors</span>
             </div>
             <div className="text-4xl font-bold">12,450</div>
             <div className="text-xs text-green-500 font-bold uppercase tracking-widest">+15% this month</div>
          </div>

          <div className="bg-background border border-border p-6 flex flex-col gap-4">
             <div className="flex items-center gap-3 text-muted-foreground">
                <Globe2 size={20} /> <span className="uppercase text-xs font-bold tracking-widest">Status</span>
             </div>
             <div className="text-4xl font-bold text-green-500">Online</div>
             <div className="text-xs text-muted-foreground font-bold uppercase tracking-widest">All systems operational</div>
          </div>

          <a href="https://gallery.visualstudioslens.com/" target="_blank" rel="noopener noreferrer" className="bg-background border border-border hover:border-foreground transition-colors p-6 flex flex-col gap-4 group cursor-pointer">
             <div className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                <ImageIcon size={20} /> <span className="uppercase text-xs font-bold tracking-widest">Photos Hyperlink</span>
             </div>
             <div className="text-lg font-bold mt-2">Manage Portfolios</div>
             <div className="text-xs text-muted-foreground uppercase tracking-widest border-b border-muted-foreground inline-block mt-auto w-max">Open Pixieset ↗</div>
          </a>

          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="bg-background border border-border hover:border-foreground transition-colors p-6 flex flex-col gap-4 group cursor-pointer">
             <div className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                <Video size={20} /> <span className="uppercase text-xs font-bold tracking-widest">Video Hyperlink</span>
             </div>
             <div className="text-lg font-bold mt-2">Manage Channel</div>
             <div className="text-xs text-muted-foreground uppercase tracking-widest border-b border-muted-foreground inline-block mt-auto w-max">Open YouTube ↗</div>
          </a>
       </div>

       {/* Recent Inquiries List (Dummy) */}
       <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold uppercase tracking-tight">Recent Inquiries</h2>
          <span className="text-sm border-b border-foreground font-bold uppercase tracking-widest cursor-pointer">View All</span>
       </div>
       <div className="bg-background border border-border overflow-hidden">
          <table className="w-full text-left border-collapse">
             <thead>
                <tr className="bg-muted text-xs uppercase tracking-widest text-muted-foreground border-b border-border">
                   <th className="p-4 font-bold">Client Name</th>
                   <th className="p-4 font-bold">Inquiry Type</th>
                   <th className="p-4 font-bold">Date</th>
                   <th className="p-4 font-bold">Status</th>
                </tr>
             </thead>
             <tbody className="text-sm">
                <tr className="border-b border-border hover:bg-muted/50 transition-colors">
                   <td className="p-4 font-medium">David & Emily</td>
                   <td className="p-4 text-muted-foreground">Wedding Coverage</td>
                   <td className="p-4 text-muted-foreground">Oct 24, 2023</td>
                   <td className="p-4"><span className="px-2 py-1 bg-yellow-500/20 text-yellow-600 rounded text-xs font-bold uppercase">Pending</span></td>
                </tr>
                <tr className="border-b border-border hover:bg-muted/50 transition-colors">
                   <td className="p-4 font-medium">Atlas Tech Corp</td>
                   <td className="p-4 text-muted-foreground">Brand Photography</td>
                   <td className="p-4 text-muted-foreground">Oct 23, 2023</td>
                   <td className="p-4"><span className="px-2 py-1 bg-green-500/20 text-green-600 rounded text-xs font-bold uppercase">Replied</span></td>
                </tr>
                <tr className="hover:bg-muted/50 transition-colors">
                   <td className="p-4 font-medium">Sophia R.</td>
                   <td className="p-4 text-muted-foreground">Event Decoration Setup</td>
                   <td className="p-4 text-muted-foreground">Oct 21, 2023</td>
                   <td className="p-4"><span className="px-2 py-1 bg-green-500/20 text-green-600 rounded text-xs font-bold uppercase">Booked</span></td>
                </tr>
             </tbody>
          </table>
       </div>
    </>
  );
}
