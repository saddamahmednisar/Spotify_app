import React, { useState, useEffect } from 'react'
import type { PropsWithChildren } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';


import { setupPlayer, addTrack } from '../musicPlayerServices';
import MusicPlayer from './screens/MusicPlayer';

function App(): React.JSX.Element {
  const [isPlayerReady, setIsPlayerReady] = useState(false)


  async function setup() {
    let isSetup = await setupPlayer()
   
    if (isSetup) {
     const track = await addTrack()
      console.log('Track Added:', track); 
    }

    setIsPlayerReady(isSetup)
  }

  useEffect(() => {
   setup()
  }, [])
  
  if(!isPlayerReady){
     return (
      <SafeAreaView>
        <ActivityIndicator/>
      </SafeAreaView>
     )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'}/>
      <MusicPlayer/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
