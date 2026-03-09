// js/pwa-updater.js

/**
 * Gestisce la registrazione del Service Worker, 
 * il popup di aggiornamento e il prompt di installazione PWA.
 */
export function initPWA() {
    const updateToast = document.getElementById('update-toast');
    
    // Mostra il toast di Update
    const showUpdateUI = () => {
        if (updateToast) updateToast.classList.add('show');
    };

    const trackInstalling = (worker) => {
        worker.addEventListener('statechange', () => {
            if (worker.state === 'installed' && navigator.serviceWorker.controller) {
                showUpdateUI();
            }
        });
    };
    
    // Registra Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/Beer-Tasting-Club/sw.js').then(reg => {
            if (reg.waiting) showUpdateUI();
            else if (reg.installing) trackInstalling(reg.installing);

            reg.addEventListener('updatefound', () => {
                trackInstalling(reg.installing);
            });
        }).catch(error => {
            console.error('SW Registration Failed:', error);
        });
    }
    
    if (updateToast) {
        updateToast.addEventListener('click', () => {
            window.location.reload();
        });
    }

    // PWA Install Prompt Logic
    let deferredPrompt;
    const pwaToast = document.getElementById('pwa-toast');
    const installTrigger = document.getElementById('pwa-install-trigger');
    const closeBtn = document.getElementById('pwa-close-btn');

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        const isDismissed = localStorage.getItem('btc_pwa_dismissed');
        if (pwaToast && !isDismissed && !window.matchMedia('(display-mode: standalone)').matches) {
            pwaToast.classList.add('show');
        }
    });

    if (installTrigger) {
        installTrigger.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                await deferredPrompt.userChoice;
                deferredPrompt = null;
                pwaToast.classList.remove('show');
            }
        });
    }

    if (closeBtn && pwaToast) {
        closeBtn.addEventListener('click', () => {
            pwaToast.classList.remove('show');
            localStorage.setItem('btc_pwa_dismissed', 'true');
        });
    }
}
