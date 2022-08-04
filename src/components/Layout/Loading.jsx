import styles from './Loading.module.css'
import loading from '../../img/loading.svg'

function Loading ({dclas}) {
    return (
        <div className={`${styles.load_container} ${styles[dclas]}`}>
            <img className={styles.loader} src={loading} alt="Loading" />
        </div>
    )
}

export default Loading