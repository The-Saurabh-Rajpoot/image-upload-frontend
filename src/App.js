import react, { useState } from "react";
import './App.css';
import profile from "./profile.png"
// import dotenv from "dotenv";
import axios from "axios";
const url = process.env.REACT_APP_URL_FOR_BACKEND;
console.log(url); // should output http://localhost:8005/post


function App() {
  const [formData, setformData] = useState({ image: "",name:"",address:"" })
  const [profilepic,setProfilepic]=useState(profile);
  const handelSubmit = (e) => {
    e.preventDefault()
    createPost(formData);
    alert("Data uploaded")
  }
  const createPost = async (newImage) => {
    try {
      
      const headers = {
        'Content-Type': 'application/json' // add the Content-Type header
      };
      const data = JSON.stringify(newImage); // convert newImage to a JSON string
  
      const response = await axios.post(url, data, { headers });
      console.log(response.data); // log the response data
    } catch (error) {
      console.error(error);
    }
  };
  
  
  
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64file = await convertToBase64(file);
    setProfilepic(base64file);
    setformData({ ...formData, image: base64file });
    
  }
  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
        console.log(fileReader.result);
      };
      fileReader.onerror = (err) => {
        reject(err);
      }
    })
  }
  return (
    <div className='div-container' >
      <form onSubmit={(e) => { handelSubmit(e) }} className='form-container'>
        <h1>Simpel app for image uplaod</h1>
        <label htmlFor="imge" id="image-label"><img id="img" src={profilepic} /></label>
        <input type="file" label="fileUpload" name="image" id="imge" accept=".jpeg,.jpg,.png" onChange={(e) => { handleFileUpload(e) }} />
        <input type="text" placeholder="Enter name" id='enter-name' onChange={(e)=>{setformData({...formData,name:`${e.target.value}`})}} />
        <input type='text' placeholder='Enter address' onChange={(e)=>{setformData({...formData,address:`${e.target.value}`})}} />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default App;
