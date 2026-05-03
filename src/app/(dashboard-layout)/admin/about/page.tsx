"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Save, Plus, Trash2, Edit2, Image as ImageIcon, Upload, Link as LinkIcon } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import {
  fetchAboutContent,
  fetchTeamMembers,
  updateAboutContent,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  uploadImage,
  resolveUrl,
  type AboutContent,
  type TeamMember,
  type TeamMemberPayload,
} from "@/lib/aboutApi";

type TeamForm = {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  imagePosition: "left" | "right";
  sortOrder: number;
  imgMode: "url" | "upload";
  pendingFile: File | null;
};

const defaultTeamForm = (nextOrder = 0): TeamForm => ({
  name: "",
  role: "",
  bio: "",
  imageUrl: "",
  imagePosition: "left",
  sortOrder: nextOrder,
  imgMode: "url",
  pendingFile: null,
});

export default function AdminAboutPage() {
  const [content, setContent] = useState<AboutContent | null>(null);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"general" | "team">("general");

  // General save
  const [saving, setSaving] = useState(false);

  // Team modal
  const [teamModal, setTeamModal] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [teamForm, setTeamForm] = useState<TeamForm>(defaultTeamForm());
  const [teamSaving, setTeamSaving] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [c, t] = await Promise.all([fetchAboutContent(), fetchTeamMembers()]);
      setContent(c);
      setTeam(t);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const handleFileRead = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) =>
      setTeamForm((prev) => ({
        ...prev,
        imageUrl: e.target?.result as string,
        pendingFile: file,
      }));
    reader.readAsDataURL(file);
  };

  const handleSaveGeneral = async () => {
    if (!content) return;
    setSaving(true);
    try {
      const updated = await updateAboutContent({
        titlePart1: content.titlePart1,
        titlePart2: content.titlePart2,
        quoteText: content.quoteText,
        storyParagraphs: content.storyParagraphs,
        whatWeDoTitle: content.whatWeDoTitle,
        whatWeDoDescription: content.whatWeDoDescription,
      });
      setContent(updated);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const openAddMember = () => {
    setEditingMember(null);
    setTeamForm(defaultTeamForm(team.length));
    setTeamModal(true);
  };

  const openEditMember = (member: TeamMember) => {
    setEditingMember(member);
    setTeamForm({
      name: member.name,
      role: member.role,
      bio: member.bio ?? "",
      imageUrl: member.imageUrl ?? "",
      imagePosition: member.imagePosition,
      sortOrder: member.sortOrder,
      imgMode: "url",
      pendingFile: null,
    });
    setTeamModal(true);
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setTeamSaving(true);
    try {
      let finalImageUrl = teamForm.imageUrl;

      if (teamForm.pendingFile) {
        finalImageUrl = await uploadImage(teamForm.pendingFile);
      }

      const payload: TeamMemberPayload = {
        name: teamForm.name,
        role: teamForm.role,
        bio: teamForm.bio || undefined,
        imageUrl: finalImageUrl || undefined,
        imagePosition: teamForm.imagePosition,
        sortOrder: teamForm.sortOrder,
      };

      const sort = (arr: TeamMember[]) => [...arr].sort((a, b) => a.sortOrder - b.sortOrder);

      if (editingMember) {
        const updated = await updateTeamMember(editingMember.id, payload);
        setTeam((prev) => sort(prev.map((m) => (m.id === editingMember.id ? updated : m))));
      } else {
        const created = await createTeamMember(payload);
        setTeam((prev) => sort([...prev, created]));
      }
      setTeamModal(false);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to save member");
    } finally {
      setTeamSaving(false);
    }
  };

  const handleDeleteMember = async (id: number) => {
    if (!window.confirm("Delete this team member?")) return;
    try {
      await deleteTeamMember(id);
      setTeam((prev) => prev.filter((m) => m.id !== id));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to delete");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-500 text-sm">
        {error}
        <button onClick={() => void load()} className="ml-2 underline">Retry</button>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-tight">About Us</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage the general information and team members for the About page.
          </p>
        </div>
        <div className="flex gap-2">
          {activeTab === "team" && (
            <button
              onClick={openAddMember}
              className="px-5 py-2.5 bg-brand-400 text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-brand-500 transition-colors rounded-sm"
            >
              <Plus size={15} /> Add Member
            </button>
          )}
          {activeTab === "general" && (
            <button
              onClick={() => void handleSaveGeneral()}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 bg-brand-400 hover:bg-brand-500 text-white font-bold uppercase tracking-widest text-xs rounded-sm transition-colors disabled:opacity-50"
            >
              {saving ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {saving ? "Saving..." : "Save Changes"}
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 border-b border-border">
        {(["general", "team"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors -mb-px border-b-2 ${
              activeTab === tab
                ? "border-brand-400 text-brand-400"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "general" ? "General Info" : "Team Members"}
          </button>
        ))}
      </div>

      {/* General Tab */}
      {activeTab === "general" && content && (
        <div className="grid grid-cols-1 gap-8 max-w-5xl">
          {/* Hero Section & Story */}
          <div className="bg-card border border-border rounded-xl shadow-sm p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-semibold border-b border-border pb-4">Hero Section & Story</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Title Part 1 (Regular) *</label>
                <input
                  type="text"
                  value={content.titlePart1}
                  onChange={(e) => setContent({ ...content, titlePart1: e.target.value })}
                  className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Title Part 2 (Gradient) *</label>
                <input
                  type="text"
                  value={content.titlePart2}
                  onChange={(e) => setContent({ ...content, titlePart2: e.target.value })}
                  className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Quote Text *</label>
              <textarea
                value={content.quoteText}
                onChange={(e) => setContent({ ...content, quoteText: e.target.value })}
                rows={3}
                className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Our Story (Paragraphs) *</label>
              <p className="text-[10px] text-muted-foreground mb-2">Use double line breaks to separate paragraphs.</p>
              <textarea
                value={content.storyParagraphs}
                onChange={(e) => setContent({ ...content, storyParagraphs: e.target.value })}
                rows={12}
                className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm font-mono"
              />
            </div>
          </div>

          {/* What We Do Section */}
          <div className="bg-card border border-border rounded-xl shadow-sm p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-semibold border-b border-border pb-4">What We Do</h2>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Title *</label>
              <input
                type="text"
                value={content.whatWeDoTitle}
                onChange={(e) => setContent({ ...content, whatWeDoTitle: e.target.value })}
                className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Description *</label>
              <textarea
                value={content.whatWeDoDescription}
                onChange={(e) => setContent({ ...content, whatWeDoDescription: e.target.value })}
                rows={2}
                className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
              />
            </div>
          </div>
        </div>
      )}

      {/* Team Tab */}
      {activeTab === "team" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {team.map((member) => (
            <div key={member.id} className="bg-background border border-border rounded-xl overflow-hidden group shadow-sm hover:shadow-md transition-all">
              <div className="aspect-[4/5] bg-muted relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-top transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: member.imageUrl ? `url('${resolveUrl(member.imageUrl)}')` : undefined }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 transition-opacity" />
                <div className="absolute top-3 left-3">
                  <span className="bg-black/70 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded backdrop-blur-sm">
                    #{member.sortOrder}
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openEditMember(member)}
                    className="bg-black/60 p-2.5 text-white backdrop-blur-sm hover:bg-brand-400 rounded-lg transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => void handleDeleteMember(member.id)}
                    className="bg-black/60 p-2.5 text-white backdrop-blur-sm hover:bg-red-500 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="p-5">
                <div className="font-bold text-lg leading-tight mb-1">{member.name}</div>
                <div className="text-xs text-brand-500 dark:text-brand-400 uppercase tracking-widest font-bold mb-3">{member.role}</div>
                <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}

          {team.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground border-2 border-dashed border-border rounded-xl">
              No team members added yet. Click &quot;Add Member&quot; to begin.
            </div>
          )}
        </div>
      )}

      {/* Team Member Modal */}
      <Modal
        isOpen={teamModal}
        onClose={() => setTeamModal(false)}
        title={editingMember ? "Edit Team Member" : "Add Team Member"}
      >
        <form onSubmit={(e) => void handleSaveMember(e)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Name *</label>
              <input
                type="text"
                className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
                value={teamForm.name}
                onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Role *</label>
              <input
                type="text"
                placeholder="e.g. Lead Photographer"
                className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
                value={teamForm.role}
                onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Photo</label>
            <div className="flex gap-1 p-1 bg-muted rounded-sm w-fit mb-2">
              <button
                type="button"
                onClick={() => setTeamForm({ ...teamForm, imgMode: "url", pendingFile: null })}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-widest rounded-sm transition-colors ${teamForm.imgMode !== "upload" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                <LinkIcon size={12} /> Paste URL
              </button>
              <button
                type="button"
                onClick={() => setTeamForm({ ...teamForm, imgMode: "upload" })}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-widest rounded-sm transition-colors ${teamForm.imgMode === "upload" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Upload size={12} /> Upload File
              </button>
            </div>

            {teamForm.imgMode !== "upload" ? (
              <div className="relative">
                <ImageIcon className="absolute left-3 top-[14px] w-4 h-4 text-muted-foreground" />
                <input
                  type="url"
                  placeholder="https://..."
                  className="w-full pl-9 pr-4 py-3 bg-muted border border-border outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
                  value={teamForm.imageUrl.startsWith("data:") ? "" : teamForm.imageUrl}
                  onChange={(e) => setTeamForm({ ...teamForm, imageUrl: e.target.value, pendingFile: null })}
                />
              </div>
            ) : (
              <div
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  const f = e.dataTransfer.files?.[0];
                  if (f) handleFileRead(f);
                }}
                className={`w-full border-2 border-dashed rounded-sm py-8 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${isDragging ? "border-brand-400 bg-brand-400/5" : "border-border hover:border-brand-400/50 hover:bg-muted/50"}`}
              >
                <Upload size={22} className="text-muted-foreground" />
                <p className="text-sm font-medium">Drop photo here or <span className="text-brand-400">browse</span></p>
                <p className="text-xs text-muted-foreground">PNG, JPG, WEBP supported</p>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileRead(f); }}
                />
              </div>
            )}

            {teamForm.imageUrl && (
              <div className="mt-3 aspect-square max-w-[200px] bg-muted rounded-sm overflow-hidden relative border border-border shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={resolveUrl(teamForm.imageUrl)} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setTeamForm({ ...teamForm, imageUrl: "", pendingFile: null })}
                  className="absolute top-2 right-2 bg-black/70 text-white text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded hover:bg-red-500 transition-colors backdrop-blur-sm"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Image Layout Position</label>
              <select
                value={teamForm.imagePosition}
                onChange={(e) => setTeamForm({ ...teamForm, imagePosition: e.target.value as "left" | "right" })}
                className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
              >
                <option value="left">Left Aligned (Image Left, Text Right)</option>
                <option value="right">Right Aligned (Image Right, Text Left)</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Display Order</label>
              <input
                type="number"
                min={0}
                value={teamForm.sortOrder}
                onChange={(e) => setTeamForm({ ...teamForm, sortOrder: Math.max(0, parseInt(e.target.value) || 0) })}
                className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
              />
              <p className="text-[10px] text-muted-foreground">Lower numbers appear first on the page.</p>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Biography / Description *</label>
            <textarea
              value={teamForm.bio}
              onChange={(e) => setTeamForm({ ...teamForm, bio: e.target.value })}
              rows={5}
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm resize-y"
              required
            />
          </div>

          <button
            type="submit"
            disabled={teamSaving}
            className="w-full bg-brand-400 text-white font-bold tracking-widest uppercase text-sm py-4 hover:bg-brand-500 rounded-sm mt-4 shadow-md transition-all active:scale-[0.98] disabled:opacity-60"
          >
            {teamSaving ? "Saving..." : editingMember ? "Update Member" : "Save Member"}
          </button>
        </form>
      </Modal>
    </>
  );
}
