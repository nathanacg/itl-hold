import React, { SetStateAction, useEffect, useState } from "react"
import { OptionText, StoryOptions } from ".././style"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

interface ArquiveInterface {
     index: number | undefined;
     onPress: () => void;
}

export default function ArquiveStoryComponent(props: ArquiveInterface) {
     const [isArquive, setIsArquive] = useState(false);

     useEffect(() => {
          setIsArquive(false)
     }, [props.index])

     const atualizeIndex = () => {
          props.onPress()
          setIsArquive(!isArquive)
     }

     return (
          <StoryOptions onPress={() => atualizeIndex()}>
               {!isArquive ? (
                    <MaterialCommunityIcons
                         name="archive-check-outline"
                         color={"#231F20"}
                         size={23}
                    />
               ) : (
                    <MaterialCommunityIcons
                         name="archive-cancel-outline"
                         color={"#231F20"}
                         size={23}
                    />
               )}

               {!isArquive ? (
                    <OptionText>Arquivar</OptionText>
               ) : (
                    <OptionText>Desarquivar</OptionText>
               )}
          </StoryOptions>
     )
}