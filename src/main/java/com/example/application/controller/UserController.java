/**
 * author @bhupendrasambare
 * Date   :30/07/24
 * Time   :1:54 am
 * Project:phone-book
 **/
package com.example.application.controller;

import com.example.application.dto.request.AuthRequest;
import com.example.application.entity.Users;
import com.example.application.repository.UserRepository;
import com.example.application.utility.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/phone-book/user")
@CrossOrigin(origins = "*",allowedHeaders = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @PostMapping("/authenticate")
    public String authenticate(@RequestBody AuthRequest authRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );
        } catch (Exception ex) {
            throw new Exception("Invalid username/password");
        }
        return jwtUtil.generateToken(authRequest.getUsername());
    }

    @PostMapping("/register")
    public String register(@RequestBody Users user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRoles("ROLE_USER");
        user.setId(null);
        userRepository.save(user);
        return "User registered successfully";
    }
}
