
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


  modal.subscribeState((state) => {
    if (!state.open) {
      window.parent.postMessage({ type: 'connect-deplan-modal-close' }, '*');
    }
  });

  modal.subscribeProvider((provider) => {
    window.parent.postMessage({ type: 'adress-update', data: provider.address }, '*');
  });

  setTimeout(() => {
    const wuiCard = getWuiCardElement();
    if (wuiCard) {
      observeConnectModalSize(wuiCard);
    }

  }, 1000);

});