package com.itvitae.stackunderflow.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByUsernameIgnoreCase(String username);

    List<User> findAllByOrderByLastMonthPointsDesc();

    Page<User> findAllByLastMonthRankNotNull(Pageable pageable);
}
