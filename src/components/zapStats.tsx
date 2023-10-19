import { useSubscribe } from 'nostr-hooks';
import LoadingAnimation from './loadingAnimation';

const stringToColour = (str: string) => {
  let hash = 0;
  str.split('').forEach(char => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash)
  })
  let colour = '#'
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    colour += value.toString(16).padStart(2, '0')
  }
  return colour
}

const ZapStats: React.FC<{pubkey: string | undefined, setStats: any}> = ({pubkey, setStats}) => {
  if (!pubkey) return;

  const { events, eose } = useSubscribe({
    relays: ['wss://relay.damus.io'],
    filters: [{ "#p": [pubkey], kinds: [9735] }],
  });

  if (!events && !eose) return <p>Loading...</p>;

  let zapStats = events.map((event) => {
    const description = event.tags.find(tag => tag[0] === "description");
    if (!description) return;
    const info = JSON.parse(description[1])
    const amount = info.tags.find((tag: string[]) => tag[0] === "amount");
    console.log(amount)
    const amountInSats = amount ? parseInt(amount[1])/1000 : 0;
    return {
      id: event.id,
      pubkey: info.pubkey,
      amount: amountInSats
    }
  })

  zapStats = zapStats.filter(stat => (stat && stat.amount))
  const totalAmount = zapStats.reduce((total, obj) => (obj ? total + obj.amount : 0), 0);

  return (
    <div className="flex fixed inset-0 items-center justify-center z-50" id="pairing-details">
      <div onClick={() => setStats(false)} className="fixed inset-0 bg-gray-900 opacity-50"></div>
      <div className="bg-white p-4 w-[700px] min-h-[10rem] max-h-80 overflow-y-scroll lg:px-6 rounded-lg shadow relative">
        <h1 className="font-bold mb-2">Zap Stats: {totalAmount} sats</h1>
        <hr/>
        <ul>
          {zapStats && zapStats.map((stat) => {
            if (!stat) return;
            return (
              <li key={stat.id} className="flex items-center p-2">
                <div className="w-10 h-10 rounded-full" style={{backgroundColor: stringToColour(stat.pubkey)}}></div>
                <div className="ml-2">
                  <p className="text-sm font-bold">{stat.pubkey}</p>
                  <p className="text-sm">{stat.amount} sats</p>
                </div>
              </li>
              )
          })}
          {!eose && <div className="w-full mt-4">
            <LoadingAnimation className="mx-auto w-10 h-10 text-blue" />
          </div>}
        </ul>
      </div>
    </div>
  );
};

export default ZapStats;
