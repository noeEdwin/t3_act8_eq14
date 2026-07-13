const DUMMYJSON_BASE_URL = 'https://dummyjson.com'

async function fetchJson(url, options) {
  const response = await fetch(url, options)
  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data?.message || 'Usuario o contraseña incorrectos')
  }

  return data
}

export async function loginUser({ identifier, password }) {
  const trimmedIdentifier = identifier.trim()
  const trimmedPassword = password.trim()

  if (!trimmedIdentifier || !trimmedPassword) {
    throw new Error('Completa usuario y contraseña antes de enviar')
  }

  const authPayload = {
    password: trimmedPassword,
  }

  if (trimmedIdentifier.includes('@')) {
    const usersResponse = await fetchJson(
      `${DUMMYJSON_BASE_URL}/users?limit=250&select=username,email,firstName,lastName,image`,
    )

    const matchedUser = usersResponse.users?.find(
      (user) => user.email?.toLowerCase() === trimmedIdentifier.toLowerCase(),
    )

    if (!matchedUser) {
      throw new Error('Usuario o email incorrectos')
    }

    authPayload.username = matchedUser.username
  } else {
    authPayload.username = trimmedIdentifier
  }

  return fetchJson(`${DUMMYJSON_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authPayload),
  })
}
