import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Login | Visual Studio",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background border-t-8 border-foreground p-4">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
         <ArrowLeft size={16} /> Back to Home
      </Link>
      
      <div className="w-full max-w-md bg-background border border-border p-8 shadow-2xl">
         <div className="text-center mb-8">
            <h1 className="text-3xl font-bold uppercase tracking-tight mb-2">Welcome Back</h1>
            <p className="text-muted-foreground text-sm">Sign in to manage your account or studio dashboard.</p>
         </div>

         <form className="space-y-6">
            <div className="space-y-2">
               <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Address</label>
               <input type="email" placeholder="hello@example.com" className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-foreground transition-colors" />
            </div>

            <div className="space-y-2">
               <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Password</label>
                  <a href="#" className="text-xs font-bold text-muted-foreground hover:text-foreground">Forgot?</a>
               </div>
               <input type="password" placeholder="••••••••" className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-foreground transition-colors" />
            </div>

            <button type="submit" className="w-full bg-foreground text-background font-bold tracking-widest uppercase text-sm py-4 hover:opacity-90 transition-opacity">
               Sign In
            </button>
         </form>

         <div className="mt-8 text-center text-sm text-muted-foreground">
            Don&apos;t have an account? <Link href="/register" className="font-bold text-foreground border-b border-foreground uppercase tracking-widest text-xs ml-2">Create one</Link>
         </div>
      </div>
    </div>
  );
}
