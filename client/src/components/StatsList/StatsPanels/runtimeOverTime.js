import './panel.css'
import React, {useState, useEffect} from "react";
import ReactDOM from 'react-dom';
import { Select } from 'antd';
import { Line } from '@ant-design/plots';
import movieGenres from '../../../assets/utils/movieGenres';
const config = require('../../../config.json');

const RuntimeOverTime = () => {
    const [data, setData] = useState([]);
    const [genre, setGenre] = useState('');

    const search = () => {
        fetch(`http://${config.server_host}:${config.server_port}/genre_runtime_change/${genre}`)
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => {console.error(error);})
    };

    useEffect(() => {
      search();
    }, [genre]);

    const chartConfig = {
        data,
        padding: 'auto',
        xField: 'year_of_release',
        yField: 'average_runtime',
        color: '#fc426a',
        xAxis: {
          tickCount: 5,
        },
        height: 600,
    };

    // Render the Chart component with the Line and Axis components
    return (
        <div className='stats-panel'>
            <div className='title'>Movie Average Runtime Over Time by Genre</div>
            <span style={{ display: 'inline-block', marginRight: '10px' }}>Select Genre: </span>
            <Select style={{ width: '200px' }}
                className="selector"
                onChange={(e) => {setGenre(e); search();}}
                options={movieGenres.map((genre, index) => ({value: genre, label: genre}))}
            />
            <Line {...chartConfig} style={{
          height: '65%',
        }} />
        </div>
    );
}

export default RuntimeOverTime;
ReactDOM.render(<RuntimeOverTime />, document.getElementById('root'));
