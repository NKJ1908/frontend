import { AlertDialog } from 'radix-ui';
import React from 'react';

const Confirmation = ({title,body, btn,open, setOpen,onClick}) => {
    return (
        <AlertDialog.Root open={open} onOpenChange={setOpen} >
            <AlertDialog.Portal>
                <AlertDialog.Overlay className='inset-0 fixed bg-black/60'/>
                <AlertDialog.Content className='rounded-lg shadow-lg fixed top-[30%] left-1/2 -translate-x-1/2 bg-black/60 w-full md:w-[500px] p-4 h-fit flex flex-col gap-4'>
                    <AlertDialog.Title asChild>
                        <h1 className='text-gray-400 text-2xl text-center font-bold'>
                            {title}
                        </h1>
                    </AlertDialog.Title>
                    <AlertDialog.Description className='text-gray-300 text-xl text-center'>
                        {body}
                    </AlertDialog.Description>
                    <div className='flex justify-end gap-4 mt-5'>
                        <AlertDialog.Cancel asChild>
                            <button className='bg-black/10 text-white rounded-lg p-2'>
                                Annuler
                            </button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action asChild>
                            <button className='bg-red-500 hover:bg-red-600 text-white rounded-lg p-4' onClick={onClick}>
                                {btn}
                            </button>
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
};

export default Confirmation;