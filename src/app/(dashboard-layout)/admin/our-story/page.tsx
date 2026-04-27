"use client";

import { Plus, Trash2, Edit2, Clock } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";

type TimelineEvent = {
  id: number;
  year: string;
  title: string;
  description: string;
};

type TeamMember = {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
};

const initialTimeline: TimelineEvent[] = [
  { id: 1, year: "2018", title: "The Beginning", description: "Started our journey in a small studio with big dreams." },
  { id: 2, year: "2020", title: "First Major Award", description: "Won the National Wedding Photography Award." },
];

const initialTeam: TeamMember[] = [
  { id: 1, name: "John Doe", role: "Lead Photographer", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400" },
  { id: 2, name: "Jane Smith", role: "Creative Director", imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400" },
];

export default function OurStoryPage() {
  const [activeTab, setActiveTab] = useState<"timeline" | "team">("timeline");
  const [timeline, setTimeline] = useState(initialTimeline);
  const [team, setTeam] = useState(initialTeam);

  // Timeline Modal State
  const [timelineModal, setTimelineModal] = useState(false);
  const [editingTimeline, setEditingTimeline] = useState<TimelineEvent | null>(null);
  const [timelineForm, setTimelineForm] = useState({ year: "", title: "", description: "" });

  // Team Modal State
  const [teamModal, setTeamModal] = useState(false);
  const [editingTeam, setEditingTeam] = useState<TeamMember | null>(null);
  const [teamForm, setTeamForm] = useState({ name: "", role: "", imageUrl: "" });

  // Timeline actions
  const openAddTimeline = () => {
    setEditingTimeline(null);
    setTimelineForm({ year: "", title: "", description: "" });
    setTimelineModal(true);
  };
  const openEditTimeline = (t: TimelineEvent) => {
    setEditingTimeline(t);
    setTimelineForm({ year: t.year, title: t.title, description: t.description });
    setTimelineModal(true);
  };
  const handleSaveTimeline = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTimeline) {
      setTimeline(timeline.map(t => t.id === editingTimeline.id ? { ...timelineForm, id: editingTimeline.id } : t));
    } else {
      setTimeline([{ ...timelineForm, id: Date.now() }, ...timeline].sort((a, b) => parseInt(a.year) - parseInt(b.year)));
    }
    setTimelineModal(false);
  };
  const handleDeleteTimeline = (id: number) => {
    if (window.confirm("Delete this timeline event?")) setTimeline(timeline.filter(t => t.id !== id));
  };

  // Team actions
  const openAddTeam = () => {
    setEditingTeam(null);
    setTeamForm({ name: "", role: "", imageUrl: "" });
    setTeamModal(true);
  };
  const openEditTeam = (t: TeamMember) => {
    setEditingTeam(t);
    setTeamForm({ name: t.name, role: t.role, imageUrl: t.imageUrl });
    setTeamModal(true);
  };
  const handleSaveTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTeam) {
      setTeam(team.map(t => t.id === editingTeam.id ? { ...teamForm, id: editingTeam.id } : t));
    } else {
      setTeam([{ ...teamForm, id: Date.now() }, ...team]);
    }
    setTeamModal(false);
  };
  const handleDeleteTeam = (id: number) => {
    if (window.confirm("Delete this team member?")) setTeam(team.filter(t => t.id !== id));
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-tight">Our Story</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage timeline events and team members.</p>
        </div>
        <button
          onClick={activeTab === "timeline" ? openAddTimeline : openAddTeam}
          className="px-5 py-2.5 bg-brand-400 text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-brand-500 transition-colors rounded-sm"
        >
          <Plus size={15} /> {activeTab === "timeline" ? "Add Event" : "Add Member"}
        </button>
      </div>

      <div className="flex gap-1 mb-6 border-b border-border">
        {(["timeline", "team"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors -mb-px border-b-2 ${
              activeTab === tab
                ? "border-brand-400 text-brand-400"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "timeline" ? "Timeline Events" : "Team Members"}
          </button>
        ))}
      </div>

      {activeTab === "timeline" && (
        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          {timeline.map((event) => (
            <div key={event.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-muted text-muted-foreground shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
                <Clock size={16} />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-border bg-background shadow-sm relative">
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEditTimeline(event)} className="p-1 text-muted-foreground hover:text-foreground"><Edit2 size={14} /></button>
                  <button onClick={() => handleDeleteTimeline(event.id)} className="p-1 text-muted-foreground hover:text-red-500"><Trash2 size={14} /></button>
                </div>
                <div className="flex items-center justify-between mb-1">
                  <div className="font-bold text-brand-400">{event.year}</div>
                </div>
                <div className="font-bold text-lg mb-1">{event.title}</div>
                <div className="text-muted-foreground text-sm leading-relaxed">{event.description}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "team" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((member) => (
            <div key={member.id} className="bg-background border border-border rounded-md overflow-hidden group">
              <div className="aspect-[3/4] bg-muted relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${member.imageUrl}')` }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEditTeam(member)} className="bg-black/60 p-2 text-white backdrop-blur-sm hover:bg-brand-400 rounded-sm">
                    <Edit2 size={13} />
                  </button>
                  <button onClick={() => handleDeleteTeam(member.id)} className="bg-black/60 p-2 text-white backdrop-blur-sm hover:bg-red-500 rounded-sm">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
              <div className="p-4 text-center">
                <div className="font-bold text-base uppercase tracking-tight">{member.name}</div>
                <div className="text-xs text-brand-400 mt-1 uppercase tracking-widest font-bold">{member.role}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={timelineModal} onClose={() => setTimelineModal(false)} title={editingTimeline ? "Edit Timeline Event" : "Add Timeline Event"}>
        <form onSubmit={handleSaveTimeline} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Year *</label>
            <input type="text" placeholder="e.g. 2026" className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm" value={timelineForm.year} onChange={(e) => setTimelineForm({ ...timelineForm, year: e.target.value })} required />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Title *</label>
            <input type="text" placeholder="e.g. Expanded our team" className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm" value={timelineForm.title} onChange={(e) => setTimelineForm({ ...timelineForm, title: e.target.value })} required />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Description *</label>
            <textarea className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm h-24 resize-none" value={timelineForm.description} onChange={(e) => setTimelineForm({ ...timelineForm, description: e.target.value })} required />
          </div>
          <button type="submit" className="w-full bg-brand-400 text-white font-bold tracking-widest uppercase text-sm py-3.5 hover:bg-brand-500 rounded-sm">
            Save Event
          </button>
        </form>
      </Modal>

      <Modal isOpen={teamModal} onClose={() => setTeamModal(false)} title={editingTeam ? "Edit Team Member" : "Add Team Member"}>
        <form onSubmit={handleSaveTeam} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Name *</label>
            <input type="text" className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm" value={teamForm.name} onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })} required />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Role *</label>
            <input type="text" placeholder="e.g. Lead Photographer" className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm" value={teamForm.role} onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })} required />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Image URL *</label>
            <input type="url" className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm" value={teamForm.imageUrl} onChange={(e) => setTeamForm({ ...teamForm, imageUrl: e.target.value })} required />
          </div>
          <button type="submit" className="w-full bg-brand-400 text-white font-bold tracking-widest uppercase text-sm py-3.5 hover:bg-brand-500 rounded-sm">
            Save Member
          </button>
        </form>
      </Modal>
    </>
  );
}
