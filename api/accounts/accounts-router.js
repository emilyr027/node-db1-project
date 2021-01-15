const express = require('express')
const db = require('../../data/dbConfig')
const router = express.Router()

// GET api/accounts
router.get('/', (req,res) => {
    db('accounts')
        .then(accounts => {
            res.status(200).json(accounts)
        })
        .catch((err)=> {
            res.status(500).json({ message: 'error retrieving accounts'})
        })
})

// GET /api/accounts/:id
router.get('/:id', (req,res) => {
    db('accounts')
        .where({ id: req.params.id })
        .first()
        .then(account => {
            if(account) {
                res.status(200).json(account)
            } else {
                res.status(404).json({ message: `Account ${id} not found`})
            }
        })
        .catch((err) => {
            res.status(500).json({ message: 'error' })
        })

})

// POST /api/accounts
router.post('/', (req,res) => {
    const addAccount = req.body
    db('accounts')
        .insert(addAccount, 'id')
        .then((data) => {
            res.status(201).json({ message: data})
        })
        .catch((err) => {
            res.status(500).json({ message: 'error'})
        })
    
})

// PUT /api/accounts/:id
router.put('/:id', (req, res) => {
    const data = req.body
    db('accounts')
        .where({ id: req.params.id })
        .update(data)
        .then((count) => {
            res.status(200).json({ message: count})
        })
        .catch((err) => {
            res.status(500).json({ message: 'error'})
        })
})

// DELETE /api/accounts/:id
router.delete('/:id', (req, res) => {
    db('accounts')
        .where({ id: req.params.id })
        .del()
        .then(data => {
            res.status(200).json({ message: `${data}'s records have been deleted`})
        })
        .catch(() => {
            res.status(500).json({ message: 'error deleting account'})
        })
})


module.exports = router