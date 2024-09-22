"use client"
import React, { useEffect, useState ,useRef} from 'react'
import Styles from "./publish.module.css"
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { Content } from 'next/font/google';
import { useEdgeStore } from '@/lib/edgestore';

interface Props {
 
}

function Page() {
    const { edgestore } = useEdgeStore();
    const [description, setDescription] = useState(''); 
    const [category, setCategory] = useState(''); 
    const inputref = useRef<any>(null)
    const searchParams = useSearchParams()
    const [file,setfile] = useState<File>()
    const [img,setimg] = useState<string>()
    let id = searchParams.get('data')
     const onclick=()=>{
        inputref.current?.click()
     }
     const onfileChange=(e)=>{
        e.preventDefault()

setfile(e.target.files[0])

     }

     const clickhandler=async(e:Event)=>{
e.preventDefault()

        if(file){
            const res = await edgestore.publicFiles.upload({
                file,
                onProgressChange: (progress) => {
                  // you can use this to show a progress bar
                  console.log(progress);
                },
              });
            setimg(res.url)
              console.log(res.url)
        }
        let post={
            Title:JSON.parse(id?id:"").title,
            Content:JSON.parse(id?id:"").content,
            Image:img,
            description:description,
            comments:[],
            likes:null,
        }   
        console.log(post)
        try {


            const response = await axios.post("https://blog-server2-m5k0.onrender.com/articles/", post, {
                withCredentials: true,

 
            });
           
        } catch (error) {
            console.error("Error uploading data", error);
        }
    };
    
 
    return (
        <div className={Styles.container}>
<div className={Styles.wrapper}>
<div className={Styles.previewContainer}>
    <div className={Styles.ImageContainer}  onClick={onclick}>
    {file?
    <img className={Styles.Imageafter}  src={URL.createObjectURL(
        file)}/>
:    <img className={Styles.Imagebefour} />

}

        <input type='file' style={{'display':'none'}} onChange={onfileChange} ref={inputref}/>
        </div>
        

<div className={Styles.Description}>
    <input type="text" className='w-full p-2' onChange={(e)=>{setDescription(e.target.value)}} placeholder='Description' />
    </div>
    
    </div>
     <div className={Styles.Category}>
        
        <input  className='w-full outline-none border-b-2 border-black p-2' type="text" placeholder='Category/tag' />
     <button className='bg-green-600 p-3 m-3  ' onClick={clickhandler}>Publish</button>
     </div>
        </div>
        </div>
    )
}

export default Page
