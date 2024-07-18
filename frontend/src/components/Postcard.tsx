import { Link } from "react-router-dom"

interface postCardProps {
    author?: string,
    title: string,
    content: string,
    publishedDate: string,
    id: string
}

export const Postcard = ({ author, title, content, publishedDate, id }: postCardProps) => {
    return (
        <div className="border-b-[2px] border-gray-200 p-4 md:p-6 my-8 xl:w-[80%]">
            <div className="flex justify-between mb-2">
                <div className="flex">
                    <UserIcon />
                    <div className="ml-3 font-serif text-sm">{author}</div>
                </div>
                <div className="text-xs md:text-sm mt-1 font-serif text-gray-500" >
                    {`${publishedDate.slice(0, 10)}`}
                </div>
            </div>
            <div className="text-xl md:text-2xl font-serif font-semibold md:font-bold mb-1">
                <Link to={`/blog/${id}`}>
                    {title}
                </Link>
            </div>
            <div className="text-base font-serif mb-3 md:mb-5 xl:mb-8">
                <Link to={`/blog/${id}`}>
                    {`${content.slice(0, 180)}...`}
                </Link>
            </div>
            <div className="text-sm font-serif text-gray-500">
                {`Read - ${Math.ceil(content.length / 500)} minute(s)`}
            </div>
        </div >
    )
}

const UserIcon = () => {
    return (
        <img
            className="w-5 h-5 rounded-full ring-2 ring-gray-300 dark:ring-black select-none"
            src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
            alt="Bordered avatar"
        />
    )
}