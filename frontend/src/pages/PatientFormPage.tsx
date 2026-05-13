import { useEffect, useMemo, useRef, useState } from "react";
import { api } from "../services/api";
import { PatientForm } from "../types/patientForm";
import { Language } from "../i18n";

type Props = { lang: Language };

type UiForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  insuranceProvider: string;
  insuranceNumber: string;
  symptoms: string[];
  conditionDescription: string;
  preExistingConditions: string;
  medications: string;
  allergies: string;
  consent: boolean;
};

type FieldKey =
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "dateOfBirth"
  | "street"
  | "houseNumber"
  | "postalCode"
  | "city"
  | "insuranceProvider"
  | "insuranceNumber"
  | "symptoms"
  | "conditionDescription"
  | "preExistingConditions"
  | "medications"
  | "allergies"
  | "signature"
  | "consent";

const initialForm: UiForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  street: "",
  houseNumber: "",
  postalCode: "",
  city: "",
  insuranceProvider: "",
  insuranceNumber: "",
  symptoms: [],
  conditionDescription: "",
  preExistingConditions: "",
  medications: "",
  allergies: "",
  consent: false
};

const maxText = 500;

const symptomOptions = {
  ar: ["حمى", "سعال", "صداع", "غثيان", "إرهاق", "ضيق نفس", "ألم صدر", "دوار", "طفح جلدي", "أخرى"],
  en: ["Fever", "Cough", "Headache", "Nausea", "Fatigue", "Shortness of breath", "Chest pain", "Dizziness", "Skin rash", "Other"],
  de: ["Fieber", "Husten", "Kopfschmerzen", "Uebelkeit", "Erschoepfung", "Kurzatmigkeit", "Brustschmerzen", "Schwindel", "Hautausschlag", "Sonstiges"]
} as const;

const t = {
  title: { ar: "نموذج صحة المريض", en: "Patient Health Form", de: "Patientenformular" },
  subtitle: {
    ar: "يرجى تعبئة جميع الحقول المطلوبة.",
    en: "Please fill in all required fields.",
    de: "Bitte fuellen Sie alle Pflichtfelder aus."
  },
  personal: { ar: "المعلومات الشخصية", en: "Personal Information", de: "Persoenliche Daten" },
  firstName: { ar: "الاسم الأول", en: "First Name", de: "Vorname" },
  firstNamePlaceholder: { ar: "مثال: محمد", en: "e.g. Max", de: "Max" },
  firstNameHint: { ar: "على الأقل حرفان", en: "At least 2 characters", de: "Mindestens 2 Zeichen, z. B. Max" },
  lastName: { ar: "اسم العائلة", en: "Last Name", de: "Nachname" },
  lastNamePlaceholder: { ar: "مثال: الأحمد", en: "e.g. Mustermann", de: "Mustermann" },
  lastNameHint: { ar: "على الأقل حرفان", en: "At least 2 characters", de: "Mindestens 2 Zeichen, z. B. Mustermann" },
  email: { ar: "البريد الإلكتروني", en: "Email", de: "E-Mail" },
  emailPlaceholder: { ar: "name@example.com", en: "max@example.com", de: "max@beispiel.de" },
  emailHint: { ar: "صيغة بريد صحيحة", en: "Valid email format", de: "Gueltige E-Mail-Adresse, z. B. max@gmail.com" },
  phone: { ar: "رقم الهاتف", en: "Phone Number", de: "Telefonnummer" },
  phonePlaceholder: { ar: "+966 5xxxxxxx", en: "+1 613 555 4321", de: "+49 151 12345678" },
  phoneHint: { ar: "رقم محلي أو دولي", en: "Local or international format", de: "z. B. +49 151 12345678 oder 0151 12345678" },
  birth: { ar: "تاريخ الميلاد", en: "Date of Birth", de: "Geburtsdatum" },
  address: { ar: "العنوان", en: "Address", de: "Adresse" },
  street: { ar: "الشارع", en: "Street", de: "Strasse" },
  streetPlaceholder: { ar: "مثال: شارع الملك", en: "e.g. Main Street", de: "Musterstrasse" },
  streetHint: { ar: "على الأقل حرفان", en: "At least 2 characters", de: "Mindestens 2 Zeichen, z. B. Musterstrasse" },
  house: { ar: "رقم المنزل", en: "House Number", de: "Hausnummer" },
  housePlaceholder: { ar: "12A", en: "12A", de: "12a" },
  houseHint: { ar: "رقم + حرف (اختياري)", en: "Number + letter (optional)", de: "Zahl + Buchstabe, z. B. 12a (optional)" },
  postal: { ar: "الرمز البريدي", en: "Postal Code", de: "Postleitzahl" },
  postalPlaceholder: { ar: "12345", en: "10115", de: "10115" },
  postalHint: { ar: "5 أرقام", en: "Exactly 5 digits", de: "Genau 5 Ziffern, z. B. 10115" },
  city: { ar: "المدينة", en: "City", de: "Stadt" },
  cityPlaceholder: { ar: "مثال: الرياض", en: "e.g. Berlin", de: "z. B. Berlin" },
  cityHint: { ar: "على الأقل حرفان", en: "At least 2 characters", de: "Mindestens 2 Zeichen, z. B. Berlin" },
  insuranceProvider: { ar: "شركة التأمين", en: "Insurance Provider", de: "Krankenkasse" },
  insuranceProviderPlaceholder: { ar: "مثال: Bupa", en: "e.g. AOK Bayern", de: "z. B. AOK Bayern" },
  insuranceNumber: { ar: "رقم التأمين", en: "Insurance Number", de: "Versicherungsnummer" },
  insuranceNumberPlaceholder: { ar: "A123456789", en: "A123456789", de: "A123456789" },
  symptoms: { ar: "الأعراض", en: "Symptoms", de: "Symptome" },
  symptomHint: { ar: "يمكن اختيار أكثر من عرض", en: "Multiple selection possible", de: "Mehrfachauswahl moeglich, z. B. Fieber, Husten" },
  condition: { ar: "وصف الحالة", en: "Condition Description", de: "Krankheitsbeschreibung" },
  conditionPlaceholder: { ar: "صف الأعراض الحالية...", en: "Describe your symptoms...", de: "Beschreiben Sie Ihre Symptome..." },
  conditionHint: { ar: "اختياري", en: "Optional", de: "Optional, z. B. Seit 3 Tagen Fieber und Husten." },
  preExisting: { ar: "الأمراض المزمنة", en: "Pre-existing Conditions", de: "Vorerkrankungen" },
  preExistingPlaceholder: { ar: "مثال: السكري", en: "Relevant pre-existing conditions...", de: "Relevante Vorerkrankungen..." },
  preExistingHint: { ar: "اختياري", en: "Optional", de: "Optional, z. B. Diabetes, Bluthochdruck" },
  medications: { ar: "الأدوية الحالية", en: "Current Medications", de: "Aktuelle Medikamente" },
  medicationsPlaceholder: { ar: "مثال: Ibuprofen 400mg", en: "Current medications...", de: "Aktuelle Medikamente..." },
  medicationsHint: { ar: "اختياري", en: "Optional", de: "Optional, z. B. Ibuprofen 400 mg" },
  allergies: { ar: "الحساسية", en: "Allergies", de: "Allergien" },
  allergiesPlaceholder: { ar: "اذكر أي حساسية معروفة...", en: "Known allergies...", de: "Bekannte Allergien..." },
  signature: { ar: "التوقيع الرقمي", en: "Digital Signature", de: "Digitale Unterschrift" },
  clearSig: { ar: "مسح التوقيع", en: "Clear Signature", de: "Signatur loeschen" },
  consent: {
    ar: "أوافق على معالجة البيانات الطبية بشكل آمن.",
    en: "I agree to secure processing of medical data.",
    de: "Ich stimme der sicheren Verarbeitung medizinischer Daten zu."
  },
  submit: { ar: "إرسال النموذج", en: "Submit Form", de: "Formular absenden" },
  success: { ar: "تم الإرسال بنجاح. رقم المرجع:", en: "Submitted successfully. Reference ID:", de: "Erfolgreich gesendet. Referenznummer:" },
  fail: { ar: "فشل الاتصال بالخادم.", en: "Server connection failed.", de: "Serververbindung fehlgeschlagen." },
  requiredSummary: { ar: "يوجد أخطاء في بعض الحقول. راجع الرسائل أسفل الحقول.", en: "Some fields are invalid. Please review field errors.", de: "Einige Felder sind ungueltig. Bitte Feldfehler pruefen." },
  invalidEmail: { ar: "بريد إلكتروني غير صالح.", en: "Invalid email address.", de: "Ungueltige E-Mail-Adresse." },
  invalidPhone: { ar: "رقم الهاتف يجب أن يكون 7 إلى 15 رقمًا.", en: "Phone must contain 7 to 15 digits.", de: "Telefonnummer muss 7 bis 15 Ziffern enthalten." },
  invalidPostal: { ar: "الرمز البريدي يجب أن يكون 5 أرقام.", en: "Postal code must be exactly 5 digits.", de: "Postleitzahl muss genau 5 Ziffern haben." },
  invalidName: { ar: "يجب إدخال حرفين على الأقل.", en: "At least 2 characters required.", de: "Mindestens 2 Zeichen erforderlich." },
  invalidHouse: { ar: "صيغة رقم المنزل غير صحيحة.", en: "Invalid house number format.", de: "Ungueltiges Hausnummer-Format." },
  invalidInsuranceNumber: { ar: "رقم التأمين غير صالح.", en: "Invalid insurance number.", de: "Ungueltige Versicherungsnummer." },
  dateRequired: { ar: "تاريخ الميلاد مطلوب.", en: "Date of birth is required.", de: "Geburtsdatum ist erforderlich." },
  symptomRequired: { ar: "اختر عرضًا واحدًا على الأقل.", en: "Select at least one symptom.", de: "Mindestens ein Symptom auswaehlen." },
  signatureRequired: { ar: "التوقيع مطلوب.", en: "Signature is required.", de: "Unterschrift ist erforderlich." },
  consentRequired: { ar: "يجب الموافقة على الإقرار.", en: "Consent is required.", de: "Einwilligung ist erforderlich." },
  requiredField: { ar: "هذا الحقل مطلوب.", en: "This field is required.", de: "Dieses Feld ist erforderlich." }
} as const;

const today = new Date().toISOString().slice(0, 10);

export default function PatientFormPage({ lang }: Props) {
  const [form, setForm] = useState<UiForm>(initialForm);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);
  const signatureTouched = useRef(false);
  const isRtl = lang === "ar";
  const hasSignature = useMemo(() => signatureTouched.current, [message, error]);
  const debounceRef = useRef<Partial<Record<FieldKey, ReturnType<typeof setTimeout>>>>({});

  function setFieldError(key: FieldKey, value: string) {
    setFieldErrors((prev) => ({ ...prev, [key]: value }));
  }

  function clearFieldError(key: FieldKey) {
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function touchField(key: FieldKey) {
    setTouched((prev) => ({ ...prev, [key]: true }));
  }

  function shouldShowError(key: FieldKey) {
    return Boolean(touched[key] && fieldErrors[key]);
  }

  function setFieldDebounced(key: FieldKey, nextForm: UiForm, delay = 300) {
    const prevTimer = debounceRef.current[key];
    if (prevTimer) clearTimeout(prevTimer);
    debounceRef.current[key] = setTimeout(() => {
      const fieldErr = validateField(key, nextForm);
      if (fieldErr) setFieldError(key, fieldErr);
      else clearFieldError(key);
    }, delay);
  }

  function validateField(key: FieldKey, nextForm: UiForm): string {
    switch (key) {
      case "firstName":
        if (!nextForm.firstName.trim()) return t.requiredField[lang];
        if (nextForm.firstName.trim().length < 2) return t.invalidName[lang];
        return "";
      case "lastName":
        if (!nextForm.lastName.trim()) return t.requiredField[lang];
        if (nextForm.lastName.trim().length < 2) return t.invalidName[lang];
        return "";
      case "email":
        if (!nextForm.email.trim()) return t.requiredField[lang];
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextForm.email)) return t.invalidEmail[lang];
        return "";
      case "phone":
        if (!nextForm.phone.trim()) return t.requiredField[lang];
        {
          const phoneDigits = nextForm.phone.replace(/\D/g, "");
          if (phoneDigits.length < 7 || phoneDigits.length > 15) return t.invalidPhone[lang];
        }
        return "";
      case "dateOfBirth":
        if (!nextForm.dateOfBirth) return t.dateRequired[lang];
        return "";
      case "street":
        if (!nextForm.street.trim()) return t.requiredField[lang];
        if (nextForm.street.trim().length < 2) return t.invalidName[lang];
        return "";
      case "houseNumber":
        if (nextForm.houseNumber.trim() && !/^[0-9]{1,5}[a-zA-Z]?$/.test(nextForm.houseNumber.trim())) return t.invalidHouse[lang];
        return "";
      case "postalCode":
        if (!nextForm.postalCode.trim()) return t.requiredField[lang];
        if (!/^\d{5}$/.test(nextForm.postalCode.trim())) return t.invalidPostal[lang];
        return "";
      case "city":
        if (!nextForm.city.trim()) return t.requiredField[lang];
        if (nextForm.city.trim().length < 2) return t.invalidName[lang];
        return "";
      case "insuranceProvider":
        if (!nextForm.insuranceProvider.trim()) return t.requiredField[lang];
        return "";
      case "insuranceNumber":
        if (!nextForm.insuranceNumber.trim()) return t.requiredField[lang];
        if (!/^[A-Za-z0-9\-]{6,20}$/.test(nextForm.insuranceNumber.trim())) return t.invalidInsuranceNumber[lang];
        return "";
      case "symptoms":
        if (!nextForm.symptoms.length) return t.symptomRequired[lang];
        return "";
      case "signature":
        if (!signatureTouched.current) return t.signatureRequired[lang];
        return "";
      case "consent":
        if (!nextForm.consent) return t.consentRequired[lang];
        return "";
      default:
        return "";
    }
  }

  function update<K extends keyof UiForm>(key: K, value: UiForm[K]) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      const fieldKey = key as FieldKey;
      if (!touched[fieldKey]) return next;
      const debouncedFields: FieldKey[] = ["email", "phone", "postalCode", "insuranceNumber"];
      if (debouncedFields.includes(fieldKey)) {
        setFieldDebounced(fieldKey, next, 300);
      } else {
        const fieldErr = validateField(fieldKey, next);
        if (fieldErr) setFieldError(fieldKey, fieldErr);
        else clearFieldError(fieldKey);
      }
      return next;
    });
  }

  function blurValidate(key: FieldKey) {
    touchField(key);
    const fieldErr = validateField(key, form);
    if (fieldErr) setFieldError(key, fieldErr);
    else clearFieldError(key);
  }

  function toggleSymptom(symptom: string) {
    setForm((prev) => {
      const exists = prev.symptoms.includes(symptom);
      const next = { ...prev, symptoms: exists ? prev.symptoms.filter((s) => s !== symptom) : [...prev.symptoms, symptom] };
      if (touched.symptoms) {
        const fieldErr = validateField("symptoms", next);
        if (fieldErr) setFieldError("symptoms", fieldErr);
        else clearFieldError("symptoms");
      }
      return next;
    });
  }

  function getPos(e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      const touch = e.touches[0] || e.changedTouches[0];
      return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function startDraw(e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawingRef.current = true;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const p = getPos(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  }

  function draw(e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) {
    if (!drawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const p = getPos(e);
    ctx.lineWidth = 2.2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#13386b";
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    signatureTouched.current = true;
    if (touched.signature) {
      const fieldErr = validateField("signature", form);
      if (fieldErr) setFieldError("signature", fieldErr);
      else clearFieldError("signature");
    }
  }

  function endDraw() {
    drawingRef.current = false;
  }

  function clearSignature() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    signatureTouched.current = false;
    setFieldError("signature", t.signatureRequired[lang]);
  }

  useEffect(() => {
    return () => {
      const timers = debounceRef.current;
      (Object.keys(timers) as FieldKey[]).forEach((k) => {
        if (timers[k]) clearTimeout(timers[k]);
      });
    };
  }, []);

  function validateAll() {
    const errors: Partial<Record<FieldKey, string>> = {};

    if (!form.firstName.trim()) errors.firstName = t.requiredField[lang];
    else if (form.firstName.trim().length < 2) errors.firstName = t.invalidName[lang];

    if (!form.lastName.trim()) errors.lastName = t.requiredField[lang];
    else if (form.lastName.trim().length < 2) errors.lastName = t.invalidName[lang];

    if (!form.email.trim()) errors.email = t.requiredField[lang];
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = t.invalidEmail[lang];

    if (!form.phone.trim()) errors.phone = t.requiredField[lang];
    else {
      const phoneDigits = form.phone.replace(/\D/g, "");
      if (phoneDigits.length < 7 || phoneDigits.length > 15) errors.phone = t.invalidPhone[lang];
    }

    if (!form.dateOfBirth) errors.dateOfBirth = t.dateRequired[lang];

    if (!form.street.trim()) errors.street = t.requiredField[lang];
    else if (form.street.trim().length < 2) errors.street = t.invalidName[lang];

    if (form.houseNumber.trim() && !/^[0-9]{1,5}[a-zA-Z]?$/.test(form.houseNumber.trim())) errors.houseNumber = t.invalidHouse[lang];

    if (!form.postalCode.trim()) errors.postalCode = t.requiredField[lang];
    else if (!/^\d{5}$/.test(form.postalCode.trim())) errors.postalCode = t.invalidPostal[lang];

    if (!form.city.trim()) errors.city = t.requiredField[lang];
    else if (form.city.trim().length < 2) errors.city = t.invalidName[lang];

    if (!form.insuranceProvider.trim()) errors.insuranceProvider = t.requiredField[lang];

    if (!form.insuranceNumber.trim()) errors.insuranceNumber = t.requiredField[lang];
    else if (!/^[A-Za-z0-9\-]{6,20}$/.test(form.insuranceNumber.trim())) errors.insuranceNumber = t.invalidInsuranceNumber[lang];

    if (!form.symptoms.length) errors.symptoms = t.symptomRequired[lang];
    if (!signatureTouched.current) errors.signature = t.signatureRequired[lang];
    if (!form.consent) errors.consent = t.consentRequired[lang];

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!validateAll()) {
      setTouched({
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        dateOfBirth: true,
        street: true,
        houseNumber: true,
        postalCode: true,
        city: true,
        insuranceProvider: true,
        insuranceNumber: true,
        symptoms: true,
        signature: true,
        consent: true
      });
      setError(t.requiredSummary[lang]);
      return;
    }

    const payload: PatientForm = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      dateOfBirth: form.dateOfBirth,
      phone: form.phone.trim(),
      email: form.email.trim(),
      city: form.city.trim(),
      address: `${form.street} ${form.houseNumber}`.trim(),
      street: form.street.trim(),
      houseNumber: form.houseNumber.trim(),
      postalCode: form.postalCode.trim(),
      insuranceProvider: form.insuranceProvider.trim(),
      insuranceNumber: form.insuranceNumber.trim(),
      symptoms: form.symptoms.join(", "),
      conditionDescription: form.conditionDescription,
      allergies: [form.allergies, form.preExistingConditions].filter(Boolean).join(" | "),
      medications: form.medications,
      signature: canvasRef.current?.toDataURL("image/png") || "",
      consentAccepted: form.consent,
      preferredLanguage: lang
    };

    try {
      const res = await api.post("/forms", payload);
      setMessage(`${t.success[lang]} ${res.data.id}`);
      setForm(initialForm);
      setFieldErrors({});
      setTouched({});
      clearSignature();
    } catch {
      setError(t.fail[lang]);
    }
  }

  return (
    <main className="page">
      <section className={`card patient-card ${isRtl ? "rtl" : "ltr"}`}>
        <h1>{t.title[lang]}</h1>
        <p>{t.subtitle[lang]}</p>
        {message && <div className="notice">{message}</div>}
        {error && <div className="error">{error}</div>}

        <form className="patient-form-layout" onSubmit={submit} noValidate>
          <div className="patient-section-title">{t.personal[lang]}</div>

          <div className="field">
            <label>{t.firstName[lang]} *</label>
            <input className={shouldShowError("firstName") ? "input-error" : ""} value={form.firstName} minLength={2} placeholder={t.firstNamePlaceholder[lang]} onChange={(e) => update("firstName", e.target.value)} onBlur={() => blurValidate("firstName")} />
            <small className="field-hint">{t.firstNameHint[lang]}</small>
            {shouldShowError("firstName") && <small className="field-error">{fieldErrors.firstName}</small>}
          </div>

          <div className="field">
            <label>{t.lastName[lang]} *</label>
            <input className={shouldShowError("lastName") ? "input-error" : ""} value={form.lastName} minLength={2} placeholder={t.lastNamePlaceholder[lang]} onChange={(e) => update("lastName", e.target.value)} onBlur={() => blurValidate("lastName")} />
            <small className="field-hint">{t.lastNameHint[lang]}</small>
            {shouldShowError("lastName") && <small className="field-error">{fieldErrors.lastName}</small>}
          </div>

          <div className="field full">
            <label>{t.email[lang]} *</label>
            <input className={shouldShowError("email") ? "input-error" : ""} type="email" value={form.email} placeholder={t.emailPlaceholder[lang]} onChange={(e) => update("email", e.target.value)} onBlur={() => blurValidate("email")} />
            <small className="field-hint">{t.emailHint[lang]}</small>
            {shouldShowError("email") && <small className="field-error">{fieldErrors.email}</small>}
          </div>

          <div className="field full">
            <label>{t.phone[lang]} *</label>
            <input className={shouldShowError("phone") ? "input-error" : ""} inputMode="tel" value={form.phone} placeholder={t.phonePlaceholder[lang]} onChange={(e) => update("phone", e.target.value)} onBlur={() => blurValidate("phone")} />
            <small className="field-hint">{t.phoneHint[lang]}</small>
            {shouldShowError("phone") && <small className="field-error">{fieldErrors.phone}</small>}
          </div>

          <div className="field full">
            <label>{t.birth[lang]} *</label>
            <input className={shouldShowError("dateOfBirth") ? "input-error" : ""} type="date" max={today} value={form.dateOfBirth} onChange={(e) => update("dateOfBirth", e.target.value)} onBlur={() => blurValidate("dateOfBirth")} />
            {shouldShowError("dateOfBirth") && <small className="field-error">{fieldErrors.dateOfBirth}</small>}
          </div>

          <div className="patient-section-title full">{t.address[lang]} *</div>

          <div className="field">
            <label>{t.street[lang]} *</label>
            <input className={shouldShowError("street") ? "input-error" : ""} value={form.street} minLength={2} placeholder={t.streetPlaceholder[lang]} onChange={(e) => update("street", e.target.value)} onBlur={() => blurValidate("street")} />
            <small className="field-hint">{t.streetHint[lang]}</small>
            {shouldShowError("street") && <small className="field-error">{fieldErrors.street}</small>}
          </div>

          <div className="field">
            <label>{t.house[lang]}</label>
            <input className={shouldShowError("houseNumber") ? "input-error" : ""} value={form.houseNumber} placeholder={t.housePlaceholder[lang]} onChange={(e) => update("houseNumber", e.target.value)} onBlur={() => blurValidate("houseNumber")} />
            <small className="field-hint">{t.houseHint[lang]}</small>
            {shouldShowError("houseNumber") && <small className="field-error">{fieldErrors.houseNumber}</small>}
          </div>

          <div className="field">
            <label>{t.postal[lang]} *</label>
            <input className={shouldShowError("postalCode") ? "input-error" : ""} value={form.postalCode} inputMode="numeric" placeholder={t.postalPlaceholder[lang]} onChange={(e) => update("postalCode", e.target.value)} onBlur={() => blurValidate("postalCode")} />
            <small className="field-hint">{t.postalHint[lang]}</small>
            {shouldShowError("postalCode") && <small className="field-error">{fieldErrors.postalCode}</small>}
          </div>

          <div className="field">
            <label>{t.city[lang]} *</label>
            <input className={shouldShowError("city") ? "input-error" : ""} value={form.city} minLength={2} placeholder={t.cityPlaceholder[lang]} onChange={(e) => update("city", e.target.value)} onBlur={() => blurValidate("city")} />
            <small className="field-hint">{t.cityHint[lang]}</small>
            {shouldShowError("city") && <small className="field-error">{fieldErrors.city}</small>}
          </div>

          <div className="field">
            <label>{t.insuranceProvider[lang]} *</label>
            <input className={shouldShowError("insuranceProvider") ? "input-error" : ""} value={form.insuranceProvider} placeholder={t.insuranceProviderPlaceholder[lang]} onChange={(e) => update("insuranceProvider", e.target.value)} onBlur={() => blurValidate("insuranceProvider")} />
            {shouldShowError("insuranceProvider") && <small className="field-error">{fieldErrors.insuranceProvider}</small>}
          </div>

          <div className="field">
            <label>{t.insuranceNumber[lang]} *</label>
            <input className={shouldShowError("insuranceNumber") ? "input-error" : ""} value={form.insuranceNumber} placeholder={t.insuranceNumberPlaceholder[lang]} onChange={(e) => update("insuranceNumber", e.target.value)} onBlur={() => blurValidate("insuranceNumber")} />
            {shouldShowError("insuranceNumber") && <small className="field-error">{fieldErrors.insuranceNumber}</small>}
          </div>

          <div className="field full symptom-wrap">
            <label>{t.symptoms[lang]} *</label>
            <div className="symptom-grid">
              {symptomOptions[lang].map((symptom) => (
                <label key={symptom} className="symptom-item">
                  <input type="checkbox" checked={form.symptoms.includes(symptom)} onChange={() => toggleSymptom(symptom)} />
                  <span>{symptom}</span>
                </label>
              ))}
            </div>
            <small className="field-hint">{t.symptomHint[lang]}</small>
            {shouldShowError("symptoms") && <small className="field-error">{fieldErrors.symptoms}</small>}
          </div>

          <div className="field full">
            <label>{t.condition[lang]}</label>
            <textarea maxLength={maxText} placeholder={t.conditionPlaceholder[lang]} value={form.conditionDescription} onChange={(e) => update("conditionDescription", e.target.value)} />
            <small className="field-hint">{t.conditionHint[lang]}</small>
          </div>

          <div className="field full">
            <label>{t.preExisting[lang]}</label>
            <textarea maxLength={maxText} placeholder={t.preExistingPlaceholder[lang]} value={form.preExistingConditions} onChange={(e) => update("preExistingConditions", e.target.value)} />
            <small className="field-hint">{t.preExistingHint[lang]}</small>
          </div>

          <div className="field full">
            <label>{t.medications[lang]}</label>
            <textarea maxLength={maxText} placeholder={t.medicationsPlaceholder[lang]} value={form.medications} onChange={(e) => update("medications", e.target.value)} />
            <small className="field-hint">{t.medicationsHint[lang]}</small>
          </div>

          <div className="field full">
            <label>{t.allergies[lang]}</label>
            <textarea maxLength={maxText} placeholder={t.allergiesPlaceholder[lang]} value={form.allergies} onChange={(e) => update("allergies", e.target.value)} />
          </div>

          <div className="field full signature-box">
            <label>{t.signature[lang]} *</label>
            <canvas
              ref={canvasRef}
              width={900}
              height={180}
              className={`signature-canvas ${hasSignature ? "valid" : ""} ${shouldShowError("signature") ? "input-error" : ""}`}
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={endDraw}
              onMouseLeave={endDraw}
              onTouchStart={startDraw}
              onTouchMove={draw}
              onTouchEnd={endDraw}
              onBlur={() => blurValidate("signature")}
            />
            <button type="button" onClick={() => { touchField("signature"); clearSignature(); }}>{t.clearSig[lang]}</button>
            {shouldShowError("signature") && <small className="field-error">{fieldErrors.signature}</small>}
          </div>

          <label className={`consent full ${shouldShowError("consent") ? "input-error" : ""}`}>
            <input type="checkbox" checked={form.consent} onChange={(e) => { update("consent", e.target.checked); clearFieldError("consent"); }} onBlur={() => blurValidate("consent")} />
            <span>{t.consent[lang]}</span>
          </label>
          {shouldShowError("consent") && <small className="field-error full">{fieldErrors.consent}</small>}

          <button className="primary full patient-submit" type="submit">{t.submit[lang]}</button>
        </form>
      </section>
    </main>
  );
}
