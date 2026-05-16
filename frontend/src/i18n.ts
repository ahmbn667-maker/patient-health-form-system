export type Language = "ar" | "en" | "de";

export const isRtl = (lang: Language) => lang === "ar";

export const languageLabel: Record<Language, string> = {
  ar: "العربية",
  en: "English",
  de: "Deutsch"
};

export const commonText = {
  appTitle: {
    ar: "Ahmed Al-Saadi",
    en: "Ahmed Al-Saadi",
    de: "Ahmed Al-Saadi"
  },
  landing: {
    ar: "الصفحة الرئيسية",
    en: "Home",
    de: "Startseite"
  },
  patientForm: {
    ar: "نموذج المريض",
    en: "Patient Form",
    de: "Patientenformular"
  },
  login: {
    ar: "دخول المشرف / الدكتور",
    en: "Admin / Doctor Login",
    de: "Admin-/Arzt-Anmeldung"
  },
  dashboard: {
    ar: "لوحة المشرف",
    en: "Admin Dashboard",
    de: "Admin-Dashboard"
  }
} as const;
