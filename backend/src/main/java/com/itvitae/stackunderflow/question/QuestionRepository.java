package com.itvitae.stackunderflow.question;

import com.itvitae.stackunderflow.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    Page<Question> findAllByEnabledTrue(Pageable pageable);

    Optional<Question> findByIdAndEnabledTrue(Long id);

    Page<Question> findByTitleContainsIgnoreCaseAndEnabledTrue(String title, Pageable pageable);

    Page<Question> findByCategoryAndTitleContainsIgnoreCaseAndEnabledTrue(Category category, String title, Pageable pageable);

    Page<Question> findByUserAndTitleContainsIgnoreCaseAndEnabledTrue(User user, String title, Pageable pageable);

    Page<Question> findByUserAndCategoryAndTitleContainsIgnoreCaseAndEnabledTrue(User user, Category category, String title, Pageable pageable);
}
