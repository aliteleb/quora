import React, {useEffect, useRef, useState} from 'react'
import Master from "@/Layouts/Master.jsx";
import {Head, router, usePage} from "@inertiajs/react";
import Footer from "@/Pages/Home/Layouts/Footer.jsx";
import HomeSidebar from "@/Pages/Home/Layouts/HomeSidebar.jsx";
import Post from "@/Components/Post.jsx";

export default function Questions() {

    const { props } = usePage()
    console.log(props)
    const [questions, setQuestions] = useState(props.questions.data || []);
    const [questionsNextPageUrl, setQuestionsNextPageUrl] = useState(props.questions.links.next || '');
    const [isFetching, setIsFetching] = useState(false);

    const lastQuestionRef = useRef(null)
    const show_questions = questions?.map((question, index) => (
        <Post
            key={index}
            passed_thread={question}
            threads={question}
            setThreads={setQuestions}
            ref={index === questions.length - 1 ? lastQuestionRef : null}
            customStyles={index === 0 ? 'mt-2' : ''}
        />
    ))

    const loadMoreQuestions = (pageUrl) => {
        if (pageUrl && !isFetching) {
            setIsFetching(true);
            router.get(pageUrl, {}, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: (page) => {
                    console.log(page.props)
                    setQuestions(prevQuestions => [...prevQuestions, ...page.props.questions?.data]);
                    setQuestionsNextPageUrl(page.props.questions?.links.next);
                    setIsFetching(false);
                },
            });
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !isFetching) {
                loadMoreQuestions(questionsNextPageUrl);
            }
        }, {
            threshold: 0.5 // Trigger when 50% of the last thread is visible
        });

        // Watch the last thread
        if (lastQuestionRef.current) {
            observer.observe(lastQuestionRef.current);
        }

        // Cleanup
        return () => {
            if (lastQuestionRef.current) {
                observer.unobserve(lastQuestionRef.current);
            }
        };
    }, [questionsNextPageUrl, isFetching]);

    return (
        <Master>
            <Head title='إشارات مرجعية' />
            <div className={`flex container max-w-screen-xl mx-auto lg:gap-x-10 gap-x-3 px-2`}>
                <Footer />
                <div className={`w-40 hidden lg:block`}></div> {/* Footer Simulation */}
                <div className={`lg:w-[750px] w-full flex flex-col items-center gap-y-2 py-2 pb-16 sm:pb-0`}>
                    <h1 className={`border-b border-[--theme-secondary-bg-color-hover] pb-3 w-full`}>الأسئلة</h1>
                    {show_questions}
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
