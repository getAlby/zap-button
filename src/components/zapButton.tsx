import React, { useEffect, useRef, useState } from "react";
import { launchModal, Modal } from '@getalby/bitcoin-connect-react';
import { LightningAddress } from "@getalby/lightning-tools";
import {
  UnsignedEvent,
  finishEvent,
  generatePrivateKey,
  getPublicKey,
} from "nostr-tools";

import { CheckIcon, GearIcon, GraphIcon } from "@bitcoin-design/bitcoin-icons-react/filled";
import { LightningIcon, SatoshiV1Icon } from "@bitcoin-design/bitcoin-icons-react/outline";
import LoadingAnimation from "./loadingAnimation";

declare global {
  interface Window {
    nostr: any;
    webln: any;
  }
}

const nostrPrivateKey = generatePrivateKey();
const nostrPublicKey = getPublicKey(nostrPrivateKey);

window.nostr = window.nostr || {
  getPublicKey: () => Promise.resolve(nostrPublicKey),
  signEvent: (event: UnsignedEvent) => {
    return Promise.resolve(finishEvent(event, nostrPrivateKey));
  },
};

export type ZapButtonProps = {
  lnurl: string;
}

export const ZapButton: React.FC<ZapButtonProps> = ({
  lnurl
}) => {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState(false);
  const [amount, setAmount] = useState(0);
  const [ln, setLn] = useState<LightningAddress | null>(null);

  const optionsRef = useRef(null);
  const buttonRef = useRef(null);
  const inputRef = useRef(null);

  const handleInputChange = () => {
    const input = inputRef.current as HTMLInputElement | null;
    if (input) {
      setAmount(parseInt(input.value));
      input.style.width = input.value ? input.value.length + 1 + 'ch' : "6rem";
    }
  };

  useEffect(() => {
    function handleClickOutside(event: any) {
      const button = buttonRef.current as HTMLButtonElement | null;
      if (open && button && !button.contains(event.target)) {
        const options = optionsRef.current as HTMLDivElement | null;
        if (options && !options.contains(event.target)) {
          setOpen(false);
        }
      }
    }
    if (open) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    const lnInstance = new LightningAddress(lnurl);
    async function loadLN() {
      await lnInstance.fetch();
      setLoading(false);
      setLn(lnInstance);
    }
    loadLN()
  }, [lnurl, window.webln]);

  const zap = async (satoshis: number) => {
    if (loading) return;
    setLoading(true);
    const zapArgs = {
      satoshi: satoshis,
      comment: "Zap Button!",
      relays: ["wss://relay.damus.io"]
    };
    try {
      const response = await ln?.zap(zapArgs);
      console.log(response.preimage);
    } catch (error) {
      window.alert("Couldn't zap! Check console for more details.");
      console.log(error);
    }
    setCustom(false);
    setLoading(false);
    setOpen(false);
  }

  return (
    <>
      {/* add a class to say disabled if nwcUrl is null */}
      <div className="group relative flex items-center">
        {!loading && <button className="group-hover:-left-7 left-0 ease-out delay-700 duration-300 absolute p-0.5 bg-gradient-to-tr from-violet-800 to-purple-500 hover:from-violet-900 hover:to-purple-500 rounded-full shadow-md">
          <GraphIcon className="w-4 h-4 text-white" />
        </button>}

        {window.webln && <button onClick={launchModal} className={`group-hover:-bottom-7 bottom-0 left-2.5 ease-out delay-700 duration-300 absolute p-0.5 peer bg-gradient-to-tr from-blue-600 to-blue-400 hover:from-blue-900 hover:to-blue-500 rounded-full shadow-md`}>
          <GearIcon className="w-4 h-4 text-white"/>
        </button>}

        <button ref={buttonRef} className={`z-10 peer bg-gradient-to-tr from-violet-800 to-purple-500 hover:from-violet-900 hover:to-purple-500 rounded-full shadow-md p-1 bg-red-200`} onClick={() => {
          if (!window.webln) {
            launchModal();
            return;
          }
          setOpen(!open);
          setCustom(false);
          setAmount(0);
        }}>
          <Modal />
          {loading ? <LoadingAnimation className="w-8 h-8 text-white" /> : <LightningIcon className="w-8 h-8 text-white"/>}
        </button>

        {
          open ? 
            <div ref={optionsRef} className={`absolute left-10 transition flex gap-2 ml-2`}>
              <button className="flex items-center h-8 px-2 py-0.5 bg-gradient-to-tr from-gray-800 to-gray-600 hover:from-gray-900 hover:to-gray-700 rounded-full shadow-xl text-white" onClick={() => setCustom(true)}>
              {!custom ?
                "Custom"
                :
                <input
                  ref={inputRef}
                  onChange={handleInputChange}
                  type="number"
                  min="0"
                  step="1"
                  placeholder="Enter Amount"
                  className="w-24 px-1 bg-gray-50 border border-gray-300 text-sm rounded-lg block focus:outline-none border-none text-white bg-white/10"
                />
              } <SatoshiV1Icon className="ml-1 w-5 h-5 text-orange-400" />
              </button>
              {custom && <button disabled={!amount} className="shrink-0	w-8 h-8 p-0.5 bg-gradient-to-tr from-gray-800 to-gray-600 hover:from-gray-900 hover:to-gray-700 rounded-full shadow-xl text-white" onClick={() => zap(amount)}>
                <CheckIcon className="mx-auto w-5 h-5 text-orange-400" />
              </button>}
              {!custom && <>
                <button className="flex items-center h-8 px-2 py-0.5 bg-gradient-to-tr from-gray-800 to-gray-600 hover:from-gray-900 hover:to-gray-700 rounded-full shadow-xl text-white" onClick={() => zap(10)}>
                  10 <SatoshiV1Icon className="ml-1 w-5 h-5 text-orange-400" />
                </button>
                <button className="flex items-center h-8 px-2 py-0.5 bg-gradient-to-tr from-gray-800 to-gray-600 hover:from-gray-900 hover:to-gray-700 rounded-full shadow-xl text-white" onClick={() => zap(100)}>
                  100 <SatoshiV1Icon className="ml-1 w-5 h-5 text-orange-400" />
                </button>
                <button className="hidden sm:flex items-center h-8 px-2 py-0.5 bg-gradient-to-tr from-gray-800 to-gray-600 hover:from-gray-900 hover:to-gray-700 rounded-full shadow-xl text-white" onClick={() => zap(1000)}>
                  1000 <SatoshiV1Icon className="ml-1 w-5 h-5 text-orange-400" />
                </button>
              </>}
            </div>
          : null
        }
      </div>
      {/* <button onClick={launchModal} className={`z-10 peer bg-gradient-to-tr from-red-600 to-red-400 rounded-full shadow-md p-2`}>
        <AlertCircleIcon className="w-6 h-6 text-white"/>
      </button> */}
    </>
  )
}
