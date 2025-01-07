package com.core.place.services;


import com.core.place.dto.FoodDto;
import com.core.place.entities.Food;
import com.core.place.repositories.FoodRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodService {

    @Autowired
    private FoodRepo foodRepo;

    @Autowired
    private ModelMapper modelMapper;


    public List<FoodDto> getFoodList(Long cityId){
        List<Food> foods=foodRepo.findAllByCityId(cityId).orElseThrow(()->new RuntimeException("Error"));
        return foods.stream().map(food -> modelMapper.map(food,FoodDto.class)).toList();
    }
}
