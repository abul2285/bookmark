import Link from 'next/link';
import React, { useState } from 'react';
import { Button, List, message, Popconfirm, Space } from 'antd';
import { DeleteOutlined, EditOutlined, LinkOutlined } from '@ant-design/icons';

import BookmarkUpdate from './BookmarkUpdate';
import { useRemoveBookmarkById } from '../bookmark.query';

const BookmarkItem = ({ bookmark }) => {
  const [visible, setVisible] = useState(false);
  const { mutateAsync } = useRemoveBookmarkById();

  const handleRemoveBookmark = async () => {
    const response = await mutateAsync(bookmark.id);

    if (response.success) {
      message.open({ type: 'success', content: response.message });
    }
  };

  return (
    <List.Item key={bookmark.id}>
      <List.Item.Meta {...bookmark} />
      <Space>
        <Button type='link' shape='circle'>
          <Link href={bookmark.link || '#'}>
            <a>
              <LinkOutlined />
            </a>
          </Link>
        </Button>
        <Button
          type='outline'
          shape='circle'
          icon={<EditOutlined />}
          onClick={() => setVisible(true)}
        />
        <Popconfirm
          title='Are you sure you want to delete this bookmark'
          onConfirm={handleRemoveBookmark}>
          <Button
            danger
            type='outline'
            shape='circle'
            icon={<DeleteOutlined />}
          />
        </Popconfirm>
      </Space>

      <BookmarkUpdate
        visible={visible}
        bookmark={bookmark}
        setVisible={setVisible}
      />
    </List.Item>
  );
};

export default BookmarkItem;
