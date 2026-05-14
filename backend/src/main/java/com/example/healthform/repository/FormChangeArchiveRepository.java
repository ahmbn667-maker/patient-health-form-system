package com.example.healthform.repository;

import com.example.healthform.entity.FormChangeArchive;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FormChangeArchiveRepository extends JpaRepository<FormChangeArchive, Long> {
    List<FormChangeArchive> findByFormIdOrderByChangedAtDesc(Long formId);

    void deleteByFormId(Long formId);
}
