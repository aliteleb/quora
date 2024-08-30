import React, {useEffect, useRef, useState} from 'react'
import Master from "@/Layouts/Master.jsx";
import {Head, router, usePage} from "@inertiajs/react";
import HomeSidebar from "@/Pages/Home/Layouts/HomeSidebar.jsx";
import Sidebar from "@/Pages/Notifications/Layouts/Sidebar.jsx";
import NotificationItem from "@/Pages/Notifications/Components/NotificationItem.jsx";
import Button from "@/Core/Button.jsx";

export default function Notifications() {

    const { props } = usePage()
    const [isActive, setIsActive] = useState({
        all: true,
        questions: false,
        posts: false,
        reactions: false,
        comments: false,
    });
    const [allNotifications, setAllNotifications] = useState(props.all_notifications?.data);
    const [allNotificationsNextPageUrl, setAllNotificationsNextPageUrl] = useState(props.all_notifications?.links.next);
    const [isFetching, setIsFetching] = useState(false);

    const lastNotificationRef = useRef(null);
    const show_all_notifications = allNotifications?.map((notification, index) => (
        <NotificationItem
            key={index}
            notification={notification}
            ref={index === allNotifications.length - 1 ? lastNotificationRef : null}
        />
    ))

    const loadMoreNotifications = (pageUrl, dataKey) => {
        if (pageUrl && !isFetching) {
            setIsFetching(true)
            router.get(pageUrl, {}, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: (res) => {
                    setAllNotifications(prevNotifications => [...prevNotifications, ...res.props[dataKey]?.data]);
                    setAllNotificationsNextPageUrl(res.props[dataKey]?.links.next);
                    setIsFetching(false)
                },
            });
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !isFetching) {
                if (isActive.questions) {
                    loadMoreNotifications(allNotificationsNextPageUrl, 'questions_notifications');
                } else if (isActive.posts) {
                    loadMoreNotifications(allNotificationsNextPageUrl, 'posts_notifications');
                } else if (isActive.reactions) {
                    loadMoreNotifications(allNotificationsNextPageUrl, 'reactions_notifications');
                } else if (isActive.comments) {
                    loadMoreNotifications(allNotificationsNextPageUrl, 'comments_notifications');
                } else {
                    loadMoreNotifications(allNotificationsNextPageUrl, 'all_notifications');
                }

            }
        }, {
            threshold: 0.5 // Trigger when 50% of the last thread is visible
        });

        // Watch the last thread
        if (lastNotificationRef.current) {
            observer.observe(lastNotificationRef.current);
        }

        // Cleanup
        return () => {
            if (lastNotificationRef.current) {
                observer.unobserve(lastNotificationRef.current);
            }
        };
    }, [allNotificationsNextPageUrl, isFetching]);

    const getNotifications = (endPoint, dataKey) => {
        router.get(endPoint, {}, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (res) => {
                setAllNotifications(res.props[dataKey]?.data)
                setAllNotificationsNextPageUrl(res.props[dataKey]?.links.next)
            }
        })
    }

    return (
        <Master>
            <Head title='الاشعارات' />
            <div className={`container max-w-screen-xl mx-auto lg:gap-x-10 gap-x-3 px-2 flex`}>
                <Sidebar
                    setIsActive={setIsActive}
                    isActive={isActive}
                    getNotifications={getNotifications}
                />
                <div className={`w-40 hidden lg:block`}></div> {/* Footer Simulation */}
                <div className={`lg:w-[750px] w-full flex flex-col gap-y-2 py-2 pb-16 sm:pb-2`}>
                    <div className={`relative`}>
                        <h1 className={`border-b border-[--theme-secondary-bg-color-hover] pb-3`}>الإشعارات</h1>
                        <Button
                            content={`قم بتعليم الجميع كمقروء`}
                            custom_styles={`absolute top-0 left-0 w-max`}
                        />
                    </div>
                    {show_all_notifications}
                </div>
                <div className={`relative w-[50%] lg:w-[30%] hidden md:block`}>
                    <HomeSidebar/>
                </div>
                {/*  left screen for simulate add padding  */}
                <div className={`md:block hidden w-3 h-screen bg-[--theme-body-bg] fixed left-0 z-50`}></div>
            </div>
        </Master>
    )
}
