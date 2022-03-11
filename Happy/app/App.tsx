import 'react-native-gesture-handler'
import React from 'react'
import Main from './src/navigation/Main'
import { useFonts } from 'expo-font'
import {
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from '@expo-google-fonts/nunito'
import { AppLoading } from 'expo'
import { StatusBar } from 'react-native'

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <>
      <StatusBar backgroundColor="#f9fafc" barStyle="dark-content" />
      <Main />
    </>
  )
}
