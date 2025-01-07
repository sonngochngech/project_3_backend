package com.core.place.notification.Impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.core.place.dto.FcmDTO;
import com.core.place.dto.NotiDTO;
import com.core.place.notification.NotificationProducer;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
public class NotificationProducerImpl implements NotificationProducer {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public void    sendMessage(NotiDTO notiDTO)  {
        System.out.println("Sending message");
        if(!notiDTO.getMeanDTO().getDevices().isEmpty()){
            FcmDTO fcmDTO=modelMapper.map(notiDTO,FcmDTO.class);
                System.out.println("Sending fcm message");
                sendFcmMessage(fcmDTO);
        }

    }



    private void sendFcmMessage(FcmDTO fcmDTO) {
        try{
            rabbitTemplate.convertAndSend("app.exchange", "fcm", objectMapper.writeValueAsString(fcmDTO));
        }catch (Exception e){
            log.error("Error sending fcm message: {}",e.getMessage());
        }


    }
}
