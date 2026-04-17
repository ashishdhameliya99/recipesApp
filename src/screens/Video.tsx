import React, { useState } from 'react';
import {
  TextInput,
  Button,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { SafeAreaView } from 'react-native-safe-area-context';

const VideoDownloader = () => {
  const [url, setUrl] = useState('');

  const downloadVideo = async () => {
    if (!url) return Alert.alert('Error', 'Please enter a URL');

    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        return Alert.alert(
          'Permission Denied',
          'Cannot download without storage access.',
        );
      }
    }

    const { dirs } = ReactNativeBlobUtil.fs;
    const fileName = `video_${Date.now()}.mp4`;
    const path = `${dirs.DownloadDir}/${fileName}`;

    ReactNativeBlobUtil.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: path,
        description: 'Downloading video...',
        mime: 'video/mp4',
      },
    })
      .fetch('GET', url)
      .then(res => {
        Alert.alert('Success', `Video downloaded to: ${res.path()}`);
        console.log('pathh======', res.path());
      })
      .catch(err => {
        Alert.alert('Download Error', err.message);
      });
  };

  return (
    <SafeAreaView>
      <TextInput
        placeholder="Paste MP4 Link Here"
        value={url}
        onChangeText={setUrl}
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <Button title="Download Video" onPress={downloadVideo} />
    </SafeAreaView>
  );
};

export default VideoDownloader;
