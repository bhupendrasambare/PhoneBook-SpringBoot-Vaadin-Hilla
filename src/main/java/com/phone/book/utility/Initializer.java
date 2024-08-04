/**
 * author @bhupendrasambare
 * Date   :04/08/24
 * Time   :9:35 pm
 * Project:PhoneBook-SpringBoot-Vaadin-Hilla
 **/
package com.phone.book.utility;

import com.phone.book.entity.Users;
import com.phone.book.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@Slf4j
public class Initializer {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @PostConstruct
    public void CreatePrimaryUser(){
        if (userRepository.findByUsername("admin").orElse(null) != null) {
            return;
        }
        Users user = new Users();
        user.setUsername("admin");
        user.setPassword(passwordEncoder.encode("admin"));
        user.setRoles("ROLE_USER");
        user = userRepository.save(user);
        log.info("Default user Created  Username : {}, password {}",user.getUsername(),"admin");
    }
}
