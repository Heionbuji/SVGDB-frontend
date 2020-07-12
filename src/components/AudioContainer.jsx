/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  cardJson: PropTypes.shape({
    type_: PropTypes.string,
    extras: PropTypes.arrayOf(PropTypes.string),
  }),
  cardId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

const AudioContainer = ({ cardJson, cardId }) => {
  const sumArray = (arr) => {
    let sum = 0;
    arr.forEach((el) => {
      sum += el;
    });
    return sum;
  };

  if (cardJson && cardId) {
    return (
      cardJson.type_ !== 'Amulet' && (
        <>
          <table style={{ margin: 'auto' }}>
            <thead>
              <tr>
                <th style={{ width: 'auto' }} />
                <th>Japanese</th>
                <th>English</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Play </td>
                <td>
                  <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/vo_${cardId}_0.mp3`} />
                </td>
                <td>
                  <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/vo_${cardId}_0.mp3`} />
                </td>
              </tr>
              {cardJson.type_ === 'Follower'
                  && (
                  <>
                    <tr>
                      <td>Attack </td>
                      <td>
                        <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/vo_${cardId}_1.mp3`} />
                      </td>
                      <td>
                        <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/vo_${cardId}_1.mp3`} />
                      </td>
                    </tr>
                    <tr>
                      <td>Evolve </td>
                      <td>
                        <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/vo_${cardId}_2.mp3`} />
                      </td>
                      <td>
                        <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/vo_${cardId}_2.mp3`} />
                      </td>
                    </tr>
                    <tr>
                      <td>Death </td>
                      <td>
                        <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/vo_${cardId}_3.mp3`} />
                      </td>
                      <td>
                        <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/vo_${cardId}_3.mp3`} />
                      </td>
                    </tr>
                  </>
                  )}
              {cardJson.extras && cardJson.extras[0].charAt(5) === '4'
                  && cardJson.extras.map((extra, index) => (
                    <React.Fragment key={`frag${extra}`}>
                      <tr>
                        <td>Accelerate {cardJson.extras.length !== 1 && index + 1}</td>
                        <td>
                          <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/vo_${extra}_0.mp3`} />
                        </td>
                        <td>
                          <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/vo_${extra}_0.mp3`} />
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
              {cardJson.extras && (cardJson.extras[0].charAt(5) === '3' || cardJson.extras[0].charAt(5) === '2')
                  && cardJson.extras.map((extra, index) => (
                    <React.Fragment key={`frag${extra}`}>
                      <tr>
                        <td>Crystallize {cardJson.extras.length !== 1 && index + 1}</td>
                        <td>
                          <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/vo_${extra}_0.mp3`} />
                        </td>
                        <td>
                          <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/vo_${extra}_0.mp3`} />
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
              {cardJson.extras && cardJson.extras[0] === 'ub'
                  && (
                    <>
                      <tr>
                        <td>Union Burst 1</td>
                        <td>
                          <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/vo_${cardId}_ub1.mp3`} />
                        </td>
                        <td>
                          <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/vo_${cardId}_ub1.mp3`} />
                        </td>
                      </tr>
                      <tr>
                        <td>Union Burst 2</td>
                        <td>
                          <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/vo_${cardId}_ub2.mp3`} />
                        </td>
                        <td>
                          <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/vo_${cardId}_ub2.mp3`} />
                        </td>
                      </tr>
                    </>
                  )}
              {cardJson.extras && cardJson.extras.includes('enh') && cardJson.extras
                .filter((el) => el === 'enh')
                .map((el, index, arr) => (
                  <React.Fragment key={`frag${el}`}>
                    <tr>
                      <td>Enhance {arr.length > 1 && index + 1}</td>
                      <td>
                        <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/vo_${cardId}_enh${index}.mp3`} />
                      </td>
                      <td>
                        <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/vo_${cardId}_enh${index}.mp3`} />
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              {cardJson.extras && cardJson.extras.includes('eff') && cardJson.extras
                .filter((el) => el === 'eff')
                .map((el, index, arr) => (
                  <React.Fragment key={`frag${el}`}>
                    <tr>
                      <td>Effect/Special {arr.length > 1 && index + 1}</td>
                      <td>
                        <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/vo_${cardId}_${cardJson.extras.includes('enh') ? index + 4 + sumArray(cardJson.extras.map((elem) => elem === 'enh')) : index + 4}.mp3`} />
                      </td>
                      <td>
                        <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/vo_${cardId}_${cardJson.extras.includes('enh') ? index + 4 + sumArray(cardJson.extras.map((elem) => elem === 'enh')) : index + 4}.mp3`} />
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
            </tbody>
          </table>
        </>
      ));
  }
  return null;
};

AudioContainer.propTypes = propTypes;

export default AudioContainer;
