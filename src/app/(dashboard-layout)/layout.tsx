import { ReactNode } from "react";
import Link from "next/link";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen bg-muted/20 text-foreground">
      {/* Header */}
      <header className="bg-background border-b border-border py-4 px-8 sticky top-0 z-10 flex items-center justify-between">
        <div className="font-bold uppercase tracking-widest text-lg">Visual Studio Admin</div>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-foreground rounded-full"></div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-background border-r border-border p-6 hidden md:block shrink-0">
          <nav className="space-y-2">
            <Link href="/admin" className="block px-4 py-3 text-muted-foreground hover:bg-muted font-bold text-sm uppercase tracking-widest rounded-md transition-colors border border-transparent hover:border-border">Overview</Link>
            <Link href="/admin/inquiries" className="block px-4 py-3 text-muted-foreground hover:bg-muted font-bold text-sm uppercase tracking-widest rounded-md transition-colors border border-transparent hover:border-border">Inquiries</Link>
            <Link href="/admin/portfolios" className="block px-4 py-3 text-muted-foreground hover:bg-muted font-bold text-sm uppercase tracking-widest rounded-md transition-colors border border-transparent hover:border-border">Portfolios</Link>
            <Link href="/admin/videos" className="block px-4 py-3 text-muted-foreground hover:bg-muted font-bold text-sm uppercase tracking-widest rounded-md transition-colors border border-transparent hover:border-border">Videos</Link>
            <Link href="/admin/events" className="block px-4 py-3 text-muted-foreground hover:bg-muted font-bold text-sm uppercase tracking-widest rounded-md transition-colors border border-transparent hover:border-border">Events & Decor</Link>
            <Link href="/admin/store" className="block px-4 py-3 text-muted-foreground hover:bg-muted font-bold text-sm uppercase tracking-widest rounded-md transition-colors border border-transparent hover:border-border">Print Store</Link>
            <Link href="/admin/testimonials" className="block px-4 py-3 text-muted-foreground hover:bg-muted font-bold text-sm uppercase tracking-widest rounded-md transition-colors border border-transparent hover:border-border">Testimonials</Link>
            <Link href="/admin/settings" className="block px-4 py-3 text-muted-foreground hover:bg-muted font-bold text-sm uppercase tracking-widest rounded-md transition-colors border border-transparent hover:border-border">Settings</Link>
            <div className="pt-8">
              <Link href="/" className="block px-4 py-3 text-muted-foreground hover:bg-muted font-medium text-sm transition-colors rounded-md border border-transparent hover:border-border">Back to Website</Link>
            </div>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-8 overflow-x-hidden">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;