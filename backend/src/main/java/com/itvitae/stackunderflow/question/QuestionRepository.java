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
            "WHERE q.category = :category " +
            "AND (lower(q.title) LIKE lower(concat('%', :search, '%')) " +
            "OR lower(q.text) LIKE lower(concat('%', :search, '%'))) " +
            "AND q.enabled = true")
    Page<Question> findByCategoryAndTitleOrTextContainsIgnoreCaseAndEnabledTrue(
            @Param("category") Category category,
            @Param("search") String search,
            Pageable pageable);

    @Query("SELECT q FROM Questions q " +
            "WHERE q.user = :user " +
            "AND (lower(q.title) LIKE lower(concat('%', :search, '%')) " +
            "OR lower(q.text) LIKE lower(concat('%', :search, '%'))) " +
            "AND q.enabled = true")
    Page<Question> findByUserAndTitleOrTextContainsIgnoreCaseAndEnabledTrue(
            @Param("user") User user,
            @Param("search") String search,
            Pageable pageable);

    @Query("SELECT q FROM Questions q " +
            "WHERE q.user = :user " +
            "AND q.category = :category " +
            "AND (lower(q.title) LIKE lower(concat('%', :search, '%')) " +
            "OR lower(q.text) LIKE lower(concat('%', :search, '%'))) " +
            "AND q.enabled = true")
    Page<Question> findByUserAndCategoryAndTitleOrTextContainsIgnoreCaseAndEnabledTrue(
            @Param("user") User user,
            @Param("category") Category category,
            @Param("search") String search,
            Pageable pageable);
}
