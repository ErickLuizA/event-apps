import React, { useEffect, useState } from 'react'
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  StatusBar,
  ActivityIndicator,
} from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { Feather } from '@expo/vector-icons'
import * as Location from 'expo-location'

import MapMarker from '../../images/map-marker.png'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import api from '../../services/api'
import OrphanagesProps from '../../@types/Orphanage'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  map: {
    width,
    height: height + (StatusBar.currentHeight || 30) + 30,
  },

  calloutContainer: {
    width: 168,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
  },

  calloutText: {
    color: '#0089a5',
    fontSize: 14,
    fontFamily: 'Nunito_700Bold',
  },

  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,
    backgroundColor: '#fff',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3,
  },

  footerText: {
    color: '#8fa7d3',
    fontFamily: 'Nunito_700Bold',
  },

  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default function Home() {
  const { navigate } = useNavigation()

  const [orphanages, setOrphanages] = useState<OrphanagesProps[]>([])
  const [position, setPosition] = useState<{
    latitude: number
    longitude: number
  }>({
    latitude: 0,
    longitude: 0,
  })

  useFocusEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get('/orphanages')

      setOrphanages(data)
    }

    fetchData()
  })

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestPermissionsAsync()

      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync()

        setPosition({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        })
      } else {
        // eslint-disable-next-line no-alert
        alert('The map cannot be shown without permission')
      }
    }

    getLocation()
  }, [])

  function handleNavigateToOrphanageDetails(id: number) {
    navigate('OrphanageDetails', { id })
  }

  function handleNavigateToCreateOrphanage() {
    navigate('SelectMapPosition', {
      lat: position.latitude,
      lon: position.longitude,
    })
  }

  return (
    <View style={styles.container}>
      {!position.latitude && !position.longitude ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: position.latitude!,
            longitude: position.longitude!,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }}>
          {orphanages.map((orphanage) => (
            <Marker
              key={orphanage.id}
              icon={MapMarker}
              calloutAnchor={{
                x: 1.8,
                y: 0.5,
              }}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }}>
              <Callout
                tooltip
                onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}> {orphanage.name} </Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      )}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {orphanages.length} orfanatos encontrados
        </Text>
        <RectButton
          style={styles.createOrphanageButton}
          onPress={handleNavigateToCreateOrphanage}>
          <Feather name="plus" size={20} color="#fff" />
        </RectButton>
      </View>
    </View>
  )
}
