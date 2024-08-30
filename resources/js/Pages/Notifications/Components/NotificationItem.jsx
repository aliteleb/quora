import React, {forwardRef} from 'react'
import {IoCheckmarkDone} from "react-icons/io5";
import {HiMiniHandThumbDown} from "react-icons/hi2";
import {AiFillDislike, AiFillLike} from "react-icons/ai";
import {FaArrowAltCircleDown, FaArrowAltCircleUp} from "react-icons/fa";
import {Link} from "@inertiajs/react";

const NotificationItem = forwardRef(({notification, custom_styles}, ref) => {

    const loadIconAfterMsg = (type ,msg) => {
        return (
            <div className={`flex items-center gap-x-2`}>
                {msg}
                {type === 'down_vote' && <FaArrowAltCircleDown className={`size-6 text-red-500`}/>}
                {type === 'up_vote' && <FaArrowAltCircleUp className={`size-6 text-blue-600`}/>}
            </div>
        )
    }
    const getNotificationMessage = (notification) => {
        const { type, comment_id, reply_to_comment } = notification;

        if (type === 'up_vote') return 'بتأييد ';
        if (type === 'down_vote') return 'بالإعتراض على ';
        if (type === 'question') return 'بنشر سؤال ';
        if (type === 'comment') return 'بالتعليق على ';
        if (type === 'answer' && comment_id) return 'بالإجابة على ';
        if (type === 'post') return 'بنشر منشور ';
        if (type === 'reply' && (comment_id || !reply_to_comment)) return 'بالرد على ';
        if (type === 'follow') return 'بمتابعتك.'
    };

    const getTargetMessage = (notification) => {
        const { type, comment_id, post_id, question_id, is_answer, reply_to_comment } = notification;

        if (type === 'reply' && comment_id && !reply_to_comment) return 'تعليقك.';
        if (type === 'reply' && reply_to_comment && post_id) return 'تعليق على منشورك.';
        if (type === 'reply' && reply_to_comment && question_id) return 'إجابة على سؤالك.';
        if ((type === 'up_vote' || type === 'down_vote') && !comment_id && !question_id && !is_answer || (comment_id && type === 'comment')) return (
            loadIconAfterMsg(type, 'منشورك.')
        );
        if ((type === 'up_vote' || type === 'down_vote' || comment_id) && (!is_answer && question_id) || type === 'answer') return (
            loadIconAfterMsg(type, 'سؤالك.')
        );
        if ((type === 'down_vote' || type === 'up_vote') && question_id && is_answer) return (
            loadIconAfterMsg(type, 'إجابتك.')
        );
        if ((type === 'up_vote' || type === 'down_vote') && !is_answer && comment_id) return (
            loadIconAfterMsg(type, 'تعليقك.')
        );
    };

    const Wrapper = notification.type === 'follow' ? 'div' : Link;

    return (
        <Wrapper
            {...(notification.type !== 'follow' && { href: `/notifications/` })}
            ref={ref}
            className={`${custom_styles} w-full flex items-center justify-between bg-[--theme-unread_notification_bg] p-4 shadow-md rounded-lg`}
        >
            <div className={`flex items-center gap-x-3`}>
                <img
                    src={notification.notification_maker.avatar ? notification.notification_maker.avatar : '/profile-default-svgrepo-com.svg'}
                    alt={`avatar`}
                    className="w-12 h-12 rounded-full"
                />

                <div className="flex-grow">
                    <span className={`flex gap-x-1`}>
                        قام
                        <span className={`font-semibold`}>{` ${notification.notification_maker.name} `}</span>
                        {getNotificationMessage(notification)}
                        {getTargetMessage(notification)}
                    </span>
                </div>
            </div>

            <div className={`flex flex-col items-center gap-y-1`}>
                <button
                    className="text-green-500 hover:text-green-600 transition duration-200"
                >
                    <IoCheckmarkDone size={24} />
                </button>
                <div className="text-xs text-gray-400">{notification.created_at}</div>
            </div>

        </Wrapper>
    );
})

export default NotificationItem
