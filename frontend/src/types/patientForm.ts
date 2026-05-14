export type FormStatus =
  | "NEW"
  | "REVIEWING"
  | "MONITORING"
  | "DIAGNOSED"
  | "DONE"
  | "REJECTED";

export interface PatientForm {
  id?: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  email?: string;
  city?: string;
  address?: string;
  street?: string;
  houseNumber?: string;
  postalCode?: string;
  insuranceProvider?: string;
  insuranceNumber?: string;
  requestType?: string;
  priority?: string;
  nationalId?: string;
  requestNotes?: string;
  symptoms?: string;
  allergies?: string;
  medications?: string;
  conditionDescription?: string;
  signature?: string;
  consentAccepted?: boolean;
  preferredLanguage?: "ar" | "en" | "de";
  status?: FormStatus;
  diagnosis?: string;
  requiredMedicine?: string;
  adminNotes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FormChangeArchive {
  id: number;
  formId: number;
  changedBy: string;
  changeType: string;
  previousStatus?: FormStatus;
  newStatus?: FormStatus;
  previousDiagnosis?: string;
  newDiagnosis?: string;
  previousRequiredMedicine?: string;
  newRequiredMedicine?: string;
  previousAdminNotes?: string;
  newAdminNotes?: string;
  previousValues?: string;
  newValues?: string;
  changedAt: string;
}
