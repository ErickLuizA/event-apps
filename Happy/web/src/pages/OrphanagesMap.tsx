import React, { useEffect, useState } from 'react'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Map, Marker, TileLayer, Popup } from 'react-leaflet'
import mapIcon from '../utils/mapIcon'

import mapMarkerImg from '../images/map-marker.svg'

import '../styles/pages/orphanages-map.css'
import 'leaflet/dist/leaflet.css'
import api from '../services/api'
import OrphanagesProps from '../@types/Orphanage'


export default function OrphanagesMap(): JSX.Element {
  const [orphanages, setOrphanages] = useState<OrphanagesProps[]>([])

  useEffect(() => {
    async function fetchData() {
      const response = await api.get('/orphanages')
      const data = response.data

      setOrphanages(data)
    }

    fetchData()
  }, [])

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Manhuaçu</strong>
          <span>Minas Gerais</span>
        </footer>
      </aside>

      <Map
        center={[-20.243538, -42.032958]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {orphanages.map(orphanage => (
          <Marker key={orphanage.id} icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]} >
            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
              {orphanage.name}
              <Link to={`/orphanages/${orphanage.id}`}>
                <FiArrowRight size={32} color="#fff" />
              </Link>
            </Popup>
          </Marker>
        ))}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  )
}
