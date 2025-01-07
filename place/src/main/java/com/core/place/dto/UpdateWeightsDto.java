package com.core.place.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateWeightsDto {
    private Double placeQualityWeight;
    private Double placePopularityWeight;
    private Double placePreferenceWeight;
}
