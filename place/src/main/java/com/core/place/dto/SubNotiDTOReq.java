package com.core.place.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SubNotiDTOReq {

    private String title;
    private String message;
    private List<String> devices;
    private String externalData;
}
