/**
 * author @bhupendrasambare
 * Date   :30/07/24
 * Time   :1:57 am
 * Project:phone-book
 **/
package com.phone.book.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
