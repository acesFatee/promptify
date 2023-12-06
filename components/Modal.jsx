'use client'

import React from "react";

export default function Modal({isopen, setisopen, message, title}) {
  return (
    <>
      <dialog id="my_modal_3" className={`modal ${isopen && "modal-open"}`}>
        <div className="modal-box">
          <form method="dialog">
            <button onClick={() =>{
                setisopen(false)
            }} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{message}</p>
        </div>
      </dialog>
    </>
  );
}
