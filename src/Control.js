import { useEffect } from 'react';

const Control = ({
  gameState,
  canvasRef,
  platform,}) => {

  useEffect(() => {
    const canvas = canvasRef.current;


    const movePlatform = ({ key }) => {
      if (key === 'ArrowRight' && platform.x < canvas.width - platform.w)
        platform.x += platform.speed;
      if (key === 'ArrowLeft' && platform.x > 0)
        platform.x -= platform.speed;
    }

    window.addEventListener('keydown', movePlatform);

    return (() => {
      window.removeEventListener('keydown', movePlatform)
    })

  }, []);


  return (
    <div>

    </div>
  );
};

export default Control;