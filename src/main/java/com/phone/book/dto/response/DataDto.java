/**
 * author @bhupendrasambare
 * Date   :31/07/24
 * Time   :12:50 am
 * Project:phone-book
 **/
package com.phone.book.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class DataDto {
    private String username;
    private String token;
}
