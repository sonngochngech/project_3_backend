package com.core.place.entities;


import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Table(name = "activities")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Activity {

    @Id
    private Long id;

    private String name;

    private String type;

    @ManyToMany
    @JoinTable(
            name = "activity_terms",
            joinColumns = @JoinColumn(name = "activity_id"),
            inverseJoinColumns = @JoinColumn(name = "term_id")
    )
    private Set<Term> terms= new HashSet<>();

    private Integer Duration;

    private Integer price;

    @OneToOne
    @JoinColumn(name = "location_id")
    private Location location;



}
