import {useState, useEffect} from 'react'

import styles from './Messages.module.css'

function Messages ({type, msg}) {

const [visible, setVisible] = useState(false)

useEffect(() => {

    if(!msg) {
        setVisible(false)
        return
    } 

    setVisible(true)

    const Timer = setTimeout(() => {
        setVisible(false)
    }, 3000)

    return () => clearTimeout(Timer)

}, [msg])

 return (
    <> 
    {visible && (
        <div className={`${styles.message} ${styles[type]}`} > {msg} </div>
    )}
    </>
 )
}

export default Messages