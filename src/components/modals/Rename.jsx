import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { asyncActions } from '../../slices/index.js';

export default ({ hideModal, modalData }) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.select();
  }, []);

  const dispatch = useDispatch();

  const renameCustomChannel = (values) => {
    const channelData = { name: values.name, id: modalData.channel.id };
    dispatch(asyncActions.renameChannel(channelData));
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
