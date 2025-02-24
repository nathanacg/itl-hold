import { Linking } from 'react-native';
import { Alert } from 'react-native';
import { Camera } from 'react-native-vision-camera';

export function useCameraUtils() {
  const requestPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    const newMicrophonePermission = await Camera.requestMicrophonePermission();

    if (newCameraPermission === 'denied') {
      Alert.alert(
        'Permissão de câmera negada',
        'Para habilitar o acesso à câmera, vá para Configurações > Privacidade > Câmera e habilite as permissões para este aplicativo.',
        [{ text: 'OK' }],
      );
    }

    if (newMicrophonePermission === 'denied') {
      await Camera.requestMicrophonePermission();
    }
  };

  const getPermission = async (
    setIsPermissionGranted: (value: boolean) => void,
  ) => {
    const cameraPermission = Camera.getCameraPermissionStatus();
    const microphonePermission = Camera.getMicrophonePermissionStatus();

    if (cameraPermission === 'denied' || microphonePermission === 'denied') {
      const permissionType =
        cameraPermission === 'denied' ? 'câmera' : 'microfone';
      Alert.alert(
        `Permissão de ${permissionType} necessária`,
        `Este aplicativo requer acesso ao seu ${permissionType}. Por favor, habilite-o em suas configurações.`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Open Settings',
            onPress: () => Linking.openSettings(),
          },
        ],
      );
      setIsPermissionGranted(false);
    } else if (
      cameraPermission === 'not-determined' ||
      microphonePermission === 'not-determined'
    ) {
      await requestPermission();
      getPermission(setIsPermissionGranted);
    } else {
      setIsPermissionGranted(
        cameraPermission === 'granted' && microphonePermission === 'granted',
      );
    }
  };
  return {
    requestPermission,
    getPermission,
  };
}
