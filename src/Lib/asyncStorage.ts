import AsyncStorage from '@react-native-async-storage/async-storage'

export const setStoreObject = async (key: string, value: Object) => {
    try {
        const object = JSON.stringify(value)
        await AsyncStorage.setItem(key, object)
    } catch (error) {
        console.error('Error storing object: ', error)
    }
}

export const getStoreObject = async (key: string) => {
    try {
        const object = await AsyncStorage.getItem(key)
        return object != null ? JSON.parse(object) : null
    } catch (error) {
        console.error('Error retrieving object: ', error)
    }
}

export const setStoreItem = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (error) {
        console.error('Error storing object: ', error)
    }
}

export const getStoreItem = async (key: string) => {
    try {
        const element = await AsyncStorage.getItem(key)
        if (key == "@intellectus:tokenUser" || key == "@intellectus:tokenNewUser") {
            return element?.split('"').join("")
        } else {
            return element
        }

    } catch (error) {
        console.error('Error retrieving object: ', error)
    }
}

export const removeStoreItem = async (key: string) => {
    try {
        const element = await AsyncStorage.removeItem(key)
        return element
    } catch (error) {
        console.error('Error retrieving object: ', error)
    }
}

export const clearStorage = async () => {
    try {
        const element = await AsyncStorage.clear()
        return element
    } catch (error) {
        console.error('Error retrieving object: ', error)
    }
}