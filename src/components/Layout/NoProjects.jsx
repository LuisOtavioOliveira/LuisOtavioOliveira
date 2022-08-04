import LinkButton from "./LinkButton"
import savings from '../../img/savings.svg'
import styles from './NoProjects.module.css'

function NoProjects () {
return (
    <div className={styles.maxcontainer}>
    <div className={styles.container}>
        <h3>Infelizmente ainda não há projetos</h3>
        <img src={savings} alt="" />
    </div>
    <div className={styles.button}>
    <LinkButton to='/newproject' text='Criar Projeto'/>

    </div>
    </div>
    
)
 }

export default NoProjects