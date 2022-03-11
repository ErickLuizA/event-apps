import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage'

import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'

import styles from './styles'
import api from '../../services/api'

const TeacherList = () => {

  const [isFilterVisible, setIsFilterVisible] = useState(false)

  const [teachers, setTeachers] = useState([])

  const [favorites, setFavorites] = useState<number[]>([]);

  const[subject, setSubject] = useState('')
  const[week_day, setWeek_day] = useState('')
  const[time, setTime] = useState('')

  const searchTeachers = async () => {
    loadFavorites()

      const response = await api.get('classes', {
          params: {
              subject,
              week_day,
              time
          }
      })
      
      setIsFilterVisible(false)
      setTeachers(response.data)
  }

  const loadFavorites = () => {
    AsyncStorage.getItem('favorites').then(response => {
      if(response) {
        const favoritedTeachers = JSON.parse(response)
        const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
          return teacher.id
        })

        setFavorites(favoritedTeachersIds)
      }
    })
  }


  return (
    <>
      <PageHeader 
      title='Proffys disponíveis' 
      headerRight={
      <BorderlessButton>
        <AntDesign 
        name="filter" 
        size={36}
        color="#fff"
        onPress={() => setIsFilterVisible(prevState => !prevState)}/>
      </BorderlessButton>}>

        {isFilterVisible &&      
        <View style={styles.searchForm}>
          <Text style={styles.label}>Matéria</Text>
          <TextInput
          style={styles.input}
          placeholder="Qual a matéria ?" 
          value={subject}
          onChangeText={text => setSubject(text)}/>

          <View style={styles.inputGroup}>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Dia da semana</Text>
              <TextInput
              style={styles.input}
              placeholder="Qual o dia ?" 
              value={week_day}
              onChangeText={text => setWeek_day(text)} />
            </View>

            <View style={styles.inputBlock}>
              <Text style={styles.label}>Horário</Text>
              <TextInput
              style={styles.input}
              placeholder="Qual o horário ?" 
              value={time}
              onChangeText={text => setTime(text)} />
            </View>
          </View>

          <RectButton style={styles.submitButton} onPress={searchTeachers} >
            <Text style={styles.submitButtonText}>Filtrar</Text>
          </RectButton>
        </View>}

      </PageHeader>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}>
        {teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem 
            key={teacher.id} 
            teacher={teacher}
            favorited={favorites.includes(teacher.id)} />
          )
        })}
      </ScrollView>
    </>
  )
}

export default TeacherList