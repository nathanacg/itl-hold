import { ButtonContent, TextButton } from './styles'

interface buttonProps {
  textButton: string
  typebutton: string
  pressFunction?: () => void
}

export default function ButtonReq(props: buttonProps) {
  return (
    <ButtonContent optionButton={props.typebutton} onPress={props.pressFunction}>
      <TextButton optionButton={props.typebutton}>{props.textButton}</TextButton>
    </ButtonContent>
  )
}
