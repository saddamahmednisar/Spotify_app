import React, { useState, useEffect } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, View } from 'react-native';

import TrackPlayer, {
  Event,
  Track,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import { playListData } from '../constants';
import SongInfo from '../Components/Songinfo';
import SongSlider from '../Components/SongSlider';
import ControlCenter from '../Components/ControlCenter';

const { width } = Dimensions.get('window');

const defaultTrackIndex = 0;

const MusicPlayer = () => {
  const [track, setTrack] = useState<Track | null>(null);


  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async (event) => {
    if (event.type === Event.PlaybackActiveTrackChanged) {
      const playingTrack = await TrackPlayer.getActiveTrack();
      if (playingTrack) {
        setTrack(playingTrack);
      } else {
        setTrack(null);
      }
    }
  });

  const setupPlaylist = async () => {
    try {
      await TrackPlayer.reset();
      await TrackPlayer.add(playListData);
      await TrackPlayer.skip(playListData[defaultTrackIndex].id);

    } catch (error) {
      console.error('Error setting up playlist:', error);
    }
  };

  useEffect(() => {
    setupPlaylist();
  }, []);

  const renderArtWork = () => {
    return (
      <View style={styles.listArtWrapper}>
        <View style={styles.albumContainer}>
          {track?.artwork && (
            <Image style={styles.albumArtImg} source={{ uri: track.artwork.toString() }} />
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={playListData}
        renderItem={renderArtWork}
        keyExtractor={(song) => song.id.toString()}
        showsHorizontalScrollIndicator={false}
      />
      <SongInfo track={track} />
      <SongSlider />
      <ControlCenter />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#001d23',
  },
  listArtWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumContainer: {
    marginTop: 20,
    width: 300,
    height: 300,
  },
  albumArtImg: {
    height: '100%',
    borderRadius: 4,
  },
});

export default MusicPlayer;
