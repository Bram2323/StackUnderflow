package com.itvitae.stackunderflow.configuration;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ConfigService {
    private final ConfigRepository configRepository;


    @Transactional
    public void set(String key, String value) {
        if (key == null) throw new IllegalArgumentException("Key can't be null!");

        Optional<ConfigEntry> possibleEntry = configRepository.findByKey(key);
        if (value == null) {
            if (possibleEntry.isPresent()) {
                ConfigEntry entry = possibleEntry.get();
                configRepository.delete(entry);
            }
            return;
        }

        if (possibleEntry.isPresent()) {
            ConfigEntry entry = possibleEntry.get();
            entry.setValue(value);
            configRepository.save(entry);
            return;
        }

        ConfigEntry entry = new ConfigEntry(key, value);
        configRepository.save(entry);
    }

    public Optional<String> get(String key) {
        return configRepository.findByKey(key).map(ConfigEntry::getValue);
    }
}
