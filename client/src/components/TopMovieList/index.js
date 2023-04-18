import React, { useState, useEffect } from "react";
import { Table } from 'antd';
const config = require('../../config.json');

const container = {
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.6)',
    color: '#fff',
    margin: '20px',
    boxSizing: 'border-box',
    borderRadius: '10px',
    padding: '10px',
    textAlign: 'center'
};

const listItem = {
    listStyle: 'none',
    margin: '10px',
    padding: '10px',
    color: '#fff',
    textAlign: 'center'
};

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
        },
        {
            title: 'Release Year',
            dataIndex: 'year_of_release',
            key: 'year_of_release',
            render: (value) => value ? `${value}` : 'N/A',
        },
        {
            title: 'Runtime (min)',
            dataIndex: 'runtimeMinutes',
            key: 'runtimeMinutes',
            render: (value) => value ? `${value}` : 'N/A',
        },
        {
            title: 'Average Rating (out of 5)',
            dataIndex: 'avg_rate',
            key: 'avg_rate',
            render: (value) => value ? `${value}` : 'N/A',
        },
    ]

    return (
        <div style={container}>
            <h1>Top 10 Movies/Series with Highest Average Ratings</h1>
            <Table dataSource={data} columns={columns} pagination={false} />
        </div>
    );
};

export default TopMovieList;