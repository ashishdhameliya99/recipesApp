import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  Alert,
  Platform,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import RNFS from 'react-native-fs';
import Video from 'react-native-video';
import * as Progress from 'react-native-progress';
import Orientation from 'react-native-orientation-locker';

const VideoApp: React.FC = () => {
  const [url, setUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [videoList, setVideoList] = useState<any[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const videoRef = useRef<any>(null);

  const folderPath =
    Platform.OS === 'ios'
      ? `${RNFS.DocumentDirectoryPath}/MyDemoVideos`
      : `${RNFS.DownloadDirectoryPath}/MyDemoVideos`;
  const loadVideos = useCallback(async () => {
    try {
      const exists = await RNFS.exists(folderPath);
      if (!exists) return;

      const files = await RNFS.readDir(folderPath);
      console.log('file=====', files);
      const videos = files
        .filter(f => f.name.endsWith('.mp4'))
        .sort((a, b) => (b.mtime?.getTime() || 0) - (a.mtime?.getTime() || 0));

      setVideoList(videos);
      console.log('videos=====', videos);
    } catch (err) {
      console.log('Read error:', err);
    }
  }, [folderPath]);

  useEffect(() => {
    loadVideos();
  }, [loadVideos]);

  const downloadVideo = async () => {
    if (!url.startsWith('http')) {
      Alert.alert('Error', 'Enter valid video URL');
      setUrl('');
      return;
    }

    const fileName = `video_${Date.now()}.mp4`;
    const filePath = `${folderPath}/${fileName}`;

    setDownloading(true);
    setProgress(0);
    console.log('filename=====', fileName);
    console.log('file path==', filePath);
    try {
      const exists = await RNFS.exists(folderPath);
      if (!exists) await RNFS.mkdir(folderPath);

      const download = RNFS.downloadFile({
        fromUrl: url,
        toFile: filePath,
        progressDivider: 5,
        progress: res => {
          if (res.contentLength > 0) {
            setProgress(res.bytesWritten / res.contentLength);
          }
        },
      });

      const result = await download.promise;
      console.log('result=====', result);
      if (result.statusCode === 200) {
        setTimeout(loadVideos, 500);
        Alert.alert('Success', 'Video Downloaded');
      } else {
        Alert.alert('Error', `Status: ${result.statusCode}`);
      }
    } catch (err: any) {
      Alert.alert('Error', 'Download failed', err);
    } finally {
      setDownloading(false);
    }
  };

  const handleSeek = (sec: number) => {
    if (videoRef.current) {
      const newTime = Math.max(0, currentTime + sec);
      videoRef.current.seek(newTime);
    }
  };

  const handleStop = () => {
    if (videoRef.current) {
      videoRef.current.seek(0);
      setCurrentTime(0);
      setIsPaused(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Video Download</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter MP4 URL"
        value={url}
        onChangeText={setUrl}
      />

      <Button
        title={downloading ? 'Downloading...' : 'Download'}
        onPress={downloadVideo}
        disabled={downloading}
      />

      {downloading && (
        <View style={styles.progressBox}>
          <Progress.Circle progress={progress} />
          <Text>{Math.round(progress * 100)}%</Text>
        </View>
      )}

      <FlatList
        data={videoList}
        keyExtractor={item => item.path}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                setSelectedVideo(item.path);
                setIsPaused(false);
                Orientation.lockToPortrait();
              }}
            >
              <View>
                <Text>{item?.name}</Text>
                <Text style={styles.videoMB}>
                  {(item?.size / (1024 * 1024)).toFixed(2)} MB
                </Text>
              </View>
              <Text style={styles.playText}>Play</Text>
            </TouchableOpacity>
          );
        }}
      />

      <Modal visible={!!selectedVideo} animationType="slide">
        <View style={styles.modal}>
          {selectedVideo && (
            <>
              <Video
                ref={videoRef}
                key={selectedVideo}
                source={{
                  uri:
                    Platform.OS === 'android'
                      ? selectedVideo
                      : selectedVideo.replace('file://', ''),
                }}
                style={styles.video}
                paused={isPaused}
                resizeMode="contain"
                onProgress={data => setCurrentTime(data.currentTime)}
                onError={e => console.log('Video Error:', e)}
                onLoad={() => console.log('Video Loaded successfully')}
                onBuffer={() => console.log('Buffering...')}
                onLoadStart={() => console.log('Load Started')}
              />

              <View style={styles.controls}>
                <TouchableOpacity onPress={() => handleSeek(-10)}>
                  <Text style={styles.btn}>- 10s</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setIsPaused(!isPaused)}>
                  <Text style={styles.btn}>{isPaused ? 'Play' : 'Pause'}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleSeek(10)}>
                  <Text style={styles.btn}>10s +</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.bottom}>
                <Button
                  title="Close"
                  onPress={() => {
                    setSelectedVideo(null);
                    Orientation.lockToPortrait();
                  }}
                />

                <Button title="Stop" onPress={handleStop} />
              </View>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default VideoApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
  },
  progressBox: {
    alignItems: 'center',
    marginVertical: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
  },

  modal: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '100%',
  },

  controls: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btn: {
    color: '#fff',
    fontSize: 18,
  },

  bottom: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  videoMB: {
    color: 'gray',
    fontSize: 12,
  },
  playText: {
    color: 'blue',
  },
});
