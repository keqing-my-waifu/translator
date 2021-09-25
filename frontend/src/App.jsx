import React, { useEffect, useState } from 'react'
import { Container, Button, Grid, Input, AppBar, Typography, Toolbar, TextField, Menu, List, ListItem, ListItemText, MenuItem, Box } from '@material-ui/core'

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
    maxWidth: '500px'
  },
  Button: {
    marginTop: theme.spacing(1),
    float: 'right'
  },
  gridItem: {
    height: '250px'
  },
  textarea: {
    color: 'rgba(0, 0, 0, 0.87)',
    height: 'auto',
    minHeight: '189px',
    border: '1px #8080807d solid',
    backgroundColor: 'white',
    borderRadius: '5px',
    padding: '18px 14px',
    fontFamily: `Roboto, Helvetica, Arial, sans-serif`
  }
}));

const listInMenu = [
  'en', 'ru', 'az', 'fr', 'de', 'es'
]

function App() {

  const classes = useStyles()
  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(1);
  const [AnchorElMenu1, setAnchorElMenu1] = useState(null)
  const [anchorElMenu2, setAnchorElMenu2] = useState(null)
  const [input1, setInput1] = useState(null)
  const [input2, setInput2] = useState(null)
  const [len1, setLen1] = useState('en')
  const [len2, setLen2] = useState('ru')


  function handleClickListItems(e, anchor) {
    if (anchor) setAnchorElMenu1(e.currentTarget)
    else setAnchorElMenu2(e.currentTarget)
  }

  function handleCloseMenu() {
    setAnchorElMenu1(null)
    setAnchorElMenu2(null)
  }

  function handleClickInMenu(e, anchor) {
    handleCloseMenu();
    let index = listInMenu.indexOf(e.target.outerText)
    if (anchor) {
      setIndex1(index)
      setLen1(listInMenu[index])
    } else {
      setIndex2(index)
      setLen2(listInMenu[index])
    }
  }

  function handleChangeInput(e) {
    setInput1(e.target.value)
  }

  async function handleFetchData(e) {
    console.log(input1)
    const tson = {
      from: len1,
      to: len2,
      text: input1
    }
    let callback;
    try {
      await fetch(`http://localhost:5000/translate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tson)
      })
        .then( async (res) => { 
          callback = await res.json()
        })
    }
    catch (e) {
      console.log(e)
    }
    setInput2(callback.text)
    console.log(callback.text)
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
          <Grid className={classes.gridItem} item sm={6} xs={12}>
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
                        <Grid key={index} item sm={3} xs={4}>
                          <MenuItem onClick={(e) => handleClickInMenu(e, 1)}>
                            {listInMenu[index]}
                          </MenuItem>
                        </Grid>
                      )
                    })
                  }
                </Grid>
              </Menu>
            </div>
            <TextField onChange={handleChangeInput} maxRows={15} minRows={8} multiline={true} id="outlined-basic" label="Введите текст" variant="outlined" className={classes.Inputs} />
          </Grid>
          <Grid item sm={6} xs={12}>
            <div className={classes.flex}>
              <Typography className={classes.Text}>
                Язык:
              </Typography>
              <List className={classes.Ul} component='ul' aria-label='languages list'>
                <ListItem onClick={(e) => handleClickListItems(e, 0)} button aria-haspopup="true" aria-controls="lock-menu2" aria-label="when device is locked">
                  <ListItemText primary={listInMenu[index2]} />
                </ListItem>
              </List>
              <Menu
                id="lock-menu2"
                anchorEl={anchorElMenu2}
                onClose={handleCloseMenu}
                open={Boolean(anchorElMenu2)}
                getContentAnchorEl={null}
              >
                <Grid className={classes.maxWidthGrid} container spacing={3}>
                  {
                    listInMenu.map((option, index) => {
                      return (
                        <Grid key={index} item sm={3} xs={4}>
                          <MenuItem onClick={(e) => handleClickInMenu(e, 0)}>
                            {listInMenu[index]}
                          </MenuItem>
                        </Grid>
                      )
                    })
                  }
                </Grid>
              </Menu>
            </div>
            <div className={classes.textarea}>
              <Typography>
                {input2}
              </Typography>
            </div>
          </Grid>
        </Grid>

        <Button onClick={handleFetchData} className={classes.Button} color='primary' variant='contained' >
          Перевести
        </Button>
      </Container>
    </div>
  )
}

export default App
