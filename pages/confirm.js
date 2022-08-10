import { useRouter } from 'next/router';
import { Button, Col, Form, Input, Row } from 'antd';

import useRegister from '../hooks/useRegister';
import { useState } from 'react';

export default function Confirm() {
  const router = useRouter();
  const { username = 'shipon2285@gmail.com' } = router.query;
  const [loading, setLoading] = useState();

  const { confirm } = useRegister();

  const handleSubmit = async (values) => {
    setLoading(true);
    confirm({ ...values, username }, setLoading);
  };

  return (
    <Row style={{ marginTop: 100 }}>
      <Col span={8} offset={8}>
        <div
          style={{
            padding: '10px',
          }}>
          <Form onFinish={handleSubmit} layout='vertical'>
            <Form.Item name='code' label='Confirmation Code'>
              <Input size='large' />
            </Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              size='large'
              block
              loading={loading}>
              Confirm
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  );
}
