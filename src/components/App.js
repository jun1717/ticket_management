import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Dashboard from './dashboard/'
import TodoComponent from './todos/'
import NoMatch from './NoMatch'
import Header from './header/'
import Notice from './Notice'

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
})

const App = ({ classes }) => (
  <BrowserRouter>
    <div>
      <CssBaseline />
      <Header />
      <div className={classes.toolbar} />
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/users/:uid/todos" component={TodoComponent} />
        <Route component={NoMatch} />
      </Switch>
      <Notice />
    </div>
  </BrowserRouter>
)

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App)