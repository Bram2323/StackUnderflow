package com.itvitae.stackunderflow;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ViewsCreator implements CommandLineRunner {

    private final JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) {
        deleteViewOrTable("question_summary_view");
        deleteViewOrTable("answer_summary_view");

        jdbcTemplate.execute(
                """
                        CREATE VIEW question_summary_view AS
                            SELECT q.id AS id, COUNT(a.id) AS answer_count
                                FROM questions q
                                LEFT JOIN answers a
                                ON a.question_id = q.id
                                GROUP BY q.id;
                        """
        );

        jdbcTemplate.execute(
                """
                        CREATE VIEW answer_summary_view AS
                            SELECT a.id, SUM(
                                CASE
                                    WHEN is_upvote IS NULL THEN 0
                                    WHEN is_upvote THEN 1
                                    WHEN NOT is_upvote THEN -1
                                END) AS vote_count
                                FROM answers a
                                LEFT JOIN user_answer_votes v
                                ON a.id = v.answer_id
                                GROUP BY a.id;
                        """
        );
    }

    private void deleteViewOrTable(String name) {
        try {
            jdbcTemplate.execute("DROP VIEW IF EXISTS " + name);
        } catch (BadSqlGrammarException e) {
            jdbcTemplate.execute("DROP TABLE IF EXISTS " + name);
        }
    }
}
