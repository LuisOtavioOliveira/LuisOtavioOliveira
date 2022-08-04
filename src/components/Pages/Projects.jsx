import Messages from "../Layout/Messages"
import { useLocation } from "react-router-dom"

import styles from './Projects.module.css'
import Container from "../Layout/Container"
import ProjectCard from "../project/ProjectCard"
import Loading from "../Layout/Loading"
import { useState, useEffect } from 'react'
import NoProjects from "../Layout/NoProjects"


function Projects() {

    const [projects, setProjects] = useState([])
    const [removeLoader, setRemoveLoader] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')



    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {

        setTimeout(() => {
            fetch('http://localhost:5000/projects', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }

            }).then(resp => resp.json()).then(data => {
                setProjects(data)
                setRemoveLoader(true)
            }).catch((err) => console.log(err))
        }, 700)

    }, [])

    function removeProject(id) {


        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp) => resp.json()).then(() => {
            setProjects(projects.filter((project) => project.id !== id))
            setProjectMessage('Projeto removido!')
            setRemoveLoader(false)
            setTimeout(() => {
                setRemoveLoader(true)
            }, 200)

        }).catch((err) => console.log(err))

    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1> Meus projetos</h1>
            </div>
            {message && <Messages type='sucess' msg={message} />}
            {projectMessage && <Messages type='error' msg={projectMessage} />}
            <Container customClass='start'>
                {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard handleRemove={removeProject} key={project.id} id={project.id} budget={project.budget ? project.budget : '000'} category={project.category ? project.category.name : 'Categoria não selecionada'} name={project.name ? project.name : 'Projeto Sem nome'} />
                    ))}
                {!removeLoader && <Loading />}
                {removeLoader && projects.length === 0 && (
                    <NoProjects />
                )

                }
            </Container>

        </div>
    )
}

export default Projects