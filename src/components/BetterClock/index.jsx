import React from 'react';
import useClock from '../../hooks/useClock';
import './BetterClock.scss'
BetterClock.propTypes = {};

function BetterClock(props) {
  const {timeString} = useClock();
  
  return (
    <div className="better-clock">
      <p style={{fontSize: '42px'}}>{timeString}</p>
    </div>
  );
}

export default BetterClock;