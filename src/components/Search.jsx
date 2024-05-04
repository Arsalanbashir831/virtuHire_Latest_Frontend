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
  const [jobType, setJobType] = useRecoilState(jobTypeState);
  const [location, setLocation] = useRecoilState(LocationFilterState);

  const handleSearch = (value) => {
    setSearch(value);
    setSelectedJob(null);
    console.log('Searching for:', value);
  };

  const handleFilterJobType = (value) => {
    console.log('Filtering by job type:', value);
    setSelectedJob(null);
    setJobType(value);
  };

  const handleFilterLocation = (value) => {
    console.log('Filtering by location:', value);
    setSelectedJob(null);
    setLocation(value);
  };

  return (
    <div className="flex justify-center items-center my-4 w-full md:w-[80%] mx-auto rounded-lg bg-white shadow-md p-4">

      {/* Search Input */}
      <Search
        placeholder="Search Jobs"
        enterButton={
          <Button
            type="primary"
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Search
          </Button>
        }
        onSearch={handleSearch}
        className="mr-4 flex-grow"
      />

      {/* Job Type Selector */}
      <Select
        placeholder="Select Job Type"
        style={{ width: 150 }}
        onChange={handleFilterJobType}
        className="mr-4"
      >
        <Option value="freelance">Freelance</Option>
        <Option value="contract">Contract</Option>
        <Option value="full time">Full Time</Option>
        <Option value="part time">Part Time</Option>
      </Select>

      {/* Location Selector */}
      <Select
        placeholder="Select Location"
        style={{ width: 150 }}
        onChange={handleFilterLocation}
      >
        <Option value="on site">On Site</Option>
        <Option value="remote">Remote</Option>
      </Select>

    </div>
  );
};

export default ResponsiveSearchBar;
