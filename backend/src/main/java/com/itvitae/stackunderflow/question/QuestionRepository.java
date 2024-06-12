package com.itvitae.stackunderflow.question;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    Page<Question> findByTitleContainsIgnoreCase(String title, Pageable pageable);

    Page<Question> findByUserIdAndTitleContainsIgnoreCase(UUID userId, String title, Pageable pageable);
}
