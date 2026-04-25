"use client";

import { useState } from "react";

export default function SettingsAdminPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }, 1500);
  };
  return (
    <>
      <div className="flex items-center justify-between mb-8 relative">
        <h1 className="text-3xl font-bold uppercase tracking-tight">Brand Settings</h1>
        <div className="flex items-center gap-4">
           {isSaved && <span className="text-green-500 font-bold text-xs uppercase tracking-widest">Settings Saved!</span>}
           <button 
             onClick={handleSave}
             disabled={isSaving}
             className="px-8 py-3 bg-foreground text-background font-bold uppercase tracking-widest text-xs hover:opacity-90 disabled:opacity-50 transition-all min-w-[200px]"
           >
             {isSaving ? "Saving..." : "Save All Changes"}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* General Options */}
         <div className="bg-background border border-border p-8">
            <h2 className="text-xl font-bold uppercase tracking-tight mb-6 border-b border-border pb-4">Contact Information</h2>
            
            <div className="space-y-6">
               <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Primary Studio Email</label>
                  <input type="email" defaultValue="booking@visualstudio.com" className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-foreground" />
               </div>

               <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Phone Number</label>
                  <input type="text" defaultValue="+1 (555) 123-4567" className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-foreground" />
               </div>

               <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Studio Address (Display)</label>
                  <textarea rows={3} defaultValue={"123 Creative Avenue, Suite 100\nNew York, NY 10001"} className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-foreground resize-none" />
               </div>
               
               <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Google Map Embed Link</label>
                  <input type="text" defaultValue="https://www.google.com/maps/embed?..." className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-foreground" />
               </div>
            </div>
         </div>

         {/* Ext links & files */}
         <div className="space-y-8">
            <div className="bg-background border border-border p-8">
               <h2 className="text-xl font-bold uppercase tracking-tight mb-6 border-b border-border pb-4">Integrations</h2>
               
               <div className="space-y-6">
                  <div className="space-y-2">
                     <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">WhatsApp Number (For Floating Button)</label>
                     <input type="text" defaultValue="15551234567" className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-foreground" />
                     <p className="text-xs text-muted-foreground">Include country code without &apos;+&apos;, e.g., 15551234567</p>
                  </div>

                  <div className="space-y-2">
                     <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Instagram Username</label>
                     <input type="text" defaultValue="visualstudio" className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-foreground" />
                  </div>
               </div>
            </div>

            <div className="bg-background border border-border p-8">
               <h2 className="text-xl font-bold uppercase tracking-tight mb-6 border-b border-border pb-4">Resources PDF</h2>
               
               <div className="space-y-4">
                  <div className="p-4 border border-dashed border-border bg-muted flex flex-col items-center justify-center py-8 hover:bg-muted/50 cursor-pointer transition-colors">
                     <span className="font-bold uppercase tracking-widest text-sm underline underline-offset-4">Upload New PDF File</span>
                     <span className="text-xs text-muted-foreground mt-2">Currently Active: pricing_guide_2024.pdf</span>
                  </div>
               </div>
            </div>
         </div>
         
      </div>
    </>
  );
}
