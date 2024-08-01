import NavbarComponent from 'Frontend/components/Navbar'
import React, { useEffect, useState } from 'react'
import Contact from "generated/com/phone/book/entity/Contact"
import Respons from "generated/com/phone/book/dto/response/Response"
import Status from "generated/com/phone/book/dto/Status"
import { ContactService } from 'Frontend/generated/endpoints';
import { useSelector } from 'react-redux';
import { RootState } from '../storage/rootReducer';

function Home() {

    const [contacts, setContacts] = useState<Contact[]>([]);
    const token:string = useSelector((state: RootState) => state.token.token);

    useEffect(() => {
        const fetchContacts = async () => {
          try {
            const response:Contact[] = await ContactService.getContacts(token);
            setContacts(response);
            console.log(contacts);
          } catch (error) {
            console.error("Error fetching books:", error);
          }
        };
    
        fetchContacts();
    }, []);

    return ( 
        <div className='home-page'>
            <NavbarComponent/>

        </div>
    )
}

export default Home