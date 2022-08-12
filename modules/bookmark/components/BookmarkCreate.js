import React from 'react';
import { Button, Form, Input, message, Modal } from 'antd';

import { useCreateBookmark } from '../bookmark.query';

const BookmarkCreate = ({ visible, setVisible }) => {
  const [form] = Form.useForm();
  const { mutateAsync, isLoading } = useCreateBookmark();

  const handleSubmit = async (values) => {
    const response = await mutateAsync(values);
    if (response.success) {
      form.resetFields();
      message.open({ content: response.message, type: 'success' });
      setVisible(false);
    }
  };
  return (
    <Modal
      footer={null}
      visible={visible}
      title='Create Bookmark'
      onCancel={() => setVisible(false)}>
      <Form layout='vertical' onFinish={handleSubmit} form={form}>
        <Form.Item name='title' label='Title'>
          <Input placeholder='Enter a meaning full title here' />
        </Form.Item>
        <Form.Item name='description' label='Description'>
          <Input placeholder='Enter a meaning full description here' />
        </Form.Item>
        <Form.Item name='link' label='Link'>
          <Input placeholder='Enter bookmark link here' />
        </Form.Item>

        <Button
          type='primary'
          htmlType='submit'
          loading={isLoading}
          style={{ marginLeft: 'auto', display: 'block' }}>
          Create
        </Button>
      </Form>
    </Modal>
  );
};

export default BookmarkCreate;
