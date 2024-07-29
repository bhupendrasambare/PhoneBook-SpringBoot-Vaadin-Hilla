/**
 * author @bhupendrasambare
 * Date   :30/07/24
 * Time   :1:50 am
 * Project:phone-book
 **/
package com.example.application.repository;

import com.example.application.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Users,Integer> {

    @Query("select u from Users u where u.username like ?1")
    Optional<Users> findByUsername(String username);
}
