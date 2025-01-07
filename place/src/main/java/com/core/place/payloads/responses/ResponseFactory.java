package com.core.place.payloads.responses;

import com.core.place.payloads.BaseResponse;
import org.springframework.stereotype.Component;

@Component
public class ResponseFactory {

    public static <T> BaseResponse<T> createResponse(T data, String message, String code ) {
        BaseResponse<T> response = new BaseResponse<>();
        response.setData(data);
        response.setMessage(message);
        response.setCode(code);
        return response;
    }


}
