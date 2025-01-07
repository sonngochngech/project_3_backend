//package com.core.place.integrationTests.controllers;
//
//import com.core.place.dto.ItineraryDto;
//import com.core.place.entities.Activity;
//import com.core.place.integrationTests.base.ServiceTestSupport;
//import com.core.place.payloads.BaseResponse;
//import com.core.place.payloads.requests.ItineraryReqDto;
//import lombok.extern.slf4j.Slf4j;
//import org.junit.jupiter.api.*;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.core.ParameterizedTypeReference;
//import org.springframework.http.HttpEntity;
//import org.springframework.http.HttpMethod;
//import org.springframework.http.ResponseEntity;
//import org.springframework.test.context.ActiveProfiles;
//import org.springframework.test.context.junit.jupiter.SpringExtension;
//
//import java.text.ParseException;
//import java.text.SimpleDateFormat;
//import java.util.Arrays;
//import java.util.Date;
//import java.util.List;
//
//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//@ExtendWith(SpringExtension.class)
//@ActiveProfiles("test")
//@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
//@Slf4j
//public class ItineraryControllerIntegrationTest extends ServiceTestSupport {
//
//
//
//    @BeforeEach void setUp() {
//
//    }
//
//    @Test
//    @DisplayName("Happy Path Test: get Itinerary")
//    @Order(1)
//    void givenItineraryRequired_whenGetItinerary_thenReturnItineraryDTO() throws Exception {
////        given
//        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
//        Date startDate = null;
//        Date endDate = null;
//        try {
//            startDate = dateFormat.parse("2021-12-12");
//            System.out.println("Date Format "+startDate);
//            endDate = dateFormat.parse("2021-12-15");
//        } catch (ParseException e) {
//
//            e.printStackTrace();
//        }
//        ItineraryReqDto itineraryReqDto=ItineraryReqDto.builder()
//                .budget(50000)
//                .departureCode(24L)
//                .destinationCode(22L)
//                .startDate(startDate)
//                .endDate(endDate)
//                .userPreferences(Arrays.asList("Nature","Foodie","Shopping"))
//                .startTime(7)
//                .endTime(22)
//                .build();
//
//        final HttpEntity<String> httpEntity = new HttpEntity<>(objectMapper.writeValueAsString(itineraryReqDto),unAuthHeader());
//        //when
//        final ResponseEntity<BaseResponse<ItineraryDto>> response = testRestTemplate.exchange("/api/v1/itinerary", HttpMethod.POST, httpEntity, new ParameterizedTypeReference<BaseResponse<ItineraryDto>>() {});
//
//        //then
//        Integer total=0;
//        Integer price=0;
//        List<List<Activity>> activitiesList=response.getBody().getData().getActivities();
//        for(List<Activity> activities:activitiesList){
//            for(Activity activity:activities){
//                System.out.println("Activity "+activity);
//                total+=activity.getDuration();
//                if(activity.getPrice()!=null){
//                    price+=activity.getPrice();
//                }
//            }
//        }
//
//        assert total==40;
//        assert  price<50000;
//
//
//    }
//}
