package com.core.place.notification;

import com.core.place.dto.NotiDTO;

public interface NotificationProducer {

    public void sendMessage(NotiDTO notiDTO);



}
