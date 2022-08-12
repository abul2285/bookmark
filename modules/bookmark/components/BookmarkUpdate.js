import React from 'react';
import { Button, Form, Input, message, Modal } from 'antd';
import { useUpdateBookmarkById } from '../bookmark.query';

const BookmarkUpdate = ({ visible, setVisible, bookmark }) => {
  const { mutateAsync, isLoading } = useUpdateBookmarkById();

  const handleSubmit = async (values) => {
    const response = await mutateAsync({ ...values, id: bookmark.id });
    if (response.success) {
      message.open({ type: 'success', content: response.message });
      setVisible(false);
    }
  };
  return (
    <Modal
      footer={null}
      visible={visible}
      title='Update Bookmark'
      onCancel={() => setVisible(false)}>
      <Form layout='vertical' onFinish={handleSubmit} initialValues={bookmark}>
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
          Update
        </Button>
      </Form>
    </Modal>
  );
};

export default BookmarkUpdate;
