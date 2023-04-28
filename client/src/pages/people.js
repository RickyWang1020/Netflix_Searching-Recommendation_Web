import React, { useState } from 'react';
import './pages.css'
import CastList from "../components/CastList";
import DirectorList from "../components/DirectorList";
import WriterList from "../components/WriterList";
import ButtomBar from "../components/ButtomBar";
import { Menu, ConfigProvider } from 'antd';

const pages = [
  {
    label: 'Cast',
    key: 'cast',
  },
  {
    label: 'Director',
    key: 'director',
  },
  {
    label: 'Writer',
    key: 'writer',
  },
]

const People = () => {
  const [current, setCurrent] = useState('cast');

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <div className="page-background">
      <div className="page-container">
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={pages} style={{background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(2px)'}} />
        { current === 'cast' && <CastList /> }
        { current === 'director' && <DirectorList /> }
        { current === 'writer' && <WriterList /> }
      </div>
      <ButtomBar />
    </div>
  );
};
  
export default People;