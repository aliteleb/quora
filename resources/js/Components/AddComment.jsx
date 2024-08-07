import React, {forwardRef, useEffect} from 'react'
import DefaultUserIcon from "@/Core/DefaultUserIcon.jsx";
import Input from "@/Core/Input.jsx";
import {RiImageAddLine} from "react-icons/ri";
import {HiMiniXMark} from "react-icons/hi2";
import {useForm} from "@inertiajs/react";

const AddComment = forwardRef(({handleCommentChange, handleFileChange, removeUploadedFile, data, addComment, customStyles, placeholder, submitBtnText, replyTo, comment_id, thread_id}, ref) => {

    return (
        <div className={`bg-[--theme-input-bg-color] mt-2`}>
            {replyTo && <div className={`px-5 py-1 rounded-full mt-1 ms-20 bg-[--theme-body-bg] text-[--theme-secondary-text-color] w-fit`}> الرد على <button className={`font-bold`}>{replyTo}</button></div>}
            <div className={`flex items-center gap-x-3 flex-grow px-5 py-3 ${customStyles ? customStyles : ''}`}>
                <DefaultUserIcon/>
                <div className={`relative flex-grow flex flex-col items-center`}>
                    <textarea
                        className={`w-full h-[45px] ${data.body.length < 67 ? '!h-[45px]' : ''} pl-[38px] rounded resize-none bg-[--theme-body-bg] border-[--theme-secondary-bg-color-hover]`}
                        maxLength={600}
                        placeholder={placeholder}
                        ref={ref}
                        name="body"
                        value={data.body}
                        onChange={handleCommentChange}
                    />
                    <label htmlFor={comment_id ? comment_id : 'upload_comment_img'}
                           className={`block w-fit absolute left-3 ${!data.image && !data.video ? 'top-1/2 -translate-y-1/2' : 'top-[11px]'} `}>
                        <Input type={'file'} id={comment_id ? comment_id : 'upload_comment_img'} visibility={'hidden'}
                               onChange={handleFileChange}/>
                        <RiImageAddLine
                            className={`size-6 text-[--theme-secondary-text-color] cursor-pointer ${(data.image && !data.video) || (data.video && !data.image) ? 'pointer-events-none opacity-40' : ''}`}/>
                    </label>
                    {/* Preview uploaded image */}
                    {(data.image && !data.video) &&
                        <div
                            className={`${!data.image ? 'invisible' : 'visible w-full pb-3 border-zinc-700/70 relative'} mt-3`}>
                            <div onClick={removeUploadedFile}
                                 className="absolute right-2 top-2 p-1 cursor-pointer hover:bg-neutral-700 bg-neutral-600/30 flex justify-center items-center rounded-full transition">
                                <HiMiniXMark className={`size-6`}/>
                            </div>
                            <img className={`w-full max-h-[20rem] rounded object-cover`}
                                 src={data?.image ? URL.createObjectURL(data?.image) : ''}
                                 alt="post-img"/>
                        </div>
                    }

                    {/* Preview uploaded video */}
                    {(data.video && !data.image) &&
                        <div
                            className={`${!data.video ? 'invisible' : 'visible w-full pb-3 relative'} mt-3`}>
                            <div onClick={removeUploadedFile}
                                 className="absolute z-50 right-2 top-2 p-1 cursor-pointer hover:bg-neutral-700 bg-neutral-600/30 flex justify-center items-center rounded-full transition">
                                <HiMiniXMark className={`size-6`}/>
                            </div>
                            <video
                                src={URL.createObjectURL(data.video)}
                                className={`w-full max-h-[20rem] rounded`}
                                controls
                            />
                        </div>
                    }
                </div>

                <div onClick={addComment}>
                    <button className={`xs:block hidden rounded-full px-4 py-1 bg-[--theme-button-border-color]`}>{submitBtnText}</button>
                    <button className={`block xs:hidden rounded-full px-4 py-1 bg-[--theme-button-border-color]`}>أضف</button>
                </div>
            </div>
        </div>
    )
})

export default AddComment
