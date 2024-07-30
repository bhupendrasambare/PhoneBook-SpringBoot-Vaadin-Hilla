/**
 * author @bhupendrasambare
 * Date   :31/07/24
 * Time   :12:25 am
 * Project:phone-book
 **/
package com.example.application.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Response {
    private String status;
    private String message;
    private Object data;
}
