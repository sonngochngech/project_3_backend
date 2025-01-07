package com.core.place.repositories;

import com.core.place.entities.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ActivityRepo extends JpaRepository<Activity,Long> {

    @Query(value="SELECT a.* FROM activities a JOIN locations l ON a.location_id=l.id WHERE l.city_id = ?1", nativeQuery = true)
    Optional<List<Activity>> findAllByCityId(Long cityId);
}
