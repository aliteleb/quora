import React, {useEffect, useRef, useState} from 'react'
import Master from "@/Layouts/Master.jsx";
import {Head, router, usePage} from "@inertiajs/react";
import HomeSidebar from "@/Pages/Home/Layouts/HomeSidebar.jsx";
import Sidebar from "@/Pages/Notifications/Layouts/Sidebar.jsx";
import NotificationItem from "@/Pages/Notifications/Components/NotificationItem.jsx";

export default function Notifications() {

    const { props } = usePage()
    const [allNotifications, setAllNotifications] = useState(props.all_notifications.data);
    const [allNotificationsNextPageUrl, setAllNotificationsNextPageUrl] = useState(props.all_notifications.links.next);
    const [isFetching, setIsFetching] = useState(false);

    const lastNotificationRef = useRef(null);
    const show_all_notifications = allNotifications?.map((notification, index) => (
        <NotificationItem
            key={index}
            notification={notification}
            ref={index === allNotifications.length - 1 ? lastNotificationRef : null}
        />
    ))

    const loadMoreNotifications = (pageUrl) => {
        if (pageUrl && !isFetching) {
            setIsFetching(true)
            router.get(pageUrl, {}, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: (res) => {
                    setAllNotifications(prevNotifications => [...prevNotifications, ...res.props.all_notifications?.data]);
                    setAllNotificationsNextPageUrl(res.props.all_notifications?.links.next);
                    setIsFetching(false)
                },
            });
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !isFetching) {
                loadMoreNotifications(allNotificationsNextPageUrl);
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

    return (
        <Master>
            <Head title='الاشعارات' />
            <div className={`container max-w-screen-xl mx-auto lg:gap-x-10 gap-x-3 px-2 flex`}>
                <Sidebar/>
                <div className={`w-40 hidden lg:block`}></div> {/* Footer Simulation */}
                <div className={`lg:w-[750px] w-full flex flex-col items-center gap-y-2 py-2 pb-16 sm:pb-2`}>
                    <h1 className={`border-b border-[--theme-secondary-bg-color-hover] pb-3 w-full`}>الإشعارات</h1>
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
