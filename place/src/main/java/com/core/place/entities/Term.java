package com.core.place.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "terms")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Term {

    @Id
    private Long id;

    private String name;
}
