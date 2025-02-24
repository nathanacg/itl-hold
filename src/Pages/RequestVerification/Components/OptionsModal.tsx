import { TouchableOpacity } from 'react-native';

import { OptionModal, ContainerOptions } from "./style";

export default function OptionsModal(props: { options: string[], onCategorySelect: (category: string) => void }) {
  const handleCategorySelect = (category: string) => {
    props.onCategorySelect(category);
  }

  return (
    <ContainerOptions>
      {props.options.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => handleCategorySelect(item)}>
          <OptionModal>
            {item}
          </OptionModal>
        </TouchableOpacity>
      ))}
    </ContainerOptions>
  );
}
