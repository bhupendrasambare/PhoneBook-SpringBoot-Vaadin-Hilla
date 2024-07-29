/**
 * author @bhupendrasambare
 * Date   :30/07/24
 * Time   :1:56 am
 * Project:phone-book
 **/
package com.example.application.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AuthRequest {
    private String username;
    private String password;
}
