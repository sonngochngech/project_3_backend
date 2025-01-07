package com.core.place.services;

import com.core.place.config.constant.PlaceConfig;
import com.core.place.dto.PlaceDto;
import com.core.place.entities.Location;
import com.core.place.repositories.LocationRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {

    @Autowired
    private LocationRepo locationRepo;

    @Autowired
    private ModelMapper modelMapper;

   public PlaceDto getPlace(Long id){
       Location location=locationRepo.findById(id).orElseThrow(()->new RuntimeException("Error"));
       return modelMapper.map(location,PlaceDto.class);
   }

   public List<PlaceConfig>  findPlacesInCity(){

       return null;
   }

   public  List<PlaceDto> getPlaceList(Long cityId){
       List<Location> locations=locationRepo.findAllByCityId(cityId).orElseThrow(()->new RuntimeException("Error"));

       return locations.stream().map(location -> modelMapper.map(location,PlaceDto.class)).toList();
   }
}
