package com.core.place.notification;

import com.rabbitmq.client.Channel;
import org.springframework.amqp.core.Message;

public interface NotificationConsumer {


    public void receiveFcmMessage(String message) throws Exception;
}
