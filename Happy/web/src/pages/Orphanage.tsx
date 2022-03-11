import React, { useEffect, useState } from "react"
import { FaWhatsapp } from "react-icons/fa"
import { FiClock, FiInfo } from "react-icons/fi"
import { Map, Marker, TileLayer } from "react-leaflet"
import happyMapIcon from '../utils/mapIcon'

import OrphanageProps from '../@types/Orphanage'

import '../styles/pages/orphanage.css'
import Sidebar from "../components/Sidebar"
import api from "../services/api"
import { useParams } from "react-router-dom"

interface OrphanageParams {
  id: string
}

export default function Orphanage() {
  const [orphanage, setOrphanage] = useState<OrphanageProps>()
  const params = useParams<OrphanageParams>()
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    async function fetchData() {
      const response = await api.get(`orphanages/${params.id}`)
      const data = response.data

      setOrphanage(data)
    }

    fetchData()
  }, [params.id])

  if(!orphanage) {
    return <p>Carregando ....</p>
  }

  return (
    <div id="page-orphanage">
      <Sidebar />
      <main>
        <div className="orphanage-details">
          <img src={orphanage.images[currentImage].url} alt={orphanage.name} />

          <div className="images">
            {orphanage.images.map((img, index) => (
                <button key={img.id} className={currentImage === index ? "active" : undefined} type="button" onClick={() => setCurrentImage(index) }>
                  <img src={img.url} alt={orphanage.name} />
                </button>
            ))}
          </div>
          
          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map 
                center={[orphanage.latitude, orphanage.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`}
                />
                <Marker interactive={false} icon={happyMapIcon} position={[orphanage.latitude, orphanage.longitude]} />
              </Map>

              <footer>
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`} target="_blank" rel="noopener noreferrer">Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p> {orphanage.instructions} </p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </div>
            {orphanage.open_on_weekends ? (
              <div className="open-on-weekends">
                <FiInfo size={32} color="#39CC83" />
                Atendemos <br />
                fim de semana 
              </div>
            ) :
            <div className="open-on-weekends dont-open">
              <FiInfo size={32} color="#ff669d" />
              Não atendemos <br />
              fim de semana 
            </div>}
            </div>

            <a href={`https://api.whatsapp.com/send?phone=${orphanage.whatsapp}`} className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}