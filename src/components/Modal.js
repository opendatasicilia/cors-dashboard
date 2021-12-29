import React, {useState} from 'react'
import { Button, Modal } from 'react-bootstrap';


export default function Popup({StyledButton, btnTitle, child}) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <StyledButton onClick={handleShow}>
          {btnTitle}
        </StyledButton>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton/>
          <Modal.Body className="p-4">
              {child}
            </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleClose}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }