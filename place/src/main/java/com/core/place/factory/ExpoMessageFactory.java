package com.core.place.factory;

import com.core.place.dto.ExpoNotiDTO;
import io.github.jav.exposerversdk.ExpoPushMessage;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

import static com.core.place.config.constant.AppConstants.EXTERNAL_DATA;

@Component
@AllArgsConstructor

public class ExpoMessageFactory {

    public static ExpoPushMessage createExpoPushMessage(ExpoNotiDTO expoNotiDTO){
        System.out.println("Creating Expo Push Message");
        System.out.println(expoNotiDTO.getToken());
        ExpoPushMessage expoPushMessage = new ExpoPushMessage();
          expoPushMessage.setTo(expoNotiDTO.getToken());
          expoPushMessage.setBody(expoNotiDTO.getBody());
            expoPushMessage.setTitle(expoNotiDTO.getTitle());
          expoPushMessage.setData(new HashMap<>(Map.of(EXTERNAL_DATA,expoNotiDTO.getExternalData())));
          return expoPushMessage;
    }
}
