"use client";

import { useState, useEffect } from "react";
import {
  Phone, MapPin, Globe, Link as LinkIcon,
  MessageCircle, FileText, Save, Eye, EyeOff, Shield, Bell, AtSign
} from "lucide-react";
import {
  fetchSettingsMap,
  bulkSaveSettings,
  updateAdminProfile,
  changeAdminPassword,
} from "@/lib/settingsApi";
import { getStoredUser, getToken, saveAuth } from "@/lib/auth";

type Section = "contact" | "social" | "integrations" | "brand" | "notifications" | "account";

const tabs: { id: Section; label: string }[] = [
  { id: "contact", label: "Contact Info" },
  { id: "social", label: "Social Media" },
  { id: "integrations", label: "Integrations" },
  { id: "brand", label: "Brand & SEO" },
  { id: "notifications", label: "Notifications" },
  { id: "account", label: "Account" },
];

function SaveBar({ onSave, saving, saved, error }: {
  onSave: () => void; saving: boolean; saved: boolean; error?: string | null;
}) {
  return (
    <div className="flex items-center justify-end gap-3 pt-5 mt-5 border-t border-border flex-wrap">
      {saved && <span className="text-green-600 text-xs font-bold uppercase tracking-widest">Saved successfully!</span>}
      {error && <span className="text-red-500 text-xs font-semibold">{error}</span>}
      <button
        onClick={onSave}
        disabled={saving}
        className="px-7 py-2.5 bg-brand-400 text-white font-bold uppercase tracking-widest text-xs hover:bg-brand-500 transition-colors rounded-sm disabled:opacity-50 flex items-center gap-2"
      >
        <Save size={14} /> {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}

function InputField({ label, type = "text", value, onChange, placeholder, hint }: {
  label: string; type?: string; value: string; onChange: (v: string) => void; placeholder?: string; hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-muted border border-border px-4 py-2.5 outline-none focus:border-brand-400 transition-colors text-sm rounded-sm"
      />
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function ToggleSetting({ label, description, checked, onChange }: {
  label: string; description: string; checked: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-4 border-b border-border last:border-0">
      <div>
        <div className="text-sm font-semibold">{label}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{description}</div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${checked ? "bg-brand-400" : "bg-muted border border-border"}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${checked ? "translate-x-5" : "translate-x-0"}`} />
      </button>
    </div>
  );
}

export default function SettingsAdminPage() {
  const [activeSection, setActiveSection] = useState<Section>("contact");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Contact
  const [email, setEmail] = useState("lens@visualstudioslens.com");
  const [phone, setPhone] = useState("+1 (347) 306-6637");
  const [address, setAddress] = useState("Liberty Avenue Brooklyn, 1097\nNew York, NY 11208");
  const [mapEmbed, setMapEmbed] = useState("https://www.google.com/maps/embed?pb=...");
  const [businessHours, setBusinessHours] = useState("Mon–Fri: 10am – 7pm\nSat–Sun: By appointment");

  // Social Media
  const [instagram, setInstagram] = useState("@visualstudioofficial");
  const [instagramUrl, setInstagramUrl] = useState("https://instagram.com/visualstudioofficial");
  const [facebook, setFacebook] = useState("https://facebook.com/visualstudioslens");
  const [youtube, setYoutube] = useState("https://youtube.com/@visualstudio");
  const [pinterest, setPinterest] = useState("https://pinterest.com/visualstudio");
  const [tiktok, setTiktok] = useState("");

  // Integrations
  const [calendlyUrl, setCalendlyUrl] = useState("https://calendly.com/lens-xstudioslab/book-a-photography-session");
  const [pixiesetUrl, setPixiesetUrl] = useState("https://gallery.visualstudioslens.com/");
  const [whatsapp, setWhatsapp] = useState("13473066637");
  const [whatsappMsg, setWhatsappMsg] = useState("Hi! I found you on your website and would love to learn more about your photography services.");
  const [pricingPdf, setPricingPdf] = useState("pricing_guide_2026.pdf");

  // Brand & SEO
  const [studioName, setStudioName] = useState("Visual Studio");
  const [tagline, setTagline] = useState("Moments Captured. Stories Told.");
  const [metaDesc, setMetaDesc] = useState("Visual Studio is a luxury photography and event decoration studio based in Brooklyn, NY. Specializing in weddings, corporate events, and creative portraits.");
  const [metaKeywords, setMetaKeywords] = useState("wedding photography brooklyn, event decoration nyc, luxury photographer new york");

  // Notifications
  const [emailOnInquiry, setEmailOnInquiry] = useState(true);
  const [emailOnStore, setEmailOnStore] = useState(true);
  const [emailOnBooking, setEmailOnBooking] = useState(true);
  const [dailySummary, setDailySummary] = useState(false);
  const [notifEmail, setNotifEmail] = useState("lens@visualstudioslens.com");

  // Account
  const [adminName, setAdminName] = useState("Visual Studio Admin");
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);

  // Load saved settings on mount
  useEffect(() => {
    async function load() {
      try {
        const map = await fetchSettingsMap();

        if (map.studio_email) setEmail(map.studio_email);
        if (map.phone) setPhone(map.phone);
        if (map.address) setAddress(map.address);
        if (map.business_hours) setBusinessHours(map.business_hours);
        if (map.map_embed_url) setMapEmbed(map.map_embed_url);

        if (map.instagram_handle) setInstagram(map.instagram_handle);
        if (map.instagram_url) setInstagramUrl(map.instagram_url);
        if (map.facebook_url) setFacebook(map.facebook_url);
        if (map.youtube_url) setYoutube(map.youtube_url);
        if (map.pinterest_url) setPinterest(map.pinterest_url);
        if (map.tiktok_url !== undefined) setTiktok(map.tiktok_url);

        if (map.calendly_url) setCalendlyUrl(map.calendly_url);
        if (map.pixieset_url) setPixiesetUrl(map.pixieset_url);
        if (map.whatsapp_number) setWhatsapp(map.whatsapp_number);
        if (map.whatsapp_message) setWhatsappMsg(map.whatsapp_message);
        if (map.pricing_pdf) setPricingPdf(map.pricing_pdf);

        if (map.studio_name) setStudioName(map.studio_name);
        if (map.studio_tagline) setTagline(map.studio_tagline);
        if (map.meta_description) setMetaDesc(map.meta_description);
        if (map.meta_keywords) setMetaKeywords(map.meta_keywords);

        if (map.notif_email) setNotifEmail(map.notif_email);
        if (map.email_on_inquiry !== undefined) setEmailOnInquiry(map.email_on_inquiry === 'true');
        if (map.email_on_booking !== undefined) setEmailOnBooking(map.email_on_booking === 'true');
        if (map.email_on_store !== undefined) setEmailOnStore(map.email_on_store === 'true');
        if (map.daily_summary !== undefined) setDailySummary(map.daily_summary === 'true');

        if (map.two_factor_enabled !== undefined) setTwoFactor(map.two_factor_enabled === 'true');
      } catch {
        // settings not yet seeded — defaults stay
      }

      // Populate admin name from stored auth user
      const user = getStoredUser();
      if (user) {
        const displayName = [user.firstName, user.lastName].filter(Boolean).join(' ').trim();
        if (displayName) setAdminName(displayName);
      }

      setLoading(false);
    }
    load();
  }, []);

  const doSave = async (saveFn: () => Promise<void>) => {
    setSaving(true);
    setSaved(false);
    setError(null);
    try {
      await saveFn();
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const saveContact = () => doSave(async () => {
    await bulkSaveSettings([
      { key: 'studio_email', value: email, group: 'contact' },
      { key: 'phone', value: phone, group: 'contact' },
      { key: 'address', value: address, group: 'contact' },
      { key: 'business_hours', value: businessHours, group: 'contact' },
      { key: 'map_embed_url', value: mapEmbed, group: 'contact' },
    ]);
  });

  const saveSocial = () => doSave(async () => {
    await bulkSaveSettings([
      { key: 'instagram_handle', value: instagram, group: 'social' },
      { key: 'instagram_url', value: instagramUrl, group: 'social' },
      { key: 'facebook_url', value: facebook, group: 'social' },
      { key: 'youtube_url', value: youtube, group: 'social' },
      { key: 'pinterest_url', value: pinterest, group: 'social' },
      { key: 'tiktok_url', value: tiktok, group: 'social' },
    ]);
  });

  const saveIntegrations = () => doSave(async () => {
    await bulkSaveSettings([
      { key: 'calendly_url', value: calendlyUrl, group: 'integrations' },
      { key: 'pixieset_url', value: pixiesetUrl, group: 'integrations' },
      { key: 'whatsapp_number', value: whatsapp, group: 'integrations' },
      { key: 'whatsapp_message', value: whatsappMsg, group: 'integrations' },
      { key: 'pricing_pdf', value: pricingPdf, group: 'integrations' },
    ]);
  });

  const saveBrand = () => doSave(async () => {
    await bulkSaveSettings([
      { key: 'studio_name', value: studioName, group: 'brand' },
      { key: 'studio_tagline', value: tagline, group: 'brand' },
      { key: 'meta_description', value: metaDesc, group: 'brand' },
      { key: 'meta_keywords', value: metaKeywords, group: 'brand' },
    ]);
  });

  const saveNotifications = () => doSave(async () => {
    await bulkSaveSettings([
      { key: 'notif_email', value: notifEmail, group: 'notifications' },
      { key: 'email_on_inquiry', value: String(emailOnInquiry), group: 'notifications' },
      { key: 'email_on_booking', value: String(emailOnBooking), group: 'notifications' },
      { key: 'email_on_store', value: String(emailOnStore), group: 'notifications' },
      { key: 'daily_summary', value: String(dailySummary), group: 'notifications' },
    ]);
  });

  const saveAccount = () => doSave(async () => {
    // Update display name
    const parts = adminName.trim().split(/\s+/);
    const firstName = parts[0] ?? '';
    const lastName = parts.slice(1).join(' ');
    const updatedUser = await updateAdminProfile({ firstName, lastName: lastName || undefined });

    // Sync updated name back into localStorage so header reflects change
    const token = getToken();
    const storedUser = getStoredUser();
    if (token && storedUser) {
      saveAuth(token, { ...storedUser, firstName: updatedUser.firstName, lastName: updatedUser.lastName });
    }

    // Change password only if new password field is filled
    if (newPw.trim()) {
      if (!currentPw.trim()) throw new Error('Enter your current password to change it');
      if (newPw !== confirmPw) throw new Error('Passwords do not match');
      await changeAdminPassword({ currentPassword: currentPw, newPassword: newPw });
      setCurrentPw('');
      setNewPw('');
      setConfirmPw('');
    }

    // Persist 2FA preference
    await bulkSaveSettings([
      { key: 'two_factor_enabled', value: String(twoFactor), group: 'account' },
    ]);
  });

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold uppercase tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Configure your studio&apos;s brand, integrations, and account.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Tab Sidebar */}
        <div className="md:w-48 shrink-0">
          <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-visible">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveSection(tab.id); setSaved(false); setError(null); }}
                className={`px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-left whitespace-nowrap rounded-sm transition-colors ${
                  activeSection === tab.id ? "bg-brand-400 text-white" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Panel */}
        <div className="flex-1 bg-background border border-border rounded-md p-6">

          {loading ? (
            <div className="flex items-center justify-center py-16 text-muted-foreground text-sm">
              Loading settings…
            </div>
          ) : (
            <>
              {/* Contact Information */}
              {activeSection === "contact" && (
                <div className="space-y-5">
                  <div>
                    <h2 className="font-bold uppercase tracking-tight text-sm mb-4 flex items-center gap-2">
                      <Phone size={15} className="text-brand-400" /> Contact Information
                    </h2>
                  </div>
                  <InputField label="Studio Email" type="email" value={email} onChange={setEmail} placeholder="contact@yourstudio.com" />
                  <InputField label="Phone Number" value={phone} onChange={setPhone} placeholder="+1 (000) 000-0000" />
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Studio Address</label>
                    <textarea rows={3} value={address} onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-muted border border-border px-4 py-2.5 outline-none focus:border-brand-400 transition-colors text-sm rounded-sm resize-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Business Hours</label>
                    <textarea rows={3} value={businessHours} onChange={(e) => setBusinessHours(e.target.value)}
                      className="w-full bg-muted border border-border px-4 py-2.5 outline-none focus:border-brand-400 transition-colors text-sm rounded-sm resize-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                      <MapPin size={12} /> Google Map Embed URL
                    </label>
                    <input type="url" value={mapEmbed} onChange={(e) => setMapEmbed(e.target.value)}
                      className="w-full bg-muted border border-border px-4 py-2.5 outline-none focus:border-brand-400 transition-colors text-sm rounded-sm font-mono" />
                    <p className="text-xs text-muted-foreground">Paste the embed src URL from Google Maps &gt; Share &gt; Embed a map.</p>
                  </div>
                  <SaveBar onSave={saveContact} saving={saving} saved={saved} error={error} />
                </div>
              )}

              {/* Social Media */}
              {activeSection === "social" && (
                <div className="space-y-5">
                  <h2 className="font-bold uppercase tracking-tight text-sm mb-4 flex items-center gap-2">
                    <Globe size={15} className="text-brand-400" /> Social Media Links
                  </h2>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                      <AtSign size={12} /> Instagram Handle
                    </label>
                    <input type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="@yourstudio"
                      className="w-full bg-muted border border-border px-4 py-2.5 outline-none focus:border-brand-400 transition-colors text-sm rounded-sm" />
                  </div>
                  <InputField label="Instagram Profile URL" type="url" value={instagramUrl} onChange={setInstagramUrl} placeholder="https://instagram.com/yourstudio" />
                  <InputField label="Facebook Page URL" type="url" value={facebook} onChange={setFacebook} placeholder="https://facebook.com/yourstudio" />
                  <InputField label="YouTube Channel URL" type="url" value={youtube} onChange={setYoutube} placeholder="https://youtube.com/@yourstudio" />
                  <InputField label="Pinterest Profile URL" type="url" value={pinterest} onChange={setPinterest} placeholder="https://pinterest.com/yourstudio" />
                  <InputField label="TikTok Profile URL" type="url" value={tiktok} onChange={setTiktok} placeholder="https://tiktok.com/@yourstudio" hint="Optional — leave blank to hide from footer." />
                  <SaveBar onSave={saveSocial} saving={saving} saved={saved} error={error} />
                </div>
              )}

              {/* Integrations */}
              {activeSection === "integrations" && (
                <div className="space-y-6">
                  <h2 className="font-bold uppercase tracking-tight text-sm mb-4 flex items-center gap-2">
                    <LinkIcon size={15} className="text-brand-400" /> External Integrations
                  </h2>

                  <div className="space-y-4 pb-5 border-b border-border">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Booking & Gallery</h3>
                    <InputField label="Calendly Booking URL" type="url" value={calendlyUrl} onChange={setCalendlyUrl}
                      placeholder="https://calendly.com/..." hint="This URL is used in all 'Book Now' CTA buttons across the site." />
                    <InputField label="Pixieset Gallery URL" type="url" value={pixiesetUrl} onChange={setPixiesetUrl}
                      placeholder="https://gallery.yourstudio.com/" hint="Used in the 'Client Portal' footer link and Portfolio page." />
                  </div>

                  <div className="space-y-4 pb-5 border-b border-border">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                      <MessageCircle size={12} /> WhatsApp Integration
                    </h3>
                    <InputField label="WhatsApp Number" value={whatsapp} onChange={setWhatsapp}
                      placeholder="13473066637" hint="Include country code without '+'. E.g., 13473066637 for +1 (347) 306-6637." />
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Pre-filled Message</label>
                      <textarea rows={3} value={whatsappMsg} onChange={(e) => setWhatsappMsg(e.target.value)}
                        className="w-full bg-muted border border-border px-4 py-2.5 outline-none focus:border-brand-400 transition-colors text-sm rounded-sm resize-none" />
                      <p className="text-xs text-muted-foreground">Default message when clients tap the WhatsApp floating button.</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                      <FileText size={12} /> PDF Resources
                    </h3>
                    <div className="border border-dashed border-border rounded-md p-6 flex flex-col items-center justify-center gap-3 hover:bg-muted/30 cursor-pointer transition-colors">
                      <FileText size={24} className="text-muted-foreground/50" />
                      <div className="text-center">
                        <div className="text-sm font-bold">Upload Pricing Guide PDF</div>
                        <div className="text-xs text-muted-foreground mt-1">Currently active: <span className="text-brand-400 font-semibold">{pricingPdf}</span></div>
                      </div>
                      <label className="px-5 py-2 border border-border text-xs font-bold uppercase tracking-widest cursor-pointer hover:border-brand-400 hover:text-brand-400 transition-colors rounded-sm">
                        Choose File
                        <input type="file" accept=".pdf" className="hidden" onChange={(e) => { if (e.target.files?.[0]) setPricingPdf(e.target.files[0].name); }} />
                      </label>
                    </div>
                  </div>

                  <SaveBar onSave={saveIntegrations} saving={saving} saved={saved} error={error} />
                </div>
              )}

              {/* Brand & SEO */}
              {activeSection === "brand" && (
                <div className="space-y-5">
                  <h2 className="font-bold uppercase tracking-tight text-sm mb-4 flex items-center gap-2">
                    <Globe size={15} className="text-brand-400" /> Brand & SEO Settings
                  </h2>
                  <InputField label="Studio Name" value={studioName} onChange={setStudioName} placeholder="Visual Studio" />
                  <InputField label="Studio Tagline" value={tagline} onChange={setTagline} placeholder="Moments Captured. Stories Told." />
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Meta Description (SEO)</label>
                    <textarea rows={3} value={metaDesc} onChange={(e) => setMetaDesc(e.target.value)}
                      className="w-full bg-muted border border-border px-4 py-2.5 outline-none focus:border-brand-400 transition-colors text-sm rounded-sm resize-none" />
                    <p className="text-xs text-muted-foreground">{metaDesc.length}/160 characters. Appears in Google search results.</p>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Meta Keywords (SEO)</label>
                    <input type="text" value={metaKeywords} onChange={(e) => setMetaKeywords(e.target.value)}
                      className="w-full bg-muted border border-border px-4 py-2.5 outline-none focus:border-brand-400 transition-colors text-sm rounded-sm"
                      placeholder="comma, separated, keywords" />
                  </div>
                  <div className="bg-muted/50 rounded-md p-4 border border-border">
                    <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Search Preview</div>
                    <div className="text-brand-400 text-sm font-medium">{studioName} | {tagline}</div>
                    <div className="text-green-600 text-xs mt-0.5">visualstudioslens.com</div>
                    <div className="text-muted-foreground text-xs mt-1 leading-relaxed line-clamp-2">{metaDesc}</div>
                  </div>
                  <SaveBar onSave={saveBrand} saving={saving} saved={saved} error={error} />
                </div>
              )}

              {/* Notifications */}
              {activeSection === "notifications" && (
                <div className="space-y-1">
                  <h2 className="font-bold uppercase tracking-tight text-sm mb-4 flex items-center gap-2">
                    <Bell size={15} className="text-brand-400" /> Notification Preferences
                  </h2>
                  <div className="space-y-1.5 mb-6">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Notification Email</label>
                    <input type="email" value={notifEmail} onChange={(e) => setNotifEmail(e.target.value)}
                      className="w-full bg-muted border border-border px-4 py-2.5 outline-none focus:border-brand-400 transition-colors text-sm rounded-sm" />
                    <p className="text-xs text-muted-foreground">Notifications will be sent to this address.</p>
                  </div>
                  <div className="bg-muted/30 rounded-md border border-border px-4">
                    <ToggleSetting
                      label="New Inquiry Alert"
                      description="Receive an email when a new contact form submission arrives."
                      checked={emailOnInquiry}
                      onChange={setEmailOnInquiry}
                    />
                    <ToggleSetting
                      label="Booking Confirmation"
                      description="Receive an email when an inquiry is marked as Booked."
                      checked={emailOnBooking}
                      onChange={setEmailOnBooking}
                    />
                    <ToggleSetting
                      label="Store Order Alert"
                      description="Receive an email when a new print store query arrives."
                      checked={emailOnStore}
                      onChange={setEmailOnStore}
                    />
                    <ToggleSetting
                      label="Daily Summary Digest"
                      description="Receive a daily email summarizing new activity from the past 24 hours."
                      checked={dailySummary}
                      onChange={setDailySummary}
                    />
                  </div>
                  <SaveBar onSave={saveNotifications} saving={saving} saved={saved} error={error} />
                </div>
              )}

              {/* Account */}
              {activeSection === "account" && (
                <div className="space-y-6">
                  <h2 className="font-bold uppercase tracking-tight text-sm mb-4 flex items-center gap-2">
                    <Shield size={15} className="text-brand-400" /> Account & Security
                  </h2>

                  <div className="space-y-4 pb-6 border-b border-border">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Profile</h3>
                    <InputField label="Admin Display Name" value={adminName} onChange={setAdminName} placeholder="Your Name" />
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Admin Email</label>
                      <input type="email" value={getStoredUser()?.email ?? "lens@visualstudioslens.com"} disabled
                        className="w-full bg-muted border border-border px-4 py-2.5 text-sm rounded-sm opacity-50 cursor-not-allowed" />
                      <p className="text-xs text-muted-foreground">Contact developer to change admin email.</p>
                    </div>
                  </div>

                  <div className="space-y-4 pb-6 border-b border-border">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Change Password</h3>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Current Password</label>
                      <div className="relative">
                        <input type={showPw ? "text" : "password"} value={currentPw} onChange={(e) => setCurrentPw(e.target.value)}
                          placeholder="••••••••" className="w-full bg-muted border border-border px-4 py-2.5 outline-none focus:border-brand-400 transition-colors text-sm rounded-sm pr-10" />
                        <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                          {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">New Password</label>
                        <input type={showPw ? "text" : "password"} value={newPw} onChange={(e) => setNewPw(e.target.value)}
                          placeholder="••••••••" className="w-full bg-muted border border-border px-4 py-2.5 outline-none focus:border-brand-400 transition-colors text-sm rounded-sm" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Confirm New Password</label>
                        <input type={showPw ? "text" : "password"} value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)}
                          placeholder="••••••••" className={`w-full bg-muted border px-4 py-2.5 outline-none focus:border-brand-400 transition-colors text-sm rounded-sm ${confirmPw && newPw !== confirmPw ? "border-red-400" : "border-border"}`} />
                      </div>
                    </div>
                    {confirmPw && newPw !== confirmPw && <p className="text-xs text-red-500">Passwords do not match.</p>}
                    <p className="text-xs text-muted-foreground">Leave password fields blank to keep your current password.</p>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Security</h3>
                    <div className="bg-muted/30 rounded-md border border-border px-4">
                      <ToggleSetting
                        label="Two-Factor Authentication"
                        description="Require an email verification code each time you log in."
                        checked={twoFactor}
                        onChange={setTwoFactor}
                      />
                    </div>
                  </div>

                  <SaveBar onSave={saveAccount} saving={saving} saved={saved} error={error} />
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </>
  );
}
