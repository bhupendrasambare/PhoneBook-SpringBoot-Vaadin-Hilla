/**
 * author @bhupendrasambare
 * Date   :30/07/24
 * Time   :1:54 am
 * Project:phone-book
 **/
package com.phone.book.controller;

import com.phone.book.dto.Constants;
import com.phone.book.dto.Status;
import com.phone.book.dto.request.AuthRequest;
import com.phone.book.dto.response.DataDto;
import com.phone.book.dto.response.Response;
import com.phone.book.entity.Users;
import com.phone.book.repository.UserRepository;
import com.phone.book.utility.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/phone-book/user")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Tag(name = "User Management", description = "Operations related to user authentication and registration")
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

    @Operation(summary = "Authenticate user", description = "Authenticate the user and generate a JWT token")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully authenticated and returned JWT token",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Response.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized - Invalid username/password"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping("/authenticate")
    public ResponseEntity<Response> authenticate(@RequestBody AuthRequest authRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new Response(Status.FAILED, Constants.INVALID_PASSWORD,"Invalid username/password", null)
            );
        }
        String token = jwtUtil.generateToken(authRequest.getUsername());
        DataDto dataDto = new DataDto(authRequest.getUsername(), token);
        return ResponseEntity.ok(new Response(Status.SUCCESS,Constants.SUCCESS_CODE, "Authentication successful", dataDto));
    }

    @Operation(summary = "Register a new user", description = "Register a new user and save to the database")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully registered user",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Response.class))),
            @ApiResponse(responseCode = "400", description = "Bad request - Username already exists"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping("/register")
    public ResponseEntity<Response> register(@RequestBody Users user) {
        if (userRepository.findByUsername(user.getUsername()).orElse(null) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new Response(Status.FAILED,Constants.USER_ALREADY_EXIST_CODE, "Username already exists", null)
            );
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRoles("ROLE_USER");
        user = userRepository.save(user);
        return ResponseEntity.ok(new Response(Status.SUCCESS,Constants.SUCCESS_CODE, "User registered successfully", user));
    }
}
