import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  FileText,
  Info,
  Mail,
  MapPin,
  Paperclip,
  Phone,
  Pill,
  Plus,
  Sparkles,
  TestTube,
  Trash2,
  Upload,
  User,
  X
} from "lucide-react";
import { api } from "../services/api";
import { Language } from "../i18n";
import { PatientForm } from "../types/patientForm";

type Props = {
  lang: Language;
  open: boolean;
  onClose: () => void;
  onCreated: (createdId: number) => void;
};

type RequestType = "GENERAL_REPORT" | "PRESCRIPTION" | "LAB_RESULT" | "OTHER";
type Priority = "NORMAL" | "HIGH" | "URGENT";

type RequestFormState = {
  requestType: RequestType | "";
  priority: Priority;
  nationalId: string;
  patientName: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  email: string;
  requestNotes: string;
  symptoms: string[];
  conditionDescription: string;
  preExistingConditions: string;
  medications: string;
  allergies: string;
  attachments: File[];
};

type StepErrors = Partial<Record<"requestType" | "nationalId" | "patientName" | "phone" | "dateOfBirth" | "address" | "email" | "symptoms", string>>;

const today = new Date().toISOString().slice(0, 10);
const maxTextarea = 600;

const initialState: RequestFormState = {
  requestType: "GENERAL_REPORT",
  priority: "NORMAL",
  nationalId: "",
  patientName: "",
  phone: "",
  dateOfBirth: "",
  address: "",
  email: "",
  requestNotes: "",
  symptoms: [],
  conditionDescription: "",
  preExistingConditions: "",
  medications: "",
  allergies: "",
  attachments: []
};

const symptomsByLang = {
  ar: ["حمى", "سعال", "صداع", "ضيق تنفس", "دوار", "غثيان", "ألم صدر", "إرهاق"],
  en: ["Fever", "Cough", "Headache", "Shortness of breath", "Dizziness", "Nausea", "Chest pain", "Fatigue"],
  de: ["Fieber", "Husten", "Kopfschmerzen", "Kurzatmigkeit", "Schwindel", "Uebelkeit", "Brustschmerzen", "Erschoepfung"]
} as const;

const t = {
  title: { ar: "طلب جديد", en: "New Request", de: "Neue Anfrage" },
  subtitle: {
    ar: "أضف طلبًا جديدًا لإرسال نموذج أو مستند.",
    en: "Create a new request to submit a form or document.",
    de: "Neue Anfrage erstellen, um ein Formular oder Dokument zu senden."
  },
  step1: { ar: "معلومات الطلب", en: "Request Info", de: "Anfrageinformationen" },
  step2: { ar: "تفاصيل النموذج", en: "Form Details", de: "Formulardetails" },
  step3: { ar: "المرفقات", en: "Attachments", de: "Anhaenge" },
  step4: { ar: "مراجعة وإرسال", en: "Review & Submit", de: "Pruefen & Senden" },
  requestType: { ar: "نوع النموذج", en: "Form Type", de: "Formulartyp" },
  priority: { ar: "أولوية الطلب", en: "Priority", de: "Prioritaet" },
  patientName: { ar: "اسم المريض", en: "Patient Name", de: "Patientenname" },
  nationalId: { ar: "رقم الهوية / الإقامة", en: "National ID", de: "Ausweisnummer" },
  phone: { ar: "رقم الهاتف", en: "Phone Number", de: "Telefonnummer" },
  dateOfBirth: { ar: "تاريخ الميلاد", en: "Date of Birth", de: "Geburtsdatum" },
  address: { ar: "العنوان", en: "Address", de: "Adresse" },
  email: { ar: "البريد الإلكتروني", en: "Email", de: "E-Mail" },
  requestNotes: { ar: "ملاحظات إضافية", en: "Additional Notes", de: "Zusaetzliche Notizen" },
  symptoms: { ar: "الأعراض", en: "Symptoms", de: "Symptome" },
  conditionDescription: { ar: "وصف الحالة", en: "Condition Description", de: "Krankheitsbeschreibung" },
  preExisting: { ar: "الأمراض المزمنة", en: "Pre-existing Conditions", de: "Vorerkrankungen" },
  medications: { ar: "الأدوية الحالية", en: "Current Medications", de: "Aktuelle Medikamente" },
  allergies: { ar: "الحساسية", en: "Allergies", de: "Allergien" },
  uploadTitle: { ar: "ارفع الملفات", en: "Upload Files", de: "Dateien hochladen" },
  uploadHint: {
    ar: "يمكنك إضافة صور أو PDF أو مستندات داعمة للطلب.",
    en: "You can attach images, PDFs, or supporting documents.",
    de: "Sie koennen Bilder, PDFs oder Dokumente anhaengen."
  },
  availableForms: { ar: "أنواع النماذج المتاحة", en: "Available Form Types", de: "Verfuegbare Formulartypen" },
  tips: { ar: "تعليمات", en: "Instructions", de: "Hinweise" },
  tip1: {
    ar: "تأكد من إدخال جميع المعلومات بشكل صحيح.",
    en: "Ensure all required patient details are valid.",
    de: "Bitte alle Pflichtinformationen korrekt eingeben."
  },
  tip2: {
    ar: "سيتم حفظ الطلب كمسودة للمتابعة لاحقًا.",
    en: "The request will be stored and available for follow-up.",
    de: "Die Anfrage wird gespeichert und kann spaeter bearbeitet werden."
  },
  tip3: {
    ar: "ستصلك إشعارات بحالة الطلب.",
    en: "You will receive updates about request status.",
    de: "Sie erhalten Benachrichtigungen zum Anfragestatus."
  },
  cancel: { ar: "إلغاء", en: "Cancel", de: "Abbrechen" },
  previous: { ar: "السابق", en: "Previous", de: "Zurueck" },
  next: { ar: "التالي", en: "Next", de: "Weiter" },
  submit: { ar: "إرسال الطلب", en: "Submit Request", de: "Anfrage senden" },
  required: { ar: "هذا الحقل مطلوب.", en: "This field is required.", de: "Dieses Feld ist erforderlich." },
  invalidPhone: { ar: "رقم الهاتف غير صالح.", en: "Invalid phone number.", de: "Ungueltige Telefonnummer." },
  invalidEmail: { ar: "البريد الإلكتروني غير صالح.", en: "Invalid email address.", de: "Ungueltige E-Mail-Adresse." },
  chooseAtLeastOneSymptom: { ar: "اختر عرضًا واحدًا على الأقل.", en: "Select at least one symptom.", de: "Mindestens ein Symptom auswaehlen." },
  uploading: { ar: "جاري الإرسال...", en: "Submitting...", de: "Wird gesendet..." },
  submitFail: { ar: "تعذر إرسال الطلب إلى الخادم.", en: "Failed to submit request to server.", de: "Anfrage konnte nicht gesendet werden." },
  reviewTitle: { ar: "مراجعة بيانات الطلب", en: "Review Request Data", de: "Anfragedaten pruefen" },
  ready: { ar: "البيانات جاهزة للإرسال.", en: "Data is ready for submission.", de: "Daten sind bereit zum Senden." },
  success: { ar: "تم إنشاء الطلب بنجاح.", en: "Request created successfully.", de: "Anfrage erfolgreich erstellt." }
} as const;

function normalizeDigits(value: string) {
  return value
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)))
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
}

export default function NewRequestWizardModal({ lang, open, onClose, onCreated }: Props) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<RequestFormState>(initialState);
  const [errors, setErrors] = useState<StepErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const isRtl = lang === "ar";
  const symptoms = symptomsByLang[lang];

  useEffect(() => {
    if (!open) return;
    function onEsc(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setStep(1);
      setForm(initialState);
      setErrors({});
      setServerError("");
      setSubmitting(false);
    }
  }, [open]);

  const formTypeCards = useMemo(
    () => [
      {
        key: "GENERAL_REPORT" as const,
        title: { ar: "تقرير طبي", en: "General Report", de: "Allgemeiner Bericht" },
        subtitle: {
          ar: "إرسال تقرير طبي عام للمراجعة",
          en: "Submit a general clinical report for review",
          de: "Allgemeinen medizinischen Bericht senden"
        },
        icon: FileText
      },
      {
        key: "PRESCRIPTION" as const,
        title: { ar: "طلب وصفة طبية", en: "Prescription", de: "Rezeptanfrage" },
        subtitle: {
          ar: "طلب وصفة طبية جديدة",
          en: "Request a new medical prescription",
          de: "Neue Medikamentenverordnung anfragen"
        },
        icon: Pill
      },
      {
        key: "LAB_RESULT" as const,
        title: { ar: "نتيجة مختبر", en: "Lab Result", de: "Laborergebnis" },
        subtitle: {
          ar: "إرسال نتائج فحص المختبر",
          en: "Submit laboratory test results",
          de: "Laborergebnisse uebermitteln"
        },
        icon: TestTube
      },
      {
        key: "OTHER" as const,
        title: { ar: "أخرى", en: "Other", de: "Andere" },
        subtitle: {
          ar: "نماذج أو طلبات أخرى",
          en: "Other templates or requests",
          de: "Weitere Formulare oder Anfragen"
        },
        icon: Sparkles
      }
    ],
    []
  );

  function update<K extends keyof RequestFormState>(key: K, value: RequestFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key as keyof StepErrors]) return prev;
      const next = { ...prev };
      delete next[key as keyof StepErrors];
      return next;
    });
  }

  function validateStep(currentStep: number) {
    const nextErrors: StepErrors = {};
    if (currentStep === 1) {
      if (!form.requestType) nextErrors.requestType = t.required[lang];
      if (!form.nationalId.trim()) nextErrors.nationalId = t.required[lang];
      if (!form.patientName.trim() || form.patientName.trim().length < 2) nextErrors.patientName = t.required[lang];
      const phoneDigits = normalizeDigits(form.phone).replace(/\D/g, "");
      if (!phoneDigits || phoneDigits.length < 7 || phoneDigits.length > 15) nextErrors.phone = t.invalidPhone[lang];
      if (!form.dateOfBirth) nextErrors.dateOfBirth = t.required[lang];
      if (!form.address.trim() || form.address.trim().length < 2) nextErrors.address = t.required[lang];
      if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) nextErrors.email = t.invalidEmail[lang];
    }
    if (currentStep === 2) {
      if (!form.symptoms.length) nextErrors.symptoms = t.chooseAtLeastOneSymptom[lang];
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function nextStep() {
    if (!validateStep(step)) return;
    setStep((prev) => Math.min(4, prev + 1));
  }

  function previousStep() {
    setStep((prev) => Math.max(1, prev - 1));
  }

  function toggleSymptom(symptom: string) {
    update(
      "symptoms",
      form.symptoms.includes(symptom)
        ? form.symptoms.filter((item) => item !== symptom)
        : [...form.symptoms, symptom]
    );
  }

  function addFiles(fileList: FileList | null) {
    if (!fileList?.length) return;
    const files = [...fileList];
    setForm((prev) => {
      const merged = [...prev.attachments];
      files.forEach((file) => {
        const exists = merged.some(
          (current) =>
            current.name === file.name &&
            current.size === file.size &&
            current.lastModified === file.lastModified
        );
        if (!exists) merged.push(file);
      });
      return { ...prev, attachments: merged };
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeFile(index: number) {
    setForm((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, idx) => idx !== index)
    }));
  }

  function splitPatientName(value: string) {
    const clean = value.trim().replace(/\s+/g, " ");
    const parts = clean.split(" ");
    const firstName = parts[0] || "";
    const lastName = parts.slice(1).join(" ") || parts[0] || "";
    return { firstName, lastName };
  }

  async function submitRequest() {
    if (!validateStep(1) || !validateStep(2)) {
      setStep(1);
      return;
    }
    setSubmitting(true);
    setServerError("");

    const normalizedPhone = normalizeDigits(form.phone).trim();
    const { firstName, lastName } = splitPatientName(form.patientName);

    const attachmentSummary = form.attachments.length
      ? `Attachments: ${form.attachments.map((file) => file.name).join(", ")}`
      : "";

    const payload: PatientForm = {
      firstName,
      lastName,
      dateOfBirth: form.dateOfBirth,
      phone: normalizedPhone,
      email: form.email.trim(),
      address: form.address.trim(),
      street: form.address.trim(),
      city: "",
      insuranceProvider: "",
      insuranceNumber: "",
      requestType: form.requestType,
      priority: form.priority,
      nationalId: form.nationalId.trim(),
      requestNotes: form.requestNotes.trim(),
      symptoms: form.symptoms.join(", "),
      conditionDescription: [form.conditionDescription.trim(), attachmentSummary].filter(Boolean).join("\n\n"),
      allergies: [form.allergies.trim(), form.preExistingConditions.trim()].filter(Boolean).join(" | "),
      medications: form.medications.trim(),
      consentAccepted: true,
      preferredLanguage: lang
    };

    try {
      const response = await api.post("/forms", payload);
      const createdId = Number(response?.data?.id || 0);
      if (createdId) {
        onCreated(createdId);
      }
      onClose();
    } catch {
      setServerError(t.submitFail[lang]);
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div className="wizard-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <section className={`wizard-modal ${isRtl ? "rtl" : "ltr"}`}>
        <header className="wizard-header">
          <button className="icon-btn" onClick={onClose} title={t.cancel[lang]}>
            <X size={18} />
          </button>
          <div>
            <h2>{t.title[lang]} <span><Plus size={18} /></span></h2>
            <p>{t.subtitle[lang]}</p>
          </div>
        </header>

        <div className="wizard-steps">
          {[t.step1[lang], t.step2[lang], t.step3[lang], t.step4[lang]].map((label, idx) => (
            <div key={label} className={`wizard-step ${step >= idx + 1 ? "active" : ""}`}>
              <span>{idx + 1}</span>
              <small>{label}</small>
            </div>
          ))}
        </div>

        <div className="wizard-body">
          <main className="wizard-main">
            {step === 1 && (
              <>
                <h3>{t.step1[lang]}</h3>
                <div className="wizard-grid">
                  <div>
                    <label>{t.priority[lang]} *</label>
                    <select value={form.priority} onChange={(e) => update("priority", e.target.value as Priority)}>
                      <option value="NORMAL">Normal</option>
                      <option value="HIGH">High</option>
                      <option value="URGENT">Urgent</option>
                    </select>
                  </div>
                  <div>
                    <label>{t.requestType[lang]} *</label>
                    <select value={form.requestType} onChange={(e) => update("requestType", e.target.value as RequestType)}>
                      <option value="GENERAL_REPORT">GENERAL_REPORT</option>
                      <option value="PRESCRIPTION">PRESCRIPTION</option>
                      <option value="LAB_RESULT">LAB_RESULT</option>
                      <option value="OTHER">OTHER</option>
                    </select>
                    {errors.requestType && <small className="field-error">{errors.requestType}</small>}
                  </div>
                  <div>
                    <label>{t.nationalId[lang]} *</label>
                    <div className="input-icon"><User size={14} /><input value={form.nationalId} onChange={(e) => update("nationalId", normalizeDigits(e.target.value))} /></div>
                    {errors.nationalId && <small className="field-error">{errors.nationalId}</small>}
                  </div>
                  <div>
                    <label>{t.patientName[lang]} *</label>
                    <div className="input-icon"><User size={14} /><input value={form.patientName} onChange={(e) => update("patientName", e.target.value)} /></div>
                    {errors.patientName && <small className="field-error">{errors.patientName}</small>}
                  </div>
                  <div>
                    <label>{t.phone[lang]} *</label>
                    <div className="input-icon"><Phone size={14} /><input value={form.phone} onChange={(e) => update("phone", normalizeDigits(e.target.value))} /></div>
                    {errors.phone && <small className="field-error">{errors.phone}</small>}
                  </div>
                  <div>
                    <label>{t.dateOfBirth[lang]} *</label>
                    <div className="input-icon"><CalendarDays size={14} /><input type="date" max={today} value={form.dateOfBirth} onChange={(e) => update("dateOfBirth", e.target.value)} /></div>
                    {errors.dateOfBirth && <small className="field-error">{errors.dateOfBirth}</small>}
                  </div>
                  <div>
                    <label>{t.address[lang]} *</label>
                    <div className="input-icon"><MapPin size={14} /><input value={form.address} onChange={(e) => update("address", e.target.value)} /></div>
                    {errors.address && <small className="field-error">{errors.address}</small>}
                  </div>
                  <div>
                    <label>{t.email[lang]}</label>
                    <div className="input-icon"><Mail size={14} /><input value={form.email} onChange={(e) => update("email", e.target.value)} /></div>
                    {errors.email && <small className="field-error">{errors.email}</small>}
                  </div>
                </div>
                <div className="full">
                  <label>{t.requestNotes[lang]}</label>
                  <textarea maxLength={maxTextarea} value={form.requestNotes} onChange={(e) => update("requestNotes", e.target.value)} />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h3>{t.step2[lang]}</h3>
                <div className="wizard-chips">
                  {symptoms.map((symptom) => (
                    <button
                      type="button"
                      key={symptom}
                      className={`chip ${form.symptoms.includes(symptom) ? "selected" : ""}`}
                      onClick={() => toggleSymptom(symptom)}
                    >
                      {symptom}
                    </button>
                  ))}
                </div>
                {errors.symptoms && <small className="field-error">{errors.symptoms}</small>}

                <div className="full">
                  <label>{t.conditionDescription[lang]}</label>
                  <textarea maxLength={maxTextarea} value={form.conditionDescription} onChange={(e) => update("conditionDescription", e.target.value)} />
                </div>
                <div className="wizard-grid">
                  <div>
                    <label>{t.preExisting[lang]}</label>
                    <textarea maxLength={maxTextarea} value={form.preExistingConditions} onChange={(e) => update("preExistingConditions", e.target.value)} />
                  </div>
                  <div>
                    <label>{t.medications[lang]}</label>
                    <textarea maxLength={maxTextarea} value={form.medications} onChange={(e) => update("medications", e.target.value)} />
                  </div>
                </div>
                <div className="full">
                  <label>{t.allergies[lang]}</label>
                  <textarea maxLength={maxTextarea} value={form.allergies} onChange={(e) => update("allergies", e.target.value)} />
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h3>{t.uploadTitle[lang]}</h3>
                <p>{t.uploadHint[lang]}</p>
                <div className="upload-box">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={(e) => addFiles(e.target.files)}
                    aria-label={t.uploadTitle[lang]}
                  />
                  <button type="button" onClick={() => fileInputRef.current?.click()}>
                    <Upload size={16} /> {t.uploadTitle[lang]}
                  </button>
                </div>
                <div className="attach-list">
                  {form.attachments.map((file, index) => (
                    <div key={`${file.name}-${file.lastModified}`} className="attach-row">
                      <span><Paperclip size={14} /> {file.name}</span>
                      <button type="button" className="icon-btn" onClick={() => removeFile(index)} title="Remove">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <h3>{t.reviewTitle[lang]}</h3>
                <div className="review-grid">
                  <p><b>{t.requestType[lang]}:</b> {form.requestType || "-"}</p>
                  <p><b>{t.priority[lang]}:</b> {form.priority}</p>
                  <p><b>{t.patientName[lang]}:</b> {form.patientName || "-"}</p>
                  <p><b>{t.nationalId[lang]}:</b> {form.nationalId || "-"}</p>
                  <p><b>{t.phone[lang]}:</b> {form.phone || "-"}</p>
                  <p><b>{t.dateOfBirth[lang]}:</b> {form.dateOfBirth || "-"}</p>
                  <p><b>{t.address[lang]}:</b> {form.address || "-"}</p>
                  <p><b>{t.email[lang]}:</b> {form.email || "-"}</p>
                  <p><b>{t.symptoms[lang]}:</b> {form.symptoms.join(", ") || "-"}</p>
                  <p><b>{t.uploadTitle[lang]}:</b> {form.attachments.length}</p>
                </div>
                <div className="review-ok"><CheckCircle2 size={18} /> {t.ready[lang]}</div>
                {serverError && <div className="error">{serverError}</div>}
              </>
            )}
          </main>

          <aside className="wizard-side">
            <h4>{t.availableForms[lang]}</h4>
            <div className="form-type-list">
              {formTypeCards.map((card) => {
                const Icon = card.icon;
                const active = form.requestType === card.key;
                return (
                  <button
                    type="button"
                    key={card.key}
                    className={`form-type-card ${active ? "active" : ""}`}
                    onClick={() => update("requestType", card.key)}
                  >
                    <div>
                      <strong>{card.title[lang]}</strong>
                      <small>{card.subtitle[lang]}</small>
                    </div>
                    <Icon size={18} />
                  </button>
                );
              })}
            </div>
            <div className="tips-box">
              <h5><Info size={15} /> {t.tips[lang]}</h5>
              <ul>
                <li>{t.tip1[lang]}</li>
                <li>{t.tip2[lang]}</li>
                <li>{t.tip3[lang]}</li>
              </ul>
            </div>
          </aside>
        </div>

        <footer className="wizard-footer">
          <button type="button" onClick={onClose}>{t.cancel[lang]}</button>
          <div>
            {step > 1 && (
              <button type="button" onClick={previousStep}>
                {isRtl ? <ArrowRight size={16} /> : <ArrowLeft size={16} />} {t.previous[lang]}
              </button>
            )}
            {step < 4 ? (
              <button type="button" className="primary" onClick={nextStep}>
                {t.next[lang]} {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
              </button>
            ) : (
              <button type="button" className="primary" disabled={submitting} onClick={submitRequest}>
                {submitting ? t.uploading[lang] : t.submit[lang]}
              </button>
            )}
          </div>
        </footer>
      </section>
    </div>
  );
}
