import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addChannel } from '../../actions/index.js';

export default ({ hideModal }) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
    onReset: () => hideModal(),
  });

  return (
    <Modal show onHide={hideModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
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
          <Button variant="outline-success" type="submit">Add</Button>
          {' '}
          <Button variant="outline-secondary" type="reset">Cancel</Button>
          {' '}
        </Form>
      </Modal.Body>
    </Modal>
  );
};
