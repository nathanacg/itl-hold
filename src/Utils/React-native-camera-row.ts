import { PermissionsAndroid, Platform } from 'react-native';
import {
  AssetType,
  CameraRoll,
  PhotoIdentifier,
} from '@react-native-camera-roll/camera-roll';
import React, { SetStateAction } from 'react';

export async function hasAndroidPermission() {
  const permission =
    Number(Platform.Version) >= 33
      ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
      : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
  const videoPermission = PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO;
  const audioPermission = PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO;

  const hasPermission = await PermissionsAndroid.check(permission);
  const hasVideoPermission = await PermissionsAndroid.check(videoPermission);
  const hasAudioPermission = await PermissionsAndroid.check(audioPermission);
  if (hasPermission && hasVideoPermission && hasAudioPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}

export async function getPhotosDevice(props: {
  setPhotos: React.Dispatch<SetStateAction<PhotoIdentifier[]>> | any;
  photoCount?: number;
  assetType?: AssetType;
}) {
  if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
    return;
  }
  CameraRoll.getPhotos({
    first: props.photoCount ? props.photoCount : 10000000,
    assetType: props.assetType ? props.assetType : 'Photos',
  })
    .then(result => {
      props.setPhotos(result.edges);
    })
    .catch(e => {
      console.warn('CameraRoll - GetPhotosDevice');
      console.log(e);
    });
}
