import React, {forwardRef} from 'react'
import {IoCheckmarkDone} from "react-icons/io5";

const NotificationItem = forwardRef(({notification}, ref) => {
    return (
        <div ref={ref} className="w-full flex items-center justify-between bg-[--theme-nav-bg-color-hover] p-4 shadow-md rounded-lg">
            <div className={`flex items-center gap-x-3`}>
                <img
                    src={notification.notification_maker.avatar ? notification.notification_maker.avatar : '/profile-default-svgrepo-com.svg'}
                    alt={`avatar`}
                    className="w-12 h-12 rounded-full"
                />

                <div className="flex-grow">
                    <span>
                        قام
                        <span className={`font-semibold`}>{` ${notification.notification_maker.name} `}</span>
                        {` ${notification.type === 'up_vote' ? 'بتأييد ' : notification.type === 'down_vote' ? 'بالإعتراض على ' :
                            notification.type === 'question' ? 'بنشر سؤال ' : notification.type === 'comment' ? 'بالتعليق على ' :
                            notification.type === 'post' ? 'بنشر منشور ' : 'بالرد على '}
                        `}
                        {` ${notification.type !== 'comment' && notification.comment_id ? 'تعليقك.' : ''} `}
                    </span>
                </div>
            </div>

            <div className={`flex flex-col items-center gap-y-1`}>
                <button
                    // onClick={onMarkAsRead}
                    className="text-green-500 hover:text-green-600 transition duration-200"
                >
                    <IoCheckmarkDone size={24} />
                </button>
                <div className="text-xs text-gray-400">11 يناير 2024</div>
            </div>

        </div>
    );
})

export default NotificationItem
