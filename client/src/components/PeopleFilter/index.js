import React from "react";
import styled from "styled-components";

const filterContainer = {
    width: '100%',
    height: '50px',
    background: 'rgba(0, 0, 0, 0.6)',
    color: '#fff',
    margin: '0 20px',
    boxSizing: 'border-box',
    borderRadius: '10px',
    textAlign: 'center',
    justifyContent: 'space-between',
    verticalAlign: 'top',
    padding: '10px 0',
}

const listItem = {
    listStyle: 'none',
    height: '30px',
    lineHeight: '30px',
    margin: '0',
    padding: '0 20px',
    color: '#fff',
    textAlign: 'center',
    display: 'inline-block',
    verticalAlign: 'top',
    borderRight: '1px solid #fff',
};

const List = styled.ul`
    margin: 0;
`;

const UnList = styled.ul`
margin: 0;
`;

const PeopleFilter = () => {
    return (
        <div style={filterContainer}>
            <UnList>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
                    if (item <= 8) {
                        return <List key={index} style={listItem}>Filter {item}</List>
                    } else {
                        return <List key={index} style={{...listItem, borderRight: 'none'}}>Filter {item}</List>
                    }
                })}
            </UnList>
        </div>
    );
};

export default PeopleFilter;