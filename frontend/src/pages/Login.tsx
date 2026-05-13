import { useState } from "react";
import { api } from "../services/api";
import { Language } from "../i18n";

type Props = {
  lang: Language;
  onSuccess: () => void;
};

const text = {
  title: {
    ar: "تسجيل دخول المشرف / الدكتور",
    en: "Admin / Doctor Login",
    de: "Admin-/Arzt-Anmeldung"
  },
  subtitle: {
    ar: "استخدم بيانات الدخول للدخول إلى لوحة التحكم الطبية.",
    en: "Use your credentials to access the clinical dashboard.",
    de: "Verwenden Sie Ihre Zugangsdaten fuer das klinische Dashboard."
  },
  email: { ar: "البريد الإلكتروني", en: "Email", de: "E-Mail" },
  password: { ar: "كلمة المرور", en: "Password", de: "Passwort" },
  login: { ar: "تسجيل الدخول", en: "Login", de: "Anmelden" },
  autofill: {
    ar: "استخدام بيانات المشرف التجريبية",
    en: "Use Demo Credentials",
    de: "Demo-Zugang verwenden"
  },
  autofillDoctor: {
    ar: "استخدام بيانات الدكتور التجريبية",
    en: "Use Demo Doctor Credentials",
    de: "Demo-Arzt-Zugang verwenden"
  },
  error: {
    ar: "بيانات الدخول غير صحيحة",
    en: "Invalid login credentials",
    de: "Ungueltige Anmeldedaten"
  },
  serverError: {
    ar: "لا يمكن الاتصال بالخادم. تأكد من تشغيل Backend على المنفذ 8081.",
    en: "Cannot connect to server. Make sure backend is running on port 8081.",
    de: "Server nicht erreichbar. Pruefen Sie Backend auf Port 8081."
  },
  demoTitle: {
    ar: "بيانات تجريبية:",
    en: "Demo accounts:",
    de: "Demo-Konten:"
  },
  demoAdmin: {
    ar: "المشرف: admin@example.com / 12345678",
    en: "Admin: admin@example.com / 12345678",
    de: "Admin: admin@example.com / 12345678"
  },
  demoDoctor: {
    ar: "الدكتور: doctor@example.com / 12345678",
    en: "Doctor: doctor@example.com / 12345678",
    de: "Arzt: doctor@example.com / 12345678"
  }
} as const;

function normalizeDigits(value: string) {
  return value
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)))
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
}

export default function Login({ lang, onSuccess }: Props) {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("12345678");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const normalizedEmail = normalizeDigits(email).trim().toLowerCase();
    const normalizedPassword = normalizeDigits(password).trim();

    try {
      const res = await api.post("/auth/login", { email: normalizedEmail, password: normalizedPassword });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("role", res.data.role || "ADMIN");
      onSuccess();
    } catch (err: any) {
      if (!err?.response) {
        setError(text.serverError[lang]);
        return;
      }
      setError(text.error[lang]);
    }
  }

  function fillDemoCredentials() {
    setEmail("admin@example.com");
    setPassword("12345678");
    setError("");
  }

  function fillDoctorCredentials() {
    setEmail("doctor@example.com");
    setPassword("12345678");
    setError("");
  }

  return (
    <main className="page center-page">
      <form className="card login-card" onSubmit={submit}>
        <h1>{text.title[lang]}</h1>
        <p>{text.subtitle[lang]}</p>
        <p>
          <strong>{text.demoTitle[lang]}</strong><br />
          {text.demoAdmin[lang]}<br />
          {text.demoDoctor[lang]}
        </p>

        <label>{text.email[lang]}</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>{text.password[lang]}</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        {error && <div className="error">{error}</div>}

        <button type="button" onClick={fillDemoCredentials}>{text.autofill[lang]}</button>
        <button type="button" onClick={fillDoctorCredentials}>{text.autofillDoctor[lang]}</button>
        <button className="primary" type="submit">{text.login[lang]}</button>
      </form>
    </main>
  );
}
