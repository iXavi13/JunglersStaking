import { FC } from "react"
import { useWeb3Context } from "./web3context"

export const Connect: FC<{}> = () => {
    const { web3Provider, address, connect, disconnect } = useWeb3Context();

    return (
        <div>
            { !web3Provider && connect ?
                <button className="connect-button" onClick={() => connect()}>
                    CONNECT
                </button> 
                : 
                web3Provider && address && disconnect ?
                    <button className="connect-button" onClick={() => disconnect()}>
                        {address.substring(0,4) + '...' + address.slice(-4)}
                    </button>
                :
                ""}
        </div>
    )
}