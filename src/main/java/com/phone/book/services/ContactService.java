/**
 * author @bhupendrasambare
 * Date   :02/08/24
 * Time   :1:00 am
 * Project:PhoneBook-SpringBoot-Vaadin-Hilla
 **/
package com.phone.book.services;

import com.phone.book.dto.Constants;
import com.phone.book.dto.Status;
import com.phone.book.dto.response.Response;
import com.phone.book.entity.Contact;
import com.phone.book.entity.Users;
import com.phone.book.repository.ContactRepository;
import com.phone.book.repository.UserRepository;
import com.phone.book.utility.JwtUtil;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@BrowserCallable
@AnonymousAllowed
@Service
@Slf4j
public class ContactService {

    @Autowired
    private JwtUtil util;

    @Autowired
    private ContactRepository contactRepository;
    @Autowired
    private UserRepository userRepository;

    public Response saveContact(Contact request, String token){
        Response response = new Response();
        try{
            if(request.getName()!=null && !request.getName().isEmpty()){
                response = new Response(Status.FAILED, Constants.VALIDITY_FAILED_CODE,Constants.NAME_IS_REQUIRED);
            }else if ((request.getPhoneNumber()!=null && !request.getPhoneNumber().isEmpty()) ||
                    request.getEmail()!=null && !request.getEmail().isEmpty()){
                response = new Response(Status.FAILED,Constants.VALIDITY_FAILED_CODE,Constants.PHONE_OR_EMAIL_IS_REQUIRED);
            }
            request.setCreatedDate(LocalDateTime.now());
            String username = util.extractUsername(token);
            Users users = userRepository.findByUsername(username).orElse(null);
            if(users!=null){
                request.setCreatedBy(username);
                request = contactRepository.save(request);
                response.setData(request);
            }else{
                response = new Response(Status.FAILED,Constants.UNAUTHORIZED_REQUEST_CODE,Constants.UNAUTHORIZED_REQUEST);
            }
        }catch (Exception e){
            response = new Response(e);
        }
        return response;
    }

    public List<Contact> getContacts(String token){
        List<Contact> contacts = new ArrayList<>();
        try{
            String username = util.extractUsername(token);
            Users users = userRepository.findByUsername(username).orElse(null);
            if(users!=null){
                contacts = contactRepository.findAllByCreatedBy(username);
            }
        }catch (Exception e){
            log.error(" while fetching contacts ERROR : {}",e.getMessage());
        }
        return contacts;
    }


}
