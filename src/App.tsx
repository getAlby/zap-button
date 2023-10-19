import { ZapButton } from './components'

function App() {
  return (
    <div className="p-6 max-w-3xl shadow-md rounded-lg border-2 mx-auto md:my-4 bg-gradient-to-tr from-gray-700 to-gray-600">
      <h1 className="font-extrabold text-2xl bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text text-transparent">Zap Button <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Blog</span></h1>
      <hr className="my-4"/>
      <div>
        <h2 className="font-extrabold text-xl text-white">Trending Posts today!</h2>
        
        <div className="mt-4 rounded-lg bg-white w-full py-6 px-8">
          <h3 className="font-extrabold text-md">Bringing Zaps truly out of nostr</h3>
          <p className="text-sm">By Roland Bewick</p>
          <hr className="my-4"/>
          <div>
            Bitcoin ipsum dolor sit amet. Peer-to-peer double-spend problem to the moon, transaction SHA-256 cryptocurrency address blocksize! Consensus proof-of-work pizza decentralized electronic cash blockchain decentralized. Genesis block whitepaper peer-to-peer wallet digital signature hashrate blocksize electronic cash. Merkle Tree, money printer go brrrrr public key, soft fork money printer go brrrrr wallet SHA-256 transaction? To the moon genesis block.<br/><br/>
            When lambo hodl blockchain digital signature SHA-256 whitepaper roller coaster block height. Digital signature stacking sats address space citadel freefall together stacking sats, hash, hashrate. Mining miner private key Bitcoin Improvement Proposal outputs soft fork hard fork mining. Transaction peer-to-peer, mining money printer go brrrrr few understand this inputs?
          </div>
          <hr className="my-4"/>
          <div className="flex justify-between items-center w-full min-h-[40px]">
            <ZapButton lnurl='rolznz@getalby.com'/>
            <div className="flex flex-col items-end">
              <p className="text-sm">Posted on</p>
              <p className="font-extrabold text-sm">19th October, 2023</p>
            </div>
          </div>
        </div>


        <div className="mt-6 rounded-lg bg-white w-full py-6 px-8">
          <h3 className="font-extrabold text-md">Awesome Nostr</h3>
          <p className="text-sm">By Michael Bumann</p>
          <hr className="my-4"/>
          <div>
            Bitcoin ipsum dolor sit amet. Peer-to-peer double-spend problem to the moon, transaction SHA-256 cryptocurrency address blocksize! Consensus proof-of-work pizza decentralized electronic cash blockchain decentralized. Genesis block whitepaper peer-to-peer wallet digital signature hashrate blocksize electronic cash. Merkle Tree, money printer go brrrrr public key, soft fork money printer go brrrrr wallet SHA-256 transaction? To the moon genesis block.<br/><br/>
            When lambo hodl blockchain digital signature SHA-256 whitepaper roller coaster block height. Digital signature stacking sats address space citadel freefall together stacking sats, hash, hashrate. Mining miner private key Bitcoin Improvement Proposal outputs soft fork hard fork mining. Transaction peer-to-peer, mining money printer go brrrrr few understand this inputs?
          </div>
          <hr className="my-4"/>
          <div className="flex justify-between items-center w-full min-h-[40px]">
            <ZapButton lnurl='michael@getalby.com'/>
            <div className="flex flex-col items-end">
              <p className="text-sm">Posted on</p>
              <p className="font-extrabold text-sm">16th October, 2023</p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-lg bg-white w-full py-6 px-8">
          <h3 className="font-extrabold text-md">Zap! Zap! Zap!</h3>
          <p className="text-sm">By Adithya Vardhan</p>
          <hr className="my-4"/>
          <div>
            Bitcoin ipsum dolor sit amet. Peer-to-peer double-spend problem to the moon, transaction SHA-256 cryptocurrency address blocksize! Consensus proof-of-work pizza decentralized electronic cash blockchain decentralized. Genesis block whitepaper peer-to-peer wallet digital signature hashrate blocksize electronic cash. Merkle Tree, money printer go brrrrr public key, soft fork money printer go brrrrr wallet SHA-256 transaction? To the moon genesis block.<br/><br/>
            When lambo hodl blockchain digital signature SHA-256 whitepaper roller coaster block height. Digital signature stacking sats address space citadel freefall together stacking sats, hash, hashrate. Mining miner private key Bitcoin Improvement Proposal outputs soft fork hard fork mining. Transaction peer-to-peer, mining money printer go brrrrr few understand this inputs?
          </div>
          <hr className="my-4"/>
          <div className="flex justify-between items-center w-full min-h-[40px]">
            <ZapButton lnurl='adithya@getalby.com'/>
            <div className="flex flex-col items-end">
              <p className="text-sm">Posted on</p>
              <p className="font-extrabold text-sm">9th October, 2023</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
