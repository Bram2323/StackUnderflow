package com.itvitae.stackunderflow.leaderboard;

import com.itvitae.stackunderflow.answer.Answer;
import com.itvitae.stackunderflow.answer.AnswerRepository;
import com.itvitae.stackunderflow.configuration.ConfigService;
import com.itvitae.stackunderflow.user.Award;
import com.itvitae.stackunderflow.user.User;
import com.itvitae.stackunderflow.user.UserRepository;
import com.itvitae.stackunderflow.useranswervote.UserAnswerVote;
import com.itvitae.stackunderflow.useranswervote.UserAnswerVoteRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.Month;
import java.time.YearMonth;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LeaderboardRunner implements CommandLineRunner {
    public static final String leaderboardMonthConfig = "current-leaderboard-month";

    private final UserRepository userRepository;

    private final AnswerRepository answerRepository;
    private final UserAnswerVoteRepository userAnswerVoteRepository;

    private final ConfigService configService;


    public void run(String[] args) {
        Optional<String> lastMonthStr = configService.get(leaderboardMonthConfig);

        if (lastMonthStr.isEmpty()) {
            updateLeaderboard();
            return;
        }

        YearMonth currentLeaderboardMonth = YearMonth.parse(lastMonthStr.get());
        YearMonth lastMonth = getCurrentYearMonth().minusMonths(1);
        if (!currentLeaderboardMonth.equals(lastMonth)) updateLeaderboard();
    }


    @Scheduled(cron = "0 0 0 1 * ?")
    @Transactional
    public void updateLeaderboard() {
        YearMonth lastMonth = getCurrentYearMonth().minusMonths(1);

        for (User user : userRepository.findAll()) {
            long totalPoints = getUserPointsForYearMonth(user, lastMonth);
            user.setLastMonthPoints(totalPoints);
            userRepository.save(user);
        }

        long previousRank = 1;
        Long previousPoints = 0L;
        List<User> sortedUsers = userRepository.findAllByOrderByLastMonthPointsDesc();
        for (int i = 0; i < sortedUsers.size(); i++) {
            User user = sortedUsers.get(i);
            Long points = user.getLastMonthPoints();

            if (points == null || points <= 0) {
                user.setAward(Award.NONE);
                user.setLastMonthRank(null);
                continue;
            }

            long rank = i + 1;
            if (previousPoints.equals(points)) {
                rank = previousRank;
            }

            Award award = Award.NONE;
            if (rank == 1) award = Award.FIRST;
            if (rank == 2) award = Award.SECOND;
            if (rank == 3) award = Award.THIRD;
            user.setAward(award);
            user.setLastMonthRank(rank);
            previousRank = rank;
            previousPoints = points;
        }

        userRepository.saveAll(sortedUsers);
        configService.set(leaderboardMonthConfig, lastMonth.toString());
    }

    private long getUserPointsForYearMonth(User user, YearMonth yearMonth) {
        long points = 0;
        for (Answer answer : answerRepository.findByUserAndEnabledTrue(user)) {
            YearMonth ansYearMonth = getYearMonthOfDate(answer.getDate());

            if (yearMonth.equals(ansYearMonth)) {
                List<UserAnswerVote> votes = userAnswerVoteRepository.findByAnswer(answer);
                for (UserAnswerVote vote : votes) {
                    points += vote.getIsUpvote() ? 1 : -1;
                }
            }
        }
        return points;
    }

    private YearMonth getCurrentYearMonth() {
        LocalDateTime lastMonthDate = LocalDateTime.now();
        int year = lastMonthDate.getYear();
        Month month = lastMonthDate.getMonth();
        return YearMonth.of(year, month);
    }

    private YearMonth getYearMonthOfDate(LocalDateTime date) {
        int year = date.getYear();
        Month month = date.getMonth();
        return YearMonth.of(year, month);
    }
}
