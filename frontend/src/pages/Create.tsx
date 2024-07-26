import Appbar from "../components/Appbar"
import { Footer } from '../components/Footer';
import { Textarea } from '@headlessui/react';
import { Heading } from "../components/Heading";
import { Button } from '../components/Button';
import { useState } from "react";
import { setBlog } from '../hooks';

export const Create = () => {
    const { title, setTitle, content, setContent, publish, submitConditionFail } = setBlog()
    const [titleCount, settitleCount] = useState(100)
    const [contentCount, setContentCount] = useState(5000)

    return (
        <div>
            <Appbar />
            <div className="min-h-96 mt-24 lg:mt-32 mb-4 mx-2 lg:mx-40">
                <div className="min-h-44">
                    <h1 className="lg:text-4xl text-3xl font-medium mx-4 mb-2 ml-8 font-serif">
                        What is going on in your mind?
                    </h1>
                    <div className="flex justify-between ml-[2%] mr-[10%] md:ml-2 md:mr-[30%]">
                        <div className="mx-10 text-xl">
                            <Heading label={'Title'} />
                        </div>
                        <div className={`flex items-end mb-1 font-serif text-sm ${titleCount < 0 ? 'text-red-600' : ''}`} >
                            {`${titleCount} characters left`}
                        </div>
                    </div>
                    <div className='flex justify-between items-baseline '>
                        <Textarea onChange={(e) => {
                            setTitle(e.target.value)
                            settitleCount(100 - e.target.value.length)
                        }}
                            value={title}
                            name="title"
                            className="mx-10 w-[800px] outline-none border-[1px] border-gray-400 bg-gray-50 p-3 mb-10 rounded min-h-20 max-h-20 text-base lg:text-lg font-serif"
                            placeholder="A Thought to Remember..."
                        />
                        <div className='hidden md:flex md:mr-48 md:w-28 md:h-10 rounded' style={{ cursor: (submitConditionFail) ? 'not-allowed' : 'pointer' }}>
                            <Button onClick={publish} label='Publish' type='green' disabled={submitConditionFail} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center text-xl font-serif pb-8">
                    <div className='ml-[10%] mr-[10%] md:ml-10 md:mr-40 flex items-center justify-between mx-2 mb-2' >
                        <div>Content </div>
                        <div className={`text-sm mt-2 ${contentCount < 0 ? 'text-red-600' : ''}`} >
                            {`${contentCount} characters left`}
                        </div>
                    </div>
                    <Textarea onChange={(e) => {
                        setContent(e.target.value)
                        setContentCount(5000 - e.target.value.length)
                    }}
                        value={content}
                        name="content"
                        className="w-[82.3%] mx-10 outline-none border-[1px] border-gray-400 bg-gray-50 p-3 mb-6 md:mb-10 rounded min-h-52 max-h-[1500px] text-base font-serif"
                        placeholder="write for the day..."
                    />
                    <div className="md:hidden flex justify-center"    >
                        <div className='rounded w-28 h-9' style={{ cursor: (submitConditionFail) ? 'not-allowed' : 'pointer' }}>
                            <Button onClick={publish} label='Publish' type='green' disabled={submitConditionFail} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
