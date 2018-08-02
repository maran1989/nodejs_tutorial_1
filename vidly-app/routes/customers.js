const validateObjectId = require('../middleware/validateObjectId');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { Customer, validateCustomer } = require('../models/customer');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort({ name: 1 });
    res.send(customers);
});

router.get('/:id', validateObjectId, async (req, res) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).send('No customer found by the given ID.');

    res.send(customer);
});

router.post('/', validate(validateCustomer), async (req, res) => {
    let customer = new Customer({ 
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    customer = await customer.save();
    
    res.send(customer);
});

router.put('/:id', [validateObjectId, validate(validateCustomer)], async (req, res) => {
    const customer = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });

    if (!customer) return res.status(404).send('No customer found by the given ID.');
    
    res.send(customer);
});

router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if (!customer) return res.status(404).send('No customer found by the given ID.');

    res.send(customer);
});

module.exports = router;