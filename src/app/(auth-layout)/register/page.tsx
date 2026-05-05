import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Create Account | Visual Studios & Events",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background border-t-8 border-foreground p-4">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
         <ArrowLeft size={16} /> Back to Home
      </Link>
      
      <div className="w-full max-w-md bg-background border border-border p-8 shadow-2xl">
         <div className="text-center mb-8">
            <h1 className="text-3xl font-bold uppercase tracking-tight mb-2">Create Account</h1>
            <p className="text-muted-foreground text-sm">Join to track your orders and manage your studio experience.</p>
         </div>

         <form className="space-y-6">
            <div className="space-y-2">
               <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Full Name</label>
               <input type="text" placeholder="John Doe" className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-foreground transition-colors" />
            </div>

            <div className="space-y-2">
               <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Address</label>
               <input type="email" placeholder="hello@example.com" className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-foreground transition-colors" />
            </div>

            <div className="space-y-2">
               <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Password</label>
               <input type="password" placeholder="••••••••" className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-foreground transition-colors" />
            </div>

            <div className="space-y-2">
               <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Confirm Password</label>
               <input type="password" placeholder="••••••••" className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-foreground transition-colors" />
            </div>

            <button type="submit" className="w-full bg-foreground text-background font-bold tracking-widest uppercase text-sm py-4 hover:opacity-90 transition-opacity">
               Sign Up
            </button>
         </form>

         <div className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account? <Link href="/login" className="font-bold text-foreground border-b border-foreground uppercase tracking-widest text-xs ml-2">Sign In</Link>
         </div>
      </div>
    </div>
  );
}
