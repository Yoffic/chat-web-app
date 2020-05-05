import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { asyncActions } from '../../slices/index.js';

export default ({ hideModal, modalData }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const removeChannel = async (values, actions) => {
    try {
      await dispatch(asyncActions.removeChannel(values.id));
      hideModal();
    } catch (e) {
      actions.setStatus(t('errors.network'));
    }
  };

  const formik = useFormik({
    initialValues: {
      id: modalData.channel.id,
    },
    onSubmit: removeChannel,
    onReset: () => hideModal(),
  });

  return (
    <Modal show onHide={hideModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure you want to remove this channel?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <h6 className="text-danger">
          {formik.status}
        </h6>
        <Form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <Form.Group>
            <Button variant="outline-danger" type="submit" disabled={formik.isSubmitting}>Remove</Button>
            {' '}
            <Button variant="outline-secondary" type="reset" disabled={formik.isSubmitting}>Cancel</Button>
            {' '}
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
