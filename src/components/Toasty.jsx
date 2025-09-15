import { Toast } from 'radix-ui';
import React from 'react';

const Toasty = ({title,body,className, open, setOpen}) => {
    return (
        <Toast.Provider swipeDirection='right'>
            <Toast.Root open={open} onOpenChange={setOpen} className={`p-4 rounded-lg shadow-2xl ${className}`}>
                <Toast.Title className='text-xl text-white font-bold'>
                    {title}
                </Toast.Title>
                <Toast.Description className='text-white text-lg'>
                    {body}
                </Toast.Description>
            </Toast.Root>
            <Toast.Viewport className='right-5 bottom-5 fixed flex flex-col w-[300px] max-w-full gap-2.5 outline-0 z-50'/>
        </Toast.Provider>
    );
};

export default Toasty;