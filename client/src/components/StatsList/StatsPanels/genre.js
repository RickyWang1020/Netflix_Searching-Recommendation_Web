import React, {useState, useEffect} from "react";
import { List, Slider, Progress } from 'antd';
import './panel.css'
const config = require('../../../config.json');

const TopGenre = () => {
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
        <div className="stats-panel">
            <div className="title">Top 5 Genres</div>
            <div className="panel-body-container">
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

export default TopGenre;