package com.itvitae.stackunderflow.answer;

import com.itvitae.stackunderflow.question.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
    Page<Answer> getByQuestion(Question question, Pageable pageable);
}
