import React from 'react';
import Image from '../../assets/images/Main.svg';
import './Styles.css';

export default function ImageBackground() {
  return (
    <img
      className="img-background"
      src={Image}
      alt=""
    />
  );
};
