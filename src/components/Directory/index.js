import React from 'react';
import Country from './../../assets/country.png';
import Club from './../../assets/club.png';
import './styles.scss';

const Directory = props => {
    return (
        <div className="directory">
            <div className="wrap">
                <div
                    className="item"
                    style={{
                        backgroundImage: `url(${Club})`
                    }}>
                    <a>
                        Shop Club
                    </a>
                </div>
                <div
                    className="item"
                    style={{
                        backgroundImage: `url(${Country})`
                    }}>
                    <a>
                        Shop Country
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Directory;