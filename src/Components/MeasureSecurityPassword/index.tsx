import React from "react";

import {
    Container,
    ContentMark,
    Text,
    ContainerContentMark
} from "./style"

interface securityProps {
    securityLevel: number
}

export default function MeasureSecurityPassword(props: securityProps) {
    return (
        <Container>
            <Text>Força</Text>

            <ContainerContentMark>
                <ContentMark backgroundColor={props.securityLevel >= 1 ? "#818286" : "#FFF"} />
                <ContentMark backgroundColor={props.securityLevel >= 2 ? "#57585A" : "#FFF"} />
                <ContentMark backgroundColor={props.securityLevel >= 3 ? "#3A3B3D" : "#FFF"} />
                <ContentMark backgroundColor={props.securityLevel === 4 ? "#18191A" : "#FFF"} />
            </ContainerContentMark>
        </Container>
    )
}