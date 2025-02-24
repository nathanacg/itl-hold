import { SetStateAction } from "react";
import { ButtonNav, ButtonText, ButtonsContainer } from "./style";
import { theme } from "../../Theme/theme";


interface SelectPageButtonsProps{
    selectedPage: string
    setSelectedPage: React.Dispatch<SetStateAction<string>>
    myFollowers?: boolean
    button1: string
    button2: string
    button3?: string
}

export default function SelectPageButtons(props: SelectPageButtonsProps){
    return(
        <ButtonsContainer>
        <ButtonNav
            width={props.button3 ? "32%": "49%" }
            onPress={() => props.setSelectedPage(props.button1)}
            style={props.selectedPage == props.button1 ? { backgroundColor: theme.primarycolor } : {}}>
            <ButtonText style={props.selectedPage == props.button1 ? { color: theme.secondaryColor } : {}}>
                {props.button1}
            </ButtonText>
        </ButtonNav>
        <ButtonNav
            width={props.button3 ? "32%": "49%" }
            onPress={() => props.setSelectedPage(props.button2)}
            style={props.selectedPage == props.button2 ? { backgroundColor: theme.primarycolor } : {}}>
            <ButtonText style={props.selectedPage == props.button2 ? { color: theme.secondaryColor } : {}}>
                {props.button2}
            </ButtonText>
        </ButtonNav>

        {props.button3 && (
                   <ButtonNav
                   width={props.button3 ? "32%": "49%" }
                   onPress={() => props.setSelectedPage(props.button3 ? props.button3 : "")}
                   style={props.selectedPage == props.button3 ? { backgroundColor: theme.primarycolor } : {}}>
                   <ButtonText style={props.selectedPage == props.button3 ? { color: theme.secondaryColor } : {}}>
                      {props.button3}
                   </ButtonText>
               </ButtonNav>
            )}
     
    </ButtonsContainer>
    )
}