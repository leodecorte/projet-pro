import React, {useEffect, useState} from 'react'
import axios from 'axios';
 
export default function FileUpload () {
 
      const [file, setFile] = useState();
      const [fileName, setFileName] = useState("");
 
      const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
      };
 
      const uploadFile = async (e) => {
        // const formData = new FormData();
        // formData.append("file", file);
        // formData.append("fileName", fileName);
        const formData = new FormData();
        formData.append('file', file);
        // formData.append("fileName", fileName);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("http://localhost:3005/products/upload",formData,config)
            .then((response) => {
              console.log(response)
                alert("The file is successfully uploaded");
            }).catch((error) => {
              console.log(error)
        });
      };
 
      return (
        <div className="App">
          <input type="file" onChange={saveFile} />
          <button onClick={uploadFile}>Upload</button>
        </div>
      );
}