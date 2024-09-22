"use server"
import { url } from 'inspector';
import Glowbutton from '../Components/Glowbutton'
import  Styles from "./Loginipage.module.css"


import LoginFormCard from '../Components/login-form-card/LoginFormCard';
import Socials from '../Components/Socials/Socials';

interface Props {}

function Login(props: Props) {
    


    return (
      <div className='bg-black'>
        <main className={Styles.container}>
        <div className={Styles.wrapper}>
<LoginFormCard/>

</div>

</main>
      </div>
        
    )
}

export default Login
