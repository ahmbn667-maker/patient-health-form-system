package com.example.healthform.service;

import com.example.healthform.dto.AdminUpdateRequest;
import com.example.healthform.entity.FormChangeArchive;
import com.example.healthform.entity.PatientForm;
import java.util.List;

public interface PatientFormService {
    PatientForm create(PatientForm form);
    List<PatientForm> findAll();
    PatientForm findById(Long id);
    List<FormChangeArchive> findArchiveByFormId(Long formId);
    PatientForm updateAdminFields(Long id, AdminUpdateRequest request);
    void delete(Long id);
}
