import React, { SetStateAction, useState } from 'react';
import { TouchableOpacity } from "react-native"
import { Container, OptionContainer, TextOption } from './style'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { theme } from '../../../../Theme/theme';
import RadioButton from '../../../../Components/RadioButton';

interface PropsCategoriesFilter {
    setSelectedOption: React.Dispatch<SetStateAction<string[]>>
    selectedOption: string[]
}

export default function CategoriesFilter(props: PropsCategoriesFilter) {
    const [selectedOption, setSelectedOption] = useState<string[]>([]);

    return (
        <Container>
            {['Filme', 'Série', 'Livro', 'Música', 'Artigo', 'Podcast'].map((item, index) => (
                <OptionContainer key={index} onPress={() => setSelectedOption(prev => [...prev, item])}>
                    <TextOption>{item}</TextOption>
                    <TouchableOpacity onPress={() => {
                        if (props.selectedOption) {
                            props.setSelectedOption(prev => [...prev, item]);
                        }
                    }}>
                        <RadioButton
                            value={props.selectedOption && props.selectedOption.find(opt => opt === item) ? true : false}
                            setValue={() => {
                                if (props.selectedOption && !props.selectedOption.find(opt => opt === item)) {
                                    props.setSelectedOption(prev => [...prev, item]);
                                }
                            }}
                        />
                    </TouchableOpacity>
                </OptionContainer>
            ))}
        </Container>
    );
};
