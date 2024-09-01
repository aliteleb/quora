import React, {forwardRef, useEffect, useState} from 'react'
import {IoCheckmarkDone} from "react-icons/io5";
import {HiMiniHandThumbDown} from "react-icons/hi2";
import {AiFillDislike, AiFillLike} from "react-icons/ai";
import {FaArrowAltCircleDown, FaArrowAltCircleUp} from "react-icons/fa";
import {Link, router} from "@inertiajs/react";
import {useApp} from "@/AppContext/AppContext.jsx";

const NotificationItem = forwardRef(({notification, custom_styles, allNotifications, setAllNotifications}, ref) => {

    const { setNotificationsCount } = useApp()
    const [isLinkActive, setIsLinkActive] = useState(true);
    const [isLoading, setIsLoading] = useState(false);


    const loadIconAfterMsg = (type) => {
        return (
            <div className={`flex items-center gap-x-2`}>
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
        if ((type === 'up_vote' || type === 'down_vote') && !comment_id && !question_id && !is_answer || (comment_id && type === 'comment')) return 'منشورك.';
        if ((type === 'up_vote' || type === 'down_vote' || comment_id) && (!is_answer && question_id) || type === 'answer') return 'سؤالك.';
        if ((type === 'down_vote' || type === 'up_vote') && question_id && is_answer) return 'إجابتك.';
        if ((type === 'up_vote' || type === 'down_vote') && !is_answer && comment_id) return 'تعليقك.';
    };

    const markAsRead = () => {
        setIsLoading(true)
        router.post(`/notifications/mark-as-read/${notification.id}`, {}, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (res) => {
                const updatedNotification = res.props.notification?.data
                let outDatedNotificationIndex = null

                let filteredNotifications = allNotifications.filter((notificationItem, index) => {
                    if (notificationItem.id === updatedNotification.id) {
                        outDatedNotificationIndex = index
                    }
                    return notificationItem.id !== updatedNotification.id
                })
                filteredNotifications.splice(outDatedNotificationIndex, 0, updatedNotification)
                setAllNotifications(filteredNotifications)
                setNotificationsCount(res.props.notifications_count)
                setIsLoading(false)
            }
        })
    }

    const Wrapper = notification.type === 'follow' || !isLinkActive ? 'div' : Link;

    return (
        <Wrapper
            {...(isLinkActive && notification.type !== 'follow' && { href: `/threads/show/${notification.thread_slug}` })}
            ref={ref}
            className={`${custom_styles} w-full flex items-center justify-between ${notification.is_read ? 'bg-[--theme-main-bg-color]' : 'bg-[--theme-unread_notification_bg]'} p-4 shadow-md rounded-lg`}
        >
            <div className="flex items-center gap-x-3">
                <img
                    src={notification.notification_maker.avatar ? notification.notification_maker.avatar : '/profile-default-svgrepo-com.svg'}
                    alt="avatar"
                    className="w-12 h-12 rounded-full"
                />

                <div className="flex-grow">
                    <span className="flex gap-x-1 flex-wrap">
                        قام
                        <span className="font-semibold">{` ${notification.notification_maker.name} `}</span>
                        <span className="flex gap-x-1">
                            {getNotificationMessage(notification)}
                            {getTargetMessage(notification)}
                        </span>
                    </span>
                </div>

            </div>

            <div className="flex items-center gap-y-1 gap-x-1">
                <div>
                    {notification.type === 'up_vote' && loadIconAfterMsg('up_vote', '')}
                    {notification.type === 'down_vote' && loadIconAfterMsg('down_vote', '')}
                </div>
                <div className={`flex flex-col items-center`}>
                    <button
                        disabled={isLoading}
                        onMouseEnter={() => setIsLinkActive(false)}
                        onMouseLeave={() => setIsLinkActive(true)}
                        onClick={(e) => {
                            e.stopPropagation()
                            !notification.is_read && markAsRead();
                        }}
                        className={`${notification.is_read ? 'text-green-500 hover:text-green-600' : 'hover:text-stone-300'} transition duration-200`}
                    >
                        <IoCheckmarkDone size={24} />
                    </button>
                    <div className="text-xs text-gray-400">{notification.created_at}</div>
                </div>
            </div>

        </Wrapper>
    );
})

export default NotificationItem
