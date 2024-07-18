import { ChangeEvent } from "react";

interface inputLabel {
    label: string,
    placeholder: string,
    onchange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string
}

export function Input({ label, placeholder, type, onchange }: inputLabel) {
    return (
        <div className="flex flex-col justify-center mx-auto">
            <div className="pb-1 text-sm">{label}</div>
            <div className="">
                <input onChange={onchange} type={type || "text"} className="w-full p-2 border-gray-500 outline-none border-[1px] rounded text-lg focus:border-black"
                    placeholder={placeholder} />
            </div>
        </div>
    )
}