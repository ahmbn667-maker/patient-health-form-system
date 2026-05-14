package com.example.healthform.dto;

import com.example.healthform.entity.FormChangeArchive;
import com.example.healthform.entity.FormStatus;

import java.time.LocalDateTime;

public class FormChangeArchiveResponse {
    private Long id;
    private Long formId;
    private String changedBy;
    private String changeType;
    private FormStatus previousStatus;
    private FormStatus newStatus;
    private String previousDiagnosis;
    private String newDiagnosis;
    private String previousRequiredMedicine;
    private String newRequiredMedicine;
    private String previousAdminNotes;
    private String newAdminNotes;
    private String previousValues;
    private String newValues;
    private LocalDateTime changedAt;

    public static FormChangeArchiveResponse fromEntity(FormChangeArchive archive) {
        FormChangeArchiveResponse response = new FormChangeArchiveResponse();
        response.setId(archive.getId());
        response.setFormId(archive.getForm() != null ? archive.getForm().getId() : null);
        response.setChangedBy(archive.getChangedBy());
        response.setChangeType(archive.getChangeType());
        response.setPreviousStatus(archive.getPreviousStatus());
        response.setNewStatus(archive.getNewStatus());
        response.setPreviousDiagnosis(archive.getPreviousDiagnosis());
        response.setNewDiagnosis(archive.getNewDiagnosis());
        response.setPreviousRequiredMedicine(archive.getPreviousRequiredMedicine());
        response.setNewRequiredMedicine(archive.getNewRequiredMedicine());
        response.setPreviousAdminNotes(archive.getPreviousAdminNotes());
        response.setNewAdminNotes(archive.getNewAdminNotes());
        response.setPreviousValues(archive.getPreviousValues());
        response.setNewValues(archive.getNewValues());
        response.setChangedAt(archive.getChangedAt());
        return response;
    }

    public Long getId() {
        return id;
    }

    public Long getFormId() {
        return formId;
    }

    public String getChangedBy() {
        return changedBy;
    }

    public String getChangeType() {
        return changeType;
    }

    public FormStatus getPreviousStatus() {
        return previousStatus;
    }

    public FormStatus getNewStatus() {
        return newStatus;
    }

    public String getPreviousDiagnosis() {
        return previousDiagnosis;
    }

    public String getNewDiagnosis() {
        return newDiagnosis;
    }

    public String getPreviousRequiredMedicine() {
        return previousRequiredMedicine;
    }

    public String getNewRequiredMedicine() {
        return newRequiredMedicine;
    }

    public String getPreviousAdminNotes() {
        return previousAdminNotes;
    }

    public String getNewAdminNotes() {
        return newAdminNotes;
    }

    public String getPreviousValues() {
        return previousValues;
    }

    public String getNewValues() {
        return newValues;
    }

    public LocalDateTime getChangedAt() {
        return changedAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setFormId(Long formId) {
        this.formId = formId;
    }

    public void setChangedBy(String changedBy) {
        this.changedBy = changedBy;
    }

    public void setChangeType(String changeType) {
        this.changeType = changeType;
    }

    public void setPreviousStatus(FormStatus previousStatus) {
        this.previousStatus = previousStatus;
    }

    public void setNewStatus(FormStatus newStatus) {
        this.newStatus = newStatus;
    }

    public void setPreviousDiagnosis(String previousDiagnosis) {
        this.previousDiagnosis = previousDiagnosis;
    }

    public void setNewDiagnosis(String newDiagnosis) {
        this.newDiagnosis = newDiagnosis;
    }

    public void setPreviousRequiredMedicine(String previousRequiredMedicine) {
        this.previousRequiredMedicine = previousRequiredMedicine;
    }

    public void setNewRequiredMedicine(String newRequiredMedicine) {
        this.newRequiredMedicine = newRequiredMedicine;
    }

    public void setPreviousAdminNotes(String previousAdminNotes) {
        this.previousAdminNotes = previousAdminNotes;
    }

    public void setNewAdminNotes(String newAdminNotes) {
        this.newAdminNotes = newAdminNotes;
    }

    public void setPreviousValues(String previousValues) {
        this.previousValues = previousValues;
    }

    public void setNewValues(String newValues) {
        this.newValues = newValues;
    }

    public void setChangedAt(LocalDateTime changedAt) {
        this.changedAt = changedAt;
    }
}
