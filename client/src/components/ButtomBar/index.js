import React from 'react';
import styled from "styled-components";

const Bar = styled.div`
    width: 100vw;
    height: 50px;
    position: fixed;
    bottom: 0;
    text-align: center;
    line-height: 50px;
    color: #fff;
    font-weight: bold;
    font-size: 12px;
    background: rgba(0, 0, 0, 1);
    @media screen and (max-width: 600px) {
        height: 70px;
        font-size: 10px;
        line-height: normal;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const BottomBar = () => {
    return (
        <Bar>
            © 2023 CIS5500 Team 25: Liancheng Gong, Jinyun Shan, Xinran Wang, Zhaoze Wang
        </Bar>
    );
}

export default BottomBar;