package com.core.place.controller;


import com.core.place.dto.ItineraryDto;
import com.core.place.payloads.BaseResponse;
import com.core.place.payloads.requests.ItineraryReqDto;
import com.core.place.services.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/core/itinerary")
public class ItineraryController {

    @Autowired
    private ActivityService activityService;

    @PostMapping("")
    public ResponseEntity<BaseResponse<ItineraryDto>> getItinerary(@RequestBody ItineraryReqDto itineraryReq) {

        ItineraryDto itinerary = activityService.findActivities(itineraryReq);
        return ResponseEntity.ok(new BaseResponse<>("hello", "200", itinerary));
    }



}
