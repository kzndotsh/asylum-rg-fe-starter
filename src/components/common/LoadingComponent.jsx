import PropTypes from 'prop-types';
import React from 'react';
import { Skeleton } from 'antd';

function LoadingComponent() {
  return (
    <div className="loading-component">
      <Skeleton active />
    </div>
  );
}

export default LoadingComponent;
