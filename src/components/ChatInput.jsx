import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Form } from 'react-bootstrap';
import { addMessage } from '../actions';

import UserContext from '../context.jsx';

const ChatInput = () => {
  const username = useContext(UserContext);
  const activeChannelId = useSelector((state) => state.activeChannelId);
  const dispatch = useDispatch();

  const handleSubmit = async (values, actions) => {
    if (values.message.length === 0) {
      return;
    }
    const data = {
      channelId: activeChannelId,
      username,
      message: values.message,
    };
    try {
      await dispatch(addMessage(data));
      actions.setSubmitting(false);
      actions.setFieldValue('message', '', false);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="mx-3">
      <Form.Group>
        <Form.Control
          name="message"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.message}
          disabled={formik.isSubmitting}
        />
      </Form.Group>
    </Form>
  );
};

export default ChatInput;
