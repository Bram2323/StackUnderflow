package com.itvitae.stackunderflow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class StackUnderflowApplication {

    public static void main(String[] args) {
        SpringApplication.run(StackUnderflowApplication.class, args);
    }

}
