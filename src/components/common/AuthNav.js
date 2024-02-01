import React from 'react';
import { Space } from 'antd';
import AuthenticationButton from './AuthenticationButton';

const AuthNav = () => {
  return (
    <Space direction="vertical" size="large" style={{ float: 'right' }}>
      <AuthenticationButton />
    </Space>
  );
};

export default AuthNav;
