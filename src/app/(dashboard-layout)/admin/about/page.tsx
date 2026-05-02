"use client";

import { useState, useRef } from "react";
import { Save, Plus, Trash2, Edit2, Image as ImageIcon, Upload, Link as LinkIcon } from "lucide-react";
import { Modal } from "@/components/ui/modal";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  desc: string;
  img: string;
  imagePosition: "left" | "right";
  imgMode?: "url" | "upload";
};

type AboutData = {
  titlePart1: string;
  titlePart2: string;
  quoteText: string;
  storyParagraphs: string;
  whatWeDoTitle: string;
  whatWeDoDescription: string;
  teamMembers: TeamMember[];
};

const initialData: AboutData = {
  titlePart1: "About",
  titlePart2: "Studios",
  quoteText: `"Why only print the memories others captured?\n\nWhy not capture them ourselves, and deliver the complete package, photography, videography, and prints?"`,
  storyParagraphs: `From Printing to Storytelling, X Studios began as an extension of our first venture, X Print, a printing business where we specialized in creating albums, posters, and prints for weddings and events.\n\nCouples and families would bring us their photos, and we would transform them into cherished keepsakes. One day, we asked ourselves the defining question that changed everything.\n\nWith that vision, we started small; using an old Canon camera and DIY lighting. Our very first shoot was for a close relative's wedding. Nervous but determined, we captured every detail and the joy and appreciation from the family fueled our drive. From there, one client led to another and what began as a hobby quickly grew into a true passion and business.\n\nToday, X Studios is a dedicated photography and videography company with a talented team of six and our own studio space. We specialize in weddings and general events — from maternity shoots and showers to birthdays and anniversaries. With every project, we aim to blend artistry with storytelling, ensuring that every moment is preserved in the most beautiful way possible.\n\nOur journey is proof that great things can start with small beginnings. What once was just an idea alongside X Print is now X Studios. A brand committed to capturing life's milestones with creativity, care, and excellence.`,
  whatWeDoTitle: "What We Do: Weddings & General Events",
  whatWeDoDescription: "Documentary coverage + cinematic highlights, vows/speeches capture, reception edits.",
  teamMembers: [
    {
      id: "1",
      name: "Mohammed Sakib",
      role: "CEO & Creative Director",
      desc: "I'm CEO and Creative Director of X Studios & Director of X Print. I lead the vision, direction, and creative strategy behind our projects, ensuring that every piece of work we deliver is both innovative and impactful.\n\nMy journey began with a deep passion for visual storytelling, which quickly grew into a drive to build something bigger than myself. At X Studios, I focus on combining artistry with leadership—guiding our team, shaping the creative process, and making sure every project reflects both technical excellence and authentic storytelling.\n\nBeyond the creative side, I also oversee the strategic growth of the studio, setting goals, building partnerships, and ensuring our business continues to expand while staying true to our mission.",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
      imagePosition: "left",
      imgMode: "url",
    },
    {
      id: "2",
      name: "Md Shadman Mahmood",
      role: "Founder & Managing Director",
      desc: "I'm the CEO of X Print, and Founder at X Studios. My journey started with a passion for building and growing businesses—turning an early printing hustle into a full creative service. With years of experience in sales, client management, and project guidance, I've developed a strong focus on helping clients bring their ideas to life with clarity and confidence.\n\nProfessionally, I manage sales, strategy, and client success, making sure every project runs smoothly from consultation to delivery. At X Studios, I play a key role—guiding clients through the creative process, ensuring deadlines are met, and aligning the business side with the artistic vision. Skilled in sales strategy, project coordination, and client care, I'm known for my ability to combine structure with creativity—supporting both long-term business growth and memorable client experiences.",
      img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
      imagePosition: "right",
      imgMode: "url",
    },
    {
      id: "3",
      name: "Syed Md Mahid",
      role: "Professional Photo Editor",
      desc: "I'm a photographer, editor, and creative producer, currently studying Information and Communication Engineering at East West University. Starting my journey in 2017, I quickly grew from mobile photography to earning national recognition, including a 2018 award from Youth Club Bangladesh and USAID.\n\nProfessionally, I work with FoodPanda, Kidzania, Quest Films, and X Studios (as a photo editor). I'm a part of X Studio for my strong eye for detail and expertise in enhancing images that align with the studio's creative vision. I also serve as Secretary of Design at the East West University Photography Club. Skilled in photography, editing, and creative production, I am known for my dedication and passion for turning ideas into visually impactful stories.",
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop",
      imagePosition: "left",
      imgMode: "url",
    },
  ],
};

const defaultTeamForm: TeamMember = {
  id: "",
  name: "",
  role: "",
  desc: "",
  img: "",
  imagePosition: "left",
  imgMode: "url",
};

export default function AdminAboutPage() {
  const [data, setData] = useState<AboutData>(initialData);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "team">("general");

  // Modal State
  const [teamModal, setTeamModal] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [teamForm, setTeamForm] = useState<TeamMember>(defaultTeamForm);
  
  const [isDragging, setIsDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileRead = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setTeamForm((prev) => ({ ...prev, img: e.target?.result as string }));
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setLoading(true);
    // TODO: Connect this to your API
    console.log("Saving About Data:", data);
    
    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      alert("About Page content saved successfully! (Simulated)");
    }, 1000);
  };

  const updateField = (field: keyof AboutData, value: AboutData[keyof AboutData]) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const removeTeamMember = (id: string) => {
    if (window.confirm("Are you sure you want to delete this team member?")) {
      setData((prev) => ({
        ...prev,
        teamMembers: prev.teamMembers.filter((m) => m.id !== id),
      }));
    }
  };

  const openAddMember = () => {
    setEditingMemberId(null);
    setTeamForm({ ...defaultTeamForm, id: Date.now().toString() });
    setTeamModal(true);
  };

  const openEditMember = (member: TeamMember) => {
    setEditingMemberId(member.id);
    setTeamForm({ ...member, imgMode: member.img.startsWith("data:") ? "upload" : "url" });
    setTeamModal(true);
  };

  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMemberId) {
      setData((prev) => ({
        ...prev,
        teamMembers: prev.teamMembers.map((m) => (m.id === editingMemberId ? teamForm : m)),
      }));
    } else {
      setData((prev) => ({
        ...prev,
        teamMembers: [...prev.teamMembers, teamForm],
      }));
    }
    setTeamModal(false);
  };

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
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-brand-400 hover:bg-brand-500 text-white font-bold uppercase tracking-widest text-xs rounded-sm transition-colors disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {loading ? "Saving..." : "Save Changes"}
          </button>
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
      {activeTab === "general" && (
        <div className="grid grid-cols-1 gap-8 max-w-5xl">
          {/* Hero Section & Story */}
          <div className="bg-card border border-border rounded-xl shadow-sm p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-semibold border-b border-border pb-4">Hero Section & Story</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Title Part 1 (Regular) *</label>
                <input
                  type="text"
                  value={data.titlePart1}
                  onChange={(e) => updateField("titlePart1", e.target.value)}
                  className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Title Part 2 (Gradient) *</label>
                <input
                  type="text"
                  value={data.titlePart2}
                  onChange={(e) => updateField("titlePart2", e.target.value)}
                  className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Quote Text *</label>
              <textarea
                value={data.quoteText}
                onChange={(e) => updateField("quoteText", e.target.value)}
                rows={3}
                className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Our Story (Paragraphs) *</label>
              <p className="text-[10px] text-muted-foreground mb-2">Use double line breaks to separate paragraphs.</p>
              <textarea
                value={data.storyParagraphs}
                onChange={(e) => updateField("storyParagraphs", e.target.value)}
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
                value={data.whatWeDoTitle}
                onChange={(e) => updateField("whatWeDoTitle", e.target.value)}
                className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Description *</label>
              <textarea
                value={data.whatWeDoDescription}
                onChange={(e) => updateField("whatWeDoDescription", e.target.value)}
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
          {data.teamMembers.map((member) => (
            <div key={member.id} className="bg-background border border-border rounded-xl overflow-hidden group shadow-sm hover:shadow-md transition-all">
              <div className="aspect-[4/5] bg-muted relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-top transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${member.img}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 transition-opacity" />
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEditMember(member)} className="bg-black/60 p-2.5 text-white backdrop-blur-sm hover:bg-brand-400 rounded-lg transition-colors">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => removeTeamMember(member.id)} className="bg-black/60 p-2.5 text-white backdrop-blur-sm hover:bg-red-500 rounded-lg transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="p-5">
                <div className="font-bold text-lg leading-tight mb-1">{member.name}</div>
                <div className="text-xs text-brand-500 dark:text-brand-400 uppercase tracking-widest font-bold mb-3">{member.role}</div>
                <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">{member.desc}</p>
              </div>
            </div>
          ))}

          {data.teamMembers.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground border-2 border-dashed border-border rounded-xl">
              No team members added yet. Click &quot;Add Member&quot; to begin.
            </div>
          )}
        </div>
      )}

      {/* Team Member Modal */}
      <Modal isOpen={teamModal} onClose={() => setTeamModal(false)} title={editingMemberId ? "Edit Team Member" : "Add Team Member"}>
        <form onSubmit={handleSaveMember} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Name *</label>
              <input type="text" className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm" value={teamForm.name} onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })} required />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Role *</label>
              <input type="text" placeholder="e.g. Lead Photographer" className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm" value={teamForm.role} onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })} required />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Photo *</label>
            <div className="flex gap-1 p-1 bg-muted rounded-sm w-fit mb-2">
              <button
                type="button"
                onClick={() => setTeamForm({ ...teamForm, imgMode: "url" })}
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
                  placeholder="https://images.unsplash.com/..."
                  className="w-full pl-9 pr-4 py-3 bg-muted border border-border outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
                  value={teamForm.img.startsWith("data:") ? "" : teamForm.img}
                  onChange={(e) => setTeamForm({ ...teamForm, img: e.target.value })}
                  required={!teamForm.img}
                />
              </div>
            ) : (
              <div
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files?.[0]; if (f) handleFileRead(f); }}
                className={`w-full border-2 border-dashed rounded-sm py-8 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${isDragging ? "border-brand-400 bg-brand-400/5" : "border-border hover:border-brand-400/50 hover:bg-muted/50"}`}
              >
                <Upload size={22} className="text-muted-foreground" />
                <p className="text-sm font-medium">Drop photo here or <span className="text-brand-400">browse</span></p>
                <p className="text-xs text-muted-foreground">PNG, JPG, WEBP supported</p>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileRead(f); }} />
              </div>
            )}

            {teamForm.img && (
              <div className="mt-3 aspect-square max-w-[200px] bg-muted rounded-sm overflow-hidden relative border border-border shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={teamForm.img} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setTeamForm({ ...teamForm, img: "" })}
                  className="absolute top-2 right-2 bg-black/70 text-white text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded hover:bg-red-500 transition-colors backdrop-blur-sm"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Image Layout Position *</label>
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
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Biography / Description *</label>
            <textarea
              value={teamForm.desc}
              onChange={(e) => setTeamForm({ ...teamForm, desc: e.target.value })}
              rows={5}
              className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm resize-y"
              required
            />
          </div>

          <button type="submit" className="w-full bg-brand-400 text-white font-bold tracking-widest uppercase text-sm py-4 hover:bg-brand-500 rounded-sm mt-4 shadow-md transition-all active:scale-[0.98]">
            {editingMemberId ? "Update Member" : "Save Member"}
          </button>
        </form>
      </Modal>
    </>
  );
}
