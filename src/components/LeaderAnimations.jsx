import React from 'react';
import * as PIXI from 'pixi.js';
import { withTranslation } from 'react-i18next';
import {
  ForegroundDiv,
  DimBackground,
  StyledDiv,
  ResponsiveButton,
} from '../styles/leaderAnimationStyles';

window.PIXI = PIXI;
require("pixi-spine")

// this component is all kinds of messed up, I should be using state properly
class LeaderAnimations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.loading = true;
    this.pixi_cnt = null;
    this.app = new PIXI.Application(
      {
        width: window.innerWidth > window.innerHeight ? window.innerWidth / 2 : window.innerWidth,
        height: window.innerWidth > window.innerHeight ? window.innerWidth / 2 : window.innerWidth,
        transparent: false,
        backgroundColor: 0x00b140
      }
    );
    this.animation = null;
    this.animScale = 0.6;
  };

  updatePixiCnt = (element) => {
    this.pixi_cnt = element;
    if(this.pixi_cnt && this.pixi_cnt.children.length<=0) {
      this.pixi_cnt.appendChild(this.app.view);
      this.setup();
    }
  };

  setup = () => {
    this.app.loader.baseUrl = process.env.REACT_APP_ASSETS_URL + '/anim/';
    this.app.loader
    .add('class_' + this.props.classId + '.json', 'class_' + this.props.classId + '.json')
    .load((loader, resources) => {
        this.animation = new window.PIXI.spine.Spine(resources['class_' + this.props.classId + '.json'].spineData);

        this.animation.x = this.app.screen.width / 2;
        this.animation.y = this.app.screen.height / 2;
        this.animation.scale.set(this.animScale);

        if (this.animation.spineData.skins.length > 1) {
          this.animation.skeleton.setSkinByName(this.animation.spineData.skins[1].name);
        }

        this.app.stage.addChild(this.animation);

        this.animation.state.setAnimation(0, 'idle', true);
        this.loading = false;
        this.setState(this.state);
    });
  };

  renderButtons = () => {
    if(this.animation) {
      return(
        this.animation.spineData.animations.map((animation) => (
          <ResponsiveButton
            type="button"
            onClick={() => this.animation.state.setAnimation(0, animation.name, true)}
            style={{ margin: '5px' }}
            key={`button${animation.name}`}
          >
            {animation.name}
          </ResponsiveButton>
        ))
      )
    }
  };

  renderSkinButtons = () => {
    if(this.animation
      && this.animation.spineData.skins.length > 1
      && this.animation.spineData.skins[1].attachments.length !== 0) {
      return(
        <>
          <p style={{ marginBottom: '20px', borderBottom: '2px solid pink', paddingTop: '14px' }}>{this.props.t('Switch expression')}</p>
          {this.animation.spineData.skins.map((skin) => (
            <ResponsiveButton
              type="button"
              onClick={() => this.animation.skeleton.setSkinByName(skin.name)}
              key={`skin${skin.name}`}
            >
              {skin.name}
            </ResponsiveButton>
          ))}
        </>
      )
    }
  }

  render() {
    return (
      <DimBackground>
        <ForegroundDiv>
          { this.loading && <p style={{ position: 'absolute', top: '50%', left: '50%' }}>Loading...</p> }
          <StyledDiv ref={this.updatePixiCnt} style={{ display: this.loading ? 'hidden' : 'inline' }} />
          <div style={{ display: 'inline' }}>
            <p style={{ marginBottom: '20px', borderBottom: '2px solid pink', paddingTop: '14px' }}>{this.props.t('Switch animation')}</p>
            <div>
              {this.renderButtons()}
            </div>
            <div>
              {this.renderSkinButtons()}
            </div>
            <ResponsiveButton
              style={{ width: '5vw' }}
              onClick={() => {
                this.animScale += 0.1
                this.animation.scale.set(this.animScale);
                }}>
              Zoom +
            </ResponsiveButton>
            <ResponsiveButton
              style={{ width: '5vw' }}
              onClick={() => {
                this.animScale -= 0.1
                this.animation.scale.set(this.animScale);
                }}>
              Zoom -
            </ResponsiveButton>
            <ResponsiveButton
              type="button"
              onClick={() => this.props.close()}
              style={{ backgroundColor: '#502020', position: 'relative' }}
            >
              {this.props.t('Close')}
            </ResponsiveButton>
          </div>

        </ForegroundDiv>
      </DimBackground>
    );
  }
};

export default withTranslation()(LeaderAnimations);
