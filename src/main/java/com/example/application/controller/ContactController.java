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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/phone-book/api")
@CrossOrigin(origins = "*",allowedHeaders = "*")
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private JwtUtil util;

    @GetMapping("/contacts")
    public ResponseEntity<?> getAllContacts() {
        return ResponseEntity.status(HttpStatus.OK).body(
            new Response("SUCCESS",
                "Contact found",
                contactRepository.findAllByCreatedBy(util.getCurrentUsername()))
        );
    }

    @PostMapping("/contacts")
    public ResponseEntity<?> createContact(@RequestBody Contact contact) {
        contact.setCreatedBy(util.getCurrentUsername());
        contact.setCreatedDate(LocalDateTime.now());
        return ResponseEntity.status(HttpStatus.OK).body(
            new Response("SUCCESS",
                "Contact created",
                contactRepository.save(contact))
        );
    }

    @PutMapping("/contacts/{id}")
    public ResponseEntity<?> updateContact(@PathVariable Integer id, @RequestBody Contact contactDetails) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact not found"));
        contact.setName(contactDetails.getName());
        contact.setEmail(contactDetails.getEmail());
        contact.setPhoneNumber(contactDetails.getPhoneNumber());
        if(contact.getCreatedBy().equalsIgnoreCase(util.getCurrentUsername())){
            return ResponseEntity.status(HttpStatus.OK).body(
                new Response("SUCCESS",
                "Contact created",
                        contactRepository.save(contact)
            ));
        }else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
            new Response("FAIL",
                "Un-Authorized request",
                null
            ));
        }

    }

    @DeleteMapping("/contacts/{id}")
    public ResponseEntity<?> deleteContact(@PathVariable Integer id) {
        Contact contact = contactRepository.findById(id)
                .orElse(null);
        if(contact!=null){
            if(contact.getCreatedBy().equalsIgnoreCase(util.getCurrentUsername())){
                contactRepository.delete(contact);
                return ResponseEntity.status(HttpStatus.OK).body(
                    new Response("SUCCESS",
                        "Contact deleted successfully",
                        null
                ));
            }else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new Response("FAIL",
                            "Un-Authorized request",
                            null
                ));
            }
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new Response("FAIL",
                        "Contact not found",
                        null
            ));
        }

    }
}

