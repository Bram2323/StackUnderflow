package com.itvitae.stackunderflow.question;

import com.itvitae.stackunderflow.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    Page<Question> findAllByEnabledTrue(Pageable pageable);

    Optional<Question> findByIdAndEnabledTrue(Long id);

    @Query("SELECT q FROM Questions q WHERE (lower(q.title) LIKE lower(concat('%', :search, '%')) OR lower(q.text) LIKE lower(concat('%', :search, '%'))) AND q.enabled = true")
    Page<Question> findByTitleOrTextContainsIgnoreCaseAndEnabledTrue(@Param("search") String search, Pageable pageable);

    @Query("SELECT q FROM Questions q " +
            "WHERE q.user.id = :userId " +
            "AND (lower(q.title) LIKE lower(concat('%', :search, '%')) " +
            "OR lower(q.text) LIKE lower(concat('%', :search, '%'))) " +
            "AND q.enabled = true")
    Page<Question> findByUserIdAndTitleOrTextContainsIgnoreCaseAndEnabledTrue(
            @Param("userId") UUID userId,
            @Param("search") String search,
            Pageable pageable);

    Page<Question> findByCategoryAndTitleContainsIgnoreCaseAndEnabledTrue(Category category, String title,
            Pageable pageable);

    Page<Question> findByUserAndTitleContainsIgnoreCaseAndEnabledTrue(User user, String title, Pageable pageable);

    Page<Question> findByUserAndCategoryAndTitleContainsIgnoreCaseAndEnabledTrue(User user, Category category,
            String title, Pageable pageable);
}
