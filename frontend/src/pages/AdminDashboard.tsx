import { useEffect, useMemo, useState } from "react";
import { Download, Eye, Globe, LogOut, RefreshCw, Search } from "lucide-react";
import { AxiosError } from "axios";
import { api } from "../services/api";
import { Language } from "../i18n";
import { FormChangeArchive, FormStatus, PatientForm } from "../types/patientForm";

type Props = {
  lang: Language;
  onLanguageChange?: (language: Language) => void;
};

type EditablePatient = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  address: string;
  insuranceProvider: string;
  insuranceNumber: string;
  requestType: string;
  priority: string;
  nationalId: string;
  requestNotes: string;
  symptoms: string;
  conditionDescription: string;
  allergies: string;
  medications: string;
  diagnosis: string;
  requiredMedicine: string;
  adminNotes: string;
  status: FormStatus;
};

const i18n = {
  title: {
    ar: "لوحة المشرف / الدكتور",
    en: "Admin / Doctor Dashboard",
    de: "Admin-/Arzt-Dashboard"
  },
  subtitle: {
    ar: "عرض الاستمارات، تعديل معلومات المريض، تحديث الحالة، وطباعة التقرير.",
    en: "Review forms, edit patient info, update status, and print PDF report.",
    de: "Formulare anzeigen, Patientendaten bearbeiten, Status aktualisieren und PDF drucken."
  },
  logout: { ar: "تسجيل الخروج", en: "Logout", de: "Abmelden" },
  search: { ar: "بحث بالاسم أو رقم النموذج", en: "Search by name or form ID", de: "Suche nach Name oder Formular-ID" },
  filter: { ar: "تصفية الحالة", en: "Status Filter", de: "Statusfilter" },
  refresh: { ar: "تحديث", en: "Refresh", de: "Aktualisieren" },
  all: { ar: "كل الحالات", en: "All", de: "Alle" },
  newStatus: { ar: "جديدة", en: "New", de: "Neu" },
  reviewingStatus: { ar: "قيد العمل", en: "In Progress", de: "In Bearbeitung" },
  doneStatus: { ar: "تم الإنجاز", en: "Done", de: "Erledigt" },
  rejectedStatus: { ar: "مرفوضة", en: "Rejected", de: "Abgelehnt" },
  id: { ar: "رقم", en: "ID", de: "ID" },
  patient: { ar: "المريض", en: "Patient", de: "Patient" },
  phone: { ar: "الهاتف", en: "Phone", de: "Telefon" },
  status: { ar: "الحالة", en: "Status", de: "Status" },
  updated: { ar: "آخر تحديث", en: "Updated", de: "Aktualisiert" },
  action: { ar: "الإجراء", en: "Action", de: "Aktion" },
  open: { ar: "فتح", en: "Open", de: "Oeffnen" },
  noResult: { ar: "لا توجد نتائج", en: "No results found", de: "Keine Ergebnisse" },
  selected: { ar: "الاستمارة المفتوحة", en: "Selected Form", de: "Ausgewaehltes Formular" },
  firstName: { ar: "الاسم الأول", en: "First Name", de: "Vorname" },
  lastName: { ar: "اسم العائلة", en: "Last Name", de: "Nachname" },
  dob: { ar: "تاريخ الميلاد", en: "Date of Birth", de: "Geburtsdatum" },
  email: { ar: "البريد الإلكتروني", en: "Email", de: "E-Mail" },
  street: { ar: "الشارع", en: "Street", de: "Strasse" },
  address: { ar: "العنوان", en: "Address", de: "Adresse" },
  houseNumber: { ar: "رقم المنزل", en: "House No.", de: "Hausnummer" },
  postalCode: { ar: "الرمز البريدي", en: "Postal Code", de: "Postleitzahl" },
  city: { ar: "المدينة", en: "City", de: "Stadt" },
  insuranceProvider: { ar: "شركة التأمين", en: "Insurance Provider", de: "Krankenkasse" },
  insuranceNumber: { ar: "رقم التأمين", en: "Insurance Number", de: "Versicherungsnummer" },
  requestType: { ar: "نوع النموذج", en: "Request Type", de: "Formulartyp" },
  priority: { ar: "أولوية الطلب", en: "Priority", de: "Prioritaet" },
  nationalId: { ar: "رقم الهوية / الإقامة", en: "National ID", de: "Ausweis-/Aufenthaltsnummer" },
  requestNotes: { ar: "ملاحظات الطلب", en: "Request Notes", de: "Antragsnotizen" },
  symptoms: { ar: "الأعراض", en: "Symptoms", de: "Symptome" },
  condition: { ar: "وصف الحالة", en: "Condition", de: "Krankheitsbeschreibung" },
  allergies: { ar: "الحساسية / أمراض مزمنة", en: "Allergies / Chronic", de: "Allergien / Vorerkrankungen" },
  medications: { ar: "الأدوية الحالية", en: "Current Medications", de: "Aktuelle Medikamente" },
  diagnosis: { ar: "التشخيص", en: "Diagnosis", de: "Diagnose" },
  requiredMedicine: { ar: "الأدوية المطلوبة", en: "Required Medicine", de: "Erforderliche Medikation" },
  notes: { ar: "ملاحظات الطبيب", en: "Doctor Notes", de: "Arztnotizen" },
  save: { ar: "حفظ التعديلات", en: "Save Changes", de: "Aenderungen speichern" },
  pdf: { ar: "طباعة PDF", en: "Print PDF", de: "PDF drucken" },
  history: { ar: "سجل التعديلات", en: "Change History", de: "Aenderungsverlauf" },
  historyEmpty: { ar: "لا يوجد سجل تعديلات حتى الآن.", en: "No history yet.", de: "Noch kein Verlauf." },
  saveSuccess: { ar: "تم حفظ التعديلات بنجاح.", en: "Changes saved successfully.", de: "Aenderungen erfolgreich gespeichert." },
  loadFail: { ar: "فشل تحميل البيانات من الخادم.", en: "Failed to load data from server.", de: "Daten konnten nicht geladen werden." },
  saveFail: { ar: "فشل حفظ البيانات.", en: "Failed to save data.", de: "Speichern fehlgeschlagen." },
  doneRule: {
    ar: "لا يمكن تعيين الحالة (تم الإنجاز) بدون التشخيص والأدوية المطلوبة.",
    en: "Cannot set Done without diagnosis and required medicine.",
    de: "DONE erfordert Diagnose und erforderliche Medikation."
  },
  loginRole: {
    ar: "وضع الدخول: مشرف / دكتور",
    en: "Login mode: Admin / Doctor",
    de: "Anmeldemodus: Admin / Arzt"
  },
  roleAdmin: { ar: "مشرف", en: "Admin", de: "Admin" },
  roleDoctor: { ar: "دكتور", en: "Doctor", de: "Arzt" },
  sessionExpired: {
    ar: "انتهت جلسة الدخول. يرجى تسجيل الدخول مرة أخرى.",
    en: "Your session has expired. Please log in again.",
    de: "Ihre Sitzung ist abgelaufen. Bitte erneut anmelden."
  }
} as const;

const localeByLang: Record<Language, string> = {
  ar: "ar-SA",
  en: "en-US",
  de: "de-DE"
};

function emptyEditable(): EditablePatient {
  return {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phone: "",
    email: "",
    street: "",
    houseNumber: "",
    postalCode: "",
    city: "",
    address: "",
    insuranceProvider: "",
    insuranceNumber: "",
    requestType: "",
    priority: "",
    nationalId: "",
    requestNotes: "",
    symptoms: "",
    conditionDescription: "",
    allergies: "",
    medications: "",
    diagnosis: "",
    requiredMedicine: "",
    adminNotes: "",
    status: "REVIEWING"
  };
}

function toIsoDate(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

function formatDateTime(value: string | undefined, lang: Language) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(localeByLang[lang], {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date);
}

function statusBadge(status: FormStatus) {
  if (status === "DONE") return "badge done";
  if (status === "REJECTED") return "badge rejected";
  if (status === "REVIEWING") return "badge reviewing";
  return "badge new";
}

function toEditablePatient(form: PatientForm): EditablePatient {
  return {
    firstName: form.firstName || "",
    lastName: form.lastName || "",
    dateOfBirth: toIsoDate(form.dateOfBirth),
    phone: form.phone || "",
    email: form.email || "",
    street: form.street || "",
    houseNumber: form.houseNumber || "",
    postalCode: form.postalCode || "",
    city: form.city || "",
    address: form.address || "",
    insuranceProvider: form.insuranceProvider || "",
    insuranceNumber: form.insuranceNumber || "",
    requestType: form.requestType || "",
    priority: form.priority || "",
    nationalId: form.nationalId || "",
    requestNotes: form.requestNotes || "",
    symptoms: form.symptoms || "",
    conditionDescription: form.conditionDescription || "",
    allergies: form.allergies || "",
    medications: form.medications || "",
    diagnosis: form.diagnosis || "",
    requiredMedicine: form.requiredMedicine || "",
    adminNotes: form.adminNotes || "",
    status: (form.status || "REVIEWING") as FormStatus
  };
}

function readApiErrorMessage(error: unknown) {
  const axiosError = error as AxiosError<{ message?: string }>;
  if (axiosError?.response?.status === 401 || axiosError?.response?.status === 403) return "SESSION_EXPIRED";
  const apiMessage = axiosError?.response?.data?.message;
  if (typeof apiMessage === "string" && apiMessage.trim()) {
    return apiMessage.trim();
  }
  return "";
}

function parseChangedFields(changeType?: string) {
  if (!changeType) return [] as string[];
  const separatorIndex = changeType.indexOf(":");
  if (separatorIndex < 0) return [] as string[];
  return changeType
    .slice(separatorIndex + 1)
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

export default function AdminDashboard({ lang, onLanguageChange }: Props) {
  const [forms, setForms] = useState<PatientForm[]>([]);
  const [selected, setSelected] = useState<PatientForm | null>(null);
  const [editable, setEditable] = useState<EditablePatient>(emptyEditable);
  const [history, setHistory] = useState<FormChangeArchive[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | FormStatus>("ALL");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const currentRole = (localStorage.getItem("role") || "ADMIN").toUpperCase();

  const t = i18n;

  function clearAuthAndShowSessionMessage() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    setError(t.sessionExpired[lang]);
  }

  async function loadForms() {
    try {
      const res = await api.get("/forms");
      setForms(res.data || []);
    } catch (err) {
      if (readApiErrorMessage(err) === "SESSION_EXPIRED") {
        clearAuthAndShowSessionMessage();
        return;
      }
      throw err;
    }
  }

  async function loadHistory(formId: number) {
    try {
      const res = await api.get(`/forms/${formId}/history`);
      setHistory(res.data || []);
    } catch (err) {
      if (readApiErrorMessage(err) === "SESSION_EXPIRED") {
        clearAuthAndShowSessionMessage();
        return;
      }
      throw err;
    }
  }

  useEffect(() => {
    loadForms().catch(() => setError(t.loadFail[lang]));
  }, [lang]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return forms.filter((form) => {
      const status = (form.status || "NEW") as FormStatus;
      const statusOk = statusFilter === "ALL" || statusFilter === status;
      const name = `${form.firstName || ""} ${form.lastName || ""}`.toLowerCase();
      const searchOk = !q || name.includes(q) || String(form.id || "").includes(q);
      return statusOk && searchOk;
    });
  }, [forms, search, statusFilter]);

  function statusLabel(status: FormStatus) {
    if (status === "DONE") return t.doneStatus[lang];
    if (status === "REJECTED") return t.rejectedStatus[lang];
    if (status === "REVIEWING") return t.reviewingStatus[lang];
    return t.newStatus[lang];
  }

  function changedFieldLabel(field: string) {
    switch (field) {
      case "firstName": return t.firstName[lang];
      case "lastName": return t.lastName[lang];
      case "dateOfBirth": return t.dob[lang];
      case "phone": return t.phone[lang];
      case "email": return t.email[lang];
      case "street": return t.street[lang];
      case "houseNumber": return t.houseNumber[lang];
      case "postalCode": return t.postalCode[lang];
      case "city": return t.city[lang];
      case "address": return t.address[lang];
      case "insuranceProvider": return t.insuranceProvider[lang];
      case "insuranceNumber": return t.insuranceNumber[lang];
      case "requestType": return t.requestType[lang];
      case "priority": return t.priority[lang];
      case "nationalId": return t.nationalId[lang];
      case "requestNotes": return t.requestNotes[lang];
      case "symptoms": return t.symptoms[lang];
      case "conditionDescription": return t.condition[lang];
      case "allergies": return t.allergies[lang];
      case "medications": return t.medications[lang];
      case "status": return t.status[lang];
      case "diagnosis": return t.diagnosis[lang];
      case "requiredMedicine": return t.requiredMedicine[lang];
      case "adminNotes": return t.notes[lang];
      default: return field;
    }
  }

  function openForm(form: PatientForm) {
    setSelected(form);
    setEditable(toEditablePatient(form));
    setMessage("");
    setError("");
    if (form.id) {
      loadHistory(form.id).catch(() => setHistory([]));
    }
  }

  function update<K extends keyof EditablePatient>(key: K, value: EditablePatient[K]) {
    setEditable((prev) => ({ ...prev, [key]: value }));
  }

  async function save() {
    if (!selected?.id) return;
    setMessage("");
    setError("");

    if (editable.status === "DONE" && (!editable.diagnosis.trim() || !editable.requiredMedicine.trim())) {
      setError(t.doneRule[lang]);
      return;
    }

    try {
      const res = await api.put<PatientForm>(`/forms/${selected.id}/admin`, {
        status: editable.status,
        firstName: editable.firstName.trim(),
        lastName: editable.lastName.trim(),
        dateOfBirth: editable.dateOfBirth || null,
        phone: editable.phone.trim(),
        email: editable.email.trim(),
        street: editable.street.trim(),
        houseNumber: editable.houseNumber.trim(),
        postalCode: editable.postalCode.trim(),
        city: editable.city.trim(),
        address: editable.address.trim(),
        insuranceProvider: editable.insuranceProvider.trim(),
        insuranceNumber: editable.insuranceNumber.trim(),
        requestType: editable.requestType.trim(),
        priority: editable.priority.trim(),
        nationalId: editable.nationalId.trim(),
        requestNotes: editable.requestNotes.trim(),
        symptoms: editable.symptoms.trim(),
        conditionDescription: editable.conditionDescription.trim(),
        allergies: editable.allergies.trim(),
        medications: editable.medications.trim(),
        diagnosis: editable.diagnosis.trim(),
        requiredMedicine: editable.requiredMedicine.trim(),
        adminNotes: editable.adminNotes.trim()
      });

      const saved = res.data;
      setSelected(saved);
      setEditable(toEditablePatient(saved));
      await loadForms();
      await loadHistory(selected.id);
      setMessage(t.saveSuccess[lang]);
    } catch (err) {
      const apiMessage = readApiErrorMessage(err);
      if (apiMessage === "SESSION_EXPIRED") {
        clearAuthAndShowSessionMessage();
        return;
      }
      if (apiMessage.includes("Diagnosis and required medicine")) {
        setError(t.doneRule[lang]);
        return;
      }
      setError(apiMessage || t.saveFail[lang]);
    }
  }

  async function printPdf() {
    if (!selected) return;
    const { generatePDF } = await import("../utils/reportGenerator");
    await generatePDF(
      {
        ...selected,
        firstName: editable.firstName,
        lastName: editable.lastName,
        phone: editable.phone,
        email: editable.email,
        dateOfBirth: editable.dateOfBirth,
        street: editable.street,
        houseNumber: editable.houseNumber,
        postalCode: editable.postalCode,
        city: editable.city,
        address: editable.address,
        insuranceProvider: editable.insuranceProvider,
        insuranceNumber: editable.insuranceNumber,
        requestType: editable.requestType,
        priority: editable.priority,
        nationalId: editable.nationalId,
        requestNotes: editable.requestNotes,
        symptoms: editable.symptoms,
        conditionDescription: editable.conditionDescription,
        allergies: editable.allergies,
        medications: editable.medications,
        status: editable.status,
        diagnosis: editable.diagnosis,
        requiredMedicine: editable.requiredMedicine,
        adminNotes: editable.adminNotes,
        changeHistory: history
      },
      lang
    );
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    window.location.reload();
  }

  return (
    <main className="dashboard-shell">
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <h3>{t.title[lang]}</h3>
          <p>
            {t.loginRole[lang]} · {currentRole === "DOCTOR" ? t.roleDoctor[lang] : t.roleAdmin[lang]}
          </p>
        </div>
        <button className="sidebar-item active">
          <span>{t.title[lang]}</span>
        </button>
        <button className="sidebar-logout" onClick={logout}>
          <LogOut size={18} />
          <span>{t.logout[lang]}</span>
        </button>
      </aside>

      <section className="dashboard-content">
        <section className="dashboard-topbar card">
          <div className="top-search">
            <Search size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.search[lang]}
              aria-label={t.search[lang]}
            />
          </div>

          <div className="top-actions">
            <label className="lang-inline" title="Language">
              <Globe size={16} />
              <select value={lang} onChange={(e) => onLanguageChange?.(e.target.value as Language)}>
                <option value="ar">AR</option>
                <option value="en">EN</option>
                <option value="de">DE</option>
              </select>
            </label>
            <button onClick={() => loadForms().catch(() => setError(t.loadFail[lang]))}>
              <RefreshCw size={16} /> {t.refresh[lang]}
            </button>
          </div>
        </section>

        <section className="card">
          <div className="header-row">
            <div>
              <h1>{t.title[lang]}</h1>
              <p>{t.subtitle[lang]}</p>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as "ALL" | FormStatus)}
              aria-label={t.filter[lang]}
            >
              <option value="ALL">{t.all[lang]}</option>
              <option value="NEW">{t.newStatus[lang]}</option>
              <option value="REVIEWING">{t.reviewingStatus[lang]}</option>
              <option value="DONE">{t.doneStatus[lang]}</option>
              <option value="REJECTED">{t.rejectedStatus[lang]}</option>
            </select>
          </div>

          {message && <div className="notice">{message}</div>}
          {error && <div className="error">{error}</div>}

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{t.id[lang]}</th>
                  <th>{t.patient[lang]}</th>
                  <th>{t.phone[lang]}</th>
                  <th>{t.status[lang]}</th>
                  <th>{t.updated[lang]}</th>
                  <th>{t.action[lang]}</th>
                </tr>
              </thead>
              <tbody>
                {!filtered.length && (
                  <tr>
                    <td colSpan={6}>{t.noResult[lang]}</td>
                  </tr>
                )}
                {filtered.map((form) => {
                  const status = (form.status || "NEW") as FormStatus;
                  return (
                    <tr key={form.id}>
                      <td>#{form.id}</td>
                      <td>{form.firstName} {form.lastName}</td>
                      <td>{form.phone || "-"}</td>
                      <td><span className={statusBadge(status)}>{statusLabel(status)}</span></td>
                      <td>{formatDateTime(form.updatedAt || form.createdAt, lang)}</td>
                      <td>
                        <button className="icon-btn" title={t.open[lang]} onClick={() => openForm(form)}>
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {selected && (
          <section className="dashboard-detail-grid">
            <article className="card">
              <h2>{t.selected[lang]} #{selected.id}</h2>
              <div className="grid-form">
                <div>
                  <label>{t.firstName[lang]}</label>
                  <input value={editable.firstName} onChange={(e) => update("firstName", e.target.value)} />
                </div>
                <div>
                  <label>{t.lastName[lang]}</label>
                  <input value={editable.lastName} onChange={(e) => update("lastName", e.target.value)} />
                </div>
                <div>
                  <label>{t.dob[lang]}</label>
                  <input type="date" value={editable.dateOfBirth} onChange={(e) => update("dateOfBirth", e.target.value)} />
                </div>
                <div>
                  <label>{t.phone[lang]}</label>
                  <input value={editable.phone} onChange={(e) => update("phone", e.target.value)} />
                </div>
                <div className="full">
                  <label>{t.email[lang]}</label>
                  <input value={editable.email} onChange={(e) => update("email", e.target.value)} />
                </div>
                <div>
                  <label>{t.street[lang]}</label>
                  <input value={editable.street} onChange={(e) => update("street", e.target.value)} />
                </div>
                <div>
                  <label>{t.houseNumber[lang]}</label>
                  <input value={editable.houseNumber} onChange={(e) => update("houseNumber", e.target.value)} />
                </div>
                <div>
                  <label>{t.postalCode[lang]}</label>
                  <input value={editable.postalCode} onChange={(e) => update("postalCode", e.target.value)} />
                </div>
                <div>
                  <label>{t.city[lang]}</label>
                  <input value={editable.city} onChange={(e) => update("city", e.target.value)} />
                </div>
                <div className="full">
                  <label>{t.address[lang]}</label>
                  <input value={editable.address} onChange={(e) => update("address", e.target.value)} />
                </div>
                <div>
                  <label>{t.insuranceProvider[lang]}</label>
                  <input value={editable.insuranceProvider} onChange={(e) => update("insuranceProvider", e.target.value)} />
                </div>
                <div>
                  <label>{t.insuranceNumber[lang]}</label>
                  <input value={editable.insuranceNumber} onChange={(e) => update("insuranceNumber", e.target.value)} />
                </div>
                <div>
                  <label>{t.requestType[lang]}</label>
                  <input value={editable.requestType} onChange={(e) => update("requestType", e.target.value)} />
                </div>
                <div>
                  <label>{t.priority[lang]}</label>
                  <input value={editable.priority} onChange={(e) => update("priority", e.target.value)} />
                </div>
                <div>
                  <label>{t.nationalId[lang]}</label>
                  <input value={editable.nationalId} onChange={(e) => update("nationalId", e.target.value)} />
                </div>
                <div className="full">
                  <label>{t.requestNotes[lang]}</label>
                  <textarea value={editable.requestNotes} onChange={(e) => update("requestNotes", e.target.value)} />
                </div>
                <div className="full">
                  <label>{t.symptoms[lang]}</label>
                  <textarea value={editable.symptoms} onChange={(e) => update("symptoms", e.target.value)} />
                </div>
                <div className="full">
                  <label>{t.condition[lang]}</label>
                  <textarea value={editable.conditionDescription} onChange={(e) => update("conditionDescription", e.target.value)} />
                </div>
                <div className="full">
                  <label>{t.allergies[lang]}</label>
                  <textarea value={editable.allergies} onChange={(e) => update("allergies", e.target.value)} />
                </div>
                <div className="full">
                  <label>{t.medications[lang]}</label>
                  <textarea value={editable.medications} onChange={(e) => update("medications", e.target.value)} />
                </div>
                <div>
                  <label>{t.status[lang]}</label>
                  <select value={editable.status} onChange={(e) => update("status", e.target.value as FormStatus)}>
                    <option value="NEW">{t.newStatus[lang]}</option>
                    <option value="REVIEWING">{t.reviewingStatus[lang]}</option>
                    <option value="DONE">{t.doneStatus[lang]}</option>
                    <option value="REJECTED">{t.rejectedStatus[lang]}</option>
                  </select>
                </div>
                <div className="full">
                  <label>{t.diagnosis[lang]} *</label>
                  <textarea value={editable.diagnosis} onChange={(e) => update("diagnosis", e.target.value)} />
                </div>
                <div className="full">
                  <label>{t.requiredMedicine[lang]} *</label>
                  <textarea value={editable.requiredMedicine} onChange={(e) => update("requiredMedicine", e.target.value)} />
                </div>
                <div className="full">
                  <label>{t.notes[lang]}</label>
                  <textarea value={editable.adminNotes} onChange={(e) => update("adminNotes", e.target.value)} />
                </div>
                <button className="primary" onClick={save}>{t.save[lang]}</button>
                <button onClick={printPdf}><Download size={16} /> {t.pdf[lang]}</button>
              </div>
            </article>

            <article className="card archive-card">
              <h2>{t.history[lang]}</h2>
              {!history.length && <p>{t.historyEmpty[lang]}</p>}
              <div className="archive-list">
                {history.map((entry) => (
                  <article key={entry.id} className="archive-item">
                    <header>
                      <strong>{formatDateTime(entry.changedAt, lang)}</strong>
                      <span>{entry.changedBy || "-"}</span>
                    </header>
                    <ul>
                      {(() => {
                        const fields = parseChangedFields(entry.changeType);
                        if (fields.length > 0) {
                          return fields.map((field) => (
                            <li key={field}>
                              {field === "status" && entry.previousStatus && entry.newStatus
                                ? `${changedFieldLabel("status")}: ${statusLabel(entry.previousStatus as FormStatus)} -> ${statusLabel(entry.newStatus as FormStatus)}`
                                : changedFieldLabel(field)}
                            </li>
                          ));
                        }

                        return (
                          <>
                            {(entry.previousStatus || "") !== (entry.newStatus || "") && (
                              <li>{`${statusLabel((entry.previousStatus || "NEW") as FormStatus)} -> ${statusLabel((entry.newStatus || "NEW") as FormStatus)}`}</li>
                            )}
                            {(entry.previousDiagnosis || "") !== (entry.newDiagnosis || "") && <li>{t.diagnosis[lang]}</li>}
                            {(entry.previousRequiredMedicine || "") !== (entry.newRequiredMedicine || "") && <li>{t.requiredMedicine[lang]}</li>}
                            {(entry.previousAdminNotes || "") !== (entry.newAdminNotes || "") && <li>{t.notes[lang]}</li>}
                          </>
                        );
                      })()}
                    </ul>
                  </article>
                ))}
              </div>
            </article>
          </section>
        )}
      </section>
    </main>
  );
}
