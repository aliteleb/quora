import React, {forwardRef} from 'react'
import {IoCheckmarkDone} from "react-icons/io5";

const NotificationItem = forwardRef(({notification, custom_styles}, ref) => {
    const getNotificationMessage = (notification) => {
        const { type, comment_id, post_id, question_id, is_answer, reply_to_comment } = notification;

        if (type === 'up_vote') return 'بتأييد ';
        if (type === 'down_vote') return 'بالإعتراض على ';
        if (type === 'question') return 'بنشر سؤال ';
        if (type === 'comment') return 'بالتعليق على ';
        if (type === 'answer' && comment_id) return 'بالإجابة على ';
        if (type === 'post') return 'بنشر منشور ';
        if (type === 'reply' && comment_id && !reply_to_comment) return 'بالرد على ';
    };

    const getTargetMessage = (notification) => {
        const { type, comment_id, post_id, question_id, is_answer, reply_to_comment } = notification;

        if (type === 'reply' && comment_id && !reply_to_comment) return 'تعليقك.';
        if (type === 'reply' && reply_to_comment) return 'تعليق على منشورك.';
        if (type === 'comment' && post_id) return 'منشورك.';
        if (type === 'answer' && comment_id) return 'سؤالك.';
        if (type === 'down_vote' && question_id) return 'إجابتك.';
        if ((type === 'up_vote' || type === 'down_vote') && !is_answer) return 'تعليقك.';
    };

    return (
        <div ref={ref} className={`${custom_styles} w-full flex items-center justify-between bg-[--theme-nav-bg-color-hover] p-4 shadow-md rounded-lg`}>
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
                        {getNotificationMessage(notification)}
                        {getTargetMessage(notification)}

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
