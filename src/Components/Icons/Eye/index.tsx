import * as React from "react"
import { View } from "react-native"
import { Text } from "react-native-elements"
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg"

interface SvgProps {
  width: number
  height: number
  fill: string
  stroke1: string
  stroke2: string
  show?: boolean
}

export function EyeSvgComponent(props: SvgProps) {
  return (
    <>

      <Svg
        width={props.width}
        height={props.height}
        viewBox={`0 0 20 16`}
        fill={props.fill}
        opacity={props.show ? 0.5 : 1}
      >
        <G
          clipPath="url(#clip0_17_1160)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <Path
            d="M.768 8.29s3.07-5.527 8.443-5.527c5.374 0 8.444 5.527 8.444 5.527s-3.07 5.526-8.444 5.526c-5.373 0-8.443-5.527-8.443-5.527z"
            stroke={props.stroke1}
          />
          <Path
            d="M9.211 10.362c1.272 0 2.303-.928 2.303-2.073 0-1.144-1.03-2.072-2.303-2.072-1.271 0-2.302.928-2.302 2.072 0 1.145 1.03 2.073 2.302 2.073z"
            stroke={props.stroke2}
          />
        </G>
        <Defs>
          <ClipPath id="clip0_17_1160">
            <Rect width={18.4228} height={16.5789} rx={8.28947} fill="#fff" />
          </ClipPath>
        </Defs>
      </Svg>
    </>
  )
}
