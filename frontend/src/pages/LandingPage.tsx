import { Language } from "../i18n";

type Props = {
  lang: Language;
  onOpenPatient: () => void;
  onOpenAdmin: () => void;
};

const t = {
  welcome: {
    ar: "مرحبًا بك في نظام إدارة العيادة",
    en: "Welcome to Clinic Management System",
    de: "Willkommen im Klinikverwaltungssystem"
  },
  intro: {
    ar: "منصة موحدة لإدخال بيانات المريض ومراجعتها سريريًا وإصدار التقارير.",
    en: "Unified flow for patient intake, clinical review, and report generation.",
    de: "Einheitlicher Ablauf fuer Patientenaufnahme, klinische Pruefung und Berichtserstellung."
  },
  patient: { ar: "المريض", en: "Patient", de: "Patient" },
  patientDesc: {
    ar: "تعبئة النموذج الصحي والتوقيع والإرسال مع رقم مرجعي فوري.",
    en: "Fill health form, sign digitally, and submit with instant reference ID.",
    de: "Gesundheitsformular ausfuellen, digital unterschreiben und mit Referenznummer senden."
  },
  admin: { ar: "الإدارة", en: "Admin", de: "Admin" },
  adminDesc: {
    ar: "تسجيل الدخول، مراجعة الحالات، إضافة التقييم السريري، وتنزيل التقرير.",
    en: "Login, review cases, add clinical assessment, and download report.",
    de: "Anmelden, Faelle pruefen, klinische Bewertung eintragen und Bericht herunterladen."
  },
  howItWorks: { ar: "آلية العمل", en: "How It Works", de: "Ablauf" },
  s1: { ar: "1) تسجيل بيانات المريض", en: "1) Patient registration", de: "1) Patientenerfassung" },
  s2: { ar: "2) مراجعة الإدارة", en: "2) Admin review", de: "2) Verwaltung prueft" },
  s3: { ar: "3) التحديثات الطبية", en: "3) Clinical updates", de: "3) Klinische Aktualisierung" },
  s4: { ar: "4) جاهزية التقرير", en: "4) Report ready", de: "4) Bericht bereit" },
  openPatient: { ar: "فتح نموذج المريض", en: "Open Patient Form", de: "Patientenformular oeffnen" },
  openAdmin: { ar: "فتح لوحة الإدارة", en: "Open Admin", de: "Admin oeffnen" }
} as const;

export default function LandingPage({ lang, onOpenPatient, onOpenAdmin }: Props) {
  return (
    <main className="page">
      <section className="card hero-card">
        <h1>{t.welcome[lang]}</h1>
        <p>{t.intro[lang]}</p>
      </section>

      <section className="landing-grid">
        <article className="card">
          <h2>{t.patient[lang]}</h2>
          <p>{t.patientDesc[lang]}</p>
          <button className="primary" onClick={onOpenPatient}>{t.openPatient[lang]}</button>
        </article>

        <article className="card">
          <h2>{t.admin[lang]}</h2>
          <p>{t.adminDesc[lang]}</p>
          <button onClick={onOpenAdmin}>{t.openAdmin[lang]}</button>
        </article>
      </section>

      <section className="card">
        <h2>{t.howItWorks[lang]}</h2>
        <div className="steps-grid">
          <div className="step-item">{t.s1[lang]}</div>
          <div className="step-item">{t.s2[lang]}</div>
          <div className="step-item">{t.s3[lang]}</div>
          <div className="step-item">{t.s4[lang]}</div>
        </div>
      </section>
    </main>
  );
}
