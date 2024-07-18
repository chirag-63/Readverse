import Appbar from "../components/Appbar"
import { useBlog } from "../hooks"
import { useParams } from 'react-router-dom'
import icon from '../assets/logo/profile-icon.svg'
import { Footer } from "../components/Footer"
import { BlogNotFound } from "./NotFound"
import { ArticleLoader } from "../components/loader"


export const Blogg = () => {
    const { id } = useParams()
    const { loading, blog, blogNotFound } = useBlog(id || "")

    if (loading) {
        return (
            <div >
                <Appbar />
                <div className="md:mx-12 xl:mt-32 lg:mx-32" >
                    <ArticleLoader />
                </div>
                <div className="relative">
                    <Footer />
                </div>
            </div>
        )
    }

    if (blogNotFound) {
        return (
            <div >
                <Appbar />
                <div className="flex justify-center items-center" >
                    <BlogNotFound />
                </div>
                <div className="relative">
                    <Footer />
                </div>
            </div>
        )
    }

    if (blog) {
        const date = blog.publishedAt + '';
        return (
            <div>
                <Appbar />
                <div className="m-8 md:m-12 xl:mt-32 lg:mx-32 mt-20 md:mt-28 lg:min-h-96 min-h-[455px] md:min-h-[335px] ">
                    <div className="font-mono text-sm text-slate-700 mb-4">
                        {`${date.slice(0, 10)}`}
                    </div>
                    <div className="text-3xl xl:text-5xl lg:text-4xl font-serif mb-6 lg:mb-10 w-full lg:w-[70%]">
                        {blog.title}
                    </div>
                    <div className="flex flex-col lg:flex-row justify-around mt-8 lg:mt-16">
                        <div className="hidden lg:flex lg:w-[35%]">
                            <AuthorCard name={blog.author.name} screen="large+" />
                        </div>
                        <div className="w-full lg:w-[65%] text-base md:text-lg lg:pl-8 font-serif max-w-full ">
                            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                        </div>
                        <div className="flex lg:hidden">
                            <AuthorCard name={blog.author.name} screen="small" />

                        </div>
                    </div>
                </div>
                <div className="relative">
                    <Footer />
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <Appbar />
                <div className="text-center text-xl mt-5">
                    loading...
                </div>
            </div>
        )
    }
}

interface ScreenType {
    name: string
    screen: string
}

function AuthorCard({ screen, name }: ScreenType) {
    const isLargeScreen = screen === "large+";
    const containerClasses = isLargeScreen ? "mx-4 w-[85%]" : "w-[40%] md:w-[30%] mt-5";
    const paddingClasses = isLargeScreen ? "p-2 rounded-lg" : "p-1 md:p-2 rounded-md";
    const textSizeClasses = isLargeScreen ? "text-lg" : "text-sm";
    const imgSizeClasses = isLargeScreen ? "w-8" : "w-5 md:w-6";
    const pyClasses = isLargeScreen ? "py-2" : "py-1";

    return (
        <div className={`font-serif ${containerClasses}`}>
            <div className="font-mono text-sm pl-2 text-slate-700">Written by</div>
            <div className={`bg-gray-100 flex items-center mt-1 ${paddingClasses}`}>
                <div>
                    <img className={`select-none ${imgSizeClasses}`} src={icon} alt="pen icon" />
                </div>
                <div className={`ml-4 ${pyClasses}`}>
                    <div className={textSizeClasses}>{name}</div>
                </div>
            </div>
        </div>
    )
}