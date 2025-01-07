package com.core.place.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NotiContentDTO {
    private String title;
    private String message;
    private String externalData;
    private String type;

}
