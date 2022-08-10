import { useRouter } from 'next/router';
import { Button, Form, Input } from 'antd';

import useAuth from '../../hooks/useAuth';

export default function Reset() {
  const router = useRouter();
  const { username } = router.query;

  const { resetPassword } = useAuth();

  const handleSubmit = (values) => {
    resetPassword({ ...values, username });
  };

  return (
    <div
      style={{
        padding: '10px',
      }}>
      <Form onSubmit={handleSubmit}>
        <Form.Item label='Reset Code' name='code'>
          <Input />
        </Form.Item>
        <Form.Item label='New Password' name='password'>
          <Input type='password' />
        </Form.Item>
        <Form.Item label='Confirm Password' name='confirm_password'>
          <Input type='password' />
        </Form.Item>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form>
    </div>
  );
}
