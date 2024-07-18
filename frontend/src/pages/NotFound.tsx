import { Link } from "react-router-dom"
import { Button } from "../components/Button"
import { PageNotfound, EmptyBox } from "../components/Image"

export const PageNotFound = () => {
    return (
        <div>
            <div className="flex mt-16 justify-center min-h-screen-sm">
                <PageNotfound />
            </div>
            <div className="flex justify-center items-center text-white font-normal text-lg mb-10" >
                <Link to={'/feed'} draggable="false">
                    <div className="flex justify-center items-center w-44 h-10">
                        <Button label={"Back to Feed"} type="black" />
                    </div>
                </Link>
            </div>
        </div>

    )
}

export const BlogNotFound = () => {
    return (
        <EmptyBox />
    )
}