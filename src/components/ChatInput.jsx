import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from '../actions';

import UserContext from '../context.jsx';

const validate = (values) => {
  const errors = {};
  if (!values.message) {
    errors.message = 'Message could not be empty';
  }

  return errors;
};

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

  return (
    <Formik
      initialValues={{
        message: '',
      }}
      validate={validate}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({
        errors,
        touched,
        isSubmitting,
      }) => (
        <Form>
          <div className="form-group">
            <Field
              id="message"
              name="message"
              type="text"
              className="form-control"
              disabled={isSubmitting}
            />
            {errors.message && touched.message && (
              <div className="d-block invalid-feedback">{errors.message}</div>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ChatInput;
