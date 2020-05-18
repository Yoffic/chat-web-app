import React, { useContext, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import { asyncActions } from '../slices/index.js';

import UserContext from '../context.jsx';

const ChatInput = () => {
  const { t } = useTranslation();

  const username = useContext(UserContext);
  const activeChannelId = useSelector((state) => state.activeChannelId.current);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });

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
      await dispatch(asyncActions.addMessage(data));
      actions.setSubmitting(false);
      actions.resetForm();
    } catch (e) {
      actions.setStatus(t('errors.network'));
    }
  };

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: handleSubmit,
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="mx-3">
      <Form.Group>
        <Form.Control
          name="message"
          type="text"
          placeholder={t('inputText')}
          onChange={formik.handleChange}
          value={formik.values.message}
          isInvalid={!!formik.status}
          disabled={formik.isSubmitting}
          ref={inputRef}
        />
        <Form.Control.Feedback type="invalid" className="d-block">
          {formik.status}
          &nbsp;
        </Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
};

export default ChatInput;
