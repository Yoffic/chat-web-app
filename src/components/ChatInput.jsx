import React, { useContext, useRef, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from '../actions';

import UserContext from '../context.jsx';

const ChatInput = () => {
  const username = useContext(UserContext);

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({
        isSubmitting,
      }) => (
        <Form className="mx-3">
          <div className="form-group">
            <Field
              id="message"
              name="message"
              type="text"
              className="form-control"
              disabled={isSubmitting}
              innerRef={inputRef}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ChatInput;
