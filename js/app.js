// js/app.js
import { supabase } from './supabase-config.js'

// Elementi del DOM
const loginSection = document.getElementById('login-section');
const dashboardSection = document.getElementById('dashboard-section');
const loadingSection = document.getElementById('loading');
const userEmailSpan = document.getElementById('user-email');

// 1. Controlla se l'utente è già loggato all'avvio
async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession();
    updateUI(session);
}

// 2. Aggiorna l'interfaccia
function updateUI(session) {
    loadingSection.style.display = 'none';
    if (session) {
        loginSection.style.display = 'none';
        dashboardSection.style.display = 'block';
        userEmailSpan.textContent = session.user.email.split('@')[0]; // Prende il nome prima della @
    } else {
        loginSection.style.display = 'block';
        dashboardSection.style.display = 'none';
    }
}

// 3. Gestione Login
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('login-error');

    errorMsg.textContent = "Accesso in corso...";
    
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })

    if (error) {
        errorMsg.textContent = "Errore: " + error.message;
    } else {
        errorMsg.textContent = "";
        updateUI(data.session);
    }
});

// 4. Gestione Registrazione (Semplice per test)
document.getElementById('signup-btn').addEventListener('click', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if(!email || !password) { alert("Inserisci email e password nel form per registrarti"); return; }

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    })
    
    if (error) alert("Errore: " + error.message);
    else alert("Controlla la tua email per confermare la registrazione!");
});

// 5. Gestione Logout
document.getElementById('logout-btn').addEventListener('click', async () => {
    await supabase.auth.signOut();
    updateUI(null);
});

// Avvia controllo
checkUser();