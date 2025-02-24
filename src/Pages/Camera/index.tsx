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
  Galery,
  RecordView,
  Circle,
  RecordText,
} from './style';

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
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackRoutes, StackRoutes } from '../../Routes/StackTypes';
import useCaptureImageStore from '../../GlobalState/zustand.store';
import { generateSequence } from './script';
import { getPhotosDevice } from '../../Utils/React-native-camera-row';
import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { formatTimeRec } from '../../Utils/handleTime';

import ImagePicker from 'react-native-image-crop-picker';
import { theme } from '../../Theme/theme';
import Info from '../../Components/Info';
import { useCameraUtils } from '../../Utils/camera.util';

function getCameraDevice(devices: CameraDevice[], cameraPosition: string) {
  return devices.find(device => device.position === cameraPosition);
}

export default function CameraApp() {
  const navigation = useNavigation<StackRoutes>();
  const { captureImage, setCaptureImage } = useCaptureImageStore();
  const cameraRef = useRef<Camera>(null);
  const timeoutRef: MutableRefObject<number | null> = useRef(null); // Holds the timeout ID
  const [galeryImage, setGaleryImage] = useState<PhotoIdentifier[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const route = useRoute<RouteProp<RootStackRoutes, 'Camera'>>();
  const { params } = route;
  // const [zoom, setZoom] = useState(0);
  const [isCapturing, setIsCapturing] = useState(false);
  const [flash, setFlash] = useState<'on' | 'off'>('off');
  const [cameraPosition, setCameraPosition] = useState<CameraPosition>('back');
  const devices = useCameraDevices();
  const [deviceSelected, setDeviceSelected] = useState(
    getCameraDevice(devices, cameraPosition),
  );
  const [timer, setTimer] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [advise, setAdvise] = useState(false);

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
              navigation.push(
                params.nextGaleryRouteName as keyof RootStackRoutes,
                params.routeParams,
              );
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
          navigation.push(
            params.nextGaleryRouteName as keyof RootStackRoutes,
            params.routeParams,
          );
        }
        setIsCapturing(false);
      }
      setIsCapturing(false);
    }
  };

  const toggleCamera = () => {
    setCameraPosition((prev: string) => (prev === 'back' ? 'front' : 'back'));
  };

  const takePhotoFromGalery = async () => {
    await ImagePicker.openPicker({
      maxFiles: 1,
      mediaType: params.routeParams.type == 'drops' ? 'video' : 'any',
      smartAlbums: ['UserLibrary'],
      writeTempFile: true,
      compressImageQuality: 1,
      cropperCancelText: 'Cancelar',
      cropperChooseText: 'Escolher',
      loadingLabelText: 'Carregando...',
      cropperTintColor: theme.secondaryColor,
      forceJpg: true,
    })
      .then(image => {
        setCaptureImage([
          {
            uri: image.path,
            extension: 'mp4',
            filename: generateSequence(),
          },
        ]);
        navigation.push(
          params.nextGaleryRouteName as keyof RootStackRoutes,
          params.routeParams,
        );
      })
      .catch(e => {
        console.warn('ImagePicker OpenPicker - EditProfile');
        console.log(e);
      });
  };

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
              navigation.push(
                params.nextGaleryRouteName as keyof RootStackRoutes,
                params.routeParams,
              );
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
    if (cameraRef.current && isRecording) {
      await cameraRef.current.stopRecording();

      setIsRecording(false);
      setTimer(0);
      clearTimerRef();
      clearTimeoutRef();
    }
  };

  useEffect(() => {
    getPermission(setIsPermissionGranted);
    getPhotosDevice({ setPhotos: setGaleryImage, photoCount: 1 });
    setCaptureImage([]);
  }, []);

  useEffect(() => {
    setDeviceSelected(getCameraDevice(devices, cameraPosition));
  }, [isPermissionGranted, cameraPosition, devices]);

  return (
    <Container>
      {!deviceSelected || !isPermissionGranted ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#fff' }}>Loading camera...</Text>
        </View>
      ) : (
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
          // zoom={zoom}
          torch={flash}
          video={true}
        />
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
        <TouchableOpacity onPress={takePhotoFromGalery}>
          {galeryImage.length > 0 && (
            <Galery source={{ uri: galeryImage[0].node.image.uri }} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onLongPress={recordVideo}
          onPressOut={stopRecording}
          onPress={() =>
            params.routeParams.type === 'drops'
              ? setAdvise(!advise)
              : handleCapture()
          }>
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
      <Info
        text="Segure para gravar vídeo"
        setVissible={setAdvise}
        isVisible={advise}
      />
    </Container>
  );
}
