/* eslint-disable react-hooks/exhaustive-deps */
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';

import {
  Camera,
  CameraDevice,
  CameraPosition,
  useCameraDevices,
} from 'react-native-vision-camera';

import {
  Container,
  Capture,
  CloseCamContainer,
  ControllersCamContainer,
  RecordView,
  Circle,
  RecordText,
} from './styles';

import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  Text,
  Platform,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';
import useCaptureImageStore from '../../GlobalState/zustand.store';
import { generateSequence } from './scriptx';
// import { getPhotosDevice } from '../../Utils/React-native-camera-row';
// import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { formatTimeRec } from '../../Utils/handleTime';

import ImagePicker from 'react-native-image-crop-picker';
import { useCameraUtils } from '../../Utils/camera.util';

function getCameraDevice(devices: CameraDevice[], cameraPosition: string) {
  return devices.find(device => device.position === cameraPosition);
}

export default function CameraAppPublication() {
  const navigation = useNavigation<StackRoutes>();
  const { captureImage, setCaptureImage } = useCaptureImageStore();
  const cameraRef = useRef<Camera>(null);
  const timeoutRef: MutableRefObject<number | null> = useRef(null); // Holds the timeout ID
  const [isRecording, setIsRecording] = useState(false);
  // const [galeryImage, setGaleryImage] = useState<PhotoIdentifier[]>([]);
  const route = useRoute();
  const params = route.params as {
    nextGaleryRouteName: '';
    routeParams: any;
    galerytAsset: 'All' | 'Photos' | 'Videos';
  };
  const [isCapturing, setIsCapturing] = useState(false);
  const [flash, setFlash] = useState<'on' | 'off'>('off');
  const [cameraPosition, setCameraPosition] = useState<CameraPosition>('back');
  const devices = useCameraDevices();
  const [deviceSelected, setDeviceSelected] = useState(
    getCameraDevice(devices, cameraPosition),
  );
  const [timer, setTimer] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  const { getPermission } = useCameraUtils();

  const handleCapture = async () => {
    if (cameraRef.current && !isCapturing && !isRecording) {
      setIsCapturing(true);
      const photo = await cameraRef.current.takePhoto();
      if (Platform.OS === 'ios') {
        if (photo.path) {
          ImagePicker.openCropper({
            path: photo.path,
            width: 1080,
            forceJpg: true,
            compressImageQuality: 1,
            cropperCancelText: 'Cancelar',
            cropperChooseText: 'Escolher',
            freeStyleCropEnabled: true,
            mediaType: 'photo',
            cropping: true,
            height: 1920,
          })
            .then(image => {
              setCaptureImage([
                ...captureImage,
                {
                  height: image.height,
                  uri: 'file://' + image.path,
                  width: image.width,
                  extension: 'jpg',
                  filename: generateSequence(),
                },
              ]);
              navigation.goBack();
            })
            .catch(e => {
              console.log('Error: ', e);
            });
        }
      } else {
        setCaptureImage([
          ...captureImage,
          {
            height: photo.height,
            uri: 'file://' + photo.path,
            width: photo.height,
            extension: 'jpg',
            filename: generateSequence(),
          },
        ]);
        if (photo.path) {
          navigation.goBack();
        }
        setIsCapturing(false);
      }
      setIsCapturing(false);
    }
  };

  // const takePhotoFromGalery = async () => {
  //   await ImagePicker.openPicker({
  //     maxFiles: 1,
  //     smartAlbums: ['UserLibrary', 'Videos'],
  //     writeTempFile: true,
  //     compressImageQuality: 0.8,
  //     cropperCancelText: 'Cancelar',
  //     cropperChooseText: 'Escolher',
  //     loadingLabelText: 'Carregando...',
  //     cropperTintColor: 'blue',
  //     forceJpg: true,
  //   })
  //     .then(image => {
  //       setCaptureImage([
  //         {
  //           uri: image.path,
  //           extension: 'mp4',
  //           filename: generateSequence(),
  //         },
  //       ]);
  //       navigation.navigate(params.nextGaleryRouteName, params.routeParams);
  //     })
  //     .catch(e => {
  //       console.warn('ImagePicker OpenPicker - EditProfile');
  //       console.log(e);
  //     });
  // };

  const clearTimeoutRef = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const clearTimerRef = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const recordVideo = () => {
    if (params.galerytAsset != 'Photos') {
      setIsRecording(true);
      setTimer(0);
      if (!isCapturing) {
        try {
          cameraRef.current?.startRecording({
            flash: flash,
            fileType: 'mp4',
            onRecordingFinished: video => {
              setCaptureImage([
                {
                  uri: video.path,
                  extension: 'mp4',
                  filename: generateSequence(),
                },
              ]);
              clearTimeoutRef();
              navigation.goBack();
            },
            onRecordingError: error => {
              console.error(error);
              clearTimeoutRef();
              stopRecording();
            },
          });
        } catch (error) {
          console.error(error);
          stopRecording();
        }

        // Update timer every second
        timerRef.current = setInterval(() => {
          setTimer(prevTimer => prevTimer + 1000);
        }, 1000);

        setCaptureImage([]);

        // Set timeout for stopping the recording automatically after 10 seconds
        timeoutRef.current = setTimeout(() => {
          if (isRecording) {
            stopRecording();
          }
        }, 10000); // Adjust the timeout duration as needed
      }
    }
  };

  const stopRecording = async () => {
    console.log('###################stoping record###################');
    if (cameraRef.current && isRecording) {
      await cameraRef.current.stopRecording();

      setIsRecording(false);
      setTimer(0);
      clearTimerRef();
      clearTimeoutRef();
    }
  };

  const toggleCamera = () => {
    setCameraPosition((prev: string) => (prev === 'back' ? 'front' : 'back'));
  };

  useEffect(() => {
    getPermission(setIsPermissionGranted);
    // getPhotosDevice({ setPhotos: setGaleryImage, photoCount: 1 });
  }, []);

  useEffect(() => {
    setCaptureImage([]);
  }, []);

  useEffect(() => {
    setDeviceSelected(getCameraDevice(devices, cameraPosition));
  }, [isPermissionGranted, cameraPosition, devices]);

  return (
    <Container>
      {deviceSelected && isPermissionGranted ? (
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          device={deviceSelected}
          onError={(e: Error) => {
            Alert.alert(
              'Erro na câmera',
              'Erro ao acessar a câmera. Por favor, tente novamente mais tarde.',
            );
            console.log('erro na camera', e);
          }}
          isActive={true}
          lowLightBoost={deviceSelected.supportsLowLightBoost || false} // Enable only if supported
          photo
          audio={true}
          torch={flash}
          video={true}
        />
      ) : (
        <></>
      )}
      {isRecording ? (
        <RecordView>
          <Circle />
          <RecordText>REC</RecordText>
          <Text style={{ color: '#fff', fontSize: 15 }}>
            {formatTimeRec(timer)}
          </Text>
        </RecordView>
      ) : (
        <CloseCamContainer>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close-sharp" size={31} color={'#fff'} />
          </TouchableOpacity>
        </CloseCamContainer>
      )}

      <ControllersCamContainer>
        <TouchableOpacity
          onLongPress={recordVideo}
          onPressOut={stopRecording}
          onPress={() => handleCapture()}>
          <Capture />
        </TouchableOpacity>
        {!isRecording ? (
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => {
                toggleCamera();
              }}>
              <Image
                source={require('../../Assets/Icons/changeCameraIcon.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ position: 'absolute', left: 55 }}
              onPress={() => setFlash(prev => (prev == 'on' ? 'off' : 'on'))}>
              <Image
                style={{ width: 28.5 }}
                source={require('../../Assets/Icons/flashIcon.png')}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ flexDirection: 'row', opacity: 0.1 }}>
            <TouchableOpacity
              onPress={() => {
                toggleCamera();
              }}>
              <Image
                source={require('../../Assets/Icons/changeCameraIcon.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ position: 'absolute', left: 55 }}
              onPress={() => setFlash(prev => (prev == 'on' ? 'off' : 'on'))}>
              <Image
                style={{ width: 28.5 }}
                source={require('../../Assets/Icons/flashIcon.png')}
              />
            </TouchableOpacity>
          </View>
        )}
      </ControllersCamContainer>
    </Container>
  );
}
