package com.core.place.controller;

import com.core.place.config.constant.PlaceConfig;
import com.core.place.dto.UpdateWeightsDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/core/optimization")
public class ConfigController {

    @PutMapping("/update-weights")
    public ResponseEntity<String> updateWeights(@RequestBody UpdateWeightsDto updateWeightsDto) {
        if (updateWeightsDto.getPlaceQualityWeight() != null) {
            PlaceConfig.PLACE_QUALITY_WEIGHT = updateWeightsDto.getPlaceQualityWeight();
        }
        if (updateWeightsDto.getPlacePopularityWeight() != null) {
            PlaceConfig.PLACE_POPULARITY_WEIGHT = updateWeightsDto.getPlacePopularityWeight();
        }
        if (updateWeightsDto.getPlacePreferenceWeight() != null) {
            PlaceConfig.PLACE_PREFERENCE_WEIGHT = updateWeightsDto.getPlacePreferenceWeight();
        }
        return ResponseEntity.ok("Weights updated successfully");
    }
}