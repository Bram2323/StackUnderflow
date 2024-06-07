package com.itvitae.stackunderflow.question;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByTitleContainsIgnoreCase(String title);

    List<Question> findByTitleContainsIgnoreCaseOrderByDateAsc(String title);

    List<Question> findByTitleContainsIgnoreCaseOrderByDateDesc(String title);

    @Query("SELECT q FROM Questions q LEFT JOIN q.answers a WHERE LOWER(q.title) LIKE LOWER(CONCAT('%', :title, '%')) GROUP BY q.id ORDER BY COUNT(a.id) DESC")
    List<Question> findByTitleContainsIgnoreCaseOrderByAnswerCountDesc(String title);
}
