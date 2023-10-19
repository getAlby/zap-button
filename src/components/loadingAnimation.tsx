import React, { useState, useEffect } from 'react';
import { Confirmations0Icon, Confirmations1Icon, Confirmations2Icon, Confirmations3Icon, Confirmations4Icon, Confirmations5Icon, Confirmations6Icon } from "@bitcoin-design/bitcoin-icons-react/filled";

const LoadingAnimation: React.FC<{className: string}> = ({className}) => {
  const icons = [Confirmations0Icon, Confirmations1Icon, Confirmations2Icon, Confirmations3Icon, Confirmations4Icon, Confirmations5Icon, Confirmations6Icon];
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((currentFrame + 1) % icons.length);
    }, 200); // Change the interval as needed (e.g., 200ms for a smoother animation)

    return () => {
      clearInterval(interval);
    };
  }, [currentFrame]);

  const CurrentIcon = icons[currentFrame];

  return (
    <CurrentIcon className={className} />
  );
};

export default LoadingAnimation;
