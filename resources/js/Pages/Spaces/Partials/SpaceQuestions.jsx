import React, {forwardRef} from 'react'
import Post from "@/Components/Post.jsx";

const SpaceQuestions = forwardRef(({questions}, ref) => {

    const show_questions = questions.map((question, index) => (
        <Post key={question.id} thread={question} ref={index === questions.length - 1 ? ref : null}
              customStyles={index !== 0 ? `mt-3` : ''}/>
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
