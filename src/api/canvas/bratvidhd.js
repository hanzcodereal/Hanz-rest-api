const axios = require('axios');

module.exports = (app) => {
    app.get('/canvas/bratvidhd', async (req, res) => {
        const text = req.query.text || req.body.text;

        if (!text) {
            return res.status(400).json({
                status: false,
                message: "Parameter 'text' diperlukan."
            });
        }

        try {
            const url = `https://api.cmnty.web.id/maker/bratvidhd?text=${encodeURIComponent(text)}`;
            const response = await axios.get(url, {
                responseType: 'arraybuffer',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Accept': 'image/gif, image/webp, image/apng, image/*,*/*;q=0.8',
                    'Referer': 'https://api.cmnty.web.id/',
                    'Connection': 'keep-alive'
                }
            });

            res.set('Content-Type', 'image/gif');
            res.send(response.data);
        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message || "Terjadi kesalahan saat membuat BRAT video HD"
            });
        }
    });
};
