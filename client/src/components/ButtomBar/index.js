import React from 'react';

const bottomBar = {
    width: '100vw',
    height: '70px',
    position: 'absolute',
    bottom: 0,
    textAlign: 'center',
    lineHeight: '70px',
    color: '#fff',
    fontWeight: 'bold',
    background: 'rgba(0, 0, 0, 0.5)',
};

const BottomBar = () => {
    return (
        <div style={bottomBar}>
            © 2023 CIS5500 Team 25: Liancheng Gong, Jinyun Shan, Xinran Wang, Zhaoze Wang
        </div>
    );
}

export default BottomBar;