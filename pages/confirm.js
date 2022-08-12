import { Button, Col, Form, Input, Row, Typography } from 'antd';

import { getUsername } from '../utils/storage';
import { useConfirm } from '../modules/auth/auth.query';

const { Text } = Typography;

export default function Confirm() {
  const { mutate, isLoading, error } = useConfirm();

  const handleSubmit = async (values) => {
    const username = getUsername();
    if (!username) return;
    mutate({ ...values, username });
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
              block
              size='large'
              type='primary'
              htmlType='submit'
              loading={isLoading}>
              Confirm
            </Button>
            {error?.message && <Text type='danger'>{error.message}</Text>}
          </Form>
        </div>
      </Col>
    </Row>
  );
}
