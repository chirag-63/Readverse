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
            <form>
                <div className="min-h-96 mt-32 mb-4 mx-40">
                    <div className="min-h-44">
                        <h1 className="text-4xl font-medium mx-8 mb-2 ml-8 font-serif">
                            What is going on in your mind?
                        </h1>
                        <div className="flex justify-between ml-2 mr-[370px]">
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
                                className="mx-10 w-[800px] outline-none border-[1px] border-gray-400 bg-gray-50 p-3 mb-10 rounded min-h-14 max-h-24 text-lg font-serif"
                                placeholder="A Thought to Remember..."
                            />
                            <div className='mr-48 w-28 h-10 rounded' style={{ cursor: (submitConditionFail) ? 'not-allowed' : 'pointer' }}>
                                <Button onClick={publish} label='Publish' type='green' disabled={submitConditionFail} />
                            </div>
                        </div>
                    </div>
                    <div className="ml-10 mr-40 text-xl font-serif pb-8">
                        <div className='flex items-center justify-between mx-2 mb-2' >
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
                            className="w-[1000px] outline-none border-[1px] border-gray-400 bg-gray-50 p-3 mb-10 rounded min-h-40 max-h-[3000px] text-base font-serif"
                            placeholder="write for the day..."
                        />
                    </div>
                </div>
            </form>
            <Footer />
        </div>
    )
}
