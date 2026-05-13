package com.example.healthform.service;

import com.example.healthform.dto.AdminUpdateRequest;
import com.example.healthform.entity.FormChangeArchive;
import com.example.healthform.entity.FormStatus;
import com.example.healthform.entity.PatientForm;
import com.example.healthform.repository.FormChangeArchiveRepository;
import com.example.healthform.repository.PatientFormRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class PatientFormServiceImpl implements PatientFormService {

    private final PatientFormRepository repository;
    private final FormChangeArchiveRepository archiveRepository;

    public PatientFormServiceImpl(PatientFormRepository repository, FormChangeArchiveRepository archiveRepository) {
        this.repository = repository;
        this.archiveRepository = archiveRepository;
    }

    @Override
    public PatientForm create(PatientForm form) {
        form.setStatus(FormStatus.NEW);
        return repository.save(form);
    }

    @Override
    public List<PatientForm> findAll() {
        return repository.findAll();
    }

    @Override
    public PatientForm findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Form not found with id: " + id));
    }

    @Override
    public List<FormChangeArchive> findArchiveByFormId(Long formId) {
        return archiveRepository.findByFormIdOrderByChangedAtDesc(formId);
    }

    @Override
    @Transactional
    public PatientForm updateAdminFields(Long id, AdminUpdateRequest request) {
        PatientForm form = findById(id);

        String previousFirstName = form.getFirstName();
        String previousLastName = form.getLastName();
        LocalDate previousDateOfBirth = form.getDateOfBirth();
        String previousPhone = form.getPhone();
        String previousEmail = form.getEmail();
        String previousAddress = form.getAddress();
        String previousStreet = form.getStreet();
        String previousHouseNumber = form.getHouseNumber();
        String previousPostalCode = form.getPostalCode();
        String previousCity = form.getCity();
        String previousInsuranceProvider = form.getInsuranceProvider();
        String previousInsuranceNumber = form.getInsuranceNumber();
        String previousRequestType = form.getRequestType();
        String previousPriority = form.getPriority();
        String previousNationalId = form.getNationalId();
        String previousRequestNotes = form.getRequestNotes();
        String previousSymptoms = form.getSymptoms();
        String previousAllergies = form.getAllergies();
        String previousMedications = form.getMedications();
        String previousConditionDescription = form.getConditionDescription();

        FormStatus previousStatus = form.getStatus();
        String previousDiagnosis = form.getDiagnosis();
        String previousRequiredMedicine = form.getRequiredMedicine();
        String previousAdminNotes = form.getAdminNotes();

        if (request.getFirstName() != null) form.setFirstName(request.getFirstName());
        if (request.getLastName() != null) form.setLastName(request.getLastName());
        if (request.getDateOfBirth() != null) form.setDateOfBirth(request.getDateOfBirth());
        if (request.getPhone() != null) form.setPhone(request.getPhone());
        if (request.getEmail() != null) form.setEmail(request.getEmail());
        if (request.getAddress() != null) form.setAddress(request.getAddress());
        if (request.getStreet() != null) form.setStreet(request.getStreet());
        if (request.getHouseNumber() != null) form.setHouseNumber(request.getHouseNumber());
        if (request.getPostalCode() != null) form.setPostalCode(request.getPostalCode());
        if (request.getCity() != null) form.setCity(request.getCity());
        if (request.getInsuranceProvider() != null) form.setInsuranceProvider(request.getInsuranceProvider());
        if (request.getInsuranceNumber() != null) form.setInsuranceNumber(request.getInsuranceNumber());
        if (request.getRequestType() != null) form.setRequestType(request.getRequestType());
        if (request.getPriority() != null) form.setPriority(request.getPriority());
        if (request.getNationalId() != null) form.setNationalId(request.getNationalId());
        if (request.getRequestNotes() != null) form.setRequestNotes(request.getRequestNotes());
        if (request.getSymptoms() != null) form.setSymptoms(request.getSymptoms());
        if (request.getAllergies() != null) form.setAllergies(request.getAllergies());
        if (request.getMedications() != null) form.setMedications(request.getMedications());
        if (request.getConditionDescription() != null) form.setConditionDescription(request.getConditionDescription());

        if (request.getDiagnosis() != null) form.setDiagnosis(request.getDiagnosis());
        if (request.getRequiredMedicine() != null) form.setRequiredMedicine(request.getRequiredMedicine());
        if (request.getAdminNotes() != null) form.setAdminNotes(request.getAdminNotes());

        if (request.getStatus() != null) {
            if (request.getStatus() == FormStatus.DONE) {
                boolean diagnosisMissing = form.getDiagnosis() == null || form.getDiagnosis().trim().isEmpty();
                boolean medicineMissing = form.getRequiredMedicine() == null || form.getRequiredMedicine().trim().isEmpty();
                if (diagnosisMissing || medicineMissing) {
                    throw new IllegalArgumentException("Diagnosis and required medicine are required before marking as DONE.");
                }
            }
            form.setStatus(request.getStatus());
        }

        PatientForm saved = repository.save(form);

        List<String> changedFields = detectChangedFields(
                previousFirstName, previousLastName, previousDateOfBirth, previousPhone, previousEmail, previousAddress, previousStreet,
                previousHouseNumber, previousPostalCode, previousCity, previousInsuranceProvider, previousInsuranceNumber,
                previousRequestType, previousPriority, previousNationalId, previousRequestNotes, previousSymptoms,
                previousAllergies, previousMedications, previousConditionDescription, previousStatus, previousDiagnosis,
                previousRequiredMedicine, previousAdminNotes, saved
        );

        if (!changedFields.isEmpty()) {
            FormChangeArchive archive = new FormChangeArchive();
            archive.setForm(saved);
            archive.setChangedBy(resolveCurrentUser());
            archive.setChangeType("ADMIN_UPDATE:" + String.join(",", changedFields));
            archive.setPreviousStatus(previousStatus);
            archive.setNewStatus(saved.getStatus());
            archive.setPreviousDiagnosis(previousDiagnosis);
            archive.setNewDiagnosis(saved.getDiagnosis());
            archive.setPreviousRequiredMedicine(previousRequiredMedicine);
            archive.setNewRequiredMedicine(saved.getRequiredMedicine());
            archive.setPreviousAdminNotes(previousAdminNotes);
            archive.setNewAdminNotes(saved.getAdminNotes());
            archiveRepository.save(archive);
        }

        return saved;
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    private List<String> detectChangedFields(
            String previousFirstName,
            String previousLastName,
            LocalDate previousDateOfBirth,
            String previousPhone,
            String previousEmail,
            String previousAddress,
            String previousStreet,
            String previousHouseNumber,
            String previousPostalCode,
            String previousCity,
            String previousInsuranceProvider,
            String previousInsuranceNumber,
            String previousRequestType,
            String previousPriority,
            String previousNationalId,
            String previousRequestNotes,
            String previousSymptoms,
            String previousAllergies,
            String previousMedications,
            String previousConditionDescription,
            FormStatus previousStatus,
            String previousDiagnosis,
            String previousRequiredMedicine,
            String previousAdminNotes,
            PatientForm saved
    ) {
        List<String> changedFields = new ArrayList<>();

        addChangedField(changedFields, "firstName", previousFirstName, saved.getFirstName());
        addChangedField(changedFields, "lastName", previousLastName, saved.getLastName());
        if (!Objects.equals(previousDateOfBirth, saved.getDateOfBirth())) changedFields.add("dateOfBirth");
        addChangedField(changedFields, "phone", previousPhone, saved.getPhone());
        addChangedField(changedFields, "email", previousEmail, saved.getEmail());
        addChangedField(changedFields, "address", previousAddress, saved.getAddress());
        addChangedField(changedFields, "street", previousStreet, saved.getStreet());
        addChangedField(changedFields, "houseNumber", previousHouseNumber, saved.getHouseNumber());
        addChangedField(changedFields, "postalCode", previousPostalCode, saved.getPostalCode());
        addChangedField(changedFields, "city", previousCity, saved.getCity());
        addChangedField(changedFields, "insuranceProvider", previousInsuranceProvider, saved.getInsuranceProvider());
        addChangedField(changedFields, "insuranceNumber", previousInsuranceNumber, saved.getInsuranceNumber());
        addChangedField(changedFields, "requestType", previousRequestType, saved.getRequestType());
        addChangedField(changedFields, "priority", previousPriority, saved.getPriority());
        addChangedField(changedFields, "nationalId", previousNationalId, saved.getNationalId());
        addChangedField(changedFields, "requestNotes", previousRequestNotes, saved.getRequestNotes());
        addChangedField(changedFields, "symptoms", previousSymptoms, saved.getSymptoms());
        addChangedField(changedFields, "allergies", previousAllergies, saved.getAllergies());
        addChangedField(changedFields, "medications", previousMedications, saved.getMedications());
        addChangedField(changedFields, "conditionDescription", previousConditionDescription, saved.getConditionDescription());

        if (!Objects.equals(previousStatus, saved.getStatus())) changedFields.add("status");
        addChangedField(changedFields, "diagnosis", previousDiagnosis, saved.getDiagnosis());
        addChangedField(changedFields, "requiredMedicine", previousRequiredMedicine, saved.getRequiredMedicine());
        addChangedField(changedFields, "adminNotes", previousAdminNotes, saved.getAdminNotes());

        return changedFields;
    }

    private void addChangedField(List<String> changedFields, String key, String oldValue, String newValue) {
        if (!Objects.equals(oldValue, newValue)) {
            changedFields.add(key);
        }
    }

    private String resolveCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null || authentication.getName().isBlank()) {
            return "unknown-user";
        }
        return authentication.getName();
    }
}
