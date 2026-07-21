const axios = require('axios');

module.exports = (app) => {
    app.get('/tools/shorturl-tinyurl', async (req, res) => {
        const url = req.query.url || req.body.url;
        const custom = req.query.custom || req.body.custom || '';

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

            let apiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`;
            if (custom) {
                apiUrl += `&alias=${encodeURIComponent(custom)}`;
            }

            const response = await axios.get(apiUrl, {
                timeout: 5000
            });

            if (response.data === 'Error') {
                throw new Error('Custom alias sudah digunakan atau URL tidak valid.');
            }

            if (response.status === 422) {
                throw new Error('Custom alias sudah terpakai. Coba kata lain.');
            }

            return res.status(200).json({
                status: true,
                result: response.data
            });

        } catch (error) {
            return res.status(500).json({
                status: false,
                error: error.message
            });
        }
    });
};
