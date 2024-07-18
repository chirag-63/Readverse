import Appbar from "../components/Appbar"
import { Postcard } from "../components/Postcard"
import { Footer } from "../components/Footer"
import { useBlogs } from "../hooks"
import { PostLoader } from '../components/loader'

export const Posts = () => {
    const { loading, blogs } = useBlogs()

    return (
        <div>
            <Appbar />
            {loading || !blogs ? (
                <div className="mx-8 lg:my-24 lg:mx-32">
                    <PostLoader />
                    <PostLoader />
                    <PostLoader />
                </div>
            ) : (
                <div className="">
                    <div className="mx-8 my-20 md:my-24 lg:mx-32 min-h-96">
                        {blogs.map(post => (
                            <Postcard
                                id={post.id}
                                key={post.id}
                                title={post.title}
                                content={post.content}
                                author={post.author.name}
                                publishedDate={post.publishedAt+""}
                            />
                        ))}
                    </div>
                    <Footer />
                </div>
            )}
        </div>
    )
}