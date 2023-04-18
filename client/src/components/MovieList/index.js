import React, { useState, useEffect } from "react";
import { Table } from 'antd';
import { Pagination } from 'antd';
import qs from 'qs';
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

const MovieList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const getUserParams = (params) => ({
        page_size: params.pagination?.pageSize,
        page: params.pagination?.current,
        ...params,
      });

    const fetchData = () => {
        setLoading(true);
        fetch(`http://${config.server_host}:${config.server_port}/filter_movies`)
          .then((res) => res.json())
          .then(data => {
            setData(data);
            setLoading(false);
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: data.totalCount,
                },
            });
          });
    };

    useEffect(() => {
        fetchData();
    }, [JSON.stringify(tableParams)]);

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            onFilter: (value, record) => record.title.startsWith(value),
            filterSearch: true,
            width: '40%',
        },
        {
            title: 'Release Year',
            dataIndex: 'year_of_release',
            key: 'year_of_release',
            sorter: (a, b) => a.year_of_release - b.year_of_release,
            render: (value) => value ? `${value}` : 'N/A',
        },
        {
            title: 'Runtime (min)',
            dataIndex: 'runtimeMinutes',
            key: 'runtimeMinutes',
            sorter: (a, b) => a.runtimeMinutes - b.runtimeMinutes,
            render: (value) => value ? `${value}` : 'N/A',
        },
        {
            title: 'Is Adult?',
            dataIndex: 'isAdult',
            key: 'isAdult',
            render: (value) => value === 1 ? 'Yes' : 'No',
        },
        {
            title: 'Average Rating (out of 5)',
            dataIndex: 'avg_rate',
            key: 'avg_rate',
            sorter: (a, b) => a.avg_rate - b.avg_rate,
            render: (value) => value ? `${value}` : 'N/A',
        },
    ]

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
      };

    return (
        <>
        <Table
            columns={columns}
            dataSource={data}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
        />
        </>
    );
};

export default MovieList;