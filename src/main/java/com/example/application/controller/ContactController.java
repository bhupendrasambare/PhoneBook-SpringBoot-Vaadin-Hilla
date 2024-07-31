/**
 * author @bhupendrasambare
 * Date   :30/07/24
 * Time   :1:55 am
 * Project:phone-book
 **/
package com.example.application.controller;

import com.example.application.dto.response.Response;
import com.example.application.entity.Contact;
import com.example.application.exception.ResourceNotFoundException;
import com.example.application.repository.ContactRepository;
import com.example.application.utility.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/phone-book/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Tag(name = "Contact Management", description = "Operations pertaining to contacts in the Phone Book application")
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private JwtUtil util;

    @Operation(summary = "Get all contacts", description = "Retrieve all contacts created by the current user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful retrieval of contacts",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Contact.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized request"),
            @ApiResponse(responseCode = "403", description = "Access forbidden"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/contacts")
    public ResponseEntity<?> getAllContacts() {
        String username = util.getCurrentUsername();
        List<Contact> contacts = contactRepository.findAllByCreatedBy(username);
        return ResponseEntity.status(HttpStatus.OK).body(
                new Response("SUCCESS", "Contacts found", contacts)
        );
    }

    @Operation(summary = "Create a new contact", description = "Create a new contact for the current user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Contact successfully created",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Contact.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized request"),
            @ApiResponse(responseCode = "403", description = "Access forbidden"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping("/contacts")
    public ResponseEntity<?> createContact(@RequestBody Contact contact) {
        contact.setCreatedBy(util.getCurrentUsername());
        contact.setCreatedDate(LocalDateTime.now());
        return ResponseEntity.status(HttpStatus.OK).body(
                new Response("SUCCESS", "Contact created", contactRepository.save(contact))
        );
    }

    @Operation(summary = "Update an existing contact", description = "Update contact details for the given contact ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Contact successfully updated",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Contact.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized request"),
            @ApiResponse(responseCode = "403", description = "Access forbidden"),
            @ApiResponse(responseCode = "404", description = "Contact not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PutMapping("/contacts/{id}")
    public ResponseEntity<?> updateContact(@PathVariable Integer id, @RequestBody Contact contactDetails) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact not found"));
        contact.setName(contactDetails.getName());
        contact.setEmail(contactDetails.getEmail());
        contact.setPhoneNumber(contactDetails.getPhoneNumber());
        if (contact.getCreatedBy().equalsIgnoreCase(util.getCurrentUsername())) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new Response("SUCCESS", "Contact updated", contactRepository.save(contact))
            );
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new Response("FAIL", "Unauthorized request", null)
            );
        }
    }

    @Operation(summary = "Delete a contact", description = "Delete the contact with the given ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Contact successfully deleted"),
            @ApiResponse(responseCode = "401", description = "Unauthorized request"),
            @ApiResponse(responseCode = "403", description = "Access forbidden"),
            @ApiResponse(responseCode = "404", description = "Contact not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @DeleteMapping("/contacts/{id}")
    public ResponseEntity<?> deleteContact(@PathVariable Integer id) {
        Contact contact = contactRepository.findById(id)
                .orElse(null);
        if (contact != null) {
            if (contact.getCreatedBy().equalsIgnoreCase(util.getCurrentUsername())) {
                contactRepository.delete(contact);
                return ResponseEntity.status(HttpStatus.OK).body(
                        new Response("SUCCESS", "Contact deleted successfully", null)
                );
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                        new Response("FAIL", "Unauthorized request", null)
                );
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new Response("FAIL", "Contact not found", null)
            );
        }
    }
}