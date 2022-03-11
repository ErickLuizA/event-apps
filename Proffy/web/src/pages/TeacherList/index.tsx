import React, { useState, FormEvent } from 'react'

import './styles.css'

import PageHeader from '../../components/PageHeader'
import TeacherItem from '../../components/TeacherItem'
import Input from '../../components/Input'
import Select from '../../components/Select'
import api from '../../services/api'

const TeacherList = () => {

  const [teachers, setTeachers] = useState([])

  const[subject, setSubject] = useState('')
  const[week_day, setWeek_day] = useState('')
  const[time, setTime] = useState('')

  const searchTeachers = async (e: FormEvent) => {
      e.preventDefault()

      const response = await api.get('classes', {
          params: {
              subject,
              week_day,
              time
          }
      })

      setTeachers(response.data)
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
          <form id="search-teachers" onSubmit={searchTeachers}>
            <Select
              name="subject"
              label="Matéria"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              options={[
                { value: "Artes", label: "Artes" },
                { value: "Biologia", label: "Biologia" },
                { value: "Geografia", label: "Geografia" },
                { value: "Matemática", label: "Matemática" },
                { value: "Ingles", label: "Ingles" },
                { value: "Historia", label: "Historia" },
                { value: "Fisica", label: "Fisica" },
                { value: "Portugues", label: "Portugues" },
                { value: "Quimica", label: "Quimica" },
              ]}
            />
            <Select
              name="week_day"
              label="Dia da Semana"
              value={week_day}
              onChange={e => setWeek_day(e.target.value)}
              options={[
                { value: "0", label: "Domingo" },
                { value: "1", label: "Segunda" },
                { value: "2", label: "Terça" },
                { value: "3", label: "Quarta" },
                { value: "4", label: "Quinta" },
                { value: "5", label: "Sexta" },
                { value: "6", label: "Sábado" },
              ]}
            />
            <Input 
            label="Hora" 
            name="time"
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)} />

            <button type="submit">
              Buscar
            </button>
          </form>
      </PageHeader>
      <main>
        {teachers.map((teacher, index) => (
          <TeacherItem teacher={teacher} key={index} />
        ))}
      </main>
    </div>
  )
}

export default TeacherList