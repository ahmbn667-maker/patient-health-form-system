import { Language } from "../i18n";
import { FormChangeArchive, FormStatus, PatientForm } from "../types/patientForm";

export type ReportData = PatientForm & {
  changeHistory?: FormChangeArchive[];
};

const reportText = {
  ar: {
    title: "التقرير السريري",
    product: "FormSystem - Digital Health Solutions",
    date: "التاريخ",
    refId: "رقم المرجع",
    generatedAt: "وقت الإصدار",
    patientInfo: "معلومات المريض",
    requestInfo: "معلومات الطلب",
    medicalInfo: "المعلومات الطبية",
    clinical: "تقييم الدكتور",
    changeHistory: "سجل التحديثات",
    name: "الاسم",
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    dob: "تاريخ الميلاد",
    phone: "الهاتف",
    email: "البريد الإلكتروني",
    address: "العنوان",
    street: "الشارع",
    houseNumber: "رقم المنزل",
    postalCode: "الرمز البريدي",
    city: "المدينة",
    insuranceProvider: "شركة التأمين",
    insuranceNumber: "رقم التأمين",
    requestType: "نوع النموذج",
    priority: "الأولوية",
    nationalId: "رقم الهوية / الإقامة",
    requestNotes: "ملاحظات الطلب",
    symptoms: "الأعراض",
    conditionDescription: "وصف الحالة",
    allergies: "الحساسية / الأمراض المزمنة",
    medications: "الأدوية الحالية",
    status: "الحالة",
    newStatus: "جديدة",
    reviewingStatus: "قيد العمل",
    doneStatus: "تم الإنجاز",
    rejectedStatus: "مرفوضة",
    diagnosis: "التشخيص",
    medication: "الأدوية المطلوبة",
    notes: "ملاحظات الدكتور",
    changedAt: "تاريخ التحديث",
    changedBy: "تم التحديث بواسطة",
    changedFields: "الحقول المحدثة",
    previousValue: "قبل",
    newValue: "بعد",
    noHistory: "لا يوجد سجل تحديثات حتى الآن",
    noDiagnosis: "لا يوجد تشخيص مسجل",
    noMedication: "لا توجد أدوية موصى بها",
    doctorSig: "توقيع الطبيب",
    patientSig: "توقيع المريض"
  },
  en: {
    title: "CLINICAL REPORT",
    product: "FormSystem - Digital Health Solutions",
    date: "Date",
    refId: "Reference ID",
    generatedAt: "Generated at",
    patientInfo: "Patient Information",
    requestInfo: "Request Information",
    medicalInfo: "Medical Information",
    clinical: "Doctor Assessment",
    changeHistory: "Change History",
    name: "Name",
    firstName: "First Name",
    lastName: "Last Name",
    dob: "Date of Birth",
    phone: "Phone",
    email: "Email",
    address: "Address",
    street: "Street",
    houseNumber: "House No.",
    postalCode: "Postal Code",
    city: "City",
    insuranceProvider: "Insurance Provider",
    insuranceNumber: "Insurance Number",
    requestType: "Request Type",
    priority: "Priority",
    nationalId: "National ID",
    requestNotes: "Request Notes",
    symptoms: "Symptoms",
    conditionDescription: "Condition Description",
    allergies: "Allergies / Chronic Conditions",
    medications: "Current Medications",
    status: "Status",
    newStatus: "New",
    reviewingStatus: "In Progress",
    doneStatus: "Done",
    rejectedStatus: "Rejected",
    diagnosis: "Diagnosis",
    medication: "Required Medicine",
    notes: "Doctor Notes",
    changedAt: "Changed At",
    changedBy: "Changed By",
    changedFields: "Updated Fields",
    previousValue: "Before",
    newValue: "After",
    noHistory: "No change history yet",
    noDiagnosis: "No diagnosis provided",
    noMedication: "No medication prescribed",
    doctorSig: "Doctor Signature",
    patientSig: "Patient Signature"
  },
  de: {
    title: "KLINISCHER BERICHT",
    product: "FormSystem - Digital Health Solutions",
    date: "Datum",
    refId: "Referenz-ID",
    generatedAt: "Erstellt am",
    patientInfo: "Patienteninformationen",
    requestInfo: "Antragsinformationen",
    medicalInfo: "Medizinische Informationen",
    clinical: "Aerztliche Bewertung",
    changeHistory: "Aenderungsverlauf",
    name: "Name",
    firstName: "Vorname",
    lastName: "Nachname",
    dob: "Geburtsdatum",
    phone: "Telefon",
    email: "E-Mail",
    address: "Adresse",
    street: "Strasse",
    houseNumber: "Hausnummer",
    postalCode: "Postleitzahl",
    city: "Stadt",
    insuranceProvider: "Krankenkasse",
    insuranceNumber: "Versicherungsnummer",
    requestType: "Formulartyp",
    priority: "Prioritaet",
    nationalId: "Ausweis-/Aufenthaltsnummer",
    requestNotes: "Antragsnotizen",
    symptoms: "Symptome",
    conditionDescription: "Krankheitsbeschreibung",
    allergies: "Allergien / Vorerkrankungen",
    medications: "Aktuelle Medikamente",
    status: "Status",
    newStatus: "Neu",
    reviewingStatus: "In Bearbeitung",
    doneStatus: "Erledigt",
    rejectedStatus: "Abgelehnt",
    diagnosis: "Diagnose",
    medication: "Erforderliche Medikation",
    notes: "Arztnotizen",
    changedAt: "Geaendert am",
    changedBy: "Geaendert von",
    changedFields: "Aktualisierte Felder",
    previousValue: "Vorher",
    newValue: "Nachher",
    noHistory: "Noch kein Verlauf",
    noDiagnosis: "Keine Diagnose hinterlegt",
    noMedication: "Keine Medikamente verschrieben",
    doctorSig: "Unterschrift des Arztes",
    patientSig: "Unterschrift des Patienten"
  }
} as const;

type Tr = (typeof reportText)[Language];

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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

function formatDate(value: unknown, lang: Language) {
  if (!value) return "-";
  const locale = lang === "de" ? "de-DE" : lang === "ar" ? "ar-EG" : "en-US";
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short" }).format(date);
}

function statusLabel(status: FormStatus | undefined, tr: Tr) {
  if (status === "DONE") return tr.doneStatus;
  if (status === "REJECTED") return tr.rejectedStatus;
  if (status === "REVIEWING") return tr.reviewingStatus;
  return tr.newStatus;
}

function parseValueMap(value?: string) {
  if (!value) return {} as Record<string, string>;
  try {
    const parsed = JSON.parse(value) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {} as Record<string, string>;
    }
    return Object.fromEntries(
      Object.entries(parsed as Record<string, unknown>).map(([key, entryValue]) => [key, String(entryValue ?? "")])
    );
  } catch {
    return {} as Record<string, string>;
  }
}

function formatFieldValue(field: string, value: string | undefined, tr: Tr) {
  if (field === "status") {
    return statusLabel(value as FormStatus | undefined, tr);
  }
  return value && value.trim() ? value : "-";
}

function fieldLabel(field: string, tr: Tr) {
  const labels: Record<string, string> = {
    firstName: tr.firstName,
    lastName: tr.lastName,
    dateOfBirth: tr.dob,
    phone: tr.phone,
    email: tr.email,
    street: tr.street,
    houseNumber: tr.houseNumber,
    postalCode: tr.postalCode,
    city: tr.city,
    address: tr.address,
    insuranceProvider: tr.insuranceProvider,
    insuranceNumber: tr.insuranceNumber,
    requestType: tr.requestType,
    priority: tr.priority,
    nationalId: tr.nationalId,
    requestNotes: tr.requestNotes,
    symptoms: tr.symptoms,
    conditionDescription: tr.conditionDescription,
    allergies: tr.allergies,
    medications: tr.medications,
    status: tr.status,
    diagnosis: tr.diagnosis,
    requiredMedicine: tr.medication,
    adminNotes: tr.notes
  };
  return labels[field] || field;
}

function rows(items: Array<[string, unknown]>) {
  return items
    .map(([label, value]) => `
      <div class="report-row">
        <strong>${escapeHtml(label)}</strong>
        <span>${escapeHtml(value || "-")}</span>
      </div>
    `)
    .join("");
}

function section(title: string, content: string) {
  return `
    <section class="report-section">
      <h2>${escapeHtml(title)}</h2>
      ${content}
    </section>
  `;
}

function buildHistoryRows(data: ReportData, lang: Language, tr: Tr) {
  const history = data.changeHistory || [];
  if (!history.length) {
    return `<p class="muted">${escapeHtml(tr.noHistory)}</p>`;
  }

  return `
    <table class="report-table">
      <thead>
        <tr>
          <th>${escapeHtml(tr.changedAt)}</th>
          <th>${escapeHtml(tr.changedBy)}</th>
          <th>${escapeHtml(tr.changedFields)}</th>
        </tr>
      </thead>
      <tbody>
        ${history.map((entry) => {
          const fields = parseChangedFields(entry.changeType);
          const previousValues = parseValueMap(entry.previousValues);
          const newValues = parseValueMap(entry.newValues);
          const fieldHtml = fields.length
            ? fields
                .map((field) => {
                  const beforeValue = previousValues[field] ?? (field === "status" ? entry.previousStatus : undefined);
                  const afterValue = newValues[field] ?? (field === "status" ? entry.newStatus : undefined);
                  return `
                    <div class="change-line">
                      <strong>${escapeHtml(fieldLabel(field, tr))}</strong>
                      <span>${escapeHtml(tr.previousValue)}: ${escapeHtml(formatFieldValue(field, beforeValue, tr))}</span>
                      <span>${escapeHtml(tr.newValue)}: ${escapeHtml(formatFieldValue(field, afterValue, tr))}</span>
                    </div>
                  `;
                })
                .join("")
            : [
                entry.previousStatus !== entry.newStatus ? `${tr.status}: ${statusLabel(entry.previousStatus, tr)} -> ${statusLabel(entry.newStatus, tr)}` : "",
                entry.previousDiagnosis !== entry.newDiagnosis ? tr.diagnosis : "",
                entry.previousRequiredMedicine !== entry.newRequiredMedicine ? tr.medication : "",
                entry.previousAdminNotes !== entry.newAdminNotes ? tr.notes : ""
              ].filter(Boolean).map((item) => `<div>${escapeHtml(item)}</div>`).join("");

          return `
            <tr>
              <td>${escapeHtml(formatDate(entry.changedAt, lang))}</td>
              <td>${escapeHtml(entry.changedBy || "-")}</td>
              <td>${fieldHtml || "-"}</td>
            </tr>
          `;
        }).join("")}
      </tbody>
    </table>
  `;
}

function buildReportHtml(data: ReportData, lang: Language) {
  const tr = reportText[lang];
  const isRtl = lang === "ar";
  const generatedAt = formatDate(new Date().toISOString(), lang);

  const patientRows = rows([
    [tr.name, `${data.firstName || ""} ${data.lastName || ""}`.trim()],
    [tr.dob, data.dateOfBirth],
    [tr.phone, data.phone],
    [tr.email, data.email],
    [tr.street, data.street],
    [tr.houseNumber, data.houseNumber],
    [tr.postalCode, data.postalCode],
    [tr.city, data.city],
    [tr.address, data.address],
    [tr.insuranceProvider, data.insuranceProvider],
    [tr.insuranceNumber, data.insuranceNumber],
    [tr.nationalId, data.nationalId]
  ]);

  const requestRows = rows([
    [tr.refId, data.id ? `#${data.id}` : "-"],
    [tr.status, statusLabel(data.status, tr)],
    [tr.requestType, data.requestType],
    [tr.priority, data.priority],
    [tr.requestNotes, data.requestNotes],
    [tr.generatedAt, generatedAt]
  ]);

  const medicalRows = rows([
    [tr.symptoms, data.symptoms],
    [tr.conditionDescription, data.conditionDescription],
    [tr.allergies, data.allergies],
    [tr.medications, data.medications]
  ]);

  const clinicalRows = rows([
    [tr.diagnosis, data.diagnosis || tr.noDiagnosis],
    [tr.medication, data.requiredMedicine || tr.noMedication],
    [tr.notes, data.adminNotes]
  ]);

  return `
    <div dir="${isRtl ? "rtl" : "ltr"}" class="report-page">
      <style>
        .report-page {
          width: 210mm;
          min-height: 297mm;
          padding: 14mm;
          background: #fff;
          color: #111827;
          font-family: ${isRtl ? "Tahoma, Arial, sans-serif" : "Arial, sans-serif"};
          font-size: 12px;
          line-height: 1.55;
        }
        .report-header {
          border-bottom: 2px solid #1d4ed8;
          padding-bottom: 10px;
          margin-bottom: 14px;
          display: flex;
          justify-content: space-between;
          gap: 16px;
          align-items: flex-end;
          flex-direction: ${isRtl ? "row-reverse" : "row"};
        }
        .report-header h1 {
          font-size: 28px;
          margin: 0;
          color: #0b2d61;
        }
        .report-header p {
          margin: 4px 0 0;
          color: #4b5563;
        }
        .report-meta {
          text-align: ${isRtl ? "left" : "right"};
          white-space: nowrap;
        }
        .report-section {
          margin-bottom: 14px;
          break-inside: avoid;
        }
        .report-section h2 {
          background: #f1f5f9;
          border-inline-start: 4px solid #2563eb;
          padding: 7px 10px;
          font-size: 17px;
          margin: 0 0 8px;
          color: #0f2f5f;
        }
        .report-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 7px 16px;
        }
        .report-row {
          border-bottom: 1px solid #e5e7eb;
          padding: 4px 0;
          display: grid;
          gap: 2px;
        }
        .report-row strong {
          color: #0f2f5f;
        }
        .report-row span {
          color: #1f2937;
          white-space: pre-wrap;
          overflow-wrap: anywhere;
        }
        .report-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 6px;
        }
        .report-table th,
        .report-table td {
          border: 1px solid #dbe4ef;
          padding: 7px;
          text-align: ${isRtl ? "right" : "left"};
          vertical-align: top;
        }
        .report-table th {
          background: #f8fafc;
          color: #0f2f5f;
        }
        .change-line {
          display: grid;
          gap: 2px;
          padding: 2px 0 6px;
          border-bottom: 1px solid #edf2f7;
        }
        .change-line:last-child {
          border-bottom: 0;
          padding-bottom: 0;
        }
        .muted {
          color: #64748b;
          margin: 0;
        }
        .signatures {
          margin-top: 28px;
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 20px;
          flex-direction: ${isRtl ? "row-reverse" : "row"};
          break-inside: avoid;
        }
        .signature {
          text-align: center;
          width: 180px;
        }
        .signature-line {
          border-top: 1px solid #111;
          width: 180px;
          margin-top: 3px;
        }
        .signature img {
          height: 46px;
          max-width: 180px;
          object-fit: contain;
        }
      </style>
      <header class="report-header">
        <div>
          <h1>${escapeHtml(tr.title)}</h1>
          <p>${escapeHtml(tr.product)}</p>
        </div>
        <div class="report-meta">
          <p>${escapeHtml(tr.date)}: ${escapeHtml(generatedAt)}</p>
          <p>${escapeHtml(tr.refId)}: <b>#${escapeHtml(data.id ?? "")}</b></p>
        </div>
      </header>

      ${section(tr.patientInfo, `<div class="report-grid">${patientRows}</div>`)}
      ${section(tr.requestInfo, `<div class="report-grid">${requestRows}</div>`)}
      ${section(tr.medicalInfo, `<div class="report-grid">${medicalRows}</div>`)}
      ${section(tr.clinical, `<div class="report-grid">${clinicalRows}</div>`)}
      ${section(tr.changeHistory, buildHistoryRows(data, lang, tr))}

      <div class="signatures">
        <div class="signature">
          <div style="height:46px;"></div>
          <div class="signature-line"></div>
          <p>${escapeHtml(tr.doctorSig)}</p>
        </div>
        <div class="signature">
          ${data.signature ? `<img src="${escapeHtml(data.signature)}" alt="Signature" />` : '<div style="height:46px;"></div>'}
          <div class="signature-line"></div>
          <p>${escapeHtml(tr.patientSig)}</p>
        </div>
      </div>
    </div>
  `;
}

export async function generatePDF(patientData: ReportData, lang: Language) {
  const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
    import("jspdf"),
    import("html2canvas")
  ]);

  const host = document.createElement("div");
  host.style.position = "fixed";
  host.style.left = "-10000px";
  host.style.top = "0";
  host.style.pointerEvents = "none";
  host.innerHTML = buildReportHtml(patientData, lang);
  document.body.appendChild(host);
  const reportElement = host.firstElementChild as HTMLElement | null;
  if (!reportElement) {
    document.body.removeChild(host);
    return;
  }

  try {
    const canvas = await html2canvas(reportElement, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    let remainingHeight = pdfHeight;
    let yPosition = 0;
    pdf.addImage(imgData, "PNG", 0, yPosition, pdfWidth, pdfHeight);
    remainingHeight -= pageHeight;

    while (remainingHeight > 0) {
      yPosition -= pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, yPosition, pdfWidth, pdfHeight);
      remainingHeight -= pageHeight;
    }

    const safeLastName = (patientData.lastName || "Patient").replace(/[^a-zA-Z0-9_-]/g, "_");
    const safeId = String(patientData.id ?? "N_A");
    pdf.save(`Report_${safeLastName}_${safeId}_${lang}.pdf`);
  } finally {
    document.body.removeChild(host);
  }
}
