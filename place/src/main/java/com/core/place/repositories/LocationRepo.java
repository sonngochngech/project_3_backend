package com.core.place.repositories;

import com.core.place.entities.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LocationRepo extends JpaRepository<Location,Long> {

    Optional<List<Location>> findAllByCityId(Long cityId);
}
