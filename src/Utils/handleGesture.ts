import { SetStateAction } from "react"
import { Image } from "react-native"
import { Gesture } from "react-native-gesture-handler"

export const panGetures =
    (positionX: { value: number },
        positionY: { value: number },
        prevPositions: { positionX: number, positionY: number },
        setPrevPosition: React.Dispatch<SetStateAction<any>>,
        refElement: React.RefObject<T>,
        setElement: React.Dispatch<SetStateAction<any>>,
        parentRef?: React.RefObject<T>,
        maxValueX?: number,
        minValueX?: number,
        maxValueY?: number,
        minValueY?: number) => (

        Gesture
            .Pan()
            .onUpdate(event => {
                if (maxValueX && maxValueY && minValueX && minValueY) {
                    positionX.value = prevPositions.positionX + event.translationX <= maxValueX && prevPositions.positionX + event.translationX >= minValueX ? prevPositions.positionX + event.translationX : positionX.value
                    positionY.value = prevPositions.positionY + event.translationY <= maxValueY && prevPositions.positionY + event.translationY >= minValueY ? prevPositions.positionY + event.translationY : positionY.value
                } else {
                    positionX.value = prevPositions.positionX + event.translationX
                    positionY.value = prevPositions.positionY + event.translationY
                }

            })
            .onEnd(() => {
                setPrevPosition({
                    positionX: positionX.value,
                    positionY: positionY.value
                })

                const ref = refElement.current;
                const parent = parentRef ? parentRef.current : null
                if (ref && parent) {
                    parent.measureInWindow((parentX: number, parentY: number) => {
                        ref.measureInWindow((x: number, y: number) => {
                            setPositions(setElement, x - parentX, y - parentY);
                        });
                    });
                }
                else if (ref) {
                    ref.measureInWindow((x: number, y: number) => {
                        setPositions(setElement, x, y);
                    });
                }
            })
            .runOnJS(true)
    )

const setPositions = (seState: React.Dispatch<SetStateAction<any>>, x: number, y: number, scale?: number) => {
    seState((prev: any) => (
        scale ? {
            ...prev,
            left: Math.ceil(x),
            top: Math.ceil(y),
            scale: scale
        } :
            {
                ...prev,
                left: Math.ceil(x),
                top: Math.ceil(y)
            }
    ))
}

export const multipleGestures = (
    positionX: { value: number },
    positionY: { value: number },
    scalePrevPosition: number,
    setScalePrevPosition: React.Dispatch<SetStateAction<number>>,
    scale: { value: number },
    prevPositions: { positionX: number, positionY: number },
    setPrevPosition: React.Dispatch<SetStateAction<any>>,
    refElement: React.RefObject<T>,
    setElement: React.Dispatch<SetStateAction<any>>,
    minScale: number,
    parentRef?: React.RefObject<Image>,
    handleMove?: () => void,
    handleMoveEnd?: (item: React.RefObject<T>, setItem: React.Dispatch<SetStateAction<any>>) => void,

) => (

    Gesture.Simultaneous(
        Gesture.Pan()
            .onUpdate((event) => {
                positionX.value = prevPositions.positionX + event.translationX
                positionY.value = prevPositions.positionY + event.translationY
                handleMove && handleMove()

            }).onEnd((event) => {
                // positionX.value = prevPositions.positionX
                // positionY.value = prevPositions.positionY
                if (event.numberOfPointers != 2) {
                    handleMoveEnd && handleMoveEnd(refElement, setElement)

                    const ref = refElement.current;
                    if (ref && parentRef) {
                        parentRef.current?.measure((parentX: number, parentY: number, w, h, X, Y) => {
                            ref.measureInWindow((x: number, y: number) => {
                                var pX = positionX.value
                                var pY = positionY.value

                                if (X > 0) {
                                    positionX.value = 0
                                    pX = 0

                                }
                                if (Y > 0) {
                                    positionY.value = 0
                                    pY = 0
                                }
                                setPrevPosition({
                                    positionX: pX,
                                    positionY: pY
                                })

                                setPositions(setElement, x - X, y - Y, scale.value);
                            });
                        });

                    }
                    else if (ref) {
                        ref.measureInWindow((x: number, y: number) => {
                            setPositions(setElement, x, y, scale.value);
                        });
                    }
                }
            })
            .runOnJS(true)
        , Gesture.Pinch()
            .onUpdate((event) => {
                scale.value = event.scale * scalePrevPosition
            })
            .onEnd(event => {
                if (minScale <= scale.value) {
                    setScalePrevPosition(scale.value)
                }
                else {
                    scale.value = minScale
                    setScalePrevPosition(minScale)
                }


            })
            .runOnJS(true),
    )
)



export const newmultipleGestures = (
    positionX: { value: number },
    positionY: { value: number },
    scale: { value: number },
    prevPositions: { positionX: number, positionY: number },
    setPrevPosition: React.Dispatch<SetStateAction<any>>,
    refElement: React.RefObject<T>,
    setElement: React.Dispatch<SetStateAction<any>>,
    parentRef?: React.RefObject<T>,
    handleMove?: () => void,
    handleMoveEnd?: (item: React.RefObject<T>, setItem: React.Dispatch<SetStateAction<any>>) => void) => (

    Gesture.Simultaneous(
        Gesture.Pan()
            .onUpdate((event) => {
                if (event.numberOfPointers != 2) {
                    positionX.value = prevPositions.positionX + event.translationX
                    positionY.value = prevPositions.positionY + event.translationY
                    handleMove && handleMove()
                }

            }).onEnd((event) => {
                if (event.numberOfPointers != 2) {
                    handleMoveEnd && handleMoveEnd(refElement, setElement)
                    setPrevPosition({
                        positionX: positionX.value,
                        positionY: positionY.value
                    })
                    const ref = refElement.current;
                    if (ref && parentRef) {
                        parentRef.current.measureInWindow((parentX: number, parentY: number) => {
                            ref.measureInWindow((x: number, y: number) => {
                                setPositions(setElement, x - parentX, y - parentY, scale.value);
                            });
                        });
                    }
                    else if (ref) {
                        ref.measureInWindow((x: number, y: number) => {
                            setPositions(setElement, x, y, scale.value);
                        });
                    }
                }
            })
            .runOnJS(true)
        , Gesture.Pinch()
            .onUpdate((event) => {
                scale.value = event.scale
            }))

)
