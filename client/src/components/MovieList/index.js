import React, { useState, useEffect } from "react";
import { Table, DatePicker, Slider, Checkbox, Button, Select, ConfigProvider } from 'antd';
// import { Button, Checkbox, Container, FormControlLabel, Grid, Slider, TextField, MenuItem, Select } from '@mui/material';
import movieGenres from '../../assets/utils/movieGenres';
import './index.css';
const config = require('../../config.json');
const { RangePicker } = DatePicker;

const MovieList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const [title, setTitle] = useState('');
    const [yearOfRelease, setYearOfRelease] = useState([1914, 2005]);
    const [runtime, setRuntime] = useState([0, 1335]);
    const [genre, setGenre] = useState('');
    const [isAdult, setIsAdult] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
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

    const search = () => {
        setLoading(true);
        fetch(`http://${config.server_host}:${config.server_port}/filter_movies?title=${title}` + 
            `&releaseyear_low=${yearOfRelease[0]}&releaseyear_high=${yearOfRelease[1]}` + 
            `&runtime_low=${runtime[0]}&runtime_high=${runtime[1]}` + 
            `&genre=${genre}` + 
            `&isAdult=${isAdult}`
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
    }

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: '30%',
        },
        {
            title: 'Release Year',
            dataIndex: 'year_of_release',
            key: 'year_of_release',
            width: '10%',
            sorter: {
                compare: (a, b) => a.year_of_release - b.year_of_release,
                multiple: 1,
            },
            render: (value) => value ? `${value}` : 'N/A',
        },
        {
            title: 'Runtime',
            dataIndex: 'runtimeMinutes',
            key: 'runtimeMinutes',
            width: '10%',
            sorter: {
                compare: (a, b) => a.runtimeMinutes - b.runtimeMinutes,
                multiple: 1,
            },
            render: (value) => value ? `${value} min` : 'N/A',
        },
        {
            title: 'Is Adult?',
            dataIndex: 'isAdult',
            key: 'isAdult',
            width: '10%',
            render: (value) => value === 1 ? 'Yes' : 'No',
        },
        {
            title: 'Average Rating',
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
            title: 'Genres',
            dataIndex: 'genres',
            key: 'genres',
            width: '30%',
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

    const handleCalenderChange = (yearTuple) => {
        if (yearTuple[0] && yearTuple[1]) {
            setYearOfRelease([yearTuple[0].$y, yearTuple[1].$y]);
        }
    }

    return (
        <div className="movie-list-container">
        {/* {selectedSongId && <SongCard songId={selectedSongId} handleClose={() => setSelectedSongId(null)} />}
        {/* <h2>Filter Movies/Series</h2> */}
        {/* <Grid class="filter" container spacing={8}>
                <Grid item xs={8}>
                    <TextField label='Title' value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: "100%" }}/>
                </Grid>
                <Grid item xs={4}>
                    <FormControlLabel
                    label='Only Non-Adult Movies/Series'
                    control={<Checkbox checked={isAdult} onChange={(e) => setIsAdult(e.target.checked)} />}
                    />
                </Grid>
                <Grid item xs={6}>
                    <p>Release Year</p>
                    <Slider
                    value={yearOfRelease}
                    min={1914}
                    max={2005}
                    step={1}
                    onChange={(e, newValue) => setYearOfRelease(newValue)}
                    valueLabelDisplay='auto'
                    valueLabelFormat={value => value}
                    />
                </Grid>
                <Grid item xs={6}>
                    <p>Runtime (min)</p>
                    <Slider
                    value={runtime}
                    min={0}
                    max={1335}
                    step={5}
                    onChange={(e, newValue) => setRuntime(newValue)}
                    valueLabelDisplay='auto'
                    valueLabelFormat={value => value}
                    />
                </Grid>
                <Grid item xs={3}>
                <p>Select Movie/Series Genre:</p>
                </Grid>
                <Grid item xs={3}>
                    <Select
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        inputProps={{ 'aria-label': 'Select one option' }}
                        renderValue={option => option}
                        fullWidth
                    >
                        {movieGenres.map((genre, index) => (
                            <MenuItem key={genre} value={genre}> {genre} </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={() => search() } style={{ left: '50%', transform: 'translateX(-50%)' }}>
                        Search
                    </Button>
                </Grid>
            </Grid> */}
            <div className="movie-list-filter">
                <div className="filter-item" style={{ width: '25%' }}>
                    <div className="title" style={{ marginLeft: '0' }}>Year: </div>
                    <ConfigProvider theme={{token: {colorTextDisabled: '#777'}}}>
                        <RangePicker className="selector" picker="year" 
                            onCalendarChange={(e) => {handleCalenderChange(e)}}/>
                    </ConfigProvider>
                </div>
                <div className="filter-item" style={{ width: '20%' }}>
                    <div className="title">Runtime: </div>
                    <ConfigProvider theme={{token: { colorPrimary: '#bbb'}}}>
                        <Slider className="selector" range defaultValue={[0, 200]} max={1335} min={0} step={5}
                            onAfterChange={(e) => {setRuntime(e)}}/>
                    </ConfigProvider>
                </div>
                <div className="filter-item" style={{ width: '20%' }}>
                    <ConfigProvider theme={{token: {colorPrimary: '#1677ff'}}}>
                        <Checkbox className="selector" onChange={(e) => {setIsAdult(e.target.checked)}}> Only Non-Adult Content </Checkbox>
                    </ConfigProvider>
                </div>
                <div className="filter-item" style={{ width: '20%' }}>
                    <div className="title">Genre: </div>
                    <Select
                        className="selector"
                        onChange={(e) => {setGenre(e)}}
                        options={movieGenres.map((genre, index) => ({value: genre, label: genre}))}
                    />
                </div>
                <div className="filter-item">
                    <Button className="selector" onClick={() => search()}>Filter</Button>
                </div>
            </div>
            <div className="movie-list-table">
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

export default MovieList;