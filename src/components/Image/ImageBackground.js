import React from 'react';
import { default as Main } from '../../assets/img/Main.svg';
import './Styles.css';

export default function ImageBackground() {
    return (
        <img src={Main} alt="" className="img-background" />
    );
};
