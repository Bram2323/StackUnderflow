package com.itvitae.stackunderflow.question;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    Page<Question> findAllByEnabledTrue(Pageable pageable);

    Optional<Question> findByIdAndEnabledTrue(Long id);

    Page<Question> findByTitleContainsIgnoreCaseAndEnabledTrue(String title, Pageable pageable);

    Page<Question> findByUserIdAndTitleContainsIgnoreCaseAndEnabledTrue(UUID userId, String title, Pageable pageable);
}
