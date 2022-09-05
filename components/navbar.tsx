import { faDiscord, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faEye, faShip } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FC } from "react"
import { Connect } from "./connect"

export const Navbar: FC<{}> = () => {

    return (
        <div className="p-4 bg-main-black bg-contain bg-repeat-x absolute top-0 w-full border-b-2 border-main-black z-50">
            <div className="md:hidden text-3xl font-bold text-white absolute w-full mx-auto -z-10 bg-main-black"><div className="flex justify-center items-center"><img className="h-12" src="./logo.gif"></img></div></div>
            <div className="flex justify-between items-center text-main-white/90 px-4 h-full relative mt-14 md:mt-0">
                <div className="flex gap-8 items-center h-full">
                    <a href="https://twitter.com/JunglersNFT" rel="noopener noreferrer" target="_blank" className="hover:text-main-green">
                        <FontAwesomeIcon icon={faTwitter} className="h-6" />
                    </a>
                    <a href="https://discord.gg/zVXss7RUcb" rel="noopener noreferrer" target="_blank" className="hover:text-main-green">
                        <FontAwesomeIcon icon={faDiscord} className="h-6 z-30" />
                    </a>
                    <a href="https://opensea.io/collection/junglers-nft" rel="noopener noreferrer" target="_blank" className="hover:text-main-green">
                        <FontAwesomeIcon icon={faShip} className="h-6 z-30" />
                    </a>
                    <a href="https://looksrare.org/collections/0x63e8daf718b0dc39bf214f9b4dc9424841c2b267" rel="noopener noreferrer" target="_blank" className="hover:text-main-green">
                        <FontAwesomeIcon icon={faEye} className="h-6 z-30" />
                    </a>
                </div>
                <div className="hidden md:block text-3xl font-bold text-white absolute w-full mx-auto -z-10"><div className="flex justify-center items-center"><img className="h-12" src="./logo.gif"></img></div></div>
                <Connect />

            </div>
        </div>
    )
}