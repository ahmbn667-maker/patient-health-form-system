package com.example.healthform.repository;

import com.example.healthform.entity.PatientForm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientFormRepository extends JpaRepository<PatientForm, Long> {
}
