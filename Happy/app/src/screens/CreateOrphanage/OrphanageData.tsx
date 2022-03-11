import React, { useState } from 'react'
import {
  ScrollView,
  View,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  Image,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler'
import api from '../../services/api'
import { RouteProp, useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'

type ParamList = {
  OrphanageData: { position: { latitude: number; longitude: number } }
}

type OrphanageDetailsRouteProps = RouteProp<ParamList, 'OrphanageData'>

type Props = {
  route: OrphanageDetailsRouteProps
}

export default function OrphanageData({ route }: Props) {
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [instructions, setInstuctions] = useState('')
  const [opening_hours, setOpeningHours] = useState('')
  const [open_on_weekends, setOpenOnWeekends] = useState(true)

  const [images, setImages] = useState<string[]>([])

  const { latitude, longitude } = route.params.position

  const { navigate } = useNavigation()

  async function handleSubmit() {
    const data = new FormData()

    data.append('name', name)
    data.append('about', about)
    data.append('whatsapp', whatsapp)
    data.append('latitude', String(latitude))
    data.append('longitude', String(longitude))
    data.append('instructions', instructions)
    data.append('opening_hours', opening_hours)
    data.append('open_on_weekends', String(open_on_weekends))

    images.forEach((img, index) => {
      data.append('images', {
        name: `image_${index}.jpg`,
        type: 'image/jpg',
        uri: img,
      } as any)
    })

    await api.post('/orphanages', data)

    navigate('OrphanagesMap')
  }

  async function handleSelectImages() {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync()

    if (status !== 'granted') {
      alert('Eita mermão, sem foto da não')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    })

    if (result.cancelled) {
      return
    }

    const { uri } = result

    setImages((state) => [...state, uri])
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.padding}>
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        value={name}
        onChangeText={(val) => setName(val)}
        style={styles.input}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        value={about}
        onChangeText={(val) => setAbout(val)}
        style={[styles.input, styles.height]}
        multiline
      />

      <Text style={styles.label}>Whatsapp</Text>
      <TextInput
        value={whatsapp}
        onChangeText={(val) => setWhatsapp(val)}
        style={styles.input}
      />

      <Text style={styles.label}>Fotos</Text>

      <View style={styles.uploadedImagesContainer}>
        {images.map((img) => (
          <Image source={{ uri: img }} style={styles.uploadedImage} key={img} />
        ))}
      </View>

      <RectButton style={styles.imagesInput} onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </RectButton>

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        value={instructions}
        onChangeText={(val) => setInstuctions(val)}
        style={[styles.input, styles.height]}
        multiline
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput
        value={opening_hours}
        onChangeText={(val) => setOpeningHours(val)}
        style={styles.input}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch
          thumbColor="#fff"
          trackColor={{ false: '#ccc', true: '#39CC83' }}
          value={open_on_weekends}
          onValueChange={setOpenOnWeekends}
        />
      </View>

      <RectButton style={styles.nextButton} onPress={handleSubmit}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6',
  },

  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  },

  height: {
    height: 110,
  },

  padding: {
    padding: 24,
  },

  uploadedImagesContainer: {
    flexDirection: 'row',
  },

  uploadedImage: {
    width: 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 32,
    marginRight: 8,
  },
})
