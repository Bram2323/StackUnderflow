package com.itvitae.stackunderflow.leaderboard;

import com.itvitae.stackunderflow.answer.Answer;
import com.itvitae.stackunderflow.answer.AnswerRepository;
import com.itvitae.stackunderflow.user.Award;
import com.itvitae.stackunderflow.user.User;
import com.itvitae.stackunderflow.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LeaderboardRunner {
    private final UserRepository userRepository;

    private final AnswerRepository answerRepository;


    public void updateLeaderboard() {
        for (User user : userRepository.findAll()) {
            long totalPoints = getTotalUserVotes(user);
            user.setTotalPoints(totalPoints);
            userRepository.save(user);
        }

        long previousRank = 1;
        Long previousPoints = 0L;
        List<User> sortedUsers = userRepository.findAllByOrderByTotalPointsDesc();
        for (int i = 0; i < sortedUsers.size(); i++) {
            User user = sortedUsers.get(i);
            Long points = user.getTotalPoints();

            long rank = i + 1;
            if (previousPoints == null || points == null || previousPoints.equals(points)) {
                rank = previousRank;
            }

            Award award = Award.NONE;
            if (rank == 1) award = Award.FIRST;
            if (rank == 2) award = Award.SECOND;
            if (rank == 3) award = Award.THIRD;
            user.setAward(award);
            user.setLeaderboardRanking(rank);
            userRepository.save(user);
            previousRank = rank;
            previousPoints = points;
        }
    }

    private long getTotalUserVotes(User user) {
        long totalVotes = 0;
        // calculates for this month for testing purposes, it should be last month in the final product
        for (Answer answer : answerRepository.findByUserAndEnabledTrue(user)) {
            if (answer.getDate().getMonth() == LocalDateTime.now().getMonth() &&
                    answer.getDate().getYear() == LocalDateTime.now().getYear()) {
                totalVotes += answer.getVotes();
            }
        }
        System.out.println("[DEBUG] total votes for " + user.getUsername() + " : " + totalVotes);
        return totalVotes;
    }
}
