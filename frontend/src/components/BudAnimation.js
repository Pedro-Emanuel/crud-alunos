// src/components/BudAnimation.js
import React from 'react';
import { DotLottiePlayer } from '@dotlottie/react-player';

const BudAnimation = () => {
  return (
    <DotLottiePlayer
      src="animations/bud.lottie"
      autoplay
      loop
      style={{ width: '300px', height: '300px' }}
    />
  );
};

export default BudAnimation;