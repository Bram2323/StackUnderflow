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
    public void run(String... args) {
        try {
            jdbcTemplate.execute("DROP VIEW IF EXISTS question_summary_view");
        } catch (BadSqlGrammarException e) {
            jdbcTemplate.execute("DROP TABLE IF EXISTS question_summary_view");
        }

        jdbcTemplate.execute(
                "CREATE VIEW question_summary_view AS " +
                        "SELECT q.id AS id, COUNT(a.id) AS answer_count " +
                        "FROM questions q " +
                        "LEFT JOIN answers a " +
                        "ON a.question_id = q.id GROUP BY q.id;"
        );
    }
}
