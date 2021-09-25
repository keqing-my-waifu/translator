const Router = require('express');
const router = new Router();
const translate = require('translate-google')

router.post('/translate', async (req, res) => {
    try {
        const {from, to, text} = req.body;
        console.log(req.body)
        let newText = ''
        await translate({text}, {to: to, except:['a']}).then(res => {
              console.log(res)
              newText = res.text
          }).catch(err => {
              console.error(err)
          })
          console.log(`${newText} блять`)
        return res.json({
            text: newText
        })
    } catch (error) {
        return res.send({
            error
        })
    }
})

module.exports = router