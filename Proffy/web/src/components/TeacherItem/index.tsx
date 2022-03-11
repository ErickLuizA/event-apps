import React from 'react'

import './styles.css'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import api from '../../services/api'

export interface Teacher {
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp: number;
}

interface TeacherProps {
    teacher: Teacher
}

const TeacherItem: React.FC<TeacherProps> = ({ teacher }) => {

    const createNewConnection = () => {
        api.post('/connections', {
            user_id: teacher.id
        })
    }

    return (
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar }alt={teacher.name}/>
                <div>
                    <strong> {teacher.name} </strong>
                    <span> {teacher.subject} </span>
                </div>
            </header>
            <p>
                {teacher.bio}
            </p>
            <footer>
                <p>
                    Preço/hora
                    <strong>R$ {teacher.cost} </strong>
                </p>
                <a onClick={createNewConnection} target="_blank" rel="noopener noreferrer" href={`https://wa.me/${teacher.whatsapp}`}>
                    <img src={whatsappIcon} alt="Whatsapp"/>
                    Entrar em contato
                </a>
            </footer>
        </article>
    )
}

export default TeacherItem