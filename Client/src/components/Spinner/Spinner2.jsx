import React, { useState, useEffect } from 'react';
import './Spinner2.css';

import hutImg from '../../assets/spinner/hut.png';
import hammerImg from '../../assets/spinner/hammar.png';
import gogglesImg from '../../assets/spinner/goggles.png';
import workerImg from '../../assets/spinner/Worker.png';

const Spinner2 = ({ workerSpeed = 1, hutGrowthSpeed = 1, gogglesSlideSpeed = 1, hammerSpinSpeed = 1 }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const sequence = [
      { delay: 300 * workerSpeed, nextStage: 1 }, // Applied workerSpeed for timing
      { delay: 600 * hutGrowthSpeed, nextStage: 2 }, // Applied hutGrowthSpeed for timing
      { delay: 300 * gogglesSlideSpeed, nextStage: 3 }, // Applied gogglesSlideSpeed for timing
      { delay: 600 * hammerSpinSpeed, nextStage: 0 }, // Applied hammerSpinSpeed for timing
    ];

    const timeout = setTimeout(() => {
      setStage((currentStage) => {
        const nextStageSetting = sequence.find((s) => s.nextStage === currentStage);
        return nextStageSetting ? nextStageSetting.nextStage : 0;
      });
    }, sequence[stage].delay);

    return () => clearTimeout(timeout);
  }, [stage, workerSpeed, hutGrowthSpeed, gogglesSlideSpeed, hammerSpinSpeed]);

  return (
    <div className='spinner2-container'>
      {stage === 0 && <img src={workerImg} className='spinner2-worker-animate' alt="worker" />}
      {stage === 1 && <img src={hutImg} className='spinner2-hut-grow' alt="hut" />}
      {stage === 2 && <img src={gogglesImg} className='spinner2-goggles-slide' alt="goggles" />}
      {stage === 3 && <img src={hammerImg} className='spinner2-hammer-spin' alt="hammer" />}
    </div>
  );
};

export default Spinner2;
