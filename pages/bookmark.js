import Head from 'next/head';
import React, { useState } from 'react';
import { Button, Col, Divider, List, Row, Typography } from 'antd';

import Loading from '../components/Loading';
import { useGetBookmarks } from '../modules/bookmark/bookmark.query';
import BookmarkItem from '../modules/bookmark/components/BookmarkItem';
import BookmarkCreate from '../modules/bookmark/components/BookmarkCreate';

const Bookmark = () => {
  const { data, isLoading } = useGetBookmarks();
  const [visible, setVisible] = useState(false);

  if (isLoading || !data) return <Loading />;

  return (
    <Row justify='center' style={{ paddingTop: 20 }}>
      <Head>
        <title>All Bookmark</title>
      </Head>
      <Col xs={20} sm={16} md={12} lg={8}>
        <List.Item>
          <Typography.Title level={3}>Bookmarks</Typography.Title>
          <Button type='primary' onClick={() => setVisible(true)}>
            Create New
          </Button>
        </List.Item>
        <Divider style={{ margin: 0, padding: 0 }} />
        <List
          dataSource={data}
          renderItem={(bookmark) => <BookmarkItem bookmark={bookmark} />}
        />
      </Col>
      <BookmarkCreate visible={visible} setVisible={setVisible} />
    </Row>
  );
};

export default Bookmark;
