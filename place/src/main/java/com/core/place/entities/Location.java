package com.core.place.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "locations")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Location {

    @Id
    private Long id;

    private String title;

    private String address;

    private Double latitude;

    private Double longitude;

    private Double rating;

    private Long ratingCount;

    private String category;

    private String phoneNumber;

    private String website;

    private String description;

    private String cid;

    @ManyToOne
    @JoinColumn(name = "city_id")
    private City city;
}
