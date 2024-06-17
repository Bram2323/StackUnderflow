package com.itvitae.stackunderflow.configuration;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "Configuration")
@NoArgsConstructor
@Getter
@Setter
public class ConfigEntry {

    @Id
    @GeneratedValue
    private Long id;

    @Column(unique = true)
    private String key;
    private String value;


    public ConfigEntry(String key, String value) {
        this.key = key;
        this.value = value;
    }
}
