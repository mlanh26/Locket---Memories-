import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import Slider from '@react-native-community/slider';

const { width, height } = Dimensions.get('window');

const CameraScreen = () => {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [zoom, setZoom] = useState(0);

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Không có quyền truy cập camera</Text>
        <TouchableOpacity 
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionText}>Cấp quyền</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (
      current === 'back' ? 'front' : 'back'
    ));
  };

  const handleCapture = () => {
    console.log('Capture photo');
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        zoom={zoom}
      >
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity 
            style={styles.profileSection}
            onPress={() => router.push('/profile')}
          >
            <Image 
              source={require('../../assets/images/profile.png')}
              style={styles.profileIcon}
            />
          </TouchableOpacity>

          <View style={styles.friendsCounter}>
            <Text style={styles.friendsText}>27 người bạn</Text>
          </View>

          <TouchableOpacity 
            style={styles.messagesButton}
            onPress={() => router.push('/messages')}
          >
            <Image 
              source={require('../../assets/images/message.png')}
              style={styles.messageIcon}
            />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* Zoom Indicator */}
        <View style={styles.zoomIndicator}>
          <Text style={styles.zoomText}>{(zoom + 1).toFixed(1)}x</Text>
        </View>

        {/* Bottom Controls */}
        <View style={styles.bottomControls}>
          <TouchableOpacity style={styles.galleryButton}>
            <View style={styles.galleryPreview}>
              <Image 
                source={require('../../assets/images/Picture.png')}
                style={styles.galleryIcon}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.captureButton}
            onPress={handleCapture}
          >
            <View style={styles.captureOuter}>
              <View style={styles.captureInner} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.flipButton}
            onPress={toggleCameraFacing}
          >
            <Image 
              source={require('../../assets/images/Refresh.png')}
              style={styles.flipIcon}
            />
          </TouchableOpacity>
        </View>

        {/* History Button */}
        <TouchableOpacity style={styles.historyButton}>
          <Text style={styles.historyText}>Lịch sử</Text>
          <Image 
            source={require('../../assets/images/arrow-down.png')}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>

        {/* Zoom Slider */}
        <View style={styles.zoomSliderContainer}>
          <Slider
            style={styles.zoomSlider}
            minimumValue={0}
            maximumValue={3}
            value={zoom}
            onValueChange={setZoom}
            minimumTrackTintColor="#FFB800"
            maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
            thumbTintColor="#FFB800"
          />
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 44,
    width: '100%',
  },
  profileSection: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  friendsCounter: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -50 }],
    alignSelf: 'center',
  },
  friendsText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  messagesButton: {
    position: 'relative',
  },
  messageIcon: {
    width: 24,
    height: 24,
  },
  notificationDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFB800',
  },
  zoomIndicator: {
    position: 'absolute',
    top: 100,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  zoomText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 120,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  galleryButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryPreview: {
    width: 32,
    height: 32,
    borderRadius: 4,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryIcon: {
    width: 24,
    height: 24,
  },
  captureButton: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#FFB800',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFF',
  },
  flipButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFF',
  },
  historyButton: {
    position: 'absolute',
    bottom: 34,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  historyText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  arrowIcon: {
    width: 16,
    height: 16,
    tintColor: '#FFF',
  },
  zoomSliderContainer: {
    position: 'absolute',
    bottom: 200,
    left: 20,
    right: 20,
  },
  zoomSlider: {
    width: '100%',
    height: 40,
  },
  errorText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  permissionButton: {
    backgroundColor: '#FFB800',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  permissionText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CameraScreen;