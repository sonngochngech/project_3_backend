package com.core.place.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NotificationDTO {
    private String id;
    private String title;
    private String message;
    private String type;
    private String externalData;
    private Set<String> devices=new HashSet<>();

}
