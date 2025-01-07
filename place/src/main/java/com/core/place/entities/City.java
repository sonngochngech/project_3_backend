package com.core.place.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "cities")
@Builder
public class City {
    @Id
    private Long id;

    private String name;

    @Builder.Default
    private Boolean supported= Boolean.TRUE;
}
