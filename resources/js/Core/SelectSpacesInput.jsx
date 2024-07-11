import React from 'react'
import {MdDone} from "react-icons/md";

export default function SelectSpacesInput({name, img}) {
    return (
          <div className="w-32 h-32">
            <input
              type="checkbox"
              id="custom-checkbox"
              className="hidden"
            />
            <label
              htmlFor="custom-checkbox"
              className="cursor-pointer relative w-full h-full block"
            >
              <img
                src={img}
                alt="Health"
                className="absolute w-full h-full object-cover rounded shadow-lg"
              />
              <div className="absolute left-1 top-1">
                <div className="size-8 bg-white rounded-full opacity-75 ">
                    <MdDone className="size-6 text-[--theme-main-bg-color] z-50 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"/>
                </div>
              </div>
              <span className={`absolute bottom-2 right-2`}>{name}</span>
            </label>
          </div>
      )
}
