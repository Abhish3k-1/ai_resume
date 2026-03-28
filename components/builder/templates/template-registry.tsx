import type { ResumeFormSchema } from "@/lib/schemas";
import type { ResumeTemplateId } from "@/lib/types";
import type { ComponentType } from "react";

export interface TemplateProps {
  data: ResumeFormSchema;
}

/* ── Shared helpers ── */
export function splitSkills(csv: string): string[] {
  return csv.split(",").map((s) => s.trim()).filter(Boolean);
}



/* ═══════════════════════════════════════════════════════
   1. AURORA — Modern gradient header, pill skills
   ═══════════════════════════════════════════════════════ */
export function AuroraTemplate({ data }: TemplateProps) {
  const skills = splitSkills(data.technicalSkills);
  const softSkills = splitSkills(data.softSkills);
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", lineHeight: "1.5", color: "#1e293b" }}>
      <div style={{ background: "linear-gradient(135deg, #4f46e5, #06b6d4)", borderRadius: "8px", padding: "14px 18px", color: "white", marginBottom: "14px" }}>
        <h3 style={{ fontSize: "17px", fontWeight: 700, margin: 0 }}>{data.firstName} {data.lastName}</h3>
        <p style={{ fontSize: "10px", opacity: 0.9, margin: "2px 0 0" }}>{data.headline}</p>
        <p style={{ fontSize: "8px", opacity: 0.8, marginTop: "4px" }}>{data.email} | {data.phone} | {data.location}</p>
      </div>

      {data.summary && (
        <div style={{ marginBottom: "12px" }}>
          <h4 style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b", borderBottom: "1px solid #e2e8f0", paddingBottom: "3px", marginBottom: "4px" }}>Summary</h4>
          <p style={{ color: "#475569" }}>{data.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div style={{ marginBottom: "12px" }}>
          <h4 style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b", borderBottom: "1px solid #e2e8f0", paddingBottom: "3px", marginBottom: "4px" }}>Experience</h4>
          {data.experience.map((exp, index) => (
            <div key={exp.id || index} style={{ marginTop: "6px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ fontWeight: 600 }}>{exp.role}</p>
                <p style={{ fontSize: "8px", color: "#64748b" }}>{exp.startDate} – {exp.endDate}</p>
              </div>
              <p style={{ fontSize: "9px", color: "#475569" }}>{exp.company}</p>
              {exp.description && <p style={{ marginTop: "3px", color: "#475569" }}>{exp.description}</p>}
              {Array.isArray(exp.achievements) && exp.achievements.filter(Boolean).length > 0 && (
                <ul style={{ marginTop: "3px", paddingLeft: "14px", color: "#475569" }}>
                  {exp.achievements.filter(Boolean).map((a, i) => <li key={i}>{a}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {data.education.length > 0 && (
        <div style={{ marginBottom: "12px" }}>
          <h4 style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b", borderBottom: "1px solid #e2e8f0", paddingBottom: "3px", marginBottom: "4px" }}>Education</h4>
          {data.education.map((edu, index) => (
            <div key={edu.id || index} style={{ marginTop: "6px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ fontWeight: 600 }}>{edu.degree} in {edu.field}</p>
                <p style={{ fontSize: "8px", color: "#64748b" }}>{edu.startYear} – {edu.endYear}</p>
              </div>
              <p style={{ fontSize: "9px", color: "#475569" }}>{edu.institution}</p>
              {edu.markValue && <p style={{ fontSize: "8px", color: "#64748b" }}>{edu.markType === "cgpa" ? "CGPA" : "%"}: {edu.markValue}</p>}
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div style={{ marginBottom: "12px" }}>
          <h4 style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b", borderBottom: "1px solid #e2e8f0", paddingBottom: "3px", marginBottom: "4px" }}>Technical Skills</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {skills.map((s, index) => <span key={`${s}-${index}`} style={{ background: "#f1f5f9", borderRadius: "4px", padding: "2px 6px", fontSize: "8px", fontWeight: 500, color: "#334155" }}>{s}</span>)}
          </div>
        </div>
      )}

      {softSkills.length > 0 && (
        <div style={{ marginBottom: "12px" }}>
          <h4 style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b", borderBottom: "1px solid #e2e8f0", paddingBottom: "3px", marginBottom: "4px" }}>Soft Skills</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {softSkills.map((s, index) => <span key={`${s}-${index}`} style={{ background: "#eff6ff", borderRadius: "4px", padding: "2px 6px", fontSize: "8px", fontWeight: 500, color: "#1e40af" }}>{s}</span>)}
          </div>
        </div>
      )}

      {data.projects.length > 0 && (
        <div style={{ marginBottom: "12px" }}>
          <h4 style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b", borderBottom: "1px solid #e2e8f0", paddingBottom: "3px", marginBottom: "4px" }}>Projects</h4>
          {data.projects.map((p, index) => (
            <div key={p.id || index} style={{ marginTop: "6px" }}>
              <p style={{ fontWeight: 600 }}>{p.title}</p>
              {p.techStack && <p style={{ fontSize: "8px", color: "#64748b" }}>{p.techStack}</p>}
              {p.description && <p style={{ marginTop: "2px", color: "#475569" }}>{p.description}</p>}
            </div>
          ))}
        </div>
      )}

      {data.certifications.length > 0 && (
        <div style={{ marginBottom: "12px" }}>
          <h4 style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b", borderBottom: "1px solid #e2e8f0", paddingBottom: "3px", marginBottom: "4px" }}>Certifications</h4>
          {data.certifications.map((c, index) => (
            <div key={c.id || index} style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
              <p>{c.title} <span style={{ color: "#64748b" }}>– {c.issuer}</span></p>
              <p style={{ fontSize: "8px", color: "#64748b" }}>{c.date}</p>
            </div>
          ))}
        </div>
      )}

      {data.volunteer?.length > 0 && (
        <div style={{ marginBottom: "12px" }}>
          <h4 style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b", borderBottom: "1px solid #e2e8f0", paddingBottom: "3px", marginBottom: "4px" }}>Volunteer Work</h4>
          {data.volunteer.map((vol, index) => (
            <div key={vol.id || index} style={{ marginTop: "6px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ fontWeight: 600 }}>{vol.role}</p>
                <p style={{ fontSize: "8px", color: "#64748b" }}>{vol.startDate} – {vol.endDate}</p>
              </div>
              <p style={{ fontSize: "9px", color: "#475569" }}>{vol.organization}</p>
              {vol.description && <p style={{ marginTop: "3px", color: "#475569" }}>{vol.description}</p>}
            </div>
          ))}
        </div>
      )}

      {data.languages && (
        <div style={{ marginBottom: "12px" }}>
          <h4 style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b", borderBottom: "1px solid #e2e8f0", paddingBottom: "3px", marginBottom: "4px" }}>Languages</h4>
          <p style={{ color: "#475569" }}>{data.languages}</p>
        </div>
      )}

      {data.hobbies && (
        <div style={{ marginBottom: "12px" }}>
          <h4 style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b", borderBottom: "1px solid #e2e8f0", paddingBottom: "3px", marginBottom: "4px" }}>Hobbies & Interests</h4>
          <p style={{ color: "#475569" }}>{data.hobbies}</p>
        </div>
      )}

      {data.customSections.map((cs, index) => (
        <div key={cs.id || index} style={{ marginBottom: "12px" }}>
          <h4 style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b", borderBottom: "1px solid #e2e8f0", paddingBottom: "3px", marginBottom: "4px" }}>{cs.title}</h4>
          <ul style={{ paddingLeft: "14px", color: "#475569" }}>
            {cs.items.filter(i => i.content).map((item, itemIndex) => <li key={item.id || itemIndex}>{item.content}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   2. SLATE — Two-column with sidebar (skills + contact left)
   ═══════════════════════════════════════════════════════ */
export function SlateTemplate({ data }: TemplateProps) {
  const techSkills = splitSkills(data.technicalSkills);
  const softSkills = splitSkills(data.softSkills);
  return (
    <div className="grid gap-4 text-slate-900 sm:grid-cols-[140px_1fr]" style={{ fontFamily: "'Segoe UI', sans-serif", fontSize: "10px", lineHeight: "1.5" }}>
      <aside className="rounded-lg bg-slate-100 p-3">
        <h3 className="text-base font-semibold">{data.firstName}</h3>
        <h3 className="text-base font-semibold">{data.lastName}</h3>
        <p className="mt-1 text-[8px] font-medium uppercase tracking-wider text-slate-500">{data.headline}</p>
        <p className="mt-3 text-[8px] leading-4 text-slate-600">{data.email}<br />{data.phone}<br />{data.location}</p>
        {techSkills.length > 0 && <div className="mt-3"><p className="text-[8px] font-bold uppercase text-slate-500">Skills</p><p className="mt-1 text-[8px] text-slate-600">{techSkills.join(" · ")}</p></div>}
        {softSkills.length > 0 && <div className="mt-2"><p className="text-[8px] font-bold uppercase text-slate-500">Soft Skills</p><p className="mt-1 text-[8px] text-slate-600">{softSkills.join(" · ")}</p></div>}
      </aside>
      <div className="space-y-3">
        {data.summary && <section><h4 className="border-b border-slate-200 pb-1 text-[9px] font-bold uppercase tracking-wider text-slate-500">Summary</h4><p className="mt-1 text-slate-700">{data.summary}</p></section>}
        {data.experience.length > 0 && <section><h4 className="border-b border-slate-200 pb-1 text-[9px] font-bold uppercase tracking-wider text-slate-500">Experience</h4>{data.experience.map((exp) => <div key={exp.id} className="mt-2"><p className="font-semibold">{exp.role} <span className="font-normal text-slate-500">at {exp.company}</span></p><p className="text-[8px] text-slate-400">{exp.startDate} – {exp.endDate}</p>{exp.description && <p className="mt-0.5 text-slate-700">{exp.description}</p>}</div>)}</section>}
        {data.education.length > 0 && <section><h4 className="border-b border-slate-200 pb-1 text-[9px] font-bold uppercase tracking-wider text-slate-500">Education</h4>{data.education.map((edu) => <div key={edu.id} className="mt-1"><p className="font-semibold">{edu.degree} – {edu.field}</p><p className="text-[8px] text-slate-500">{edu.institution} ({edu.startYear}–{edu.endYear})</p></div>)}</section>}
        {data.projects.length > 0 && <section><h4 className="border-b border-slate-200 pb-1 text-[9px] font-bold uppercase tracking-wider text-slate-500">Projects</h4>{data.projects.map((p) => <div key={p.id} className="mt-1"><p className="font-semibold">{p.title}</p><p className="text-[8px] text-slate-500">{p.techStack}</p>{p.description && <p className="text-slate-700">{p.description}</p>}</div>)}</section>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   3. EXECUTIVE — Serif, double-border header, formal
   ═══════════════════════════════════════════════════════ */
export function ExecutiveTemplate({ data }: TemplateProps) {
  const skills = splitSkills(data.technicalSkills);
  return (
    <div className="space-y-3 text-slate-900" style={{ fontFamily: "'Georgia', serif", fontSize: "10px", lineHeight: "1.6" }}>
      <header className="border-b-2 border-slate-800 pb-3">
        <h3 className="text-xl font-semibold tracking-tight">{data.firstName} {data.lastName}</h3>
        <p className="text-[9px] uppercase tracking-widest text-slate-500">{data.headline}</p>
        <p className="mt-1 text-[8px] text-slate-500">{data.email} | {data.phone} | {data.location}</p>
      </header>
      {data.summary && <p className="text-slate-700">{data.summary}</p>}
      {data.experience.length > 0 && <section><h4 className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Selected Experience</h4>{data.experience.map((exp) => <div key={exp.id} className="mt-2"><p className="font-semibold">{exp.role}, {exp.company}</p><p className="text-[8px] italic text-slate-500">{exp.startDate} – {exp.endDate}</p>{exp.description && <p className="text-slate-700">{exp.description}</p>}{Array.isArray(exp.achievements) && exp.achievements.filter(Boolean).length > 0 && <ul className="mt-1 list-disc pl-3 text-slate-700">{exp.achievements.filter(Boolean).map((a, i) => <li key={i}>{a}</li>)}</ul>}</div>)}</section>}
      {data.education.length > 0 && <section><h4 className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Education</h4>{data.education.map((edu) => <div key={edu.id} className="mt-1"><p>{edu.degree} in {edu.field}, {edu.institution} ({edu.endYear})</p></div>)}</section>}
      {skills.length > 0 && <section><h4 className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Key Skills</h4><ul className="mt-1 grid grid-cols-2 gap-x-3 gap-y-0.5 text-slate-700">{skills.slice(0, 8).map((s) => <li key={s}>– {s}</li>)}</ul></section>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   4. CLEAN — Minimal single-column, dotted dividers
   ═══════════════════════════════════════════════════════ */
export function CleanTemplate({ data }: TemplateProps) {
  const skills = splitSkills(data.technicalSkills);
  return (
    <div className="space-y-3 text-slate-800" style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", lineHeight: "1.55" }}>
      <div className="text-center">
        <h3 className="text-lg font-light tracking-wide">{data.firstName} {data.lastName}</h3>
        <p className="text-[9px] text-slate-500">{data.headline}</p>
        <p className="mt-1 text-[8px] text-slate-400">{data.email} · {data.phone} · {data.location}</p>
      </div>
      <hr className="border-dotted border-slate-300" />
      {data.summary && <><p className="text-slate-600">{data.summary}</p><hr className="border-dotted border-slate-300" /></>}
      {data.experience.length > 0 && <section><p className="text-[9px] font-semibold uppercase text-slate-400 tracking-widest">Experience</p>{data.experience.map((e) => <div key={e.id} className="mt-2"><p className="font-medium">{e.role} <span className="text-slate-400">— {e.company}</span></p><p className="text-[8px] text-slate-400">{e.startDate} – {e.endDate}</p>{e.description && <p className="mt-0.5 text-slate-600">{e.description}</p>}</div>)}<hr className="border-dotted border-slate-300" /></section>}
      {skills.length > 0 && <section><p className="text-[9px] font-semibold uppercase text-slate-400 tracking-widest">Skills</p><p className="mt-1 text-slate-600">{skills.join(" / ")}</p></section>}
      {data.education.length > 0 && <section><p className="text-[9px] font-semibold uppercase text-slate-400 tracking-widest">Education</p>{data.education.map((e) => <p key={e.id} className="mt-1">{e.degree}, {e.institution} ({e.endYear})</p>)}</section>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   5. MERCURY — Timeline layout with left dates
   ═══════════════════════════════════════════════════════ */
export function MercuryTemplate({ data }: TemplateProps) {
  return (
    <div className="space-y-3 text-slate-900" style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: "10px", lineHeight: "1.5" }}>
      <header className="border-b border-slate-300 pb-2">
        <h3 className="text-base font-bold uppercase tracking-widest">{data.firstName} {data.lastName}</h3>
        <p className="text-[9px] text-slate-500">{data.headline} | {data.email} | {data.phone}</p>
      </header>
      {data.summary && <p className="italic text-slate-600 border-l-2 border-slate-300 pl-2">{data.summary}</p>}
      {data.experience.length > 0 && <section><h4 className="text-[9px] font-bold uppercase text-slate-400 tracking-widest mb-1">Experience</h4>{data.experience.map((e) => <div key={e.id} className="mt-2 grid grid-cols-[60px_1fr] gap-2"><p className="text-[8px] text-slate-400 pt-0.5">{e.startDate}<br/>{e.endDate}</p><div><p className="font-semibold">{e.role}</p><p className="text-[9px] text-slate-500">{e.company}</p>{e.description && <p className="mt-0.5 text-slate-700">{e.description}</p>}</div></div>)}</section>}
      {data.education.length > 0 && <section><h4 className="text-[9px] font-bold uppercase text-slate-400 tracking-widest mb-1">Education</h4>{data.education.map((e) => <div key={e.id} className="mt-1 grid grid-cols-[60px_1fr] gap-2"><p className="text-[8px] text-slate-400">{e.startYear}–{e.endYear}</p><p className="font-semibold">{e.degree}, {e.institution}</p></div>)}</section>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   6. NORDIC — Full-width blocks, muted bg alternation
   ═══════════════════════════════════════════════════════ */
export function NordicTemplate({ data }: TemplateProps) {
  const skills = splitSkills(data.technicalSkills);
  return (
    <div className="text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", lineHeight: "1.5" }}>
      <div className="bg-gray-900 px-4 py-3 text-white rounded-t-lg">
        <h3 className="text-lg font-semibold">{data.firstName} {data.lastName}</h3>
        <p className="text-[9px] text-gray-300">{data.headline}</p>
      </div>
      <div className="bg-gray-100 px-4 py-1.5 text-[8px] text-gray-500">{data.email} | {data.phone} | {data.location}</div>
      <div className="space-y-3 p-3">
        {data.summary && <div className="bg-gray-50 rounded p-2"><h4 className="text-[9px] font-bold uppercase text-gray-400">Profile</h4><p className="mt-1 text-gray-700">{data.summary}</p></div>}
        {data.experience.length > 0 && <div><h4 className="text-[9px] font-bold uppercase text-gray-400 border-l-3 border-gray-900 pl-2">Career</h4>{data.experience.map((e) => <div key={e.id} className="mt-2 ml-2 border-l border-gray-200 pl-2"><p className="font-semibold">{e.role}</p><p className="text-[8px] text-gray-500">{e.company} · {e.startDate}–{e.endDate}</p>{e.description && <p className="mt-0.5 text-gray-700">{e.description}</p>}</div>)}</div>}
        {skills.length > 0 && <div className="bg-gray-50 rounded p-2"><h4 className="text-[9px] font-bold uppercase text-gray-400">Expertise</h4><div className="mt-1 flex flex-wrap gap-1">{skills.map((s) => <span key={s} className="rounded-full bg-gray-200 px-1.5 py-0.5 text-[8px] text-gray-700">{s}</span>)}</div></div>}
        {data.education.length > 0 && <div><h4 className="text-[9px] font-bold uppercase text-gray-400">Education</h4>{data.education.map((e) => <p key={e.id} className="mt-1">{e.degree} — {e.institution} ({e.endYear})</p>)}</div>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   7. ZEN — Ultra minimal, lots of whitespace, no borders
   ═══════════════════════════════════════════════════════ */
export function ZenTemplate({ data }: TemplateProps) {
  return (
    <div className="space-y-5 text-stone-800" style={{ fontFamily: "'Nunito', sans-serif", fontSize: "10px", lineHeight: "1.7" }}>
      <div>
        <h3 className="text-xl font-extralight text-stone-900">{data.firstName} {data.lastName}</h3>
        <p className="text-[10px] font-light text-stone-400">{data.headline}</p>
        <p className="mt-2 text-[8px] text-stone-400">{data.email} — {data.phone} — {data.location}</p>
      </div>
      {data.summary && <p className="text-stone-600 font-light">{data.summary}</p>}
      {data.experience.length > 0 && <div className="space-y-3">{data.experience.map((e) => <div key={e.id}><p className="font-semibold text-stone-800">{e.role}</p><p className="text-[9px] text-stone-400">{e.company} · {e.startDate}–{e.endDate}</p>{e.description && <p className="mt-1 font-light text-stone-600">{e.description}</p>}</div>)}</div>}
      {data.education.length > 0 && <div>{data.education.map((e) => <p key={e.id} className="text-stone-600 font-light">{e.degree}, {e.field} — {e.institution}</p>)}</div>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   8. NEON — Dark theme, vibrant purple accent
   ═══════════════════════════════════════════════════════ */
export function NeonTemplate({ data }: TemplateProps) {
  const skills = splitSkills(data.technicalSkills);
  return (
    <div className="space-y-3 rounded-lg bg-slate-950 p-4 text-slate-200" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "10px", lineHeight: "1.5" }}>
      <div className="border-b border-purple-500/40 pb-2">
        <h3 className="text-lg font-bold text-purple-300">{data.firstName} {data.lastName}</h3>
        <p className="text-[9px] text-purple-400/80">{data.headline}</p>
        <p className="mt-1 text-[8px] text-slate-500">{data.email} | {data.phone} | {data.location}</p>
      </div>
      {data.summary && <p className="text-slate-400">{data.summary}</p>}
      {data.experience.length > 0 && <section><h4 className="text-[9px] font-bold uppercase text-purple-400 tracking-wider">Experience</h4>{data.experience.map((e) => <div key={e.id} className="mt-2 border-l border-purple-500/30 pl-2"><p className="font-semibold text-slate-200">{e.role}</p><p className="text-[8px] text-slate-500">{e.company} · {e.startDate}–{e.endDate}</p>{e.description && <p className="mt-0.5 text-slate-400">{e.description}</p>}</div>)}</section>}
      {skills.length > 0 && <section><h4 className="text-[9px] font-bold uppercase text-purple-400 tracking-wider">Skills</h4><div className="mt-1 flex flex-wrap gap-1">{skills.map((s) => <span key={s} className="rounded border border-purple-500/30 bg-purple-900/20 px-1.5 py-0.5 text-[8px] text-purple-300">{s}</span>)}</div></section>}
      {data.projects.length > 0 && <section><h4 className="text-[9px] font-bold uppercase text-purple-400 tracking-wider">Projects</h4>{data.projects.map((p) => <div key={p.id} className="mt-1"><p className="font-semibold text-slate-200">{p.title} <span className="text-[8px] text-slate-500">{p.techStack}</span></p>{p.description && <p className="text-slate-400">{p.description}</p>}</div>)}</section>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   9. GRADIENT — Top gradient bar, icon bullets
   ═══════════════════════════════════════════════════════ */
export function GradientTemplate({ data }: TemplateProps) {
  const skills = splitSkills(data.technicalSkills);
  return (
    <div className="space-y-3 text-slate-900" style={{ fontFamily: "'Outfit', sans-serif", fontSize: "10px", lineHeight: "1.5" }}>
      <div className="h-1.5 rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500" />
      <div><h3 className="text-lg font-semibold">{data.firstName} {data.lastName}</h3><p className="text-[9px] text-slate-500">{data.headline}</p><p className="mt-1 text-[8px] text-slate-400">{data.email} · {data.phone} · {data.location}</p></div>
      {data.summary && <section><h4 className="text-[9px] font-bold text-sky-600 uppercase">Summary</h4><p className="mt-1 text-slate-700">{data.summary}</p></section>}
      {data.experience.length > 0 && <section><h4 className="text-[9px] font-bold text-sky-600 uppercase">Experience</h4>{data.experience.map((e) => <div key={e.id} className="mt-2"><div className="flex items-start gap-1.5"><span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" /><div><p className="font-semibold">{e.role} <span className="font-normal text-slate-500">at {e.company}</span></p><p className="text-[8px] text-slate-400">{e.startDate} – {e.endDate}</p>{e.description && <p className="mt-0.5 text-slate-700">{e.description}</p>}</div></div></div>)}</section>}
      {skills.length > 0 && <section><h4 className="text-[9px] font-bold text-sky-600 uppercase">Skills</h4><div className="mt-1 flex flex-wrap gap-1">{skills.map((s) => <span key={s} className="rounded-full bg-sky-50 px-2 py-0.5 text-[8px] text-sky-700 border border-sky-200">{s}</span>)}</div></section>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   10. METRO — Bold blue header, card-style sections
   ═══════════════════════════════════════════════════════ */
export function MetroTemplate({ data }: TemplateProps) {
  const skills = splitSkills(data.technicalSkills);
  return (
    <div className="text-slate-900" style={{ fontFamily: "'Segoe UI', sans-serif", fontSize: "10px", lineHeight: "1.5" }}>
      <div className="bg-blue-600 px-4 py-3 text-white"><h3 className="text-lg font-bold">{data.firstName} {data.lastName}</h3><p className="text-[9px] text-blue-100">{data.headline}</p><p className="mt-1 text-[8px] text-blue-200">{data.email} | {data.phone} | {data.location}</p></div>
      <div className="space-y-2 p-3">
        {data.summary && <div className="rounded bg-blue-50 p-2"><h4 className="text-[9px] font-bold text-blue-600 uppercase">About</h4><p className="mt-1 text-slate-700">{data.summary}</p></div>}
        {data.experience.length > 0 && <div className="rounded border border-slate-200 p-2"><h4 className="text-[9px] font-bold text-blue-600 uppercase">Experience</h4>{data.experience.map((e) => <div key={e.id} className="mt-2 border-b border-slate-100 pb-2 last:border-0"><p className="font-semibold">{e.role}</p><p className="text-[8px] text-slate-500">{e.company} · {e.startDate}–{e.endDate}</p>{e.description && <p className="mt-0.5 text-slate-700">{e.description}</p>}</div>)}</div>}
        {skills.length > 0 && <div className="rounded bg-blue-50 p-2"><h4 className="text-[9px] font-bold text-blue-600 uppercase">Skills</h4><p className="mt-1 text-slate-700">{skills.join(" · ")}</p></div>}
        {data.education.length > 0 && <div className="rounded border border-slate-200 p-2"><h4 className="text-[9px] font-bold text-blue-600 uppercase">Education</h4>{data.education.map((e) => <p key={e.id} className="mt-1 font-medium">{e.degree}, {e.institution}</p>)}</div>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   11. PRESTIGE — Warm gold accents, serif, centered name
   ═══════════════════════════════════════════════════════ */
export function PrestigeTemplate({ data }: TemplateProps) {
  return (
    <div className="space-y-3 text-amber-950" style={{ fontFamily: "'Playfair Display', serif", fontSize: "10px", lineHeight: "1.6" }}>
      <div className="text-center border-b-2 border-amber-700 pb-3">
        <h3 className="text-xl font-bold tracking-wide">{data.firstName} {data.lastName}</h3>
        <p className="text-[9px] italic text-amber-700">{data.headline}</p>
        <p className="mt-1 text-[8px] text-amber-600/70">{data.email} · {data.phone} · {data.location}</p>
      </div>
      {data.summary && <p className="text-center italic text-amber-800/70">{data.summary}</p>}
      {data.experience.length > 0 && <section><h4 className="text-center text-[9px] font-bold uppercase tracking-[0.3em] text-amber-700">Professional Experience</h4>{data.experience.map((e) => <div key={e.id} className="mt-2"><p className="font-bold">{e.role}</p><p className="text-[9px] italic text-amber-700">{e.company} — {e.startDate} to {e.endDate}</p>{e.description && <p className="mt-1 text-amber-900/80">{e.description}</p>}</div>)}</section>}
      {data.education.length > 0 && <section><h4 className="text-center text-[9px] font-bold uppercase tracking-[0.3em] text-amber-700">Education</h4>{data.education.map((e) => <p key={e.id} className="mt-1 text-center">{e.degree} in {e.field} — {e.institution}</p>)}</section>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   12. BOARDROOM — Navy sidebar with white text, right content
   ═══════════════════════════════════════════════════════ */
export function BoardroomTemplate({ data }: TemplateProps) {
  const skills = splitSkills(data.technicalSkills);
  return (
    <div className="grid grid-cols-[120px_1fr] text-slate-900" style={{ fontFamily: "'Georgia', serif", fontSize: "10px", lineHeight: "1.5" }}>
      <div className="bg-slate-800 p-3 text-white rounded-l-lg">
        <h3 className="text-sm font-bold">{data.firstName}</h3>
        <h3 className="text-sm font-bold">{data.lastName}</h3>
        <div className="mt-3 space-y-1.5 text-[8px] text-slate-300">
          <p>{data.email}</p><p>{data.phone}</p><p>{data.location}</p>
        </div>
        {skills.length > 0 && <div className="mt-3"><p className="text-[8px] font-bold uppercase text-slate-400">Expertise</p><ul className="mt-1 space-y-0.5 text-[8px] text-slate-300">{skills.slice(0, 6).map((s) => <li key={s}>› {s}</li>)}</ul></div>}
      </div>
      <div className="space-y-3 p-3">
        <p className="text-[9px] uppercase tracking-wider text-slate-500">{data.headline}</p>
        {data.summary && <p className="text-slate-700">{data.summary}</p>}
        {data.experience.length > 0 && <section><h4 className="text-[9px] font-bold uppercase text-slate-800 border-b border-slate-200 pb-1">Career History</h4>{data.experience.map((e) => <div key={e.id} className="mt-2"><p className="font-bold">{e.role}</p><p className="text-[8px] text-slate-500">{e.company} | {e.startDate} – {e.endDate}</p>{e.description && <p className="mt-0.5 text-slate-700">{e.description}</p>}</div>)}</section>}
        {data.education.length > 0 && <section><h4 className="text-[9px] font-bold uppercase text-slate-800 border-b border-slate-200 pb-1">Education</h4>{data.education.map((e) => <p key={e.id} className="mt-1 text-slate-700">{e.degree}, {e.institution} ({e.endYear})</p>)}</section>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   13. HARBOR — Teal accents, horizontal badges for skills
   ═══════════════════════════════════════════════════════ */
export function HarborTemplate({ data }: TemplateProps) {
  const skills = splitSkills(data.technicalSkills);
  return (
    <div className="space-y-3 text-slate-900" style={{ fontFamily: "'Merriweather', serif", fontSize: "10px", lineHeight: "1.6" }}>
      <div className="flex items-end justify-between border-b-2 border-teal-600 pb-2">
        <div><h3 className="text-lg font-bold">{data.firstName} {data.lastName}</h3><p className="text-[9px] text-teal-700">{data.headline}</p></div>
        <div className="text-right text-[8px] text-slate-500"><p>{data.email}</p><p>{data.phone}</p><p>{data.location}</p></div>
      </div>
      {data.summary && <p className="text-slate-700">{data.summary}</p>}
      {skills.length > 0 && <div className="flex flex-wrap gap-1">{skills.map((s) => <span key={s} className="rounded bg-teal-50 px-1.5 py-0.5 text-[8px] font-medium text-teal-700 border border-teal-200">{s}</span>)}</div>}
      {data.experience.length > 0 && <section><h4 className="text-[9px] font-bold uppercase text-teal-700 tracking-wider">Work History</h4>{data.experience.map((e) => <div key={e.id} className="mt-2"><p className="font-bold">{e.role} — {e.company}</p><p className="text-[8px] italic text-slate-500">{e.startDate} – {e.endDate}</p>{e.description && <p className="mt-0.5 text-slate-700">{e.description}</p>}</div>)}</section>}
      {data.education.length > 0 && <section><h4 className="text-[9px] font-bold uppercase text-teal-700 tracking-wider">Education</h4>{data.education.map((e) => <p key={e.id} className="mt-1">{e.degree} in {e.field}, {e.institution}</p>)}</section>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   14. MOSAIC — Red accents, card grid for sections
   ═══════════════════════════════════════════════════════ */
export function MosaicTemplate({ data }: TemplateProps) {
  const skills = splitSkills(data.technicalSkills);
  return (
    <div className="text-slate-900" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "10px", lineHeight: "1.5" }}>
      <div className="bg-red-600 px-4 py-3 text-white rounded-t"><h3 className="text-lg font-semibold">{data.firstName} {data.lastName}</h3><p className="text-[9px] text-red-100">{data.headline}</p></div>
      <div className="grid gap-2 p-3 sm:grid-cols-2">
        <div className="rounded border border-slate-200 p-2"><h4 className="text-[8px] font-bold uppercase text-red-600">Contact</h4><p className="mt-1 text-[8px] text-slate-600">{data.email}<br />{data.phone}<br />{data.location}</p></div>
        {data.summary && <div className="rounded border border-slate-200 p-2 sm:col-span-2"><h4 className="text-[8px] font-bold uppercase text-red-600">Profile</h4><p className="mt-1 text-slate-700">{data.summary}</p></div>}
        {data.experience.length > 0 && <div className="rounded border border-slate-200 p-2 sm:col-span-2"><h4 className="text-[8px] font-bold uppercase text-red-600">Experience</h4>{data.experience.map((e) => <div key={e.id} className="mt-1.5"><p className="font-semibold">{e.role}, {e.company}</p><p className="text-[8px] text-slate-400">{e.startDate}–{e.endDate}</p>{e.description && <p className="text-slate-700">{e.description}</p>}</div>)}</div>}
        {skills.length > 0 && <div className="rounded border border-slate-200 p-2"><h4 className="text-[8px] font-bold uppercase text-red-600">Skills</h4><div className="mt-1 flex flex-wrap gap-1">{skills.map((s) => <span key={s} className="rounded bg-red-50 px-1 py-0.5 text-[8px] text-red-700">{s}</span>)}</div></div>}
        {data.education.length > 0 && <div className="rounded border border-slate-200 p-2"><h4 className="text-[8px] font-bold uppercase text-red-600">Education</h4>{data.education.map((e) => <p key={e.id} className="mt-1">{e.degree}, {e.institution}</p>)}</div>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   15. CANVAS — Green accents, left-border sections
   ═══════════════════════════════════════════════════════ */
export function CanvasTemplate({ data }: TemplateProps) {
  const skills = splitSkills(data.technicalSkills);
  return (
    <div className="space-y-3 text-slate-900" style={{ fontFamily: "'Cabin', sans-serif", fontSize: "10px", lineHeight: "1.5" }}>
      <div className="border-l-4 border-emerald-500 pl-3"><h3 className="text-lg font-bold">{data.firstName} {data.lastName}</h3><p className="text-[9px] text-emerald-600">{data.headline}</p><p className="mt-1 text-[8px] text-slate-500">{data.email} | {data.phone} | {data.location}</p></div>
      {data.summary && <div className="border-l-4 border-emerald-200 pl-3"><p className="text-slate-700">{data.summary}</p></div>}
      {data.experience.length > 0 && <section><h4 className="text-[9px] font-bold uppercase text-emerald-600 tracking-wider">Experience</h4>{data.experience.map((e) => <div key={e.id} className="mt-2 border-l-2 border-emerald-300 pl-2"><p className="font-semibold">{e.role}</p><p className="text-[8px] text-slate-500">{e.company} · {e.startDate}–{e.endDate}</p>{e.description && <p className="mt-0.5 text-slate-700">{e.description}</p>}</div>)}</section>}
      {skills.length > 0 && <section><h4 className="text-[9px] font-bold uppercase text-emerald-600 tracking-wider">Skills</h4><div className="mt-1 flex flex-wrap gap-1">{skills.map((s) => <span key={s} className="rounded bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 text-[8px] text-emerald-700">{s}</span>)}</div></section>}
      {data.education.length > 0 && <section><h4 className="text-[9px] font-bold uppercase text-emerald-600 tracking-wider">Education</h4>{data.education.map((e) => <p key={e.id} className="mt-1">{e.degree} in {e.field}, {e.institution} ({e.endYear})</p>)}</section>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   16. PRISM — Violet sidebar (right-aligned), left content
   ═══════════════════════════════════════════════════════ */
export function PrismTemplate({ data }: TemplateProps) {
  const skills = splitSkills(data.technicalSkills);
  return (
    <div className="grid grid-cols-[1fr_120px] text-slate-900" style={{ fontFamily: "'Raleway', sans-serif", fontSize: "10px", lineHeight: "1.5" }}>
      <div className="space-y-3 p-3">
        <h3 className="text-lg font-bold">{data.firstName} {data.lastName}</h3>
        {data.summary && <p className="text-slate-700">{data.summary}</p>}
        {data.experience.length > 0 && <section><h4 className="text-[9px] font-bold uppercase text-violet-600 tracking-wider">Experience</h4>{data.experience.map((e) => <div key={e.id} className="mt-2"><p className="font-semibold">{e.role}</p><p className="text-[8px] text-slate-500">{e.company} · {e.startDate}–{e.endDate}</p>{e.description && <p className="mt-0.5 text-slate-700">{e.description}</p>}</div>)}</section>}
        {data.education.length > 0 && <section><h4 className="text-[9px] font-bold uppercase text-violet-600 tracking-wider">Education</h4>{data.education.map((e) => <p key={e.id} className="mt-1">{e.degree} — {e.institution}</p>)}</section>}
      </div>
      <aside className="rounded-r-lg bg-violet-50 p-3 border-l-2 border-violet-500">
        <p className="text-[9px] font-semibold text-violet-700">{data.headline}</p>
        <div className="mt-3 space-y-1 text-[8px] text-slate-600"><p>{data.email}</p><p>{data.phone}</p><p>{data.location}</p></div>
        {skills.length > 0 && <div className="mt-3"><p className="text-[8px] font-bold uppercase text-violet-500">Skills</p><ul className="mt-1 space-y-0.5">{skills.map((s) => <li key={s} className="text-[8px] text-slate-600">• {s}</li>)}</ul></div>}
      </aside>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   17. ORIGAMI — Rose accents, centered headline, indented sections
   ═══════════════════════════════════════════════════════ */
export function OrigamiTemplate({ data }: TemplateProps) {
  return (
    <div className="space-y-3 text-slate-900" style={{ fontFamily: "'Quicksand', sans-serif", fontSize: "10px", lineHeight: "1.55" }}>
      <div className="text-center"><h3 className="text-xl font-bold text-rose-700">{data.firstName} {data.lastName}</h3><p className="text-[9px] text-slate-500">{data.headline}</p><div className="mt-1 flex justify-center gap-3 text-[8px] text-slate-400"><span>{data.email}</span><span>{data.phone}</span><span>{data.location}</span></div></div>
      <div className="h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent" />
      {data.summary && <p className="text-center text-slate-600">{data.summary}</p>}
      {data.experience.length > 0 && <section className="ml-4"><h4 className="text-[9px] font-bold uppercase text-rose-600 tracking-wider">Experience</h4>{data.experience.map((e) => <div key={e.id} className="mt-2"><p className="font-semibold">{e.role} <span className="text-rose-500">@ {e.company}</span></p><p className="text-[8px] text-slate-400">{e.startDate} – {e.endDate}</p>{e.description && <p className="mt-0.5 text-slate-700">{e.description}</p>}</div>)}</section>}
      {data.education.length > 0 && <section className="ml-4"><h4 className="text-[9px] font-bold uppercase text-rose-600 tracking-wider">Education</h4>{data.education.map((e) => <p key={e.id} className="mt-1">{e.degree}, {e.institution}</p>)}</section>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   18. CLASSIC — Traditional Times New Roman, no graphics
   ═══════════════════════════════════════════════════════ */
export function ClassicTemplate({ data }: TemplateProps) {
  return (
    <div className="space-y-2 text-black" style={{ fontFamily: "'Times New Roman', serif", fontSize: "10px", lineHeight: "1.5" }}>
      <div className="text-center border-b-2 border-black pb-2"><h3 className="text-base font-bold uppercase tracking-widest">{data.firstName} {data.lastName}</h3><p className="text-[8px]">{data.email} | {data.phone} | {data.location}</p></div>
      {data.headline && <p className="text-center text-[9px] font-semibold uppercase">{data.headline}</p>}
      {data.summary && <section><h4 className="font-bold uppercase text-[9px] border-b border-black">Objective</h4><p className="mt-1">{data.summary}</p></section>}
      {data.experience.length > 0 && <section><h4 className="font-bold uppercase text-[9px] border-b border-black">Professional Experience</h4>{data.experience.map((e) => <div key={e.id} className="mt-1.5"><div className="flex justify-between"><p className="font-bold">{e.role}, {e.company}</p><p className="text-[8px]">{e.startDate}–{e.endDate}</p></div>{e.description && <p className="mt-0.5">{e.description}</p>}{Array.isArray(e.achievements) && e.achievements.filter(Boolean).length > 0 && <ul className="mt-0.5 list-disc pl-3">{e.achievements.filter(Boolean).map((a, i) => <li key={i}>{a}</li>)}</ul>}</div>)}</section>}
      {data.education.length > 0 && <section><h4 className="font-bold uppercase text-[9px] border-b border-black">Education</h4>{data.education.map((e) => <div key={e.id} className="mt-1 flex justify-between"><p><span className="font-bold">{e.degree}</span>, {e.institution}</p><p className="text-[8px]">{e.endYear}</p></div>)}</section>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   19. STANDARD — Simple Arial, clean ATS-friendly
   ═══════════════════════════════════════════════════════ */
export function StandardTemplate({ data }: TemplateProps) {
  const skills = splitSkills(data.technicalSkills);
  return (
    <div className="space-y-3 text-gray-900" style={{ fontFamily: "'Arial', sans-serif", fontSize: "10px", lineHeight: "1.5" }}>
      <div><h3 className="text-base font-bold">{data.firstName} {data.lastName}</h3><p className="text-[9px] text-gray-600">{data.headline}</p><p className="text-[8px] text-gray-500">{data.email} | {data.phone} | {data.location}</p></div>
      <hr className="border-gray-300" />
      {data.summary && <section><h4 className="text-[9px] font-bold uppercase text-gray-700">Professional Summary</h4><p className="mt-1 text-gray-700">{data.summary}</p></section>}
      {data.experience.length > 0 && <><hr className="border-gray-300" /><section><h4 className="text-[9px] font-bold uppercase text-gray-700">Work Experience</h4>{data.experience.map((e) => <div key={e.id} className="mt-2"><p className="font-bold">{e.role}</p><p className="text-[8px] text-gray-500">{e.company} | {e.startDate} – {e.endDate}</p>{e.description && <p className="mt-0.5 text-gray-700">{e.description}</p>}{Array.isArray(e.achievements) && e.achievements.filter(Boolean).length > 0 && <ul className="mt-0.5 list-disc pl-3 text-gray-700">{e.achievements.filter(Boolean).map((a, i) => <li key={i}>{a}</li>)}</ul>}</div>)}</section></>}
      {skills.length > 0 && <><hr className="border-gray-300" /><section><h4 className="text-[9px] font-bold uppercase text-gray-700">Technical Skills</h4><p className="mt-1 text-gray-700">{skills.join(", ")}</p></section></>}
      {data.education.length > 0 && <><hr className="border-gray-300" /><section><h4 className="text-[9px] font-bold uppercase text-gray-700">Education</h4>{data.education.map((e) => <div key={e.id} className="mt-1"><p className="font-bold">{e.degree} in {e.field}</p><p className="text-[8px] text-gray-500">{e.institution} ({e.startYear}–{e.endYear})</p></div>)}</section></>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   20. FOUNDATION — Verdana, icon-style markers, bottom contact
   ═══════════════════════════════════════════════════════ */
export function FoundationTemplate({ data }: TemplateProps) {
  const skills = splitSkills(data.technicalSkills);
  return (
    <div className="space-y-3 text-slate-900" style={{ fontFamily: "'Verdana', sans-serif", fontSize: "10px", lineHeight: "1.5" }}>
      <div className="bg-slate-50 rounded p-3 border border-slate-200"><h3 className="text-base font-bold">{data.firstName} {data.lastName}</h3><p className="text-[9px] text-slate-500">{data.headline}</p>{data.summary && <p className="mt-2 text-slate-700">{data.summary}</p>}</div>
      {data.experience.length > 0 && <section><h4 className="text-[9px] font-bold uppercase text-slate-500 border-b border-slate-200 pb-1">▸ Experience</h4>{data.experience.map((e) => <div key={e.id} className="mt-2"><p className="font-bold">{e.role}</p><p className="text-[8px] text-slate-500">{e.company} — {e.startDate} to {e.endDate}</p>{e.description && <p className="mt-0.5 text-slate-700">{e.description}</p>}</div>)}</section>}
      {data.education.length > 0 && <section><h4 className="text-[9px] font-bold uppercase text-slate-500 border-b border-slate-200 pb-1">▸ Education</h4>{data.education.map((e) => <p key={e.id} className="mt-1">{e.degree} in {e.field} — {e.institution} ({e.endYear})</p>)}</section>}
      {skills.length > 0 && <section><h4 className="text-[9px] font-bold uppercase text-slate-500 border-b border-slate-200 pb-1">▸ Skills</h4><p className="mt-1 text-slate-700">{skills.join(" · ")}</p></section>}
      {data.projects.length > 0 && <section><h4 className="text-[9px] font-bold uppercase text-slate-500 border-b border-slate-200 pb-1">▸ Projects</h4>{data.projects.map((p) => <div key={p.id} className="mt-1"><p className="font-semibold">{p.title} <span className="text-[8px] text-slate-500">{p.techStack}</span></p>{p.description && <p className="text-slate-700">{p.description}</p>}</div>)}</section>}
      <div className="bg-slate-50 rounded p-2 text-[8px] text-slate-500 border border-slate-200 text-center">{data.email} · {data.phone} · {data.location}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   REGISTRY
   ═══════════════════════════════════════════════════════ */
export const templateRegistry: Record<ResumeTemplateId, ComponentType<TemplateProps>> = {
  aurora: AuroraTemplate,
  slate: SlateTemplate,
  executive: ExecutiveTemplate,
  clean: CleanTemplate,
  mercury: MercuryTemplate,
  nordic: NordicTemplate,
  zen: ZenTemplate,
  neon: NeonTemplate,
  gradient: GradientTemplate,
  metro: MetroTemplate,
  prestige: PrestigeTemplate,
  boardroom: BoardroomTemplate,
  harbor: HarborTemplate,
  mosaic: MosaicTemplate,
  canvas: CanvasTemplate,
  prism: PrismTemplate,
  origami: OrigamiTemplate,
  classic: ClassicTemplate,
  standard: StandardTemplate,
  foundation: FoundationTemplate,
};
