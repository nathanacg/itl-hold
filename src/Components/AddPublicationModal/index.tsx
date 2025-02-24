import React, { SetStateAction } from 'react';
import { TouchableOpacity } from 'react-native';
import BottomModal from '../BottomModal';
import { TextSimple } from '../elementsComponents';
import { TextOption } from '../Story/components/UserInfoModal/style';
import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Image } from 'react-native-elements';
import ConfigRoom from '../../Pages/ConfigRoom';
import useCreatePost from '../../GlobalState/createPost.zustand';
import useCaptureImageStore from '../../GlobalState/zustand.store';
import ImagePicker from 'react-native-image-crop-picker';

interface AddPublicationModalProps {
  setvisibleBottonModal: React.Dispatch<SetStateAction<boolean>>;
  visibleBottonModal: boolean;
}

export default function AddPublicationModal(props: AddPublicationModalProps) {
  const navigation = useNavigation<StackRoutes>();
  const { setMidiaSelectionType, setCaptureImage } = useCaptureImageStore();

  return (
    <BottomModal
      title=""
      setvisibleBottonModal={props.setvisibleBottonModal}
      visibleBottonModal={props.visibleBottonModal}
      children={
        <>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => {
              props.setvisibleBottonModal(false);
              setCaptureImage([]);
              navigation.push('Publication');
              setMidiaSelectionType('image');
            }}>
            <AntDesign
              name="appstore-o"
              size={19}
              color={'#231F20'}
              style={{ marginRight: 10, marginBottom: -2 }}
            />
            <TextOption>Publicação</TextOption>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => {
              props.setvisibleBottonModal(false);
              setCaptureImage([]);
              navigation.push('Camera', {
                nextGaleryRouteName: 'CreateStory',
                routeParams: { type: 'story' },
                galerytAsset: 'All',
              });
            }}>
            <Ionicons
              name="megaphone-outline"
              size={20}
              color={'#231F20'}
              style={{ marginRight: 10 }}
            />
            <TextOption>Cartaz</TextOption>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => {
              props.setvisibleBottonModal(false);

              setCaptureImage({});

              navigation.push('Camera', {
                nextGaleryRouteName: 'CreateStory',
                routeParams: { type: 'drops' },
                galerytAsset: 'Videos',
              });
            }}>
            <MaterialCommunityIcons
              name="movie-filter-outline"
              size={20}
              color={'#231F20'}
              style={{ marginRight: 10 }}
            />
            <TextOption>Drops</TextOption>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => {
              props.setvisibleBottonModal(false);
              navigation.push('CreateRoom');
            }}>
            <Image
              style={{
                width: 19,
                height: 19,
                resizeMode: 'contain',
                marginRight: 10,
              }}
              defaultSource={require('../../Assets/Icons/usersGroup.png')}
              source={require('../../Assets/Icons/usersGroup.png')}
            />

            <TextOption>Sala</TextOption>
          </TouchableOpacity>
        </>
      }
    />
  );
}
