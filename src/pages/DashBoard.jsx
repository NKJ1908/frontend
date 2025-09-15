import React, { useEffect, useState } from 'react';
import Toasty from '../components/Toasty';
import SideBar from '../components/SideBar';
import Main from '../components/Main';

const DashBoard = () => {
    const [message,setMessage] = useState({title:"",body:"",className:""})
    const [open,setOpen] = useState(false)
    const [openS,setOpenS] = useState(false)
    useEffect(()=>{
        const toast = localStorage.getItem("Message")
        if (toast) {
            setMessage(JSON.parse(toast))
            setOpen(true)
            localStorage.removeItem("Message")
        }
    },[])
    return (
        <div className='lg:flex-row flex flex-col w-full'>
            <Toasty open={open} setOpen={setOpen} {...message}/>
            <SideBar open={openS} setOpen={setOpenS}/>
            <Main/>
        </div>
    );
};

export default DashBoard;