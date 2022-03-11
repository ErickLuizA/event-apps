import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import NewEpisode from './pages/NewEpisode'

function Routes () {
  return (
    <Switch>
      <Route path='/' component={Home} exact />
      <Route path='/newepisode' component={NewEpisode} />
    </Switch>
  )
}

export default Routes
