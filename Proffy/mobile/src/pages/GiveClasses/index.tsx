import React from 'react'
import { View, Text, ImageBackground, Linking } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import backgroundImg from '../../assets/images/give-classes-background.png'

import styles from './styles'

const GiveClasses = () => {

  const { goBack } = useNavigation()

  const redirectToWeb = () => {
    goBack()
    Linking.openURL('https://google.com')
  }

  return (
    <View style={styles.container}>
      <ImageBackground 
      resizeMode="contain" 
      source={backgroundImg} 
      style={styles.content} >
        <Text style={styles.title}>Quer ser um Proffy ? </Text>
        <Text style={styles.description}>
          Para começar, você tem que se cadastrar como professor na nossa plataforma web
        </Text>
      </ImageBackground>

      <RectButton style={styles.okButton} onPress={redirectToWeb}>
        <Text style={styles.okButtonText}> Tudo bem </Text>
      </RectButton>
    </View>
  )
}

export default GiveClasses