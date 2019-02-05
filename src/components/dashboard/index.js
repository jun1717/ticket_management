import React from 'react'
import RecentUpdatedTodos from './recentUpdatedTodos/'
import propTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 5,
  },
  content: {
    maxWidth: 800,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
})

const Dashboard = ({ classes }) => (
  <div className={classes.root}>
    <div className={classes.content}>
      <RecentUpdatedTodos />
    </div>
  </div>
)

Dashboard.propTypes = {
  classes: propTypes.object.isRequired,
}

export default withStyles(styles)(Dashboard)