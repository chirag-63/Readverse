import appLogo from '../assets/logo/readverse-logo.png'
import linkedin from '../assets/logo/linkedin.svg'
import github from '../assets/logo/github.svg'
import twitter from '../assets/logo/twitter.svg'

export const Footer = () => {
    return (
        <div className="bg-gray-200 text-black pb-8">
            <footer className="px-20 pt-6 md:py-10 mx-12">
                <div className="flex justify-center md:justify-between pb-3 items-center">
                    <img className="h-10 md:h-14 select-none" src={appLogo} alt="" />
                    <div className="hidden md:flex justify-center items-center">
                        <a className="hover:bg-white rounded-md" href="https://www.linkedin.com/in/chirag-chauhan-6013462a4/">
                            <img className="w-8" src={linkedin} alt="linkedin logo" />
                        </a>
                        <a className="hover:bg-white rounded-md ml-6" href="https://github.com/chirag-63">
                            <img className="p-1" src={github} alt="github logo" />
                        </a>
                        <a className="hover:bg-white rounded-md ml-6" href="https://www.twitter.com/home">
                            <img className="p-1" src={twitter} alt="twitter logo" />
                        </a>
                    </div>
                </div>
            </footer>
            <p className="text-center font-serif text-sm">© All rights reserved</p>
        </div>
    )
}