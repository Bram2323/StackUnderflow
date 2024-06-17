package com.itvitae.stackunderflow.configuration;

import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface ConfigRepository extends CrudRepository<ConfigEntry, Long> {
    Optional<ConfigEntry> findByKey(String key);
}
