import React from 'react';
import { createAnimation } from '@ionic/core';

type LoaderProps = {
  fadeTrigger?: boolean,
}

const Loader: React.FC<LoaderProps> = ({ fadeTrigger }) => {
  React.useEffect(() => {
    if (fadeTrigger) {
      setTimeout(() => {
        const animation = createAnimation()
          .addElement(document.querySelector('img')!)
          .duration(500)
          .direction('alternate')
          .iterations(1)
          .keyframes([
            { offset: 0, transform: 'scale(1)', opacity: '1' },
            { offset: 1, transform: 'scale(30)', opacity: '0'}
          ]);
        animation.play();
      }, 700)
    }
  }, [fadeTrigger]);

  return (
    <div className="fdr fjc height100">
      <img className="loading-image" src="/assets/cdi-logo.png" alt="loading"/>
    </div>
  )
};

export default Loader;
