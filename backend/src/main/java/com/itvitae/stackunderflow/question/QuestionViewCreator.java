package com.itvitae.stackunderflow.question;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class QuestionViewCreator implements CommandLineRunner {

    private final JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) throws Exception {
        try {
            jdbcTemplate.execute("DROP VIEW IF EXISTS question_summary_view");
        } catch (BadSqlGrammarException e) {
            jdbcTemplate.execute("DROP TABLE IF EXISTS question_summary_view");
        }

        jdbcTemplate.execute("CREATE OR REPLACE VIEW question_summary_view AS SELECT question_id as id, COUNT(*) AS answer_count FROM answers GROUP BY question_id;");
    }
}
