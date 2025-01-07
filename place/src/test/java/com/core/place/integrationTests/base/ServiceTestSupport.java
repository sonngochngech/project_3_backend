//package com.core.place.integrationTests.base;
//
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.web.client.TestRestTemplate;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.MediaType;
//import org.springframework.test.context.ActiveProfiles;
//import org.springframework.test.context.junit.jupiter.SpringExtension;
//
//
//
//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//@ExtendWith(SpringExtension.class)
//@ActiveProfiles("test")
//public class ServiceTestSupport {
//
//
//    @Autowired
//    protected TestRestTemplate testRestTemplate;
//
//    protected ObjectMapper objectMapper=new ObjectMapper();
//
//    @BeforeEach void setup() {
//
//    }
//
//
//    protected HttpHeaders unAuthHeader(){
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        return headers;
//    }
//}
