import React from 'react';
import * as PIXI from 'pixi.js';
import { ForegroundDiv, DimBackground } from '../styles/leaderAnimationStyles';

window.PIXI = PIXI;
require("pixi-spine")

class LeaderAnimations extends React.Component {
  constructor(props) {
    super(props); 
    this.pixi_cnt = null;
    this.app = new PIXI.Application({width: this.props.width, height: this.props.height, transparent:false});
  };

  updatePixiCnt = (element) => {
    this.pixi_cnt = element;
    console.log(this.props.classId);
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
        console.log(resources);
        var animation = new window.PIXI.spine.Spine(resources['class_' + this.props.classId + '.json'].spineData);

        animation.x = this.app.screen.width / 2;
        animation.y = this.app.screen.height / 2;
        animation.scale.set(0.5)

        this.app.stage.addChild(animation);
        console.log(animation);

        animation.state.setAnimation(0, 'extra', true);
    });
  };

  render() {
    return (
      <DimBackground>
        <ForegroundDiv>
          <div ref={this.updatePixiCnt} style={{ display: 'inline', padding: '50px 100px' }} />
          <div style={{ display: 'inline', flex: '1' }}>
            <p style={{ marginBottom: '10px', borderBottom: '2px solid pink', paddingTop: '14px' }}>Switch animation</p>
          </div>
        </ForegroundDiv>
      </DimBackground>
    );
  }
};

export default LeaderAnimations;
