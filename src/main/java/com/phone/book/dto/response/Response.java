/**
 * author @bhupendrasambare
 * Date   :31/07/24
 * Time   :12:25 am
 * Project:phone-book
 **/
package com.phone.book.dto.response;

import com.phone.book.dto.Constants;
import com.phone.book.dto.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Response {
    private Status status = Status.SUCCESS;
    private String code = Constants.SUCCESS_CODE;
    private String message = Constants.SUCCESS;
    private Object data;

    public Response(Exception e){
        this.code = Constants.INTERNAL_SERVER_ERROR_CODE;
        this.message = e.getMessage();
        this.status = Status.FAILED;
    }

    public Response(String message){
        this.message = message;
    }

    public Response(Status status,String code,String message){
        this.status = status;
        this.code = code;
        this.message = message;
    }

}
