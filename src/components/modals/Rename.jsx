import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { renameChannel } from '../../actions/index.js';

export default ({ hideModal, modalData }) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.select();
  }, []);

  const dispatch = useDispatch();

  const renameCustomChannel = async (values) => {
    if (values.name.length === 0) {
      return;
    }
    await dispatch(renameChannel({ name: values.name, id: modalData.channel.id }));
    hideModal();
  };

  const formik = useFormik({
    initialValues: {
      name: modalData.channel.name,
    },
    onSubmit: renameCustomChannel,
    onReset: () => hideModal(),
  });

  return (
    <Modal show onHide={hideModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Rename Channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <Form.Group>
            <Form.Label>Enter New Channel Name</Form.Label>
            <Form.Control
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              value={formik.values.name}
              disabled={formik.isSubmitting}
              ref={inputRef}
            />
          </Form.Group>
          <Button variant="outline-success" type="submit" disabled={formik.isSubmitting}>Rename</Button>
          {' '}
          <Button variant="outline-secondary" type="reset" disabled={formik.isSubmitting}>Cancel</Button>
          {' '}
        </Form>
      </Modal.Body>
    </Modal>
  );
};
