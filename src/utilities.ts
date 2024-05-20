export const observeConnectModalSize = (elementToObserve: any) => {
    const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
            const height = entry.target.getClientRects()[0].height;
            const width = entry.target.getClientRects()[0].width;

            const message = {
                type: 'connect-deplan-modal-resize',
                data: {
                    width,
                    height,
                },
            };

            window.parent.postMessage(message, '*');
        }
    });

    resizeObserver.observe(elementToObserve);
}

export const getWuiCardElement = () => {
    const w3mModal = document.querySelector('w3m-modal');

    if (!w3mModal) {
        console.log('w3m-modal not found');
        return;
    }

    const w3mModalShadowRoot = w3mModal.shadowRoot;

    if (!w3mModalShadowRoot) {
        console.log('w3m-modal shadow root not found');
        return;
    }

    const wuiFlex = w3mModalShadowRoot.querySelector('wui-flex');

    if (!wuiFlex) {
        console.log('w3m-router not found');
        return;
    }

    const wuiCard = wuiFlex.querySelector('wui-card');

    if (!wuiCard) {
        console.log('wuiCard not found');
        return;
    }

    return wuiCard

}