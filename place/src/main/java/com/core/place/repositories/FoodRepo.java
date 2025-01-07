package com.core.place.repositories;


import com.core.place.entities.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface FoodRepo  extends JpaRepository<Food,Long> {

    Optional<List<Food>> findAllByCityId(Long cityId);
}
