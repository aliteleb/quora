import {Dialog, DialogPanel, Transition, TransitionChild} from '@headlessui/react';
import {useEffect, useRef} from "react";

export default function Modal({
        children,
        show = false,
        maxWidth = '2xl',
        bgColor = 'bg-gray-900/75',
        backdropColor = 'bg-[#222222dd]',
        closeable = true,
        onClose = () => {},
        data,
}) {
    const close = () => {
        if (closeable) {
            onClose();
        }
    };

    const maxWidthClass = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': `w-full sm:max-w-2xl`,
    }[maxWidth]


    return (
        <Transition show={show} leave="duration-200">
            <Dialog
                as="div"
                id="modal"
                className={`fixed inset-0 flex overflow-y-scroll px-4 py-6 sm:px-0 items-center z-50 transform transition-all ${backdropColor}`}
                onClose={onClose}
            >
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className={`h-full absolute inset-0`}/>

                </TransitionChild>

                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >

                    <DialogPanel className={`mt-[10rem] shadow transform transition-all sm:w-full sm:mx-auto  ${maxWidthClass} ${bgColor}`}>
                        {children}
                    </DialogPanel>
                </TransitionChild>

            </Dialog>
        </Transition>
    );
}
