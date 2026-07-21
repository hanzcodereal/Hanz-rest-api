const axios = require('axios');

module.exports = (app) => {
    app.get('/tools/shorturl-isgd', async (req, res) => {
        const url = req.query.url || req.body.url;

        if (!url) {
            return res.status(400).json({
                status: false,
                error: 'Parameter URL wajib diisi.'
            });
        }

        try {
            if (!url.match(/^https?:\/\//)) {
                url = 'https://' + url;
            }

            const response = await axios.get('https://is.gd/create.php', {
                params: {
                    format: 'json',
                    url: url
                },
                timeout: 5000
            });

            if (response.data.errorcode) {
                throw new Error(response.data.errormessage || 'Is.gd menolak URL ini.');
            }

            return res.status(200).json({
                status: true,
                result: response.data.shorturl
            });

        } catch (error) {
            return res.status(500).json({
                status: false,
                error: error.message
            });
        }
    });
};
