import React, { useState, useEffect } from "react";
import { Table, ConfigProvider } from 'antd';
import './style.css'
const config = require('../../config.json');

const TopPeopleList = () => {
    const [castData, setCastData] = useState([]);
    const [directorData, setDirectorData] = useState([]);
    const [writerData, setWriterData] = useState([]);

    useEffect(() => {
        fetch(`http://${config.server_host}:${config.server_port}/top_cast_rating`)
          .then(res => res.json())
          .then(data => setCastData(data))
          .catch(error => console.log(error));
    }, []);
    
    useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/top_director`)
        .then(res => res.json())
        .then(data => setDirectorData(data))
        .catch(error => console.log(error));
    }, []);

    useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/top_writer`)
        .then(res => res.json())
        .then(data => setWriterData(data))
        .catch(error => console.log(error));
    }, []);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'primaryName',
            key: 'primaryName',
            width: '35%',
        },
        {
            title: 'Rating',
            dataIndex: 'avg_rate',
            key: 'avg_rate',
            render: (value) => value ? `${value.toFixed(2)}/5` : 'N/A',
            width: '15%',
        },
        {
            title: 'No. of Movies',
            dataIndex: 'num_movie',
            key: 'num_movie',
            render: (value) => value ? `${value}` : 'N/A',
            width: '35%',
            // ellipsis: true,
        },
    ]

    return (
        <div className="top-people-list">
            <div className="top-people-group">
                <div className="title">Top Casts</div>
                <div className="table-container">
                <ConfigProvider
                    theme={{
                        token: {
                            colorBgContainer: 'rgba(0, 0, 0, 0)',
                            colorBorderSecondary: '#fff',
                            fontWeightStrong: 900,
                            // colorFillAlter: 'rgba(100, 100, 100, 0.5)',
                            colorText: '#fff',
                            borderRadius: '0'
                        },
                    }}
                    >
                        <Table 
                            rowKey={(record) => record.uid}
                            dataSource={castData.length > 0 ? castData : []} 
                            columns={columns} 
                            pagination={false}
                        />
                    </ConfigProvider>
                </div>
            </div>
            <div className="top-people-group">
                <div className="title">Top Directors</div>
                <div className="table-container">
                <ConfigProvider
                    theme={{
                        token: {
                            colorBgContainer: 'rgba(0, 0, 0, 0)',
                            colorBorderSecondary: '#fff',
                            fontWeightStrong: 900,
                            // colorFillAlter: 'rgba(100, 100, 100, 0.5)',
                            colorText: '#fff',
                            borderRadius: '0'
                        },
                    }}
                    >
                        <Table 
                            rowKey={(record) => record.uid}
                            dataSource={directorData.length > 0 ? directorData : []} 
                            columns={columns} 
                            pagination={false}
                        />
                    </ConfigProvider>
                </div>
            </div>
            <div className="top-people-group" style={{marginBottom: '0'}}>
                <div className="title">Top Writers</div>
                <div className="table-container">
                <ConfigProvider
                    theme={{
                        token: {
                            colorBgContainer: 'rgba(0, 0, 0, 0)',
                            colorBorderSecondary: '#fff',
                            fontWeightStrong: 900,
                            // colorFillAlter: 'rgba(100, 100, 100, 0.5)',
                            colorText: '#fff',
                            borderRadius: '0'
                        },
                    }}
                    >
                        <Table 
                            rowKey={(record) => record.uid}
                            dataSource={writerData.length > 0 ? writerData : []} 
                            columns={columns} 
                            pagination={false}
                        />
                    </ConfigProvider>
                </div>
            </div>
        </div>
    );
};

export default TopPeopleList;