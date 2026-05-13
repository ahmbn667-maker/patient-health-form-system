package com.example.healthform.dto;

import com.example.healthform.entity.FormStatus;

import java.time.LocalDate;

public class AdminUpdateRequest {
    private FormStatus status;
    private String diagnosis;
    private String requiredMedicine;
    private String adminNotes;

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
    private String requestNotes;
    private String symptoms;
    private String allergies;
    private String medications;
    private String conditionDescription;

    public FormStatus getStatus() {
        return status;
    }

    public String getDiagnosis() {
        return diagnosis;
    }

    public String getRequiredMedicine() {
        return requiredMedicine;
    }

    public String getAdminNotes() {
        return adminNotes;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public String getPhone() {
        return phone;
    }

    public String getEmail() {
        return email;
    }

    public String getCity() {
        return city;
    }

    public String getAddress() {
        return address;
    }

    public String getStreet() {
        return street;
    }

    public String getHouseNumber() {
        return houseNumber;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public String getInsuranceProvider() {
        return insuranceProvider;
    }

    public String getInsuranceNumber() {
        return insuranceNumber;
    }

    public String getRequestType() {
        return requestType;
    }

    public String getPriority() {
        return priority;
    }

    public String getNationalId() {
        return nationalId;
    }

    public String getRequestNotes() {
        return requestNotes;
    }

    public String getSymptoms() {
        return symptoms;
    }

    public String getAllergies() {
        return allergies;
    }

    public String getMedications() {
        return medications;
    }

    public String getConditionDescription() {
        return conditionDescription;
    }

    public void setStatus(FormStatus status) {
        this.status = status;
    }

    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }

    public void setRequiredMedicine(String requiredMedicine) {
        this.requiredMedicine = requiredMedicine;
    }

    public void setAdminNotes(String adminNotes) {
        this.adminNotes = adminNotes;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public void setInsuranceProvider(String insuranceProvider) {
        this.insuranceProvider = insuranceProvider;
    }

    public void setInsuranceNumber(String insuranceNumber) {
        this.insuranceNumber = insuranceNumber;
    }

    public void setRequestType(String requestType) {
        this.requestType = requestType;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public void setNationalId(String nationalId) {
        this.nationalId = nationalId;
    }

    public void setRequestNotes(String requestNotes) {
        this.requestNotes = requestNotes;
    }

    public void setSymptoms(String symptoms) {
        this.symptoms = symptoms;
    }

    public void setAllergies(String allergies) {
        this.allergies = allergies;
    }

    public void setMedications(String medications) {
        this.medications = medications;
    }

    public void setConditionDescription(String conditionDescription) {
        this.conditionDescription = conditionDescription;
    }
}
