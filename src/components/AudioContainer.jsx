/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  cardJson: PropTypes.shape({
    type_: PropTypes.string,
    id_: PropTypes.number,
    extras: PropTypes.arrayOf(PropTypes.string),
    altVoices: PropTypes.arrayOf(PropTypes.number),
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
  const allVoices = [cardJson.id_];
  if (cardJson.altVoices) allVoices.push(cardJson.altVoices);

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
              {allVoices.map((voiceId, voiceIndex) => (
                <React.Fragment key={`frag${voiceId}`}>
                  <tr>
                    <td>{voiceIndex ? 'Alt ' : ''}Play </td>
                    <td>
                      <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/vo_${voiceId}_0.mp3`} />
                    </td>
                    <td>
                      <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/vo_${voiceId}_0.mp3`} />
                    </td>
                  </tr>
                  {cardJson.type_ === 'Follower'
                  && (
                  <>
                    <tr>
                      <td>{voiceIndex ? 'Alt ' : ''}Attack </td>
                      <td>
                        <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/vo_${voiceId}_1.mp3`} />
                      </td>
                      <td>
                        <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/vo_${voiceId}_1.mp3`} />
                      </td>
                    </tr>
                    <tr>
                      <td>{voiceIndex ? 'Alt ' : ''}Evolve </td>
                      <td>
                        <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/vo_${voiceId}_2.mp3`} />
                      </td>
                      <td>
                        <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/vo_${voiceId}_2.mp3`} />
                      </td>
                    </tr>
                    <tr>
                      <td>{voiceIndex ? 'Alt ' : ''}Death </td>
                      <td>
                        <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/vo_${voiceId}_3.mp3`} />
                      </td>
                      <td>
                        <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/vo_${voiceId}_3.mp3`} />
                      </td>
                    </tr>
                  </>
                  )}
                  {cardJson.extras && cardJson.extras[0].charAt(5) === '4'
                  && cardJson.extras.filter((card) => card.charAt(5) === '4').map((extra, index) => (
                    <React.Fragment key={`frag${extra}`}>
                      <tr>
                        <td>{voiceIndex ? 'Alt ' : ''}Accelerate {cardJson.extras.length !== 1 && index + 1}</td>
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
                  && cardJson.extras
                    .filter((card) => card.charAt(5) === '3' || card.charAt(5) === '2')
                    .map((extra, index) => (
                      <React.Fragment key={`frag${extra}`}>
                        <tr>
                          <td>{voiceIndex ? 'Alt ' : ''}Crystallize {cardJson.extras.length !== 1 && index + 1}</td>
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
                        <td>{voiceIndex ? 'Alt ' : ''}Union Burst 1</td>
                        <td>
                          <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/vo_${voiceId}_ub1.mp3`} />
                        </td>
                        <td>
                          <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/vo_${voiceId}_ub1.mp3`} />
                        </td>
                      </tr>
                      <tr>
                        <td>{voiceIndex ? 'Alt ' : ''}Union Burst 2</td>
                        <td>
                          <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/vo_${voiceId}_ub2.mp3`} />
                        </td>
                        <td>
                          <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/vo_${voiceId}_ub2.mp3`} />
                        </td>
                      </tr>
                    </>
                  )}
                  {cardJson.extras && cardJson.extras.includes('enh') && cardJson.extras
                    .filter((el) => el === 'enh')
                    .map((el, index, arr) => (
                      <React.Fragment key={`frag${el}`}>
                        <tr>
                          <td>{voiceIndex ? 'Alt ' : ''}Enhance {arr.length > 1 && index + 1}</td>
                          <td>
                            <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/vo_${voiceId}_enh${index}.mp3`} />
                          </td>
                          <td>
                            <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/vo_${voiceId}_enh${index}.mp3`} />
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  {cardJson.extras && cardJson.extras.includes('eff') && cardJson.extras
                    .filter((el) => el === 'eff')
                    .map((el, index, arr) => (
                      <React.Fragment key={`frag${el}`}>
                        <tr>
                          <td>{voiceIndex ? 'Alt ' : ''}Effect/Special {arr.length > 1 && index + 1}</td>
                          <td>
                            <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/jp/vo_${voiceId}_${cardJson.extras.includes('enh') ? index + 4 + sumArray(cardJson.extras.map((elem) => elem === 'enh')) : index + 4}.mp3`} />
                          </td>
                          <td>
                            <audio controls preload="none" src={`${process.env.REACT_APP_ASSETS_URL}/audio/en/vo_${voiceId}_${cardJson.extras.includes('enh') ? index + 4 + sumArray(cardJson.extras.map((elem) => elem === 'enh')) : index + 4}.mp3`} />
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
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
