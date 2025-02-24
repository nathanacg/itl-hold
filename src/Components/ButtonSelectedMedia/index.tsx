import React from 'react';
import {
    Button,
    ButtonsContainer,
    CountTextButton,
    TextButton,
    Separate
} from './style';

interface button { name: string, count: number, onPress: () => void }

interface propsButtonSelectedMedia {
    buttons: button[]
}

export default function ButtonSelectedMedia(props: propsButtonSelectedMedia) {
    return (
        <ButtonsContainer>
            {props.buttons[0] && (
                <>
                    <Button onPress={props.buttons[0].onPress}>
                        <TextButton>{props.buttons[0].name}</TextButton>
                        <CountTextButton>
                            {props.buttons[0].count > 0 && (
                                `(${props.buttons[0].count})`
                            )}
                        </CountTextButton>
                    </Button>
                </>
            )}
            {props.buttons[0] && props.buttons[1] && (
                <Separate />
            )}
            {props.buttons[1] && (
                <Button onPress={props.buttons[1].onPress}>
                    <TextButton>{props.buttons[1].name}</TextButton>
                    <CountTextButton>
                        {props.buttons[1].count > 0 && (
                            `(${props.buttons[1].count})`
                        )}
                    </CountTextButton>
                </Button>
            )}
            {props.buttons[1] && props.buttons[2] && (
                <Separate />
            )}
            {props.buttons[2] && (
                <Button onPress={props.buttons[2].onPress}>
                    <TextButton>{props.buttons[2].name}</TextButton>
                    <CountTextButton>
                        {props.buttons[2].count > 0 && (
                            `(${props.buttons[2].count})`
                        )}
                    </CountTextButton>
                </Button>
            )}
        </ButtonsContainer>
    );
};
