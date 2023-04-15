import React from "react";

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

const PeopleList = () => {
    return (
        <div style={container}>
            <h1>People List</h1>
            <ul>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
                    return <li key={index} style={listItem}>Item {item}</li>
                })}
            </ul>
        </div>
    );
};

export default PeopleList;