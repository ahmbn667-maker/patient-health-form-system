package com.example.healthform.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "patient_forms")
public class PatientForm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;
    private String phone;
    private String email;
    private String city;
    private String address;
    private String street;
    private String houseNumber;
    private String postalCode;
    private String insuranceProvider;
    private String insuranceNumber;
    private String requestType;
    private String priority;
    private String nationalId;

    @Column(columnDefinition = "TEXT")
    private String requestNotes;

    @Column(columnDefinition = "TEXT")
    private String symptoms;

    @Column(columnDefinition = "TEXT")
    private String allergies;

    @Column(columnDefinition = "TEXT")
    private String medications;

    @Column(columnDefinition = "TEXT")
    private String conditionDescription;

    @Column(columnDefinition = "TEXT")
    private String signature;
    private Boolean consentAccepted = false;
    private String preferredLanguage;

    @Enumerated(EnumType.STRING)
    private FormStatus status = FormStatus.NEW;

    @Column(columnDefinition = "TEXT")
    private String diagnosis;

    @Column(columnDefinition = "TEXT")
    private String requiredMedicine;

    @Column(columnDefinition = "TEXT")
    private String adminNotes;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "form", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<FormChangeArchive> archives = new ArrayList<>();

    @PrePersist
    public void beforeCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (status == null) {
            status = FormStatus.NEW;
        }
        if (consentAccepted == null) {
            consentAccepted = false;
        }
    }

    @PreUpdate
    public void beforeUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public String getPhone() { return phone; }
    public String getEmail() { return email; }
    public String getCity() { return city; }
    public String getAddress() { return address; }
    public String getStreet() { return street; }
    public String getHouseNumber() { return houseNumber; }
    public String getPostalCode() { return postalCode; }
    public String getInsuranceProvider() { return insuranceProvider; }
    public String getInsuranceNumber() { return insuranceNumber; }
    public String getRequestType() { return requestType; }
    public String getPriority() { return priority; }
    public String getNationalId() { return nationalId; }
    public String getRequestNotes() { return requestNotes; }
    public String getSymptoms() { return symptoms; }
    public String getAllergies() { return allergies; }
    public String getMedications() { return medications; }
    public String getConditionDescription() { return conditionDescription; }
    public String getSignature() { return signature; }
    public Boolean getConsentAccepted() { return consentAccepted; }
    public String getPreferredLanguage() { return preferredLanguage; }
    public FormStatus getStatus() { return status; }
    public String getDiagnosis() { return diagnosis; }
    public String getRequiredMedicine() { return requiredMedicine; }
    public String getAdminNotes() { return adminNotes; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public List<FormChangeArchive> getArchives() { return archives; }

    public void setId(Long id) { this.id = id; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }
    public void setPhone(String phone) { this.phone = phone; }
    public void setEmail(String email) { this.email = email; }
    public void setCity(String city) { this.city = city; }
    public void setAddress(String address) { this.address = address; }
    public void setStreet(String street) { this.street = street; }
    public void setHouseNumber(String houseNumber) { this.houseNumber = houseNumber; }
    public void setPostalCode(String postalCode) { this.postalCode = postalCode; }
    public void setInsuranceProvider(String insuranceProvider) { this.insuranceProvider = insuranceProvider; }
    public void setInsuranceNumber(String insuranceNumber) { this.insuranceNumber = insuranceNumber; }
    public void setRequestType(String requestType) { this.requestType = requestType; }
    public void setPriority(String priority) { this.priority = priority; }
    public void setNationalId(String nationalId) { this.nationalId = nationalId; }
    public void setRequestNotes(String requestNotes) { this.requestNotes = requestNotes; }
    public void setSymptoms(String symptoms) { this.symptoms = symptoms; }
    public void setAllergies(String allergies) { this.allergies = allergies; }
    public void setMedications(String medications) { this.medications = medications; }
    public void setConditionDescription(String conditionDescription) { this.conditionDescription = conditionDescription; }
    public void setSignature(String signature) { this.signature = signature; }
    public void setConsentAccepted(Boolean consentAccepted) { this.consentAccepted = consentAccepted; }
    public void setPreferredLanguage(String preferredLanguage) { this.preferredLanguage = preferredLanguage; }
    public void setStatus(FormStatus status) { this.status = status; }
    public void setDiagnosis(String diagnosis) { this.diagnosis = diagnosis; }
    public void setRequiredMedicine(String requiredMedicine) { this.requiredMedicine = requiredMedicine; }
    public void setAdminNotes(String adminNotes) { this.adminNotes = adminNotes; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    public void setArchives(List<FormChangeArchive> archives) { this.archives = archives; }
}
