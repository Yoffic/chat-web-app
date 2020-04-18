import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { asyncActions } from '../../slices/index.js';

export default ({ hideModal }) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const dispatch = useDispatch();

  const addNewChannel = async (values) => {
    dispatch(asyncActions.addChannels(values.name));
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
              disabled={formik.isSubmitting}
              required
              ref={inputRef}
            />
          </Form.Group>
          <Button variant="outline-success" type="submit" disabled={formik.isSubmitting}>Add</Button>
          {' '}
          <Button variant="outline-secondary" type="reset" disabled={formik.isSubmitting}>Cancel</Button>
          {' '}
        </Form>
      </Modal.Body>
    </Modal>
  );
};
