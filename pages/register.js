import { useState } from 'react';
import { Button, Col, Form, Input, Row, Typography } from 'antd';

import useRegister from '../hooks/useRegister';

const { Text } = Typography;

export default function Register() {
  const { register } = useRegister();
  const [loading, setLoading] = useState();

  const handleSubmit = (values) => {
    register(values, setLoading);
  };

  return (
    <Row style={{ marginTop: 100 }}>
      <Col span={8} offset={8}>
        <div
          style={{
            padding: '10px',
          }}>
          <Form onFinish={handleSubmit} layout='vertical'>
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
              loading={loading}>
              Submit
            </Button>

            <Text> Already have an account? Log in</Text>
          </Form>
        </div>
      </Col>
    </Row>
  );
}
