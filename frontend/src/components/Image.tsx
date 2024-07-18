import Lottie from 'lottie-react';
import animationData from '../assets/lottie/Animation - 1720771312410.json';
import greenBlog from '../assets/lottie/finalSignin.json'
import notfoundAnimation from '../assets/lottie/404.json'
import noBlog from '../assets/lottie/NoBlogFound.json'

export function Image1() {
    return (
        <div>
            <Lottie animationData={animationData} loop={true} />
        </div>
    )
}

export function Image2() {
    return (
        <div>
            <Lottie animationData={greenBlog} loop={true} />
        </div>
    )
}

export function PageNotfound() {
    return (
        <div>
            <Lottie animationData={notfoundAnimation} loop={true} />
        </div>
    )
}

export function EmptyBox() {
    return (
        <div className='flex flex-col justify-center items-center max-w-[400px] my-[62px] md:m-0 md:max-w-[460px]' >
            <Lottie animationData={noBlog} loop={false} />
        </div>
    )
}