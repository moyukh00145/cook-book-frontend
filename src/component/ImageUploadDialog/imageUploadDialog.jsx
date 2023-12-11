import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormData from 'form-data';
import uploadImageApi from '../api/uploadImage';
import { useState } from 'react'
import LinearProgress from '@mui/material/LinearProgress';


export default function ImageUploadDialog(props) {
  // const [open, setOpen] = React.useState(false);

  const [file, setFile] = useState("");
  const [progressbar, setProgressbar] = useState('none')

  const handleChange=(event)=>{
    setFile(event.target.files[0]);
    // console.log(event.target.files[0])
  }

  const uploadImage = ()=>{
    const form = new FormData();
    form.append('file', file);
    form.append('token','abc')
    setProgressbar('block')
    uploadImageApi(form).then((res)=>{
      
      // console.log(res)
      props.callback(res.data.url)
      props.handleClose()
      
    })

   
  }


  return (
    <React.Fragment>
      <Dialog open={props.visiblity} onClose={props.handleClose}>
        <DialogTitle>Upload Image</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Choose a Image to Upload
          </DialogContentText>
          <input  type="file" onChange={handleChange} accept="" />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button onClick={uploadImage}>Upload</Button>
        </DialogActions>
        <LinearProgress color="secondary" style={{display:progressbar}} />
      </Dialog>
    </React.Fragment>
  );
}