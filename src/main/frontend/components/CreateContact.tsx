import React from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { render } from 'react-dom';

interface MyVerticallyCenteredModalProps {
  show: boolean;
  onHide: () => void;
}

const MyVerticallyCenteredModal: React.FC<MyVerticallyCenteredModalProps> = (props) => {


    

  return (
    <>
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
                
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="name"
                            placeholder="Johan dou"
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control
                            type="phone"
                            placeholder="9178XXXXXX"
                            autoFocus
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className='btn-success'>Save</Button>
                <Button className='btn-danger' onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    </>
  );
};

const CreateContact: React.FC = () => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
        <div className="w-100 d-flex">
            <Button className='my-2 ms-auto bg-success mx-3' variant="success" onClick={() => setModalShow(true)}>
                Add contact
            </Button>
        </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default CreateContact;