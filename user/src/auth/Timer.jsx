import React, { useMemo } from 'react'
import Countdown from 'react-countdown';
const Timer = ({time,setExpire}) => {
  console.log(" time ",time);
  const targetTime = useMemo(()=> Date.now() + time,[time])
  return (
    <div className='timer'>
      <Countdown onComplete={()=>setExpire(true)} date={targetTime}/>
    </div>
  )
}

export default Timer
