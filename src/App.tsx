import './App.css';
import { TonConnectButton } from '@tonconnect/ui-react';
import { useMainContract } from "../hooks/useMainContract.ts";
import { useTonConnect } from '../hooks/useTonConnect.ts';
import { fromNano } from 'ton-core';
import WebApp from '@twa-dev/sdk'



//EQCIEb0J091XtjNjXuq-vFe7I0EtZZAG0CQN-ifVDmVZnwk1

function App() {
  const {
    contract_address,
    counter_value,
   // recent_sender,
   // owner_address,
    contract_balance,
    sendIncrement,
    sendDeposit,
    sendWithdrowalRequest,
  } = useMainContract();

  const { connected } = useTonConnect();

  const showAlert = ()  => {
    WebApp.showAlert('Hey there!');
  }

  return (
    <div>
      <div>
        <TonConnectButton />
      </div>
      <div>
        <div className='Card'>
          <b>{WebApp.platform}</b>
          <b>Our contract Address</b>
          <div className='Hint'>{contract_address?.slice(0, 30) + "..."}</div>
          <b>Our contract Balance</b>
          {contract_balance && (
            <div className='Hint'>{fromNano(contract_balance)}</div>
          )}

        </div>

        <div className='Card'>
          <b>Counter Value</b>
          <div>{counter_value ?? "Loading..."}</div>
        </div>

        {connected && (
          <a
            onClick={() => {
              showAlert();
            }}
          >
            Show Alert
          </a>
        )}
        <br></br>

        {connected && (
          <a
            onClick={() => {
              sendIncrement();
            }}
          >
            Increment
          </a>
        )}
        <br></br>
          {connected && (
            <a
              onClick={() => {
                sendDeposit();
              }}
            >
              Request deposit of 1 TON
            </a>
          )}
          <br></br>

          {connected && (
            <a
              onClick={() => {
                sendWithdrowalRequest();
              }}
            >
              Request of 0.07 TON Withdrowal Request
            </a>
          )}
      </div>
    </div>
  );
}

export default App
