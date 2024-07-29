/**
 * author @bhupendrasambare
 * Date   :30/07/24
 * Time   :1:55 am
 * Project:phone-book
 **/
package com.example.application.controller;

import com.example.application.dto.request.AuthRequest;
import com.example.application.entity.Contact;
import com.example.application.exception.ResourceNotFoundException;
import com.example.application.repository.ContactRepository;
import com.example.application.utility.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/phone-book/api")
@CrossOrigin(origins = "*",allowedHeaders = "*")
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    @GetMapping("/contacts")
    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    @PostMapping("/contacts")
    public Contact createContact(@RequestBody Contact contact) {
        return contactRepository.save(contact);
    }

    @PutMapping("/contacts/{id}")
    public Contact updateContact(@PathVariable Integer id, @RequestBody Contact contactDetails) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact not found"));
        contact.setName(contactDetails.getName());
        contact.setEmail(contactDetails.getEmail());
        contact.setPhoneNumber(contactDetails.getPhoneNumber());
        return contactRepository.save(contact);
    }

    @DeleteMapping("/contacts/{id}")
    public void deleteContact(@PathVariable Integer id) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact not found"));
        contactRepository.delete(contact);
    }
}

