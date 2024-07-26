import Appbar from "../components/Appbar"
import { Footer } from "../components/Footer"
import { useMyProfile } from "../hooks"
import { Postcard } from "../components/Postcard"

export const UserProfile = () => {
    const { name, email, myBlogs } = useMyProfile()

    return (
        <div>
            <Appbar />
            <div className="flex flex-col md:hidden mt-20 min-h-[750px] mx-5">
                <div className="flex justify-around mx-3">
                    <img
                        alt="user profile"
                        src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
                        className="h-28 w-28 rounded-full my-3"
                    />
                    <div className="flex flex-col items-center mt-7">
                        <div className="mb-3 px-3 py-2 text-xl font-serif rounded max-w-fit font-semibold bg-neutral-300">
                            {name}
                        </div>
                        <div className="px-2 py-2 text-base font-serif rounded max-w-fit bg-neutral-300">
                            {`email : ${email}`}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center my-5 rounded-lg bg-gray-100">
                    <div className="py-3 w-full rounded-t-lg text-center text-xl font-serif text-white font-semibold bg-black">
                        My Blogs
                    </div>
                    <div className="">
                        {myBlogs.map(post => (
                            <Postcard
                                id={post.id}
                                key={post.id}
                                title={post.title}
                                content={post.content}
                                publishedDate={post.publishedAt + ""}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="hidden md:flex justify-between mt-24 mx-32 min-h-[570px] mb-14 max-h-[570px]">
                <div className="w-[30%] mr-6 flex flex-col items-center rounded-xl">
                    <img
                        alt="user profile"
                        src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
                        className="h-56 w-56 rounded-full mt-14 mb-4"
                    />
                    <div className="flex flex-col items-center">
                        <div className="mb-3 px-3 py-2 text-2xl font-serif rounded max-w-fit font-semibold bg-neutral-300">
                            {name}
                        </div>
                        <div className="px-3 py-2 text-md font-serif rounded max-w-fit bg-neutral-300">
                            {`email : ${email}`}
                        </div>
                    </div>
                </div>
                <div className="w-[70%] rounded scrollbar-thin bg-gray-100 scrollbar-thumb-gray-300 scrollbar-track-gray-100 overflow-y-scroll">
                    <div className="text-center py-3 text-xl font-serif text-white font-semibold bg-black">
                        My Blogs
                    </div>
                    <div className="mx-10 ">
                        {myBlogs.map(post => (
                            <Postcard
                                id={post.id}
                                key={post.id}
                                title={post.title}
                                content={post.content}
                                publishedDate={post.publishedAt + ""}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}