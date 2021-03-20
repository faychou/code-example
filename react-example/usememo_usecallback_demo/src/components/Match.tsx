/*
  1、useCallback
    在于缓存了每次渲染时 inline callback 的实例，配合上子组件的 shouldComponentUpdate 或者 React.memo 起到减少不必要的渲染的作用。

    注意：React.memo 和 React.useCallback 一定得配对使用。

    useMemo和useCallback都会在组件第一次渲染的时候执行，之后会在其依赖的变量发生改变时再次执行；并且这两个hooks都返回缓存的值，useMemo返回缓存的变量，useCallback返回缓存的函数
*/

import React, { useState, useCallback } from 'react';
import { BlueButton, RedButton } from './Button';
import RedTeam from './RedTeam';
import BlueTeam from "./BlueTeam";

const Match = () => {
  const [ redScore, setRedScore ] = useState(0);
  const [ blueScore, setBlueScore ] = useState(0);

  const setRedScoreHandler = useCallback(
    () => {
      setRedScore(redScore => redScore + 1);
    }, [redScore]);

  const setBlueScoreHandler = useCallback(
    () => {
      setBlueScore(blueScore => blueScore + 1);
    }, [blueScore]);

  return (
    <div className="match">
      <RedTeam />
      <RedButton onClick={setRedScoreHandler} />

      <hr />

      <BlueTeam blueScore={blueScore} redScore={redScore} />
      <BlueButton onClick={setBlueScoreHandler} />
    </div>
  )
}

export default Match;