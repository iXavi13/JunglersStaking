import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { useCallback, useEffect, useReducer } from 'react'
import Web3Modal from "web3modal"
import { providers } from 'ethers'
import Web3Context, { initialState, reducer } from '../components/web3context';
import WalletConnectProvider from "@walletconnect/web3-provider"

const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "55892b13fb43460697a89ef8da59e5f3"
      }
    }
  };

function MyApp({ Component, pageProps }: AppProps) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { provider, web3Provider, address, chainId } = state;

    let web3Modal: any
    if (typeof window !== 'undefined') {
        web3Modal = new Web3Modal({
            network: "mainnet", // optional
            cacheProvider: true, // optional
            providerOptions // required
        });
    }

    const connect = useCallback(async function () {
        // This is the initial `provider` that is returned when
        // using web3Modal to connect. Can be MetaMask or WalletConnect.
        try{
            const provider = await web3Modal.connect()

            // We plug the initial `provider` into ethers.js and get back
            // a Web3Provider. This will add on methods from ethers.js and
            // event listeners such as `.on()` will be different.
            const web3Provider = new providers.Web3Provider(provider)

            const signer = web3Provider.getSigner()
            const address = await signer.getAddress()

            dispatch({
                type: 'SET_ADDRESS',
                address: address,
            })

            if(provider.chainId != "0x1"){
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: "0x1" }]
                })
            }

            const network = await web3Provider.getNetwork()
            console.log(network.chainId)
            if(provider.chainId == "0x1"){
                dispatch({
                    type: 'SET_WEB3_PROVIDER',
                    provider,
                    web3Provider,
                    address,
                    chainId: network.chainId,
                })
            }
            } 
        catch (error: any){
            console.log(error)
            try {
                if(error.detectedNetwork.chainId == 1){
                    console.log('Attempting to reconnect...')
                    connect()
                }
            } catch (err) {
                
            }
        }
    }, [])

    const disconnect = useCallback(
        async function () {
        await web3Modal.clearCachedProvider()
        if (provider?.disconnect && typeof provider.disconnect === 'function') {
            await provider.disconnect()
        }
        dispatch({
            type: 'RESET_WEB3_PROVIDER',
        })
        },
        [provider]
    )

    // Auto connect to the cached provider
    useEffect(() => {
        if (web3Modal.cachedProvider) {
            connect()
        }
    }, [connect])

    // A `provider` should come with EIP-1193 events. We'll listen for those events
    // here so that when a user switches accounts or networks, we can update the
    // local React state with that new information.
    useEffect(() => {
        if (provider?.on) {
            const handleAccountsChanged = (accounts: string[]) => {
                // eslint-disable-next-line no-console
                console.log('accountsChanged', accounts)
                dispatch({
                type: 'SET_ADDRESS',
                address: accounts[0],
            })
        }

        // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
        const handleChainChanged = (_hexChainId: string) => {
            console.log(_hexChainId)
            if(_hexChainId != "0x1"){
                disconnect()
            }
            window.location.reload()
        }

        const handleDisconnect = (error: { code: number; message: string }) => {
            // eslint-disable-next-line no-console
            console.log('disconnect', error)
            disconnect()
        }

        provider.on('accountsChanged', handleAccountsChanged)
        provider.on('chainChanged', handleChainChanged)
        provider.on('disconnect', handleDisconnect)

        // Subscription Cleanup
        return () => {
            if (provider.removeListener) {
                provider.removeListener('accountsChanged', handleAccountsChanged)
                provider.removeListener('chainChanged', handleChainChanged)
                provider.removeListener('disconnect', handleDisconnect)
            }
        }
        }
    }, [provider, disconnect])

    return ( 
        <Web3Context.Provider value={{provider, web3Provider, address, chainId, connect, disconnect}}>
            <Component {...pageProps} />
        </Web3Context.Provider>
    )
}

export default MyApp
