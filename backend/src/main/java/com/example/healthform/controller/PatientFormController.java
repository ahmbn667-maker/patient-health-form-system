package com.example.healthform.controller;

import com.example.healthform.dto.AdminUpdateRequest;
import com.example.healthform.dto.FormChangeArchiveResponse;
import com.example.healthform.entity.PatientForm;
import com.example.healthform.service.PatientFormService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/forms")
public class PatientFormController {

    private final PatientFormService service;

    public PatientFormController(PatientFormService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody PatientForm form) {
        PatientForm saved = service.create(form);
        return ResponseEntity.ok(Map.of(
                "message", "Form submitted successfully",
                "id", saved.getId(),
                "status", saved.getStatus()
        ));
    }

    @GetMapping
    public List<PatientForm> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public PatientForm findById(@PathVariable Long id) {
        return service.findById(id);
    }

    @GetMapping("/{id}/history")
    public List<FormChangeArchiveResponse> findHistory(@PathVariable Long id) {
        return service.findArchiveByFormId(id).stream()
                .map(FormChangeArchiveResponse::fromEntity)
                .toList();
    }

    @PutMapping("/{id}/admin")
    public PatientForm updateAdminFields(
            @PathVariable Long id,
            @RequestBody AdminUpdateRequest request
    ) {
        return service.updateAdminFields(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok(Map.of("message", "Form deleted successfully"));
    }
}
