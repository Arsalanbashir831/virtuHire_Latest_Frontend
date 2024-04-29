import React from 'react';
import { Input, Button, Select } from 'antd';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { searchState } from '../atoms/SearchState';
import { selectedJobState } from '../atoms/JobState';
import { jobTypeState } from '../atoms/JobTypeLocationState';
import { LocationFilterState } from '../atoms/LocationFilterState';

const { Search } = Input;
const { Option } = Select;

const ResponsiveSearchBar = () => {
  const [search, setSearch] = useRecoilState(searchState);
  const setSelectedJob = useSetRecoilState(selectedJobState);
  const [jobType ,setJobType]= useRecoilState(jobTypeState)
  const [location ,setLocation] = useRecoilState(LocationFilterState)
  // Define a function to handle search
  const handleSearch = (value) => {
    setSearch(value);
    setSelectedJob(null);
    console.log('Searching for:', value);
  };

  const handleFilterJobType = (value) => {
    console.log('Filtering by job type:', value);
    setJobType(value)
    // Perform filtering actions or update state accordingly
  };

  // Define function to handle location filter selection
  const handleFilterLocation = (value) => {
    console.log('Filtering by location:', value);
    setLocation(value)
    // Perform filtering actions or update state accordingly
  };

  return (
    <div className="flex justify-center my-4 w-full">
      <Search
        placeholder="Search Jobs"
        size="large"
        className="rounded-r-lg "
        onSearch={handleSearch}
        style={{ width: '60%' }}
      />
      <div className="ml-4 flex items-center">
        <Select
          placeholder="Select Job Type"
          style={{ width: 150 }}
          onChange={handleFilterJobType}
        >
          <Option value="freelance">Freelance</Option>
          <Option value="contract">Contract</Option>
          <Option value="full time">Full Time</Option>
          <Option value="part time">Part Time</Option>
        </Select>
      </div>
      <div className="ml-4 flex items-center">
        <Select
          placeholder="Select Location"
          style={{ width: 150 }}
          onChange={handleFilterLocation}
        >
          <Option value="on site">On Site</Option>
          <Option value="remote">Remote</Option>
        </Select>
      </div>
    </div>
  );
};

export default ResponsiveSearchBar;
