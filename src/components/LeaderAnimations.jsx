import React from 'react';
import * as PIXI from 'pixi.js';
import { ForegroundDiv } from '../styles/leaderAnimationStyles';

window.PIXI = PIXI;
require("pixi-spine")

class LeaderAnimations extends React.Component {
  constructor(props) {
    super(props); 
    this.pixi_cnt = null;
    this.app = new PIXI.Application({width: 1000, height: 1000, transparent:false});
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
        animation.y = this.app.screen.height / 4;

        this.app.stage.addChild(animation);
        console.log(animation);

        animation.state.setAnimation(0, 'extra', true);
    });
  };
  initialize = () => {
     this.avatar = new window.PIXI.Sprite(this.app.loader.resources["avatar"].texture);
     this.app.stage.addChild(this.avatar);
  };

  render() {
    return (
      <ForegroundDiv>
        <div ref={this.updatePixiCnt} />
      </ForegroundDiv>
    );
  }
};

export default LeaderAnimations;
