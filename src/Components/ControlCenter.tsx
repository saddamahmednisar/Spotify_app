import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ControlCenter = () => {
    const playbackState = usePlaybackState();


    const skipToNext = async () => {
        await TrackPlayer.skipToNext();
    };


    const skipToPrevious = async () => {
        await TrackPlayer.skipToPrevious();
    };


    const togglePlayback = async (playback: State) => {
        const currentTrack = await TrackPlayer.getActiveTrack();

        if (currentTrack != null) {
            if (playback === State.Paused || playback === State.Ready) {
                await TrackPlayer.play();
            } else {
                await TrackPlayer.pause();
            }
        }
    };


    let playback: State | undefined;

    if (typeof playbackState === 'object' && 'state' in playbackState && playbackState.state !== undefined) {
        playback = playbackState.state;
    } else if (typeof playbackState === 'number') {
        playback = playbackState; 
    }
    console.log(  typeof playback,"i am  type playback");
    console.log(State,"state");
    return (
        <View style={styles.container}>
            <Pressable onPress={skipToPrevious}>
                <Icon style={styles.icon} name="skip-previous" size={40} />
            </Pressable>
            <Pressable onPress={() => playback !== undefined && togglePlayback(playback)}>
                <Icon style={styles.icon} name={
                    playback&& playback === State.Playing
                            ? "pause"
                            : "play-arrow"
                    
                } size={75} />
            </Pressable>


            <Pressable onPress={skipToNext}>
                <Icon style={styles.icon} name="skip-next" size={40} />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 56,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        color: '#FFFFFF',
    },
    playButton: {
        marginHorizontal: 24,
    },
});

export default ControlCenter;
