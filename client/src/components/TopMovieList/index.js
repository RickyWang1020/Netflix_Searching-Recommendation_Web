import React, { useState, useEffect } from "react";
import { Table, ConfigProvider } from 'antd';
import './index.css'
const config = require('../../config.json');

const TopMovieList = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`http://${config.server_host}:${config.server_port}/top_movies`)
          .then(res => res.json())
          .then(data => setData(data))
          .catch(error => console.log(error));
      }, []);

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: '35%',
        },
        {
            title: 'Year',
            dataIndex: 'year_of_release',
            key: 'year_of_release',
            render: (value) => value ? `${value}` : 'N/A',
            width: '15%',
        },
        // {
        //     title: 'Runtime (min)',
        //     dataIndex: 'runtimeMinutes',
        //     key: 'runtimeMinutes',
        //     render: (value) => value ? `${value}` : 'N/A',
        // },
        {
            title: 'Rating',
            dataIndex: 'avg_rate',
            key: 'avg_rate',
            render: (value) => value ? `${value.toFixed(2)}/5` : 'N/A',
            width: '15%',
        },
        {
            title: 'Genres',
            dataIndex: 'genres',
            key: 'genres',
            render: (value) => value ? `${value}` : 'N/A',
            width: '35%',
            // ellipsis: true,
        },
    ]

    return (
        <div className="top-movie-list">
            <div className="title">Top Movies/Series</div>
            <div className="table-container">
            <ConfigProvider
                theme={{
                    token: {
                        colorBgContainer: 'rgba(0, 0, 0, 0)',
                        colorBorderSecondary: '#fff',
                        colorFillAlter: '#333',
                        // colorBgContainer: '#fff',
                        colorText: '#fff',
                        colorIconHover: 'red',
                        borderRadius: '0'
                    },
                }}
                >
                    <Table 
                        rowKey={(record) => record.uid}
                        dataSource={data.length > 0 ? data : []} 
                        columns={columns} 
                        pagination={false}
                    />
                </ConfigProvider>
            </div>
        </div>
    );
};

export default TopMovieList;