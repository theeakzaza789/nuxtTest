const DUMMY_USER = {
  id: 1,
  username: 'demo' || '' || 'admin',
  password: 'demo' || '' || 'admin',
  prefix: 'demo' || '' || 'admin',
  twofactor: 'demo' || '' || 'admin',
  name: 'admin',
  email: 'admin@example.com',
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (body.username !== DUMMY_USER.username
    || body.password !== DUMMY_USER.password
    || body.prefix !== DUMMY_USER.prefix
    || body.twofactor !== DUMMY_USER.twofactor
  ) {
    setResponseStatus(event, 401, 'Unauthenticated')
    return {
      error: 'Unauthenticated',
    }
  }

  return {
    token: `dummy-token-${DUMMY_USER.id}`,
    user: DUMMY_USER,
  }
})
