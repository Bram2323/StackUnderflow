package com.itvitae.stackunderflow.exceptions;

public class UserNotFoundException extends Exception{
    public UserNotFoundException(){}

    public UserNotFoundException(String username) {
        super(username + " was not found!");
    }
}
