const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
const url = require("../models/urlModel");
const baseUrl = "http://127.0.0.1:3001/urlapi/"

router.post('/', async (req, res) => {
    try {
        const longUrl = req.body.longUrl;
        const shortUrl = nanoid(4);
        await url.create({ longUrl, shortUrl });
        return res.status(200).json({
            status: "Ok",
            result: `${baseUrl}${shortUrl}`
        });
    } catch (error) {
        return res.status(500).send(error);
    }
})

router.get('/:short', async (req, res) => {
    try {
        const shortUrl = req.params.short;
        const shortId = await url.findOne({ where: { shortUrl } });
        if (!shortId) {
            return res.status(404).send("URL does not exist");
        }
        const result = shortId.longUrl;
        return res.status(200).redirect(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
})

module.exports = router;