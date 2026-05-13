import { useEffect, useState } from "react";
import Login from "./pages/Login";
import PatientFormPage from "./pages/PatientFormPage";
import AdminDashboard from "./pages/AdminDashboard";
import LandingPage from "./pages/LandingPage";
import { commonText, isRtl, languageLabel, Language } from "./i18n";

type Page = "landing" | "form" | "login" | "dashboard";

export default function App() {
  const [page, setPage] = useState<Page>("landing");
  const [lang, setLang] = useState<Language>("en");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(Boolean(localStorage.getItem("token")));
  const email = localStorage.getItem("email") || "";
  const hideGlobalNav = page === "dashboard" && isLoggedIn;

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl(lang) ? "rtl" : "ltr";
  }, [lang]);

  return (
    <div>
      {!hideGlobalNav && (
        <nav className="nav">
          <strong>{commonText.appTitle[lang]}</strong>
          <div className="nav-actions">
            <button onClick={() => setPage("landing")}>{commonText.landing[lang]}</button>
            <button onClick={() => setPage("form")}>{commonText.patientForm[lang]}</button>
            {!isLoggedIn && <button onClick={() => setPage("login")}>{commonText.login[lang]}</button>}
            <button onClick={() => setPage("dashboard")}>{commonText.dashboard[lang]}</button>
            <select
              className="lang-select"
              value={lang}
              onChange={(e) => setLang(e.target.value as Language)}
              aria-label="Language"
            >
              <option value="ar">{languageLabel.ar}</option>
              <option value="en">{languageLabel.en}</option>
              <option value="de">{languageLabel.de}</option>
            </select>
            {isLoggedIn && <span className="nav-user">{email}</span>}
          </div>
        </nav>
      )}

      {page === "landing" && <LandingPage lang={lang} onOpenPatient={() => setPage("form")} onOpenAdmin={() => setPage("login")} />}
      {page === "form" && <PatientFormPage lang={lang} />}
      {page === "login" && <Login lang={lang} onSuccess={() => { setPage("dashboard"); setIsLoggedIn(true); }} />}
      {page === "dashboard" && (
        isLoggedIn ? (
          <AdminDashboard lang={lang} onLanguageChange={setLang} />
        ) : (
          <Login lang={lang} onSuccess={() => { setPage("dashboard"); setIsLoggedIn(true); }} />
        )
      )}
    </div>
  );
}
