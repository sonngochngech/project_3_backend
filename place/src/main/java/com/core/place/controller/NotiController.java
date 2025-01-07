package com.core.place.controller;


import com.core.place.dto.NotiRequestDTO;
import com.core.place.dto.NotificationDTO;
import com.core.place.dto.SubNotiDTOReq;
import com.core.place.notification.NotificationFactory;
import com.core.place.notification.NotificationProducer;
import com.core.place.payloads.BaseResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;

@RestController
@RequestMapping("/api/v1/core/notis")
public class NotiController {


    @Autowired
    private NotificationFactory notificationFactory;

    @Autowired
    private NotificationProducer notificationProducer;

    @PostMapping("/create")
    public BaseResponse<Void> createNoti(@RequestBody NotiRequestDTO notiRequestDTO) {
        System.out.println("Create noti");
        System.out.println(notiRequestDTO);
        List<SubNotiDTOReq> subNotiDTOReqs = notiRequestDTO.getNotis();
        subNotiDTOReqs.forEach(subNotiDTOReq -> {
            System.out.println(subNotiDTOReq);
            NotificationDTO notificationDTO = NotificationDTO.builder()
                    .title(subNotiDTOReq.getTitle())
                    .message(subNotiDTOReq.getMessage())
                    .type("normal")
                    .externalData(subNotiDTOReq.getExternalData())
                    .devices(new HashSet<>(subNotiDTOReq.getDevices()))
                    .build();
            System.out.println(notificationDTO);
            notificationProducer.sendMessage(notificationFactory.sendNotification(notificationDTO));
        });
        return new BaseResponse<>("Success","200",null);
    }
}
