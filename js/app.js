import { supabase } from './supabase-config.js'

// Elementi DOM (Selettori sicuri: se non esistono nella pagina, non danno errore)
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const forgotPwdLink = document.getElementById('forgot-password-link');
const resendBtn = document.getElementById('resend-btn');

// --- 1. GESTIONE REGISTRAZIONE (Solo su pagina registrati.html) ---
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nome = document.getElementById('reg-nome').value;
        const cognome = document.getElementById('reg-cognome').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;
        const msgDiv = document.getElementById('signup-message');

        msgDiv.textContent = "Registrazione in corso...";
        msgDiv.style.color = "yellow";

        // SignUp con MetaDati (Nome e Cognome)
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    first_name: nome,
                    last_name: cognome
                }
            }
        });

        if (error) {
            msgDiv.textContent = "Errore: " + error.message;
            msgDiv.style.color = "red";
        } else {
            msgDiv.textContent = "✅ Successo! Controlla la tua email per confermare.";
            msgDiv.style.color = "#00ff00";
            signupForm.reset();
        }
    });
}

// --- 2. GESTIONE LOGIN (Solo su index.html) ---
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorMsg = document.getElementById('login-error');

        errorMsg.textContent = "Verifica...";
        
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            errorMsg.textContent = "Errore: " + error.message;
        } else {
            window.location.reload(); // Ricarica per mostrare la dashboard
        }
    });
}

// --- 3. RECUPERO PASSWORD ---
if (forgotPwdLink) {
    forgotPwdLink.addEventListener('click', async (e) => {
        e.preventDefault();
        const email = prompt("Inserisci la tua email per reimpostare la password:");
        if (!email) return;

        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'https://race612.github.io/HBL-Tasting/index.html', // IMPORTANTE: Metti il tuo URL
        });

        if (error) alert("Errore: " + error.message);
        else alert("Ti abbiamo inviato una mail per reimpostare la password!");
    });
}

// --- 4. RINVIA EMAIL CONFERMA ---
if (resendBtn) {
    resendBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const email = document.getElementById('reg-email').value;
        if (!email) {
            alert("Inserisci prima la tua email nel campo sopra.");
            return;
        }

        const { data, error } = await supabase.auth.resend({
            type: 'signup',
            email: email,
        });

        if (error) alert("Errore: " + error.message);
        else alert("Email di conferma rinviata! Controlla anche nello Spam.");
    });
}

// --- LOGICA DI CONTROLLO UTENTE (Comune) ---
async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession();
    
    // Se siamo in index.html e abbiamo gli elementi dashboard
    const loginSec = document.getElementById('login-section');
    const dashSec = document.getElementById('dashboard-section');
    const loadSec = document.getElementById('loading');
    const userSpan = document.getElementById('user-email');

    if (loadSec) loadSec.style.display = 'none';

    if (session) {
        // Utente loggato
        if (loginSec) loginSec.style.display = 'none';
        if (dashSec) dashSec.style.display = 'block';
        if (userSpan) {
            // Cerchiamo di prendere il nome dai metadati, se no usiamo l'email
            const nome = session.user.user_metadata.first_name || session.user.email;
            userSpan.textContent = nome;
        }
    } else {
        // Utente sloggato
        if (loginSec) loginSec.style.display = 'block';
        if (dashSec) dashSec.style.display = 'none';
    }
}

// Avvia controllo (esegue solo se siamo in una pagina che lo richiede)
checkUser();

// Gestione Logout
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        await supabase.auth.signOut();
        window.location.reload();
    });
}