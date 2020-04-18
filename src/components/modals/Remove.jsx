import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';

import { asyncActions } from '../../slices/index.js';

export default ({ hideModal, modalData }) => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(asyncActions.removeChannel(modalData.channel.id));
    hideModal();
  };

  return (
    <Modal show onHide={hideModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure you want to remove this channel?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit} onReset={() => hideModal()}>
          <Form.Group>
            <Button variant="outline-danger" type="submit">Remove</Button>
            {' '}
            <Button variant="outline-secondary" type="reset">Cancel</Button>
            {' '}
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
