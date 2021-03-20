/*
  前言：
    React v16.6.0出了一些新的包装函数，一种用于函数组件 PureComponent / shouldComponentUpdate 形式的 React.memo()

  1、没有传递 props 的时候，使用 memo 可以防止组件不必要的渲染
    const BlueTeam = () => {
      console.log('---BlueTeam render---');

      return (
        <span className="blue-team">蓝队当前得分：</span>
      )
    }

    export default memo(BlueTeam);
  
  2、传递 props 的时候，使用 memo 可以保证 props 不变则组件不会重新渲染
    interface IProps {
      blueScore: number;
    }

    const BlueTeam = ({blueScore}: IProps) => {
      console.log('---BlueTeam render---');

      return (
        <span className="blue-team">蓝队当前得分：{blueScore}</span>
      )
    }

    export default memo(BlueTeam);

  3、传递多个 props 或 props 具有复杂结构时（因为 memo 只会进行 复杂对象 的浅比较），通过使用 memo 的第二个参数 自定义比较函数 来判断是否需要重新渲染组件
    interface IProps {
      blueScore: number;
      redScore: number;
    }

    const isEqual = (prevProps: IProps, nextProps: IProps) => {
      if (prevProps.blueScore !== nextProps.blueScore) {
        return false;
      }
      return true;
    }

    const BlueTeam = ({blueScore}: IProps) => {
      console.log('---BlueTeam render---');

      return (
        <span className="blue-team">蓝队当前得分：{blueScore}</span>
      )
    }

    export default memo(BlueTeam, isEqual);

  4、使用 useMemo 对指定变量进行缓存，当依赖改变时才重新执行
    interface IProps {
      blueScore: number;
      redScore: number;
    }

    const BlueTeam = ({blueScore}: IProps) => {
      console.log('---BlueTeam render---');

      return useMemo(() => {
        console.log('---BlueTeam useMemo render---');

        return <span className="blue-team">蓝队当前得分：{blueScore}</span>
      }, [ blueScore ]);
    }

    export default BlueTeam;
*/

import React, { memo, useMemo } from 'react';

interface IProps {
  blueScore: number;
  redScore: number;
}

const BlueTeam = ({blueScore}: IProps) => {
  console.log('---BlueTeam render---');

  return useMemo(() => {
    console.log('---BlueTeam useMemo render---');

    return <span className="blue-team">蓝队当前得分：{blueScore}</span>
  }, [ blueScore ]);
}

export default BlueTeam;