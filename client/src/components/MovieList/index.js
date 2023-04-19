import React, { useState, useEffect } from "react";
import { Table } from 'antd';
import { Button, Checkbox, Container, FormControlLabel, Grid, Slider, TextField, MenuItem, Select } from '@mui/material';
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
        },
        {
            title: 'Release Year',
            dataIndex: 'year_of_release',
            key: 'year_of_release',
            sorter: {
                compare: (a, b) => a.year_of_release - b.year_of_release,
                multiple: 1,
            },
            render: (value) => value ? `${value}` : 'N/A',
        },
        {
            title: 'Runtime (min)',
            dataIndex: 'runtimeMinutes',
            key: 'runtimeMinutes',
            sorter: {
                compare: (a, b) => a.runtimeMinutes - b.runtimeMinutes,
                multiple: 1,
            },
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
            sorter: {
                compare: (a, b) => a.avg_rate - b.avg_rate,
                multiple: 1,
            },
            render: (value) => value ? `${value}` : 'N/A',
        },
        {
            title: 'Genres',
            dataIndex: 'genres',
            key: 'genres',
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

    const movieGenres = [
        'Action',
        'Adult',
        'Adventure',
        'Animation',
        'Biography',
        'Comedy',
        'Crime',
        'Documentary',
        'Drama',
        'Family',
        'Fantasy',
        'Film-Noir',
        'Game-Show',
        'History',
        'Horror',
        'Music',
        'Musical',
        'Mystery',
        'News',
        'Reality-TV',
        'Romance',
        'Sci-Fi',
        'Short',
        'Sport',
        'Talk-Show',
        'Thriller',
        'War',
        'Western',
    ];

    return (
        <Container>
        {/* {selectedSongId && <SongCard songId={selectedSongId} handleClose={() => setSelectedSongId(null)} />} */}
        <h2>Filter Movies/Series</h2>
        <Grid container spacing={8}>
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
        </Grid>
        <Table
            columns={columns}
            dataSource={data.length > 0 ? data : []}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
        />
        </Container>
    );
};

export default MovieList;