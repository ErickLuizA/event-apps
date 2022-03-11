import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

interface HeaderProps {
  title: string
  showCancel?: boolean
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    backgroundColor: '#f9fafc',
    borderBottomWidth: 1,
    borderColor: '#dde3f0',
    paddingTop: StatusBar.currentHeight || 30,
    paddingBottom: 20,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  text: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#0fa7b3',
    fontSize: 16,
  },
})

export default function Header({ title, showCancel = true }: HeaderProps) {
  const { navigate, goBack } = useNavigation()

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={() => goBack()}>
        <Feather name="arrow-left" size={24} color="#15b6d6" />
      </BorderlessButton>
      <Text style={styles.text}>{title}</Text>
      {showCancel ? (
        <BorderlessButton onPress={() => navigate('OrphanagesMap')}>
          <Feather name="x" size={24} color="#ff669d" />
        </BorderlessButton>
      ) : (
        <View />
      )}
    </View>
  )
}
