import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import MyVerticallyCenteredModal from './MyVerticallyCenteredModal';
import { ContactService } from 'Frontend/generated/endpoints';
import { useSelector } from 'react-redux';
import { RootState } from 'Frontend/storage';
import Contact from 'Frontend/generated/com/phone/book/entity/Contact';

interface CreateContactProps {
    changeNumber: number;
    onChangeNumber: (update: number) => void;
}


const CreateContact: React.FC<CreateContactProps> = (prop) => {
    const [modalShow, setModalShow] = useState(false);
    const token:string|null = useSelector((state: RootState) => state.auth.token);

    const handleFormSubmit = async(name: string, email: string, phone: string) => {
        console.log('Contacts:', name);
        const contact:Contact = {
            "name":name,
            "email": email,
            "phoneNumber": phone
        }
        if(token!=null){
            await ContactService.saveContact(contact,token)
            prop.onChangeNumber(prop.changeNumber+1);
        }
    };

    return (
        <>
            <div className="w-100 d-flex">
                <Button className='my-2 ms-auto bg-success bg-gradient mx-3' variant="success" onClick={() => setModalShow(true)}>
                Add contact
                </Button>
            </div>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                onSubmit={handleFormSubmit}
            />
        </>
    );
};

export default CreateContact;
