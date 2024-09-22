"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Styles from "./writepage.module.css"
import dynamic from 'next/dynamic'


interface EditorData {
  content: string;
  title: string;
}

const Editor = dynamic(() => import('../utils/editor'), { ssr: false })

function WritePage() {
  
const router = useRouter()
    const [editorData, setEditorData] = useState<EditorData>({ content: '', title: '' })
   
    

    const handleEditorChange = (data: EditorData) => {
    console.log(data)
        setEditorData(data)
    }

    const handlePublish = () => {
        // Encode the data to be sent via URL
        const encodedData = encodeURIComponent(JSON.stringify(editorData))
        router.push(`/publish?data=${encodedData}`)
        
    }

    return (
        <div className={Styles.container}>
   
            <Editor onChange={handleEditorChange} />
            <button 
                onClick={handlePublish}
                className='flex justify-around mx-2 p-3 hover:bg-cyan-400 rounded-2xl hover:text-black text-cyan-500'
            >
                Publish
            </button>
        </div>
    )
}

export default WritePage