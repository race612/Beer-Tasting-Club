import { supabase } from './supabase-config.js'

console.log("App.js avviato correctly");

// Elementi DOM
const loginSection = document.getElementById('login-section');
const dashboardSection = document.getElementById('dashboard-section');
const loadingSection = document.getElementById('loading');
const userEmailSpan = document.getElementById('user-email');

// --- FUNZIONE PRINCIPALE DI CONTROLLO ---
async function checkUser() {
    try {
        console.log("Controllo sessione...");
        
        // Verifica sessione Supabase
        const { data, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        const session = data.session;
        console.log("Stato sessione:", session ? "Loggato" : "Ospite");

        // Nascondi caricamento
        if (loadingSection) loadingSection.style.display = 'none';

        // Aggiorna UI
        if (session) {
            // Loggato
            if (loginSection) loginSection.style.display = 'none';
            if (dashboardSection) dashboardSection.style.display = 'block';
            
            // Gestione nome utente
            if (userEmailSpan) {
                const nome = session.user.user_metadata.first_name || session.user.email.split('@')[0];
                userEmailSpan.textContent = nome;
            }
        } else {
            // Non loggato
            if (loginSection) loginSection.style.display = 'block';
            if (dashboardSection) dashboardSection.style.display = 'none';
        }

    } catch (err) {
        console.error("ERRORE CRITICO:", err);
        if (loadingSection) {
            loadingSection.innerHTML = `<span style="color:red">Errore nel caricamento: ${err.message}</span>`;
        }
    }
}

// --- GESTIONE EVENT LISTENERS ---
// Usiamo un blocco DOMContentLoaded per essere sicuri che l'HTML sia pronto
document.addEventListener('DOMContentLoaded', () => {
    
    // GESTIONE LOGIN
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const errorMsg = document.getElementById('login-error');
            
            errorMsg.textContent = "Verifica in corso...";
            
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            
            if (error) errorMsg.textContent = "Errore: " + error.message;
            else checkUser(); // Ricarica lo stato UI invece di ricaricare la pagina
        });
    }

    // GESTIONE REGISTRAZIONE
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
            
            const { error } = await supabase.auth.signUp({
                email, password,
                options: { data: { first_name: nome, last_name: cognome } }
            });

            if (error) {
                msgDiv.textContent = "Errore: " + error.message;
                msgDiv.style.color = "red";
            } else {
                msgDiv.textContent = "✅ Controlla la tua email!";
                msgDiv.style.color = "lightgreen";
                signupForm.reset();
            }
        });
    }

    // GESTIONE LOGOUT
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            await supabase.auth.signOut();
            window.location.reload();
        });
    }
});

// Avvia il controllo utente subito
checkUser();