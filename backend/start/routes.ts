/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import NotImplementedException from 'App/Exceptions/NotImplementedException'
import User from 'App/Models/User'
import AuthSignInValidator from 'App/Validators/AuthSignInValidator'
import AuthSignUpValidator from 'App/Validators/AuthSignUpValidator'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('/auth', async ({ auth }) => {
  return auth.user
})

Route.post('/auth/sign-in', async ({ request, response, auth }) => {
  const { uid, password, rememberMe } = await request.validate(AuthSignInValidator)
  
  try {
    await auth.attempt(uid, password, rememberMe)
  } catch (_error) {
    return response.status(400).json({ message: 'Email or password is incorrect' })
  }

  return response.json({ message: `Welcome back!` })
})

Route.post('/auth/sign-up', async ({ request, response, auth }) => {
  const data = await request.validate(AuthSignUpValidator)
  
  const user = await User.create(data)
  await auth.login(user)

  return response.json({ message: 'Thanks for joining!' })
})

Route.post('/auth/sign-out', async ({ response, auth }) => {
  await auth.logout()
  return response.json({ message: 'You have been signed out' })
})