import React,{ useEffect, useState } from 'react';
import { View, Dimensions, TouchableOpacity } from 'react-native';

import ProgressBar from 'react-native-progress/Bar';

interface ProgressBarListProps {
  barCount: number;
  currentIndex: number;
  playNextStory: () => void;
  videoDuration: number;
}

export function BarListStories({
  barCount,
  currentIndex,
  playNextStory,
  videoDuration,
}: ProgressBarListProps) {
  const screenWidth = Dimensions.get('window').width;
  const barWidth = screenWidth / barCount;
  const barHeight = 2;
  const spacing = 10;

  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    setProgress(0);

    if (currentIndex >= 0 && currentIndex < barCount) {
      const interval = setInterval(() => {
        setProgress(prevProgress => {
          const elapsedTime = (prevProgress / 100) * videoDuration;
          const nextProgress = ((elapsedTime + 1) / videoDuration) * 100;

          if (nextProgress >= 101) {
            setProgress(0);
            clearInterval(interval);
            playNextStory();
          }

          return nextProgress;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [currentIndex, barCount, playNextStory, videoDuration]);

  return (
    <View
      style={{
        position: 'absolute',
        top: 70,
        zIndex: 1,
        width: '100%',
        left: 10,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        gap: 2,
      }}>
      {Array.from({ length: barCount }).map((_, index) => {
        const isCurrentBar = index === currentIndex;
        const progressValue = isCurrentBar
          ? progress / 100
          : (index + 1) / barCount;
        const progressBarColor = isCurrentBar ? '#fff' : '#646464';

        return (
          <TouchableOpacity key={index} style={{ marginBottom: spacing }}>
            <ProgressBar
              progress={progressValue}
              width={barWidth}
              height={barHeight}
              color={progressBarColor}
              borderColor="#646464"
              borderRadius={barHeight / 2}
              unfilledColor="#646464"
              borderWidth={0}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
