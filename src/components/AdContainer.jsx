/* eslint-disable react/no-redundant-should-component-update */
import React from 'react';

const initAd = () => {
  (window.adsbygoogle = window.adsbygoogle || []).push({});
};

class AdContainer extends React.PureComponent {
  componentDidMount() {
    initAd();
  }

  shouldComponentUpdate(nextProps) {
    const { key } = this.props.currentPath;
    return nextProps.currentPath.key !== key;
  }

  componentDidUpdate() {
    initAd();
  }

  render() {
    const { key } = this.props.currentPath;
    return (
      <div key={key}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', margin: '5px auto' }}
          data-ad-client="ca-pub-8451742260884006"
          data-ad-slot="6068453122"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }
}

export default AdContainer;
