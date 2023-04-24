import React, { useState, useEffect } from "react";
import { Table, DatePicker, Slider, Checkbox, Button, Select, ConfigProvider } from 'antd';
import './index.css';
const config = require('../../config.json');
const { RangePicker } = DatePicker;

const CastList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [numOfMovie, setNumOfMovie] = useState([0, 11000]);
    const [avgRate, setAvgRate] = useState([0, 5]);
    const [sex, setSex] = useState('');
    const [birthYear, setBirthYear] = useState([1500, 2023]);
    
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
  
    const fetchData = () => {
        setLoading(true);
        fetch(`http://${config.server_host}:${config.server_port}/cast_filter`)
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
    }, []);

    const search = () => {
        setLoading(true);
        fetch(`http://${config.server_host}:${config.server_port}/cast_filter?num_movie_low=${numOfMovie[0]}&num_movie_high=${numOfMovie[1]}` + 
            `&birth_year_low=${birthYear[0]}&birth_year_high=${birthYear[1]}` + 
            `&avg_rate_low=${avgRate[0]}&avg_rate_high=${avgRate[1]}` + 
            `&sex=${sex}`
        )
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

    const columns = [
        {
            title: 'Name',
            dataIndex: 'primaryName',
            key: 'primaryName',
            width: '10%',
        },
        {
            title: 'Birth Year',
            dataIndex: 'birthYear',
            key: 'birthYear',
            width: '10%',
            sorter: {
                compare: (a, b) => a.birthYear - b.birthYear,
                multiple: 2,
            },
            render: (value) => value ? `${value}` : 'N/A',
        },
        {
            title: 'Death Year',
            dataIndex: 'deathYear',
            key: 'deathYear',
            width: '10%',
            sorter: {
                compare: (a, b) => a.deathYear - b.deathYear,
                multiple: 2,
            },
            render: (value) => value ? `${value}` : 'N/A',
        },
        {
            title: 'No. of Movies/Series Acted',
            dataIndex: 'num_movie',
            key: 'num_movie',
            width: '10%',
            sorter: {
                compare: (a, b) => a.num_movie - b.num_movie,
                multiple: 3,
            },
            render: (value) => value ? `${value}` : 'N/A',
        },
        {
            title: 'Average Rating on Acted Movies/Series',
            dataIndex: 'avg_rate',
            key: 'avg_rate',
            width: '10%',
            sorter: {
                compare: (a, b) => a.avg_rate - b.avg_rate,
                multiple: 1,
            },
            render: (value) => value ? `${value.toFixed(2)}/5` : 'N/A',
        },
        {
            title: 'Famous Work',
            dataIndex: 'represent_work',
            key: 'represent_work',
            width: '10%',
            render: (value) => value ? `${value}` : 'N/A',
        },
        {
            title: 'Famous Character(s)',
            dataIndex: 'represent_char',
            key: 'represent_char',
            width: '25%',
            render: (value) => {
                if (typeof value === 'string' && value !== '') {
                    const cleanedValue = value.replace(/[\[\]"']/g, '');
                    const valueArray = cleanedValue.split(', ');
                    return valueArray.map(str => str.trim());
                } 
                else {
                    return 'N/A';
                }
            },
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

    const handleCalenderChange = (yearTuple) => {
        if (yearTuple[0] && yearTuple[1]) {
            setBirthYear([yearTuple[0].$y, yearTuple[1].$y]);
        }
    }

    return (
        <div className="cast-list-container">
            <div className="cast-list-filter">
                <div className="filter-item" style={{ width: '10%' }}>
                    <div className="title" style={{ marginLeft: '0' }}>Sex: </div>
                    <Select
                        className="selector"
                        onChange={(e) => {setSex(e)}}
                        options={[{value: '', label: ""}, {value: 'male', label: "Male"}, {value: 'female', label: "Female"}]}
                    />
                </div>
                <div className="filter-item" style={{ width: '25%' }}>
                    <div className="title" style={{ marginLeft: '1' }}>Birth Year: </div>
                    <ConfigProvider theme={{token: {colorTextDisabled: '#777'}}}>
                        <RangePicker className="selector" picker="year" 
                            onCalendarChange={(e) => {handleCalenderChange(e)}}/>
                    </ConfigProvider>
                </div>
                <div className="filter-item" style={{ width: '20%' }}>
                    <div className="title">Average Rating: </div>
                    <ConfigProvider theme={{token: { colorPrimary: '#bbb'}}}>
                        <Slider className="selector" range defaultValue={[0, 5]} max={5} min={0} step={0.1}
                            onAfterChange={(e) => {setAvgRate(e)}}/>
                    </ConfigProvider>
                </div>
                <div className="filter-item" style={{ width: '20%' }}>
                    <div className="title">No. of Movies/Series: </div>
                    <ConfigProvider theme={{token: { colorPrimary: '#bbb'}}}>
                        <Slider className="selector" range defaultValue={[0, 11000]} max={11000} min={0} step={10}
                            onAfterChange={(e) => {setNumOfMovie(e)}}/>
                    </ConfigProvider>
                </div>
                <div className="filter-item">
                    <Button className="selector" onClick={() => search()}>Filter</Button>
                </div>
            </div>
            <div className="cast-list-table">
                <ConfigProvider
                    theme={{
                        token: {
                            colorFillAlter: 'rgba(100, 100, 100, 0.5)',
                            colorFillContent: 'rgba(150, 150, 150, 0.6)',
                            controlItemBgActive: '#444',
                        },
                    }}>
                    <Table
                        columns={columns}
                        dataSource={data.length > 0 ? data : []}
                        pagination={tableParams.pagination}
                        loading={loading}
                        onChange={handleTableChange}
                    />
                </ConfigProvider>
            </div>
        </div>
    );
};

export default CastList;