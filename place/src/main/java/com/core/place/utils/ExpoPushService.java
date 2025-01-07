package com.core.place.utils;

import com.core.place.dto.ExpoNotiDTO;
import com.core.place.factory.ExpoMessageFactory;
import io.github.jav.exposerversdk.PushClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ExpoPushService {

    @Autowired
    private PushClient pushClient;


    public void sendPushNotification(ExpoNotiDTO expoNoti){
        System.out.println("Sending push notification");
        System.out.println(expoNoti);
        pushClient.sendPushNotificationsAsync(List.of(ExpoMessageFactory.createExpoPushMessage(expoNoti)));
    }
}
