import React, { useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Group } = Input;

const ResponsiveSearchBar = () => {
  const [search, setSearch] = useState('');
  
  return (
    <div className="flex justify-center my-4">
      <Group compact className="w-full max-w-md">
        <Input.Search
        placeholder='Search Job'
          size="large"
          className="rounded-r-lg"
          onSearch={value => console.log(value)}
        />
      </Group>
    </div>
  );
};

export default ResponsiveSearchBar;
