package com.itvitae.stackunderflow.answer;

import com.itvitae.stackunderflow.question.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
    Page<Answer> findByQuestionAndEnabledTrue(Question question, Pageable pageable);

    List<Answer> findByQuestion(Question question);

    Optional<Answer> findByIdAndEnabledTrue(Long id);
}
