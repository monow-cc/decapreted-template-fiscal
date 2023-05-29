let express = require('express');
let nfp = require('../jsmartnf/product.js')
let nfs = require('../jsmartnf/service.js')
let router = express.Router();

router.post('/contingency', function (req, res) {
    nfp.contingency(JSON.parse(req.body.contingency), result => {
        res.send(result)
    })
});

router.post('/send', function (req, res) {
    nfp.send(JSON.parse(req.body.lot), result => {
        res.send(result)
    })
});

router.post('/event', function (req, res) {
    nfp.event(JSON.parse(req.body.event), result => {
        res.send(result)
    })
});

router.post('/disable', function (req, res) {
    nfp.disable(JSON.parse(req.body.disable), result => {
        res.send(result)
    })
});

router.post('/download', function (req, res) {
    nfp.download(JSON.parse(req.body.download), result => {
        res.send(result)
    })
});

router.post('/service', function (req, res) {
    nfs.request(JSON.parse(req.body.service), result =>{
        res.send(result)
    })
});

router.post('/search', function (req, res) {
    nfp.search(JSON.parse(req.body.search), result =>{
        res.send(result)
    })
});

module.exports = router;
