import { useEffect } from 'react'

import { StyleSheet, View } from 'react-native'

import Animated, {
    useSharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated'

import { theme } from '../../../../Theme/theme'

export default function SoundBar({ metricsTime = [], countBar = 0, position = 0, play = false }: { metricsTime: number[], countBar: number, position: number, play: boolean }) {

    const size = new Array(countBar).fill(0)

    return (
        <View style={styles.container}>
            {
                size.map((item, index) => (
                    <Bar key={index} metricTime={metricsTime?.[index]} play={play} position={position} index={index} />
                ))
            }
        </View>
    )
}

const Bar = ({ metricTime, play, position, index }: { metricTime: number, play: boolean, position: number, index: number }) => {

    const valor = metricTime || -40

    const volumeConv = (valor * -1) > 40 ? 40 : (valor * -1) < 0 ? 0 : (valor * -1)

    const mapValue = (value: number) => {
        return ((value - 0) * (1 - 0)) / (40 - 0) + 0;
    };

    const targetHeight = mapValue((40 - volumeConv) + 1);

    const barHeight = useSharedValue(0)

    useEffect(() => {
        barHeight.value = targetHeight
        /*  barHeight.value = withTiming(targetHeight, {
             duration: 500,
         }) */
    }, [metricTime])
    /*  
     barHeight.value = withSpring(targetHeight, {
         damping: 10,
         stiffness: 100,
     }); */
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scaleY: barHeight.value }],
        };
    },);

    return (
        <Animated.View
            style={[play ? position > index ? styles.bar : styles.barTransparent : styles.bar, animatedStyle]}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',

        alignItems: 'flex-end'
    },
    bar: {
        width: 2,
        backgroundColor: theme.textligthGray,
        marginHorizontal: 1,
        height: 30,
        borderRadius: 45
    },
    barTransparent: {
        width: 3,
        backgroundColor: theme.textligthGray + "55",
        marginHorizontal: 1,
        height: 30,
        borderRadius: 45
    },
})
