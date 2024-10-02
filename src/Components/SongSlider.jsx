import React, { useState, useEffect } from 'react';
import Slider from '@react-native-community/slider';
import { View, StyleSheet, Text } from 'react-native';
import TrackPlayer, { useProgress, State } from 'react-native-track-player';

const SongSlider = () => {
  const { position, duration } = useProgress();
  const [sliderValue, setSliderValue] = useState(position);

 
  useEffect(() => {
    setSliderValue(position);
  }, [position]);

  
  const onValueChange = (value) => {
    setSliderValue(value);
  };

  
  const onSlidingComplete = async (value) => {
    try {
      const state = await TrackPlayer.getState();
      if (state === State.Playing || state === State.Paused) {
        await TrackPlayer.seekTo(value);
      } else {
        console.warn('TrackPlayer is not ready to seek.');
      }
    } catch (error) {
      console.error('Error seeking to position:', error);
    }
  };

  return (
    <View>
      <Slider
        value={sliderValue}
        minimumValue={0}
        maximumValue={duration > 0 ? duration : 1} 
        thumbTintColor="#FFF"
        maximumTrackTintColor="#FFF"
        style={styles.sliderContainer}
        onValueChange={onValueChange} 
        onSlidingComplete={onSlidingComplete} 
      />
      <View style={styles.timeContainer}>
        <Text style={styles.time}>
          {new Date(sliderValue * 1000).toISOString().substring(15, 19)}
        </Text>
        <Text style={styles.time}>
          {new Date((duration - sliderValue) * 1000).toISOString().substring(15, 19)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: 'row',
  },
  timeContainer: {
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    color: '#fff',
  },
});

export default SongSlider;
