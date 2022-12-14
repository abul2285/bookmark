import Head from 'next/head';
import { Col, Row } from 'antd';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Bookmark App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Row>
        <Col span={12} offset={6}>
          <h1 style={{ textAlign: 'center' }}>Welcome to the bookmark app</h1>
        </Col>
      </Row>
    </div>
  );
}
