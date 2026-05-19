/*
  Auth0 setup for the static Netlify site.

  Auth0 Application settings should include:
  - Allowed Callback URLs: https://annuschabotes.netlify.app/user.html
  - Allowed Logout URLs: https://annuschabotes.netlify.app/login.html
  - Allowed Web Origins: https://annuschabotes.netlify.app

  The domain and clientId below are public SPA identifiers, not secret keys.
  Do not place API secrets, client secrets, or database credentials in frontend code.
  Auth0 Universal Login creates and signs in accounts securely; this site does not
  create accounts manually and never stores passwords.
*/
const annuschaAuthReturnUrl = "https://annuschabotes.netlify.app/user.html";
const annuschaAuthLoginUrl = "https://annuschabotes.netlify.app/login.html";

const annuschaAuth0Config = {
  domain: "dev-epxoqx07iasvp8mm.au.auth0.com",
  clientId: "oxWbtB1ZM7YKtfoAFq1IaPm5eTNGtFsd",
  cacheLocation: "memory",
  useRefreshTokens: false,
  authorizationParams: {
    redirect_uri: annuschaAuthReturnUrl
  }
};

let annuschaAuth0Client = null;

function authTargetUrl() {
  const params = new URLSearchParams(window.location.search);
  const next = params.get("next");
  return next && next.endsWith(".html") ? next : "user.html";
}

function setAuthStatus(message) {
  const status = document.querySelector("[data-auth-status]");
  if (status) status.textContent = message;
}

function updateAuthProfile(user) {
  if (!user) return;
  const displayName = user.name || user.nickname || user.email || "Reader";
  const email = user.email || "Email hidden by provider";
  const avatar = user.picture || "assets/ideas/new Author image.webp";

  document.querySelectorAll("#readerDisplayName, [data-auth-name], #navReaderName").forEach((node) => {
    node.textContent = displayName;
  });
  document.querySelectorAll("#readerEmail, [data-auth-email]").forEach((node) => {
    node.textContent = email;
  });
  document.querySelectorAll("#readerAvatar, #navReaderAvatar").forEach((img) => {
    if (img instanceof HTMLImageElement) img.src = avatar;
  });
}

async function loginWithAuth0(options = {}) {
  if (!annuschaAuth0Client) return;
  await annuschaAuth0Client.loginWithRedirect({
    appState: { targetUrl: "user.html" },
    authorizationParams: {
      redirect_uri: annuschaAuthReturnUrl,
      ...(options.authorizationParams || {})
    }
  });
}

async function signupWithAuth0() {
  await loginWithAuth0({
    authorizationParams: {
      screen_hint: "signup"
    }
  });
}

async function logoutWithAuth0() {
  if (!annuschaAuth0Client) return;
  await annuschaAuth0Client.logout({
    logoutParams: {
      returnTo: annuschaAuthLoginUrl
    }
  });
}

function wireAuthButtons() {
  const loginForm = document.querySelector("[data-reader-login]");
  const loginBtn = document.getElementById("loginBtn");
  const createBtn = document.getElementById("createAccountBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      loginWithAuth0();
    });
  }

  if (loginBtn && !loginForm) loginBtn.addEventListener("click", () => loginWithAuth0());

  if (createBtn) createBtn.addEventListener("click", signupWithAuth0);
  if (logoutBtn) logoutBtn.addEventListener("click", logoutWithAuth0);
}

async function initAnnuschaAuth0() {
  wireAuthButtons();

  if (!window.auth0?.createAuth0Client) {
    setAuthStatus("Auth0 could not load. Check the CDN script and internet connection.");
    if (document.body.matches("[data-auth-required='reader']")) {
      const currentPage = window.location.pathname.split("/").pop() || "user.html";
      window.location.replace(`login.html?next=${encodeURIComponent(currentPage)}`);
      return;
    }
    document.documentElement.classList.remove("auth-pending");
    return;
  }

  try {
    annuschaAuth0Client = await window.auth0.createAuth0Client(annuschaAuth0Config);

    const params = new URLSearchParams(window.location.search);
    if (params.has("code") && params.has("state")) {
      const result = await annuschaAuth0Client.handleRedirectCallback();
      const targetUrl = result?.appState?.targetUrl || "user.html";
      window.history.replaceState({}, document.title, window.location.pathname);
      if (!window.location.pathname.endsWith(targetUrl)) {
        window.location.replace(targetUrl);
        return;
      }
    }

    const isAuthenticated = await annuschaAuth0Client.isAuthenticated();
    const user = isAuthenticated ? await annuschaAuth0Client.getUser() : null;
    window.ANNUSCHA_AUTH_SESSION = {
      isAuthenticated,
      user,
      client: annuschaAuth0Client
    };

    if (isAuthenticated) {
      document.documentElement.classList.add("reader-authenticated");
      updateAuthProfile(user);
      if (document.body.classList.contains("login-page")) {
        window.location.replace(authTargetUrl());
        return;
      }
    }

    if (!isAuthenticated && document.body.matches("[data-auth-required='reader']")) {
      const currentPage = window.location.pathname.split("/").pop() || "user.html";
      window.location.replace(`login.html?next=${encodeURIComponent(currentPage)}`);
      return;
    }
  } catch (error) {
    console.error("Auth0 authentication failed.", error);
    setAuthStatus("Sign-in could not be completed. Please try again.");
    if (document.body.matches("[data-auth-required='reader']")) {
      const currentPage = window.location.pathname.split("/").pop() || "user.html";
      window.location.replace(`login.html?next=${encodeURIComponent(currentPage)}`);
      return;
    }
  } finally {
    document.documentElement.classList.remove("auth-pending");
  }
}

document.addEventListener("DOMContentLoaded", initAnnuschaAuth0);
