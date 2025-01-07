package com.core.place.entities;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity(name="foods")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Food {

    @Id
    private Long id;

    private String name;


    @ManyToOne
    @JoinColumn(name = "city_id")
    private City city;
}
