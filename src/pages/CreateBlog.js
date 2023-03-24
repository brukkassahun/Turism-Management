import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function CreateBlog() {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const [convertedContent, setConvertedContent] = useState(null);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState(null);
  const [progres, setProgress] = useState(false);
  const data = localStorage.getItem("user");
  const user = JSON.parse(data);

  const UploadData= async () =>{
    let blog = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(blog);
    
    if(blog?.length > 7 &&  image !== null && title !==null ){
        const userName=user[0].firstName + ' ' + user[0].lastName;
        const formData = new FormData()
    
        formData.append('title',title)
        formData.append('blog',blog)
        formData.append('user',userName)
        formData.append('avatar',image)
        // formData.append('date',date)
    
        try {
          const res = await axios.post(`http://localhost:8888/blog/add`,formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
          });
          setProgress(true)
          toast.success('Successfully Uploaded!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        } catch (err) {
          if (err.response.status === 500) {
            toast.error('Upload Failed!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
          } else {
            toast.error('Upload Failed!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
          }
        }
    }else{
        toast.error('Please Add An Image ,Title and Paragraph', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-5">
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />
            <ToastContainer />
        </div>

        <header className="font-bold text-[22px] text-black pl-5">
        Add A Title
            <div className="mb-6">
                {/* <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label> */}
                <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="name" placeholder="Title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div> 
        </header>
        <header className="font-bold text-[22px] text-black pl-5">
            Write Your Blog Below
        </header>

        <div className="min-h-[400px]">
            <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                toolbar={{
                  options: ['inline',  'list', 'textAlign', ],
                }}
                
            />
        </div>
        
        <header className="font-bold text-[22px] text-black pl-5">
            Add A cover Photo Here!
            <div className="grid grid-cols-2 bg-gray-50 gap-2">
                <div className="mb-6 bg-gray-50">
                    {/* <label for="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Package Image</label> */}
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" name="image" placeholder="Package Image" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                </div>  
                <div className='grid content-start bg-gray-50'>
                {
                    image != null ?
                    <img
                    alt="not found"
                    width={"250px"}
                    height={"200px"}
                    src={URL.createObjectURL(image)}
                />
                :
                null
                }
                </div>
            </div>
        </header>

        <div className="m-5">
            {
                !progres ?
                <button onClick={()=>UploadData()} className="bg-pink-700 rounded-md shadow-md p-2 font-bold text-white">Upload</button>
                :
                <button className="bg-pink-400 rounded-md shadow-md p-2 font-bold text-white" disabled>Upload</button>
            }
        </div>
    </div>
  )
}

export default CreateBlog;