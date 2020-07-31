import React from 'react';
import { useTranslation } from 'react-i18next';

const FlagsContainer = () => {
  const { i18n } = useTranslation();
  return (
    <div style={{ float: 'right', marginRight: '20px' }}>
      <svg
        style={{ paddingRight: '10px', opacity: i18n.language === 'en' ? '90%' : '30%', cursor: 'pointer' }}
        onClick={() => i18n.changeLanguage('en')}
        width="50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 5850 3900"
      >
        <rect width="5850" height="3900" fill="#b22234" />
        <path d="M0,450H7410m0,600H0m0,600H7410m0,600H0m0,600H7410m0,600H0" stroke="#fff" strokeWidth="300" />
        <rect width="2964" height="2100" fill="#3c3b6e" />
        <g fill="#fff">
          <g id="s18">
            <g id="s9">
              <g id="s5">
                <g id="s4">
                  <path id="s" d="M247,90 317.534230,307.082039 132.873218,172.917961H361.126782L176.465770,307.082039z" />
                  <use xlinkHref="#s" y="420" />
                  <use xlinkHref="#s" y="840" />
                  <use xlinkHref="#s" y="1260" />
                </g>
                <use xlinkHref="#s" y="1680" />
              </g>
              <use xlinkHref="#s4" x="247" y="210" />
            </g>
            <use xlinkHref="#s9" x="494" />
          </g>
          <use xlinkHref="#s18" x="988" />
          <use xlinkHref="#s9" x="1976" />
          <use xlinkHref="#s5" x="2470" />
        </g>
      </svg>
      <svg
        style={{ paddingRight: '10px', opacity: i18n.language === 'jp' ? '90%' : '30%', cursor: 'pointer' }}
        onClick={() => i18n.changeLanguage('jp')}
        width="50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 900 600"
      >
        <rect fill="#fff" height="600" width="900" />
        <circle fill="#bc002d" cx="450" cy="300" r="180" />
      </svg>
    </div>
  );
};

export default FlagsContainer;
