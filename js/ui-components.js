// js/ui-components.js

import { showModal } from './modal.js';

export let isFormDirty = false;

export function setFormDirty(value = true) {
    isFormDirty = value;
}

/**
 * Gestisce l'apertura singola degli accordion (uno si apre, l'altro si chiude) 
 * e la logica associata alle schede degustazione.
 */
export function initAccordions() {
    const accordions = document.querySelectorAll('details.section-accordion');
    accordions.forEach(acc => {
        acc.addEventListener('toggle', (e) => {
            if (acc.open) {
                accordions.forEach(other => {
                    if (other !== acc && other.open) other.removeAttribute('open');
                });
            }
        });
    });
}

/**
 * Gestisce i pulsanti "Chip" (multi e single selection).
 */
export function initChips() {
    document.querySelectorAll('.chips-grid').forEach(container => {
        container.querySelectorAll('.chip-btn').forEach(chip => {
            chip.addEventListener('click', () => {
                if (chip.classList.contains('disabled')) return;
                
                // Toggle logica
                if (chip.classList.contains('selected')) {
                    chip.classList.remove('selected');
                } else {
                    container.querySelectorAll('.chip-btn').forEach(c => c.classList.remove('selected'));
                    chip.classList.add('selected');
                }
                setFormDirty(true);
            });
        });
    });
}

export function getChipValue(groupId) {
    const el = document.getElementById(groupId)?.querySelector('.chip-btn.selected');
    return el ? el.getAttribute('data-value') : null;
}

export function setChipValue(groupId, val) {
    const el = document.querySelector(`#${groupId} .chip-btn[data-value="${val}"]`);
    if (el) el.classList.add('selected');
}

/**
 * Inizializza l'avviso anti-uscita involontaria.
 */
export function initDirtyCheck(backLinkId, originalHref) {
    const backBtn = document.getElementById(backLinkId);
    if(backBtn) {
        backBtn.addEventListener('click', async (e) => {
            if (isFormDirty) {
                e.preventDefault();
                const proceed = await showModal("Attenzione", "Stai per uscire senza salvare. Vuoi davvero procedere? I dati andranno persi.", "confirm");
                if (proceed) {
                    setFormDirty(false);
                    window.location.href = originalHref || '../nuova-scheda.html';
                }
            }
        });
    }

    window.addEventListener('beforeunload', (e) => { 
        if (isFormDirty) { 
            e.preventDefault(); 
            e.returnValue = ''; 
        } 
    });
}
