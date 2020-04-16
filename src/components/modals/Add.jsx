import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Modal, Button, Form,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addChannel } from '../../actions/index.js';

export default ({ hideModal }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [null]);

  const dispatch = useDispatch();

  const addNewChannel = async (values) => {
    if (values.name.length === 0) {
      return;
    }
    await dispatch(addChannel(values.name));
    hideModal();
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: addNewChannel,
  });

  return (
    <Modal autoFocus show onHide={hideModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label>Enter New Channel Name</Form.Label>
            <Form.Control
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              required
              ref={inputRef}
            />
          </Form.Group>
          <Button variant="success" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
