import React, { useEffect } from 'react';

const AdContainer = ({ currentPath }) => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, [currentPath]);
  return (
    <div key={currentPath}>
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
};

export default AdContainer;
