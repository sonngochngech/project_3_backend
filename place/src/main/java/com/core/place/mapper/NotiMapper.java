package com.core.place.mapper;

import com.core.place.dto.FcmDTO;

import com.core.place.dto.NotiDTO;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MappingContext;

import java.util.ArrayList;
import java.util.List;

public class NotiMapper {


    public static void toFcmDTO(ModelMapper modelMapper){
        Converter<NotiDTO, FcmDTO> toFcmDTO = new Converter<NotiDTO, FcmDTO>() {
            @Override
            public FcmDTO convert(MappingContext<NotiDTO, FcmDTO> context) {
                NotiDTO source = context.getSource();
                FcmDTO fcmDTO = new FcmDTO();
                fcmDTO.setNotiContentDTO(source.getNotiContentDTO());
                fcmDTO.setDevices(source.getMeanDTO().getDevices());
                return fcmDTO;
            }
        };
        modelMapper.addConverter(toFcmDTO);
    }
}
