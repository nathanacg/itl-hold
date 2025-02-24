import React, { useRef } from 'react';
import { View, StyleSheet, PanResponder, PanResponderGestureState, GestureResponderEvent } from 'react-native';
import { Dimensions } from 'react-native';

const TouchPanResponder = ({ children }: { children: React.ReactNode }) => {
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
                const touchX = evt.nativeEvent.locationX;
                const screenWidth = Dimensions.get('window').width;
            },
        })
    ).current;

    return (
        <View
            style={styles.container}
            {...panResponder.panHandlers}
        >
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
});

export default TouchPanResponder;
