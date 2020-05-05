import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { asyncActions } from '../../slices/index.js';

export default ({ hideModal }) => {
  const { t } = useTranslation();

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  const dispatch = useDispatch();

  const addNewChannel = async (values, actions) => {
    try {
      await dispatch(asyncActions.addChannels(values.name));
      hideModal();
    } catch (e) {
      actions.setStatus(t('errors.network'));
    }
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
        <h6 className="text-danger">
          {formik.status}
        </h6>
        <Form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <Form.Group>
            <Form.Label>Enter New Channel Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
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
