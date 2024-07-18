import { Link } from "react-router-dom"

interface subheadingLabel {
    label: string,
    link?: string,
    to: string
}

type headingLabel = Pick<subheadingLabel, 'label'>

export function Heading({ label }: headingLabel) {
    return (
        <div className="font-serif text-black mb-2 mt-6">
            {label}
        </div>
    )
}

export function SubHeading({ label, link, to }: subheadingLabel) {
    return (
        <div className="font-serif text-zinc-600 mb-6">
            {label}
            <Link className="hover:cursor-pointer hover:underline" to={to} >
                {link}
            </Link>
        </div>
    )
}

export function Warning({label}: headingLabel){
    return (
        <div className="text-sm font-serif text-red-600 mb-2">
            {label}
        </div>
    )
}