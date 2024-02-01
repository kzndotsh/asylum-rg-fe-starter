import React from 'react';
import { Avatar, Typography, Divider, Col, Card } from 'antd';

import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user } = useAuth0();
  const { name, picture, email } = user;
  const { Text, Title } = Typography;

  return (
    <Col span={22} offset={1}>
      <Card title="User Profile Data">
        <Avatar src={picture} size={64} shape="circle" />
        <Col span={16}>
          <Title
            level={1}
            style={{
              paddingTop: '10px',
            }}
          >
            {name}
          </Title>
          <Text type="secondary">{email}</Text>
        </Col>
        <Divider />
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </Card>
    </Col>
  );
};

export default Profile;
