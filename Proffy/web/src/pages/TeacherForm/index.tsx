import React, { useState, FormEvent } from 'react'
import PageHeader from '../../components/PageHeader'

import warningIcon from '../../assets/images/icons/warning.svg'

import './styles.css'
import Input from '../../components/Input'
import Select from '../../components/Select'
import Textarea from '../../components/Textarea'
import api from '../../services/api'
import { useHistory } from 'react-router-dom'

const TeacherForm = () => {
    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: '' }
    ])    
    
    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [bio, setBio] = useState('')

    const [subject, setSubject] = useState('')
    const [cost, setCost] = useState('')

    const history = useHistory()

    const addNewSchedule = () => {
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from: '', to: '' }
        ])
    }

    const setScheduleItemValue = (pos: number, field: string, value: string) => {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if(index === pos) {
                return { ...scheduleItem, [field]: value }
            }

            return scheduleItem
        })

        setScheduleItems(updatedScheduleItems)
    }

    const handleCreateClass = async (e: FormEvent) => {
        e.preventDefault()

        const request = await api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        })

        if(request.status === 201) {
            history.push('/')
        } else {
            alert('error')
        }
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader 
            title="Que incrivel que você quer dar aulas"
            description="O primeiro passo, é preencher este formulário de inscrição"/>
            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend> Seus dados </legend>

                        <Input 
                        name="name" 
                        label="Nome Completo"
                        value={name}
                        onChange={e => setName(e.target.value)} />
                        <Input 
                        name="Avatar" 
                        label="Avatar"
                        value={avatar}
                        onChange={e => setAvatar(e.target.value)} />
                        <Input 
                        name="Whatsapp" 
                        label="Whatsapp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)} />
                        <Textarea 
                        name="bio" 
                        label="Biografia"
                        value={bio}
                        onChange={e => setBio(e.target.value)} />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Select
                            name="subject"
                            label="Matéria"
                            value={subject}
                            onChange={e => setSubject(e.target.value)}
                            options={[
                            { value: "Artes", label: "Artes" },
                            { value: "Biologia", label: "Biologia" },
                            { value: "Geografia", label: "Geografia" },
                            { value: "Matematica", label: "Matematica" },
                            { value: "Ingles", label: "Ingles" },
                            { value: "Historia", label: "Historia" },
                            { value: "Fisica", label: "Fisica" },
                            { value: "Portugues", label: "Portugues" },
                            { value: "Quimica", label: "Quimica" },
                            ]}
                        />
                        <Input 
                        name="cost" 
                        label="Custo da sua hora por aula"
                        value={cost}
                        onChange={e => setCost(e.target.value)} />
                        </fieldset>

                    <fieldset>
                        <legend>
                            Horários Disponiveis
                            <button type="button" onClick={addNewSchedule} >+ Novo Horario</button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index)=> {
                            return (
                                <div className="schedule-item" key={index} >
                                    <Select
                                    name="week_day"
                                    label="Dia da Semana"
                                    onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
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
                                    name="from" 
                                    label="Das" 
                                    type="time"
                                    onChange={e => setScheduleItemValue(index, 'from', e.target.value)} />
                                    <Input 
                                    name="to" 
                                    label="Até" 
                                    type="time"
                                    onChange={e => setScheduleItemValue(index, 'to', e.target.value)} />
                                </div>
                            )
                        })}
                    </fieldset>
                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso Importante" />
                            Importante <br />
                            Preencha todos os dados
                        </p>
                        <button type="submit">Salvar cadastro</button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm