package com.example.application.repository;

import com.example.application.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact,Integer> {

    @Query("Select u from Contact u where u.createdBy LIKE ?1 order by u.id DESC")
    List<Contact> findAllByCreatedBy(String currentUsername);
}
