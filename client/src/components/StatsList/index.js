import React, {useState, useEffect} from "react";
import { List, Slider, Row, Col, Typography, Progress } from 'antd';
import './index.css'
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

const { Title } = Typography;

const StatsList = () => {
    const [data, setData] = useState([]);
    const [bar, setBar] = useState(2.5);

    useEffect(() => {
        fetch(`http://${config.server_host}:${config.server_port}/top_genres/${bar}`)
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    const formattedData = data.map((item) => ({
                        genre: item.genre,
                        count: item.genre_count,
                      }));
                    setData(formattedData);
                    } else {
                        setData([]);
                    }
                })
            .catch((error) => {console.error(error);});
        }, [bar]);

    const handleSliderChange = (value) => {
        setBar(value);
    };

    const maxCount = data.reduce((acc, cur) => Math.max(acc, cur.count), 0);

    return (
        <div className="stats-list">
        <div className="title">Top 5 Genres</div>
        <div className="table-container">
        <Slider
            defaultValue={2.5}
            min={0}
            max={5}
            step={0.1}
            onChange={handleSliderChange}
        />
        {(data.length === 0) ? (
            <p>No data to display.</p>
        ) : (
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                    <List.Item>
                    <List.Item.Meta title={item.genre + item.count} />
                    <Progress
                        percent={(item.count / maxCount) * 100}
                        strokeColor="#1890ff"
                        showInfo={false}
                        format={() => `${item.count}`}
                    />
                    </List.Item>
                )}
            />
        )}
        </div>
        </div>
    );
}

export default StatsList;