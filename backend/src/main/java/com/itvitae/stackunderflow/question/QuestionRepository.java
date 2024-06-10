package com.itvitae.stackunderflow.question;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByTitleContainsIgnoreCase(String title);

    List<Question> findByUserId(UUID userId);
}
