import { useNavigate } from "react-router-dom";
import style from './Landing.module.css'

const LandingPage = () => {
    const navigate = useNavigate()

    return (
        <div className={style.container}>
            <h1 className={style.h1}>WELCOME!!</h1>
            <button className={style.pulse} onClick={() => navigate('/home')}>PLAY</button>
        </div>
    )
}

export default LandingPage;