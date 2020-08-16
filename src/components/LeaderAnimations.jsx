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
    this.app = new PIXI.Application({width: this.props.width, height: this.props.height, transparent:false});
    this.animation = null;
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
        this.animation.scale.set(0.5)

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

  render() {
    return (
      <DimBackground>
        <ForegroundDiv>
          { this.loading && <p style={{ position: 'absolute', top: '50%', left: '50%' }}>Loading...</p> }
          <StyledDiv ref={this.updatePixiCnt} style={{ display: this.loading ? 'hidden' : 'inline' }} />
          <div style={{ display: 'inline', flex: '1' }}>
            <p style={{ marginBottom: '20px', borderBottom: '2px solid pink', paddingTop: '14px' }}>{this.props.t('Switch animation')}</p>
            {this.renderButtons()}
            <ResponsiveButton
              type="button"
              onClick={() => this.props.close()}
              style={{ backgroundColor: '#502020' }}
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
