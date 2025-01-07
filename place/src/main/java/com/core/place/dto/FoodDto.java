package com.core.place.dto;


import com.core.place.entities.City;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FoodDto {

    private String id;
    private String name;
    private City city;

}
