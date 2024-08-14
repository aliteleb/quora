import React from 'react'

export default function CredentialsAndHighlights({join_date, followed_spaces_count}) {
    return (
        <div>
            <h1 className={`border-b border-[--theme-secondary-bg-color-hover] pb-3`}>البيانات الرئيسية</h1>
            <div className={`flex flex-col gap-y-2 mt-3`}>
                <div>تم الانضمام في {join_date}</div>
                <div>يتابع {followed_spaces_count} مساحات</div>
            </div>
        </div>
    )
}
