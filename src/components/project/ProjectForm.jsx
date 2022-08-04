import Input from '../Form/Input'
import Select from '../Form/Select'
import SubmitButton from '../Form/SubmitButton'
import styles from './ProjectForm.module.css'

import {useState} from 'react'
import { useEffect } from 'react'

function ProjectForm ({handleSubmit ,btnText, projectData }) {

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {} )
    useEffect(() => {
        

    fetch('http://localhost:5000/categories',
    {
        method: "GET",
        headers: {
        'Content-Type': 'application/json'
        }
    }
    )
    .then((resp) => resp.json())
    .then((data) => {setCategories(data)})
    .catch((err) => console.log(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
       // console.log(project)
        handleSubmit(project)
    }

    function handleChange (e) {
        setProject({...project, [e.target.name]: e.target.value })

    }

    function handleCategory (e) {
          setProject({...project, category: {
                id: e.target.value,
                name:e.target.options[e.target.selectedIndex].text,

          }})
    }
 
    return (
        <form onSubmit={submit} className={styles.form} >
           <Input value={project.name ? project.name : ''} type="text" text="Nome do projeto:" handleOnChange={handleChange} name="name" placeholder="Insira o nome do projeto" />
           

           <Input value={project.budget ? project.budget : ''} type="number" text="Orçamento do projeto:" handleOnChange={handleChange} name="budget" placeholder="Insira o orçamento total" />
            
            <Select value={project.category ? project.category.id : ''} handleOnChange={handleCategory} options={categories} name="category_id"  text="Selecione uma opção"/>

            <SubmitButton text={btnText}/>
        </form>
    )
}

export default ProjectForm