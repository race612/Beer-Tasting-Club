// Funzione interna per creare l'HTML
function createModalHTML(title, message, type, icon) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    // Icona default in base al tipo
    let iconName = icon || (type === 'confirm' ? 'help' : 'info');
    let iconColor = type === 'error' ? '#ef4444' : (type === 'success' ? '#10b981' : '#f59e0b');

    overlay.innerHTML = `
        <div class="modal-box">
            <span class="material-symbols-outlined modal-icon" style="color: ${iconColor}">${iconName}</span>
            <h3 class="modal-title">${title}</h3>
            <p class="modal-text">${message}</p>
            <div class="modal-actions">
                ${type === 'confirm' ? `<button class="modal-btn secondary" id="modal-cancel">Annulla</button>` : ''}
                <button class="modal-btn primary" id="modal-ok">OK</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
    // Forziamo un reflow per l'animazione
    requestAnimationFrame(() => overlay.classList.add('open'));

    return overlay;
}

// Funzione principale (ritorna una Promise)
export function showModal(title, message, type = 'alert', icon = null) {
    return new Promise((resolve) => {
        const overlay = createModalHTML(title, message, type, icon);
        const btnOk = overlay.querySelector('#modal-ok');
        const btnCancel = overlay.querySelector('#modal-cancel');

        function close(result) {
            overlay.classList.remove('open');
            setTimeout(() => overlay.remove(), 200); // Rimuovi dopo animazione
            resolve(result);
        }

        btnOk.addEventListener('click', () => close(true));
        if (btnCancel) btnCancel.addEventListener('click', () => close(false));
    });
}