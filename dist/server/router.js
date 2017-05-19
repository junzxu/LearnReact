"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
var router = express.Router();
router.get('/data', function (req, res) {
    res.send(JSON.stringify([
        { title: 'A', text: 'aaa' },
        { title: 'B', text: 'bbb' },
        { title: 'C', text: 'ccc' }
    ]));
});
router.get('/*', function (req, res) {
    console.log('server call request: ' + req.originalUrl);
    res.sendFile('index.html');
});
module.exports = router;
//# sourceMappingURL=router.js.map