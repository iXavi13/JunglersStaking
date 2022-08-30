import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import type { NextPage } from 'next'
import Head from 'next/head'
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, useEffect, useState } from 'react'
import { Navbar } from '../components/navbar'
import { JunglersImage } from '../components/placeholderImage'
import { useWeb3Context } from '../components/web3context'

const Home: NextPage = () => {
    const { web3Provider, address, connect } = useWeb3Context()
    const [nftsToStake, setStakableNFTs] = useState({});
    const [nftsToUnstake, setUnstakableNFTs] = useState({})
    const [ownedNfts, setOwnedNfts] = useState([]);
    const [stakedNfts, setStakedNfts] = useState([]);
    const [isOpen, setOpen] = useState(false);
    const [isStaking, setStaking] = useState(false);
    const [isUnstaking, setUnstaking] = useState(false);

    // const callSettings: any = {
    //     owner: address,
    //     contractAddresses: [BEASTS_CONTRACT, STAKED_BEASTS],
    //     withMetadata: false
    // }
    
    const getOwnedNFTs = async () => {
        if(web3Provider){
            // try {
            //     setStaking(true)
            //     setUnstaking(true)
            //     let NFTsInWallet: any = [];
            //     let NFTsStaking: any = [];
            //     const nfts = await web3.alchemy.getNfts(callSettings);
    
            //     for(const nft of nfts.ownedNfts){
            //         const id = Number(nft.id.tokenId);
            //         if(nft.contract.address == BEASTS_CONTRACT){
            //             NFTsInWallet.push(id)
            //         }
            //         if(nft.contract.address == STAKED_BEASTS.toLowerCase()){
            //             NFTsStaking.push(id)
            //         }
                    
            //     }
                
            //     setOwnedNfts(NFTsInWallet);
            //     setStakedNfts(NFTsStaking);
            //     setStaking(false)
            //     setUnstaking(false)
            // } catch (err) {
            //     console.log(err);
            //     setStaking(false)
            //     setUnstaking(false)
            // }
        }
    }

    useEffect(() => {
        getOwnedNFTs()
    }, [web3Provider])

    const stakeNFTs = async (nfts: any) => {
        try {
            // if(nfts.length > 0) {
            //     const approved = await approveContract(BEASTS_CONTRACT);
            //     if(approved){
            //         setOpen(false)
            //         setStaking(true);
            //         const signer = web3Provider.getSigner()
            //         const contract = new Contract(STAKING_CONTRACT, STAKING_MIN_ABI, signer);

            //         const staked = await contract.stakeBeasts(nfts);

            //         if(staked && "hash" in staked){
            //             const txnReceipt: any = await staked.wait();
            //             await getOwnedNFTs()
            //         }
            //     }
            // }
        } catch (err) {
            console.log(err)
            setOpen(false)
            setStaking(false);
        }
    }

    const stakeAllNFTs = async () => {
        if(web3Provider){
            await stakeNFTs(ownedNfts);   
        }
        else{
            if(connect) {
                connect()
            }
        }
    }

    const stakeSelectedNFTs = async () => {
        if(web3Provider){
            console.log("Staking %s", Object.keys(nftsToStake))
            await stakeNFTs(Object.keys(nftsToStake))
        }
        else{
            if(connect) {
                connect()
            }
        }
    }

    const unstakeNFTs = async (nfts: any) => {
        try {
            // if(nfts.length > 0) {
            //     const approved = await approveContract(STAKED_BEASTS);
            //     if(approved){
            //         setOpen(false)
            //         setUnstaking(true);
            //         const signer = web3Provider.getSigner()
            //         const contract = new Contract(STAKING_CONTRACT, STAKING_MIN_ABI, signer);
    
            //         const unstaked = await contract.unstakeBeasts(nfts);
            //         if(unstaked && "hash" in unstaked){
            //             const txnReceipt: any = await unstaked.wait();
            //             await getOwnedNFTs()
            //         }
            //     }
            // }
        } catch (err) {
            console.log(err)
            setOpen(false)
            setUnstaking(false);
        }
    }

    const unstakeAllNFTs = async () => {
        if(web3Provider){
            await unstakeNFTs(stakedNfts)
        }
        else{
            if(connect) {
                connect()
            }
        }
    }

    const unstakeSelectedNFTs = async () => {
        if(web3Provider){
            console.log("Unstaking %s", Object.keys(nftsToUnstake))
            await unstakeNFTs(Object.keys(nftsToUnstake))
        }
        else{
            if(connect) {
                connect()
            }
        }
    }

    const approveContract = async (contractAddress: string) => {
        // const signer = await web3Provider.getSigner();
        // let nftContract: Contract;

        // if(contractAddress == BEASTS_CONTRACT)
        //     nftContract = new Contract(BEASTS_CONTRACT, BEAST_MIN_ABI, signer)
        // else
        //     nftContract = new Contract(STAKED_BEASTS, STAKED_BEAST_ABI, signer)

        // let isApproved = await nftContract.isApprovedForAll(address, STAKING_CONTRACT)

        // if(isApproved){
        //     return isApproved
        // }
        // else{
        //     setOpen(true);
        //     const getApproval = await nftContract.setApprovalForAll(STAKING_CONTRACT, true)
        //     if(getApproval && "hash" in getApproval){
        //         const txnReceipt: any = await getApproval.wait();
        //         if("logs" in txnReceipt){
        //             return Boolean(parseInt(txnReceipt.logs[0].data))
        //         }
        //     }
        //     return false
        // }
    }


    return (
        <div className="min-h-screen min-w-screen lg:max-h-screen bg-[url('/animated_bg.gif')] bg-cover overflow-hidden relative">
            <Head>
                <title>Junglers</title>
                <meta name="description" content="Junglers NFT" />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <Navbar />
            <div className="stake-container relative overflow-auto text-center backdrop-blur-sm"  id="main-container" >
                    <div className="flex flex-col h-max lg:h-screen w-[80%]  lg:mt-0 justify-center items-center mx-auto"> {/*mt-[20vh] mb-24*/}
                        <div className="p-2 bg-main-green w-full lg:w-[50%] rounded-t-lg border-b-2 border-main-black">
                            <div className="text-4xl font-bold text-jungler-white">
                                Stake & Unlock
                            </div>
                            {/* <div className="p-2 text-jungler-white/80 text-sm">
                                Staking 1 Jungler NFT will get you access to our discord.<br></br> Staking multiple will give you access to extra exclusive chats in the discord. Junglers utility will come shortly for all Junglers who stake their NFTs.
                            </div> */}
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                            <div className="bg-main-green staking-column rounded-none lg:rounded-l-lg">
                                <div className="text-lg font-bold pb-2 text-jungler-white">
                                    Unstaked Junglers
                                </div>
                                <div className="flex w-full justify-center items-center gap-8 pb-2">
                                    <button onClick={() => stakeAllNFTs()} className="stake-button bg-secondary-green">
                                        Stake All
                                    </button>
                                    <button onClick={() => stakeSelectedNFTs()} className="stake-button bg-secondary-green">
                                        Stake Selected
                                    </button>
                                </div>
                                <div className="p-2 rounded-full">
                                    {!web3Provider ? 
                                    <div className="staking-grid">
                                        <JunglersImage Id={0} />
                                        <JunglersImage Id={1} />
                                        <JunglersImage Id={2} />
                                        <JunglersImage Id={3} />
                                        <JunglersImage Id={4} />
                                        <JunglersImage Id={5} />
                                        <JunglersImage Id={6} />
                                        <JunglersImage Id={7} />
                                        <JunglersImage Id={8} />
                                        <JunglersImage Id={9} />
                                        <JunglersImage Id={10} />
                                        <JunglersImage Id={11} />
                                    </div>
                                    :
                                    <div className="staking-grid">
                                        {ownedNfts.map((id: string | number | boolean | ReactFragment | ReactPortal | ReactElement<any, string | JSXElementConstructor<any>> | null | undefined) => (
                                            <motion.div 
                                                whileHover={{scale: 1.05}} 
                                                className="junglers-container"
                                                key={`stakable-${id}`}
                                                id={`stakable-${id}`}
                                                onClick={(e: any) => {
                                                    const id = e.currentTarget.id.replace("stakable-", "")
                                                    if(e.currentTarget.classList.contains('junglers-selected')) {
                                                        e.currentTarget.classList.remove('junglers-selected')
                                                        let newStakableObject: any = nftsToStake;
                                                        delete newStakableObject[id];
                                                        setStakableNFTs(newStakableObject)
                                                    } else {
                                                        e.currentTarget.classList.add('junglers-selected');
                                                        setStakableNFTs(Object.assign(nftsToStake, {[id]: id}))
                                                    }
                                                }}
                                            >
                                                <img src={`https://d26m6bk6d56tqa.cloudfront.net/${id}.png`} className="rounded-t"/>
                                                <div className="junglers-container-subtitle">
                                                    BEAST #{id}
                                                </div>
                                            </motion.div>)
                                        )}
                                        {isStaking && <div className="absolute top-0 w-full h-full bg-black/50 flex justify-center items-center rounded-full">
                                            <FontAwesomeIcon icon={faCircleNotch} className="h-8 animate-spin text-secondary-green"/>
                                        </div>}
                                    </div>
                                    }
                                </div>
                            </div>
                            <div className="bg-secondary-green staking-column rounded-b-lg lg:rounded-r-lg">
                                <div className="text-lg font-bold pb-2 text-jungler-white">
                                    Staked Junglers
                                </div>
                                <div className="flex w-full justify-center items-center gap-8 pb-2">
                                    <button onClick={() => unstakeAllNFTs()} className="stake-button text-beast-black bg-main-green">
                                        Unstake All
                                    </button>
                                    <button onClick={() => unstakeSelectedNFTs()} className="stake-button text-beast-black bg-main-green">
                                        Unstake Selected
                                    </button>
                                </div>
                                <div className="p-2 rounded-full">
                                    {!web3Provider ?
                                    <div className="staking-grid">
                                        <JunglersImage Id={12} />
                                        <JunglersImage Id={13} />
                                        <JunglersImage Id={14} />
                                        <JunglersImage Id={15} />
                                        <JunglersImage Id={16} />
                                        <JunglersImage Id={17} />
                                        <JunglersImage Id={18} />
                                        <JunglersImage Id={19} />
                                        <JunglersImage Id={20} />
                                        <JunglersImage Id={21} />
                                        <JunglersImage Id={22} />
                                        <JunglersImage Id={23} />
                                    </div>
                                    :
                                    <div className="staking-grid">
                                        {stakedNfts.map((id: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined) => (
                                            <motion.div 
                                                whileHover={{scale: 1.05}} 
                                                className="junglers-container"
                                                key={`unstakable-${id}`}
                                                id={`unstakable-${id}`}
                                                onClick={(e: any) => {
                                                    const id = e.currentTarget.id.replace("unstakable-", "")
                                                    if(e.currentTarget.classList.contains('junglers-selected')) {
                                                        e.currentTarget.classList.remove('junglers-selected')
                                                        let newUnstakableObject: any = nftsToUnstake;
                                                        delete newUnstakableObject[id];
                                                        setUnstakableNFTs(newUnstakableObject)
                                                    } else {
                                                        e.currentTarget.classList.add('junglers-selected');
                                                        setUnstakableNFTs(Object.assign(nftsToUnstake, {[id]: id}))
                                                    }
                                                }}
                                            >
                                                <img src={`https://d26m6bk6d56tqa.cloudfront.net/${id}.png`} className="rounded-t"/>
                                                <div className="junglers-container-subtitle">
                                                    Jungler #{id}
                                                </div>
                                            </motion.div>)
                                        )}
                                        {isUnstaking && <div className="absolute top-0 w-full h-full bg-black/50 flex justify-center items-center">
                                            <FontAwesomeIcon icon={faCircleNotch} className="h-8 animate-spin text-secondary-green rounded-full"/>
                                        </div>}
                                    </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {isOpen && 
                <div className="z-50 top-0 bg-black/20 absolute w-full h-full backdrop-blur-sm text-center">
                    <div className="flex flex-col justify-center items-center w-full h-full">
                        <div onClick={(e) => (e.stopPropagation())} className="approval-container relative p-4 rounded mx-auto max-w-[80vw] min-w-[65vw] max-h-[80vh] lg:max-w-[65vw] bg-secondary-green overflow-auto">
                            <div className="text-3xl text-jungler-white drop-shadow-lg font-bold p-2">
                                Approval Transaction
                            </div>
                            <div className="text-jungler-white">
                                Staking and Unstaking requires approving our staking contract to transfer your NFTs. This is a one time transaction for each action. Please finish the approval transaction to continue.
                            </div>
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default Home
