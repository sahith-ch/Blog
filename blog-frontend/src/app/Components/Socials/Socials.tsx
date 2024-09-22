import React from 'react'
import Styles from "../../Login/Loginipage.module.css"
import { signIn } from '@/auth'
import { redirect } from 'next/navigation'

interface Props {}

function Socials(props: Props) {
    const {} = props

    return (
        <form action={async (formData) => {
            "use server"
            
            await signIn("google",({redirectTo:"/Home"}))
           await redirect("/Home")
           await alert("loggedin")
          }}>
  <div className='flex justify-center items-center w-full p-10 flex-col '>

<button type="submit"  className={Styles.loginwithgooglebtn} >
Sign in with Google
</button>
<button type="button" className={Styles.loginwithgithubbtn} >
Sign in with Github
</button>
</div>
        </form>
      
    )
}

export default Socials
