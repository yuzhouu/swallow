import React from 'react';
import * as styles from './index.module.css';

const NoiseText = props => {
  return <span className={styles.noiseText} data-text={props.children} {...props}></span>;
};

const NoiseTextPage = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        background: '#121212',
        fontSize: '24px',
        fontWeight: 'bolder',
        fontFamily: 'monospace',
      }}
    >
      <NoiseText>Hello World!</NoiseText>
    </div>
  );
};

export default NoiseTextPage;
