import { TextLightGray, TextRegular11 } from '../configurationsElemetsStyle';
import { Icon } from 'react-native-elements'
import {
    ImageLocker,
    PrivateInfoContainer,
    TextInstructionsPrivate,
    TextPrivate
} from './style'
import { theme } from '../../Theme/theme';

interface PrivateProps {
    title: string
    text: string
    textSecond: string
}

export default function Private(props: PrivateProps) {
    return (
        <PrivateInfoContainer>
            <Icon
                name={'lock'}
                color={theme.textligthGray}
                size={70}
                type='material'
            />

            <TextRegular11>{props.title}</TextRegular11>
            <TextLightGray style={{ marginTop: -6 }}>
                {props.text}
            </TextLightGray>
            {
                props.textSecond &&
                <TextLightGray style={{ marginTop: -10 }}>
                    {props.textSecond}
                </TextLightGray>
            }
        </PrivateInfoContainer>
    );
};
