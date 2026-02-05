const AUTH_USER_KEY = 'news_admin_user'

export function getAuthUser() {
  try {
    const saved = localStorage.getItem(AUTH_USER_KEY)
    if (!saved) return null
    const parsed = JSON.parse(saved)
    return parsed && (parsed.accountName || parsed.accountID) ? parsed : null
  } catch {
    return null
  }
}

export function setAuthUser(user) {
  try {
    if (user) localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
    else localStorage.removeItem(AUTH_USER_KEY)
  } catch (_) {
    localStorage.removeItem(AUTH_USER_KEY)
  }
}

export function clearAuthUser() {
  try {
    localStorage.removeItem(AUTH_USER_KEY)
  } catch (_) {}
}
