import * as React from 'react';
import Modal from '@mui/material/Modal';



export default function DoYouAgree({ open, setOpen, handleClose, handleOpen }) {


    return (


        <Modal
            className='flex items-center justify-center outline-none
        '
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className='bg-white overflow-hidden rounded-xl sm:w-[50%] w-[80%]'>
                <div className='py-2 px-2 border-b-2 border-black font-["TTNormsProRegular"] text-[#212060]'>
                    <span>Terms and Conditions</span>
                </div>
                <div className='px-2 mt-2 lg:h-[448px] md:h-[380px] sm:h-[350px] h-[350px] py-2 bg-white font-["TTNormsProRegular"]'>
                    Do You Agree?
                </div>
            </div>
        </Modal >

    );
}