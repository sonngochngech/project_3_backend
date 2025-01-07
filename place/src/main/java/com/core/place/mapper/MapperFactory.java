package com.core.place.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MapperFactory {

    @Autowired
    private ModelMapper modelMapper;

    public MapperFactory(ModelMapper modelMapper){
        NotiMapper.toFcmDTO(modelMapper);

    }

}
