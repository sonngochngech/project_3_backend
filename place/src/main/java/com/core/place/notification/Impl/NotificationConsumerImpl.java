package com.core.place.notification.Impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.core.place.dto.ExpoNotiDTO;
import com.core.place.dto.FcmDTO;
import com.core.place.notification.NotificationConsumer;
import com.core.place.utils.ExpoPushService;
import com.rabbitmq.client.Channel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
public class NotificationConsumerImpl implements NotificationConsumer {

    @Autowired
    private RabbitTemplate rabbitTemplate;


    @Autowired
    private ExpoPushService expoPushService;

    @Autowired
    private ObjectMapper objectMapper;


    @Override
    @RabbitListener(queues = "fcm.queue",ackMode = "MANUAL")
    public void receiveFcmMessage(String message) throws Exception {
        log.info("Fcm message received: {}", message);

        try{

            FcmDTO fcmDTO = objectMapper.readValue(message, FcmDTO.class);
            ExpoNotiDTO expoNotiDTO = ExpoNotiDTO.builder()
                    .body(fcmDTO.getNotiContentDTO().getMessage())
                    .title(fcmDTO.getNotiContentDTO().getTitle())
                    .externalData(objectMapper.writeValueAsString(fcmDTO.getNotiContentDTO()))
                    .token(fcmDTO.getDevices().stream().toList())
                    .build();

            expoPushService.sendPushNotification(expoNotiDTO);
        }catch (JsonProcessingException e){
            System.out.println("Error parsing fcm message: " + e.getMessage());
        }catch (Exception e){
            log.error("Error acknowledging message: " + e.getMessage());
        }
    }
}
