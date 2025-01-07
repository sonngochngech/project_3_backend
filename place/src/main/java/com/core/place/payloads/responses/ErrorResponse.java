package com.core.place.payloads.responses;

import com.core.place.payloads.BaseResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ErrorResponse  extends BaseResponse<Void> {
    private String code;
    private String message;



}
