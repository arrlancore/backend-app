'use strict'

import aclStore from '../helper/acl-store'
import auth from './auth'
import authApi from '../api/auth/routes'
import packageJson from '../../package.json'

const API = '/api'

export default app => {
  const { acl } = aclStore

  /**
   * Public
   */
  app.get(API, async (req, res) => {
    await setTimeout(async () => {
      res.json({ version: await packageJson.version })
    }, 100)
  })

  app.use(API, authApi())

  /**
   * Private
   */
  // applies passport authentication on all following routes
  app.all('*', auth.authenticate(), (req, res, next) => next())

  // Example endpoint only available for 'admin' role
  app.get(`${API}/adminonly`, acl.middleware(), (req, res) => res.sendStatus(200))

  // Example protected endpoint
  app.get(`${API}/protected`, (req, res) => res.sendStatus(200))

  // Will return error message as a string -> "Insufficient permissions to access resource"
  app.use(acl.middleware.errorHandler('json'))
}
