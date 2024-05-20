
import { solana } from '@web3modal/solana/chains'
import { createWeb3Modal, defaultSolanaConfig } from '@web3modal/solana';

import { getWuiCardElement, observeConnectModalSize } from './utilities';
import deplanWalletConfig from './deplan-wallet-config';

const projectId = import.meta.env.VITE_PROJECT_ID as string;

const metadata = {
  name: 'Web3Modal',
  description: 'Deplan Wallet Integration',
  url: 'https://airdrop.deplan.xyz',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [solana];
export const solanaConfig = defaultSolanaConfig({
  projectId,
  chains,
  metadata,
})

const modal = createWeb3Modal({
  projectId,
  solanaConfig,
  chains,
  includeWalletIds: [],
  customWallets: [
    deplanWalletConfig,
  ],
  allWallets: 'HIDE',
})


document.addEventListener('DOMContentLoaded', () => {
  modal.open();

  modal.subscribeEvents((event) => {
    console.log('event', event.data.event);

    let observer: ResizeObserver | undefined;
    switch (event.data.event) {
      case 'MODAL_OPEN':
        setTimeout(() => {
          observer = subscribeForModalZise();
        }, 300);
        break;
      case 'MODAL_CLOSE':
        window.parent.postMessage({ type: 'connect-deplan-modal-close' }, '*');
        observer?.disconnect();
        break;
      default:
        break;
    }
  });

  modal.subscribeProvider((provider) => {
    window.parent.postMessage({ type: 'adress-update', data: provider.address }, '*');
  });

  window.addEventListener('message', (event) => {
    switch (event.data.type) {
      case 'connect-deplan-wallet':
        modal.open();
        break;
      case 'connect-deplan-modal-open':
        modal.open();
        break;
      case 'connect-deplan-modal-close':
        modal.close();
        break;
      default:
        break;
    }
  });
});

const subscribeForModalZise = () => {
  const wuiCard = getWuiCardElement();
  if (wuiCard) {
    return observeConnectModalSize(wuiCard);
  }
}