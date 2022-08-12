import { useRouter } from 'next/router';
import { Button, Col, Form, Input, Row, Typography } from 'antd';

import { useLogin } from '../modules/auth/auth.query';

const { Text } = Typography;

export default function Login() {
  const router = useRouter();
  const { mutate, isLoading } = useLogin();

  const { success } = router.query;

  return (
    <Row style={{ marginTop: 100 }}>
      <Col span={8} offset={8}>
        {success === 'true' && (
          <div
            style={{
              paddingTop: '10px',
              paddingBottom: '10px',
              color: 'green',
            }}>
            You are signed up
          </div>
        )}

        <Form onFinish={mutate} layout='vertical'>
          <Form.Item name='username' label='Email'>
            <Input type='email' size='large' />
          </Form.Item>
          <Form.Item name='password' label='Password'>
            <Input type='password' size='large' />
          </Form.Item>

          <Button
            block
            size='large'
            type='primary'
            htmlType='submit'
            loading={isLoading}>
            Submit
          </Button>

          <Text type=''>Forgot password?</Text>

          <Text type=''>Don not have an account? Register</Text>
        </Form>
      </Col>
    </Row>
  );
}
