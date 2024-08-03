import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

interface MyVerticallyCenteredModalProps {
    show: boolean;
    onHide: () => void;
    onSubmit: (name: string, email: string, phone: string) => void;
}
  
const MyVerticallyCenteredModal: React.FC<MyVerticallyCenteredModalProps> = (props) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    const [nameError, setNameError] = useState<string>('');
    const [contactError, setContactError] = useState<string>('');

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        if (nameError) setNameError(''); // Clear the error if it exists
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (contactError) setContactError(''); // Clear the error if it exists
    };

    const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
        if (contactError) setContactError(''); // Clear the error if it exists
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        let valid = true;
        if (!name) {
            setNameError('Name is required');
            valid = false;
        }
        if (!email && !phone) {
            setContactError('Either email or phone number is required');
            valid = false;
        }

        if (!valid) return;

        props.onSubmit(name, email, phone);
        props.onHide();
        setName("");setPhone("");setEmail("");
        setNameError("");setContactError("");
    };

    return (
        <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Add contact
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={handleNameChange}
                autoFocus
                />
                {nameError && <small className="text-danger">{nameError}</small>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={handleEmailChange}
                />
                {contactError && <small className="text-danger">{contactError}</small>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                type="tel"
                placeholder="9178XXXXXX"
                value={phone}
                onChange={handlePhoneChange}
                />
                {contactError && <small className="text-danger">{contactError}</small>}
            </Form.Group>
            <Modal.Footer>
                <Button type="submit" className='btn-success'>Save</Button>
                <Button className='btn-danger' onClick={props.onHide}>Close</Button>
            </Modal.Footer>
            </Form>
        </Modal.Body>
        </Modal>
    );
};

export default MyVerticallyCenteredModal;