import React, {useState } from 'react';
import SideBar from '../components/SideBar';
import Main from '../components/Main';

const DashBoard = () => {
    const [open,setOpen] = useState(false)
    return (
        <div className='lg:flex-row flex flex-col w-full'>
            <SideBar open={open} setOpen={setOpen}/>
            <Main/>
        </div>
    );
};

export default DashBoard;