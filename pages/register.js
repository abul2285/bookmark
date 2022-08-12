import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { useRegister } from '../modules/auth/auth.query';

const { Text } = Typography;

export default function Register() {
  const { mutate, isLoading, error, data } = useRegister();

  return (
    <Row style={{ marginTop: 100 }}>
      <Col span={8} offset={8}>
        <div
          style={{
            padding: '10px',
          }}>
          <Form onFinish={mutate} layout='vertical'>
            <Form.Item label='Email' name='username'>
              <Input type='email' size='large' />
            </Form.Item>
            <Form.Item label='Password' name='password'>
              <Input type='password' size='large' />
            </Form.Item>
            <Form.Item label='Confirm Password' name='confirm_password'>
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

            <Text> Already have an account? Log in</Text>
            {error?.message && <Text type='danger'>{error.message}</Text>}
          </Form>
        </div>
      </Col>
    </Row>
  );
}
