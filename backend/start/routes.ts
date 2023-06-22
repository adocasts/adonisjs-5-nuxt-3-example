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
import AuthSignInValidator from 'App/Validators/AuthSignInValidator'
import AuthSignUpValidator from 'App/Validators/AuthSignUpValidator'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('/auth', async () => {
  throw new NotImplementedException('GET /auth has not been implemented')
})

Route.post('/auth/sign-in', async ({ request, response }) => {
  const { uid, password, rememberMe } = await request.validate(AuthSignInValidator)
  
  throw new NotImplementedException('POST /auth/sign-in has not been implemented')

  return response.json({ message: `Welcome back!` })
})

Route.post('/auth/sign-up', async ({ request, response }) => {
  const data = await request.validate(AuthSignUpValidator)
  
  throw new NotImplementedException('POST /auth/sign-up has not been implemented')

  return response.json({ message: 'Thanks for joining!' })
})

Route.post('/auth/sign-out', async ({ response }) => {
  throw new NotImplementedException('POST /auth/sign-out has not been implemented')

  return response.json({ message: 'You have been signed out' })
})