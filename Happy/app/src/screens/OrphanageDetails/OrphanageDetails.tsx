import React, { useEffect, useState } from 'react'
import {
  Image,
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  Linking,
  ActivityIndicator,
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { Feather, FontAwesome } from '@expo/vector-icons'

import mapMarkerImg from '../../images/map-marker.png'
import { RectButton } from 'react-native-gesture-handler'
import api from '../../services/api'
import OrphanagesProps from '../../@types/Orphanage'
import { RouteProp } from '@react-navigation/native'

type ParamList = {
  OrphanageDetails: { id: number }
}

type OrphanageDetailsRouteProps = RouteProp<ParamList, 'OrphanageDetails'>

type Props = {
  route: OrphanageDetailsRouteProps
}

export default function OrphanageDetails({ route }: Props) {
  const [orphanage, setOrphanage] = useState<OrphanagesProps>()

  const { id } = route.params

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get(`/orphanages/${id}`)

      setOrphanage(data)
    }

    fetchData()
  }, [id])

  if (!orphanage) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagesContainer}>
        <ScrollView horizontal pagingEnabled>
          {orphanage?.images.map((img) => (
            <Image
              key={img.id}
              style={styles.image}
              source={{
                uri: img.url,
              }}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{orphanage?.name}</Text>
        <Text style={styles.description}>{orphanage?.about}</Text>

        <View style={styles.mapContainer}>
          <MapView
            initialRegion={{
              latitude: orphanage?.latitude!,
              longitude: orphanage?.longitude!,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }}
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            style={styles.mapStyle}>
            <Marker
              icon={mapMarkerImg}
              coordinate={{
                latitude: orphanage?.latitude!,
                longitude: orphanage?.longitude!,
              }}
            />
          </MapView>

          <RectButton
            style={styles.routesContainer}
            onPress={() =>
              Linking.openURL(
                `https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`,
              )
            }>
            <Text style={styles.routesText}>Ver rotas no Google Maps</Text>
          </RectButton>
        </View>

        <View style={styles.separator} />

        <Text style={styles.title}>Instruções para visita</Text>
        <Text style={styles.description}>{orphanage?.instructions}</Text>

        <View style={styles.scheduleContainer}>
          <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
            <Feather name="clock" size={40} color="#2AB5D1" />
            <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>
              Segunda à Sexta {orphanage?.opening_hours}
            </Text>
          </View>
          {orphanage?.open_on_weekends ? (
            <View style={[styles.scheduleItem, styles.scheduleItemGreen]}>
              <Feather name="info" size={40} color="#39CC83" />
              <Text style={[styles.scheduleText, styles.scheduleTextGreen]}>
                Atendemos fim de semana
              </Text>
            </View>
          ) : (
            <View style={[styles.scheduleItem, styles.scheduleItemRed]}>
              <Feather name="info" size={40} color="#ff6690" />
              <Text style={[styles.scheduleText, styles.scheduleTextRed]}>
                Não atendemos fim de semana
              </Text>
            </View>
          )}
        </View>

        <RectButton
          style={styles.contactButton}
          onPress={() =>
            Linking.openURL(`whatsapp://send?phone=${orphanage?.whatsapp}`)
          }>
          <FontAwesome name="whatsapp" size={24} color="#FFF" />
          <Text style={styles.contactButtonText}>Entrar em contato</Text>
        </RectButton>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },

  imagesContainer: {
    height: 240,
  },

  image: {
    width: Dimensions.get('window').width,
    height: 240,
    resizeMode: 'cover',
  },

  detailsContainer: {
    padding: 24,
  },

  title: {
    color: '#4D6F80',
    fontSize: 30,
    fontFamily: 'Nunito_700Bold',
  },

  description: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#5c8599',
    lineHeight: 24,
    marginTop: 16,
  },

  mapContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1.2,
    borderColor: '#B3DAE2',
    marginTop: 40,
    backgroundColor: '#E6F7FB',
  },

  mapStyle: {
    width: '100%',
    height: 150,
  },

  routesContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  routesText: {
    fontFamily: 'Nunito_700Bold',
    color: '#0089a5',
  },

  separator: {
    height: 0.8,
    width: '100%',
    backgroundColor: '#D3E2E6',
    marginVertical: 40,
  },

  scheduleContainer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  scheduleItem: {
    width: '48%',
    padding: 20,
  },

  scheduleItemBlue: {
    backgroundColor: '#E6F7FB',
    borderWidth: 1,
    borderColor: '#B3DAE2',
    borderRadius: 20,
  },

  scheduleItemGreen: {
    backgroundColor: '#EDFFF6',
    borderWidth: 1,
    borderColor: '#A1E9C5',
    borderRadius: 20,
  },

  scheduleItemRed: {
    backgroundColor: '#faf6f9',
    borderWidth: 1,
    borderColor: '#ffbcd4',
    borderRadius: 20,
  },

  scheduleText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 20,
  },

  scheduleTextBlue: {
    color: '#5C8599',
  },

  scheduleTextGreen: {
    color: '#37C77F',
  },

  scheduleTextRed: {
    color: '#ff6690',
  },

  contactButton: {
    backgroundColor: '#3CDC8C',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 40,
  },

  contactButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    color: '#FFF',
    fontSize: 16,
    marginLeft: 16,
  },
})
