import dynamic from 'next/dynamic';
import Link from 'next/link';
import Glowbutton from './Components/Glowbutton';


export default function Home() {



  return (
    <main className="flex flex-col items-center w-full  justify-between h-dvh ">
<div className= " flex flex-col  items-center justify-center bg-black h-full w-full">
<div className=" flex font-mono flex-col justify-center items-center">
  <h2 className="flex text-center text-blue-300 text-3xl xl:text-7xl sm:text-4xl mx-2	md:text-5xl font-extrabold ">Start Writing your Blog Today</h2>
  <p className="flex text-center text-1xl xl:text-4xl sm:text-1xl	md:text-2xl m-2 p-2 text-cyan-600">start writing your tech Blog And Publish Today </p>

</div>
<Link href="/Signup">
<Glowbutton text={"Get Started"}/>
</Link>

</div>
    </main>
  );
}
