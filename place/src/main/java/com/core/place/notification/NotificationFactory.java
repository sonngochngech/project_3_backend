package com.core.place.notification;

import com.core.place.dto.NotiDTO;
import com.core.place.dto.NotificationDTO;

public interface NotificationFactory {
    public NotiDTO VerifyCodeNoti(String email, String code);

    public NotiDTO sendExpriedNoti(String email, String content);

    public NotiDTO sendInvitationNoti(String email, String content);

    public NotiDTO sendNotification(NotificationDTO notificationDTO);
}
