import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native'

import styled from 'styled-components/native'
import { theme } from '../../Theme/theme'

const PulseAnimation = Animated.createAnimatedComponent(styled.View`
  width: 150px;
  height: 219px;
  margin-right: 16px;
  border-radius: 6px;
  background-color: ${theme.textligthGray};
  transform: scale(${(props: { scale: number; }) => props.scale || 1});
`)

const DropLoading = () => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start()
  }

  useEffect(() => {
    startPulseAnimation()
  }, [])

  return <PulseAnimation style={{ opacity: scaleValue }} />
}

export default DropLoading
