import React, {forwardRef, useEffect, useState} from 'react'
import Post from "@/Components/Post.jsx";
import {router} from "@inertiajs/react";

const SpaceQuestions = forwardRef(({questions, filterType, filteredNextPageUrl, setFilteredNextPageUrl, setQuestions}, ref) => {


    const [isQuestionsFetching, setIsQuestionsFetching] = useState(false);

    const loadNextPosts = (pageUrl) => {
        if (pageUrl && !isQuestionsFetching) {
            setIsQuestionsFetching(true)
            router.get(pageUrl, {}, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: (res) => {
                    setQuestions(prevState => ([
                        ...prevState,
                        ...res.props.threads.data,
                    ]));
                    setFilteredNextPageUrl(res.props.threads.links.next);
                    setIsQuestionsFetching(false)
                },

            });
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !isQuestionsFetching && filteredNextPageUrl) {
                console.log('called')

                loadNextPosts(filteredNextPageUrl);
            }
        }, {
            threshold: 0.5 // Trigger when 50% of the last post is visible
        });

        // Watch the last post
        if (ref.current) {
            observer.observe(ref.current);
        }

        // Cleanup
        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [filteredNextPageUrl, isQuestionsFetching, filterType]);


    const show_questions = questions.map((question, index) => (
        <Post
            key={question.id}
            thread={question}
            ref={index === questions.length - 1 ? ref : null}
            customStyles={index !== 0 ? `mt-3` : ''}
        />
    ))


    return (
        <div className={`flex flex-col gap-y-3 w-full`}>
            <div className={`pb-3`}>
                {show_questions}
            </div>

        </div>
    )
})

export default SpaceQuestions;
