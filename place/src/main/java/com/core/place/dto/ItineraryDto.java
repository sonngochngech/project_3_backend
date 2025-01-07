package com.core.place.dto;

import com.core.place.entities.Activity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItineraryDto {
    private List<List<Activity>> activities;

    private Integer breakfastCount;

    private Integer lunchCount;

    private Integer dinnerCount;

}
