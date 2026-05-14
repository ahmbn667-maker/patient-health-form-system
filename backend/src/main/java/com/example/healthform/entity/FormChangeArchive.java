package com.example.healthform.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "form_change_archive")
public class FormChangeArchive {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "form_id", nullable = false)
    private PatientForm form;

    private String changedBy;
    private String changeType;

    @Enumerated(EnumType.STRING)
    private FormStatus previousStatus;

    @Enumerated(EnumType.STRING)
    private FormStatus newStatus;

    @Column(columnDefinition = "TEXT")
    private String previousDiagnosis;

    @Column(columnDefinition = "TEXT")
    private String newDiagnosis;

    @Column(columnDefinition = "TEXT")
    private String previousRequiredMedicine;

    @Column(columnDefinition = "TEXT")
    private String newRequiredMedicine;

    @Column(columnDefinition = "TEXT")
    private String previousAdminNotes;

    @Column(columnDefinition = "TEXT")
    private String newAdminNotes;

    @Column(columnDefinition = "TEXT")
    private String previousValues;

    @Column(columnDefinition = "TEXT")
    private String newValues;

    private LocalDateTime changedAt;

    @PrePersist
    public void beforeCreate() {
        if (changedAt == null) {
            changedAt = LocalDateTime.now();
        }
    }

    public Long getId() {
        return id;
    }

    public PatientForm getForm() {
        return form;
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

    public void setForm(PatientForm form) {
        this.form = form;
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
