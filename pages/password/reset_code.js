import { Button, Form, Input } from 'antd';

import useAuth from '../../hooks/useAuth';

export default function ResetCode() {
  const { resetPasswordRequest } = useAuth();

  const handleSubmit = (values) => {
    resetPasswordRequest(values);
  };

  return (
    <div
      style={{
        padding: '10px',
      }}>
      <Form onSubmit={handleSubmit}>
        <Form.Item name='username' label='Username'>
          <Input />
        </Form.Item>
        <Button type='primary' htmlType='submit'>
          Reset
        </Button>
      </Form>
    </div>
  );
}
