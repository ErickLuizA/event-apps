import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { ScrollView } from 'react-native-gesture-handler'
import { useFocusEffect } from '@react-navigation/native'

import PageHeader from '../../components/PageHeader'

import styles from './styles'
import TeacherItem, { Teacher } from '../../components/TeacherItem'

const Favorites = () => {

  const [favorites, setFavorites] = useState([]);

  const loadFavorites = () => {
    AsyncStorage.getItem('favorites').then(response => {
      if(response) {
        const favoritedTeachers = JSON.parse(response)

        setFavorites(favoritedTeachers)
      }
    })
  }

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites()
    }, [])
  )

  return (
    <>
      <PageHeader title='Meus proffys favoritos' />
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >
        {favorites.map((teacher: Teacher) => {
          return (
            <TeacherItem
            key={teacher.id}
            teacher={teacher}
            favorited />
          )
        })}
      </ScrollView>
    </>
  )
}

export default Favorites