import { supabase } from './supabase-config.js'

console.log("App.js avviato correttamente");

// --- 1. FUNZIONE PRINCIPALE DI CONTROLLO UTENTE ---
// Verifica se l'utente è loggato ogni volta che la pagina si carica
async function checkUser() {
    try {
        console.log("Controllo sessione...");
        
        // Chiediamo a Supabase se c'è un utente attivo
        const { data, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        const session = data.session;
        console.log("Stato sessione:", session ? "Loggato" : "Ospite");

        // Nascondiamo la scritta "Caricamento..."
        const loadingSection = document.getElementById('loading');
        if (loadingSection) loadingSection.style.display = 'none';

        // Elementi dell'interfaccia
        const loginSection = document.getElementById('login-section');
        const dashboardSection = document.getElementById('dashboard-section');
        const userEmailSpan = document.getElementById('user-email');

        // Aggiorniamo la pagina in base allo stato
        if (session) {
            // --- UTENTE LOGGATO ---
            if (loginSection) loginSection.style.display = 'none';
            if (dashboardSection) dashboardSection.style.display = 'block';
            
            // Cerchiamo di mostrare il Nome, altrimenti l'Email
            if (userEmailSpan) {
                const nome = session.user.user_metadata.first_name || session.user.email.split('@')[0];
                userEmailSpan.textContent = nome;
            }
        } else {
            // --- UTENTE OSPITE (Non loggato) ---
            if (loginSection) loginSection.style.display = 'block';
            if (dashboardSection) dashboardSection.style.display = 'none';
        }

    } catch (err) {
        console.error("ERRORE CRITICO:", err);
        const loadingSection = document.getElementById('loading');
        if (loadingSection) {
            loadingSection.innerHTML = `<span style="color:red">Errore di connessione: ${err.message}</span>`;
        }
    }
}

// --- 2. GESTIONE DEI PULSANTI E FORM ---
// Usiamo DOMContentLoaded per essere sicuri che la pagina sia pronta
document.addEventListener('DOMContentLoaded', () => {
    
    // --- A. GESTIONE LOGIN (Pagina index.html) ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const errorMsg = document.getElementById('login-error');
            
            errorMsg.textContent = "Verifica in corso...";
            
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            
            if (error) {
                errorMsg.textContent = "Errore: " + error.message;
            } else {
                // Se login ok, ricarichiamo la pagina per aggiornare la vista
                window.location.reload(); 
            }
        });
    }

    // --- B. GESTIONE REGISTRAZIONE (Pagina registrati.html) ---
    const signupForm = document.getElementById('signup-form');
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
            
            // IL FIX IMPORTANTE E' QUI SOTTO (emailRedirectTo)
            const { error } = await supabase.auth.signUp({
                email, 
                password,
                options: { 
                    data: { first_name: nome, last_name: cognome },
                    // Questo forza il link nella mail a puntare al tuo sito corretto
                    emailRedirectTo: 'https://race612.github.io/HBL-Tasting/index.html'
                }
            });

            if (error) {
                msgDiv.textContent = "Errore: " + error.message;
                msgDiv.style.color = "red";
            } else {
                msgDiv.textContent = "✅ Successo! Controlla la tua email per confermare.";
                msgDiv.style.color = "#00ff00"; // Verde acceso
                signupForm.reset();
            }
        });
    }

    // --- C. GESTIONE LOGOUT ---
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            await supabase.auth.signOut();
            window.location.reload();
        });
    }

    // --- D. RECUPERO PASSWORD (Link 'Password dimenticata?') ---
    const forgotPwdLink = document.getElementById('forgot-password-link');
    if (forgotPwdLink) {
        forgotPwdLink.addEventListener('click', async (e) => {
            e.preventDefault();
            const email = prompt("Inserisci la tua email per reimpostare la password:");
            if (!email) return;

            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: 'https://race612.github.io/HBL-Tasting/index.html',
            });

            if (error) alert("Errore: " + error.message);
            else alert("Ti abbiamo inviato una mail per reimpostare la password!");
        });
    }

    // --- E. RINVIA EMAIL DI CONFERMA ---
    const resendBtn = document.getElementById('resend-btn');
    if (resendBtn) {
        resendBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const email = document.getElementById('reg-email').value;
            if (!email) {
                alert("Inserisci prima la tua email nel campo sopra.");
                return;
            }

            const { error } = await supabase.auth.resend({
                type: 'signup',
                email: email,
                options: {
                    emailRedirectTo: 'https://race612.github.io/HBL-Tasting/index.html'
                }
            });

            if (error) alert("Errore: " + error.message);
            else alert("Email di conferma rinviata! Controlla anche nello Spam.");
        });
    }
});

// Avvia il controllo utente non appena il file viene caricato
checkUser();