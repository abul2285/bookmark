import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row, Typography } from 'antd';

import useAuth from '../hooks/useAuth';
import { getUsername } from '../utils/storage';

const { Text } = Typography;

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState();
  const { login, fetchProfile } = useAuth();
  const [fetching, setFetching] = useState(true);

  const { success } = router.query;

  const handleSubmit = async (values) => {
    setLoading(true);
    await login({ ...values }, setLoading);
  };

  useEffect(() => {
    (async function () {
      const username = getUsername();
      if (!username) return setFetching(false);
      const res = await fetchProfile(username, setFetching);
      if (res?.username) router.push('/');
    })();
  }, [fetchProfile, router]);

  if (fetching) return <p>Loading...</p>;

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

        <Form onFinish={handleSubmit} layout='vertical'>
          <Form.Item name='username' label='Email'>
            <Input type='email' size='large' />
          </Form.Item>
          <Form.Item name='password' label='Password'>
            <Input type='password' size='large' />
          </Form.Item>

          <Button
            type='primary'
            htmlType='submit'
            block
            size='large'
            loading={loading}>
            Submit
          </Button>

          <Text type=''>Forgot password?</Text>

          <Text type=''>Don not have an account? Register</Text>
        </Form>
      </Col>
    </Row>
  );
}
