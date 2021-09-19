import React, { useState } from 'react'
import { Container, Button, Grid, Input, AppBar, Typography, Toolbar, TextField, Menu, List, ListItem, ListItemText, MenuItem } from '@material-ui/core'

import { makeStyles, alpha } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  Inputs: {
    width: '100%',
    backgroundColor: 'white',
    height: 'auto'
  },
  container: {
    paddingTop: '1em'
  },
  flex: {
    display: 'flex'
  },
  Text: {
    margin: 'auto 0 auto 0'
  },
  Ul: {
    padding: '0'
  },
  maxWidthGrid: {
    maxWidth: '500px',
    maxHeight: '400px'
  }
}));

const listInMenu = [
  'EN', 'RU', 'AL', 'DZ', 'AM', 'AU', 'AT', 'AZ', 'BY', 'BR', 'CN', 'FR', 'DE', 'ES', 'UA',
]

function App() {

  const classes = useStyles()
  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(1);
  const [AnchorElMenu1, setAnchorElMenu1] = useState(null)
  const [anchorElMenu2, setAnchorElMenu2] = useState(null)

  function handleClickListItems(e, anchor) {
    if(anchor) setAnchorElMenu1(e.currentTarget)
    else setAnchorElMenu2(e.currentTarget)
  }

  function handleCloseMenu() {
    setAnchorElMenu1(null)
    setAnchorElMenu2(null)
  }

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6'>
            Translator
          </Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.container}>
        <Grid spacing={3} container>
          <Grid item xs={6}>
            <div className={classes.flex}>
              <Typography className={classes.Text}>
                Язык:
              </Typography>
              <List className={classes.Ul} aria-label='languages list'>
                <ListItem onClick={(e) => handleClickListItems(e, 1)} aria-haspopup="true" aria-controls="lock-menu" aria-label="when device is locked">
                  <ListItemText primary={listInMenu[index1]} />
                </ListItem>
              </List>
              <Menu 
                id="lock-menu"
                anchorEl={AnchorElMenu1}
                onClose={handleCloseMenu}
                open={Boolean(AnchorElMenu1)}
                getContentAnchorEl={null}
              >
                <Grid className={classes.maxWidthGrid} container spacing={3}>
                  {
                    listInMenu.map((option, index) => {
                      return (
                        <Grid item xs={3}>
                          <MenuItem key={index}>
                            {listInMenu[index]}
                          </MenuItem>
                        </Grid>
                      )
                    })
                  }
                </Grid>
              </Menu>
            </div>
            <TextField maxRows={15} minRows={8} multiline={true} id="outlined-basic" label="Введите текст" variant="outlined" className={classes.Inputs} />
          </Grid>
          <Grid item xs={6}>
            <div className={classes.flex}>
              <Typography className={classes.Text}>
                Язык:
              </Typography>
              <List className={classes.Ul} component='ul' aria-label='languages list'>
                <ListItem onClick={(e) => handleClickListItems(e, 0)} button aria-haspopup="true" aria-controls="lock-menu" aria-label="when device is locked">
                  <ListItemText primary={listInMenu[index1]} />
                </ListItem>
              </List>
              <Menu
                id="lock-menu"
                anchorEl={anchorElMenu2}
                onClose={handleCloseMenu}
                open={Boolean(anchorElMenu2)}
                getContentAnchorEl={null}
              >
                <Grid className={classes.maxWidthGrid} container spacing={3}>
                  {
                    listInMenu.map((option, index) => {
                      return (
                        <Grid item xs={3}>
                          <MenuItem key={index}>
                            {listInMenu[index]}
                          </MenuItem>
                        </Grid>
                      )
                    })
                  }
                </Grid>
              </Menu>
            </div>
            <TextField maxRows={15} minRows={8} multiline={true} id="outlined-basic" label="Введите текст" variant="outlined" className={classes.Inputs} />
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default App
