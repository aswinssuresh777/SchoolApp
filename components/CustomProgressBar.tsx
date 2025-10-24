import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';

interface ProgressBarProps {
  progress: number; // Value between 0 and 1
  width?: number;
  height?: number;
  color?: string;
  backgroundColor?: string;
}

export class CustomProgressBar extends React.Component<ProgressBarProps> {
  private animation: Animated.Value;

  constructor(props: ProgressBarProps) {
    super(props);
    this.animation = new Animated.Value(0);
  }

  componentDidUpdate(prevProps: ProgressBarProps) {
    if (prevProps.progress !== this.props.progress) {
      this.animateProgress();
    }
  }

  private animateProgress = () => {
    Animated.spring(this.animation, {
      toValue: this.props.progress,
      useNativeDriver: false,
      tension: 40,
      friction: 8,
    }).start();
  };

  render() {
    const {
      width = 300,
      height = 4,
      color = '#0984e3',
      backgroundColor = '#dfe6e9',
    } = this.props;

    const circleSize = height * 3;

    return (
      <View style={styles.container}>
        <View style={[styles.progressBackground, { width, height, backgroundColor }]}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: this.animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
                height,
                backgroundColor: color,
              },
            ]}
          />
        </View>
        <Animated.View
          style={[
            styles.circle,
            {
              width: circleSize,
              height: circleSize,
              borderRadius: circleSize / 2,
              backgroundColor: color,
              transform: [{
                translateX: this.animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, width - circleSize],
                })
              }]
            },
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  progressBackground: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    borderRadius: 4,
  },
  circle: {
    position: 'absolute',
    top: -4,
    left: 0,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});