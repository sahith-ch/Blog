'use client'

import { HtmlContext } from 'next/dist/server/future/route-modules/app-page/vendored/contexts/entrypoints';
import { headers } from 'next/headers';
import React, { useRef, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
interface Props {
  onChange:(data:any)=>void
}

const Editor = (props:Props) => {
  const {onChange} = props
  const [editorHtml, setEditorHtml] = useState('');
  const quillRef = useRef(null);
  const [buttonPosition, setButtonPosition] = useState({ top: '0px', right:'90px' });
  const [textHtml, settextHtml] = useState('');

  // axios.post("http://localhost:3001/articles",editorHtml,{
  //   headers:{
  //     "Content-Type":'application/html',
  //     "authorization":"asdasd"
  // }})


useEffect(()=>{
  if(textHtml.length>0&&editorHtml.length>0){
    onChange({'content':editorHtml,'title':textHtml})
  }
},[textHtml,editorHtml])
  return (
    <div >
<div >
<ReactQuill
      theme='bubble'
        ref={quillRef}
        value={textHtml}
        placeholder='TITLE'
        onChange={settextHtml}
        modules={{
          toolbar: [
            [{ header: '1' }, { header: '2' }],
            [{ size: [] }],
            ['bold', 'italic', 'blockquote'],
         
          ],
          
        }
        }
        formats={Editor.formats}
      />
     
</div>
      <ReactQuill
      theme='bubble'
        ref={quillRef}
        value={editorHtml}
        placeholder='WRITE SOMTHING'
        onChange={setEditorHtml}
        modules={Editor.modules}
        formats={Editor.formats}
      />

    </div>
  );
};

Editor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['clean'],
  ],
  
};

Editor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'image',
];


export default Editor;
