package com.core.place.config;

import io.github.jav.exposerversdk.PushClient;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Bean
    public ModelMapper modelMapper(){
        ModelMapper modelMapper= new ModelMapper();
        modelMapper.getConfiguration().setSkipNullEnabled(true);

        return modelMapper;
    }

    @Bean
    public PushClient pushClient() {
        return new PushClient();
    }
}
