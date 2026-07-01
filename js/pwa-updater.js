// js/pwa-updater.js

/**
 * Gestisce la registrazione del Service Worker, 
 * il popup di aggiornamento e il prompt di installazione PWA.
 */
export function initPWA() {
    const updateToast = document.getElementById('update-toast');
    let newWorker;
    
    // Mostra il toast di Update
    const showUpdateUI = (worker) => {
        newWorker = worker;
        if (updateToast) updateToast.classList.add('show');
    };

    const trackInstalling = (worker) => {
        worker.addEventListener('statechange', () => {
            if (worker.state === 'installed' && navigator.serviceWorker.controller) {
                showUpdateUI(worker);
            }
        });
    };
    
    // Registra Service Worker
    if ('serviceWorker' in navigator) {
        // Determina il prefisso corretto della cartella radice per sw.js
        let baseDir = '/';
        if (window.location.pathname.includes('/Beer-Tasting-Club/')) {
            baseDir = '/Beer-Tasting-Club/';
        }
        const swUrl = baseDir + 'sw.js';

        navigator.serviceWorker.register(swUrl).then(reg => {
            if (reg.waiting) showUpdateUI(reg.waiting);
            else if (reg.installing) trackInstalling(reg.installing);

            reg.addEventListener('updatefound', () => {
                trackInstalling(reg.installing);
            });
        }).catch(error => {
            console.error('SW Registration Failed:', error);
        });

        // Ricarica la pagina quando il nuovo SW prende il controllo
        let refreshing = false;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (refreshing) return;
            refreshing = true;
            window.location.reload();
        });
    }
    
    if (updateToast) {
        updateToast.addEventListener('click', () => {
            if (newWorker) {
                newWorker.postMessage({ type: 'SKIP_WAITING' });
            } else {
                window.location.reload();
            }
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
