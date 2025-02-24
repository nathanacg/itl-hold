import { useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { DocumentPickerResponse } from "react-native-document-picker";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ContainerElementsSections, Text } from "./style";


interface SelectedDocument {
    resultLength: number
    result: DocumentPickerResponse[]
    setResult: (value: []) => void
}


export default function DocumentSelected({ resultLength, result, setResult }: SelectedDocument) {



    return (
        <ContainerElementsSections>
            {
                resultLength > 0 && (
                    <>
                        {result.map((res, index) => (
                            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                {res.type == 'application/pdf' ?
                                    <Ionicons
                                        name='document-text-outline'
                                        color={'#C4C4C4'}
                                        size={45}
                                    />
                                    :
                                    <Image source={{ uri: res.uri }}
                                        style={{ width: 80, height: 80, borderRadius: 10 }}
                                    />
                                }
                                <Text key={index}>
                                    {res.name && res.name?.length > 28 ? `${res.name?.substring(0, 28)}...` : res.name}
                                </Text>

                                <TouchableOpacity onPress={() => setResult([])}>
                                    <AntDesign
                                        name='close'
                                        color={'#C4C4C4'}
                                        size={20}
                                    />
                                </TouchableOpacity>

                            </View>
                        ))}

                    </>
                )
            }
        </ContainerElementsSections>
    )
}