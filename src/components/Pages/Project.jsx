import styles from './Project.module.css'
import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Loading from '../Layout/Loading'
import Container from '../Layout/Container'
import ProjectForm from '../project/ProjectForm'
import Messages from '../Layout/Messages'


function  Project () {
const {id} = useParams()

const [project, setProject] = useState([])
const [showProjectForm, setShowProjectForm] = useState(false)
const [message, setMessage] = useState()
const [type, setType] = useState()

useEffect(() => {

    setTimeout(() => {
        fetch(`http://localhost:5000/projects/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json'
        }
    }).then(resp => resp.json()).then((data) => {
        setProject(data)
    }).catch((err) => console.log(err))
    }, 300);

}, [id])

function toggleProjectForm () {
setShowProjectForm(!showProjectForm)



}

function editProject (project) {

    if (project.budget < project.cost) {
        setMessage('O valor tem que ser menor')
        setType('error')
        return false
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)
    }).then(resp => resp.json()).then((data) => {
        setProject(data)
        setShowProjectForm(false)
        setMessage('Projeto editado com sucesso')
        setType('sucess')
        //message 
    }).catch((err) => console.log(err))
    }

    return (
        <>
        {project.name ? ( 
        <div className={styles.project_details}>
            <Container customClass='column'>
               <div className={styles.details_container}>
                {message && <Messages msg={message} type={type}/>}
                <h1> Projeto: {project.name ? project.name : 'Projeto sem nome'} </h1>
                <button className={styles.btn} onClick={toggleProjectForm}> {!showProjectForm ? 'Editar Projeto' : 'Fechar'} </button>
                {!showProjectForm ? (
                       <div className={styles.project_info}>
                        <p>
                            <span>Categoria: </span> {project.category ? project.category.name : 'Categoria não selecionada'}
                        </p>
                        <p>
                            <span>Total de orçamento: </span> {project.budget ?  `R$${project.budget}` : 'Orçamento não definido'}
                        </p>
                        <p>
                            <span>Total utilizado: </span> R${project.cost}
                        </p>
                       </div>

                ) : (
                            <div className={styles.project_info}>
                                <ProjectForm 
                                handleSubmit={editProject}
                                btnText="Concluir edição"
                                projectData={project}
                                
                                />
                            </div>
                )}
               </div>
            </Container>
        </div> ) 
        : ( <p> <Loading dclas='erro'/>  </p> ) }
        </>
    )
}

export default Project