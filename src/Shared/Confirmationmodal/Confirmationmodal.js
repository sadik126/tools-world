import React from 'react';

const Confirmationmodal = ({ title, message, closeModal, deleteDoctor, modaldata }) => {
    return (
        <>
            <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{message}</p>
                    <div className="modal-action">
                        <label onClick={() => deleteDoctor(modaldata)} htmlFor="confirmation-modal" className="btn btn-error">Delete</label>
                        <button onClick={closeModal} className='btn btn-outline'>Cancel</button>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Confirmationmodal;