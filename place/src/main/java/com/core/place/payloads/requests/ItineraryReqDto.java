package com.core.place.payloads.requests;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItineraryReqDto {

    private Date startDate;
    private Date endDate;

    private Integer startTime;
    private Integer endTime;

    private Long departureCode;
    private Long destinationCode;

    private List<String> userPreferences;

    private Integer budget;
}
