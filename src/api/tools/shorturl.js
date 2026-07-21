const axios = require('axios');

module.exports = (app) => {
    app.get('/tools/shorturl', async (req, res) => {
        const url = req.query.url || req.body.url;
        const provider = req.query.provider || req.body.provider || 'tinyurl';
        const alias = req.query.alias || req.body.alias || '';

        if (!url) {
            return res.status(400).json({
                status: false,
                error: 'Parameter URL wajib diisi.'
            });
        }

        try {
            let resultUrl;
            
            if (provider === 'isgd') {
                resultUrl = await shortIsgd(url);
            } else if (provider === 'tinyurl') {
                resultUrl = await shortTinyurl(url, alias);
            } else {
                return res.status(400).json({
                    status: false,
                    error: 'Provider tidak valid. Gunakan "isgd" atau "tinyurl"'
                });
            }

            return res.status(200).json({
                status: true,
                result: resultUrl
            });

        } catch (error) {
            return res.status(500).json({
                status: false,
                error: error.message
            });
        }
    });
};

async function shortIsgd(url) {
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

    return response.data.shorturl;
}

async function shortTinyurl(url, alias = '') {
    if (!url.match(/^https?:\/\//)) {
        url = 'https://' + url;
    }

    let apiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`;
    if (alias) {
        apiUrl += `&alias=${encodeURIComponent(alias)}`;
    }

    const response = await axios.get(apiUrl, {
        timeout: 5000
    });

    if (response.data === 'Error') {
        throw new Error('Alias sudah digunakan atau URL tidak valid.');
    }

    if (response.status === 422) {
        throw new Error('Custom Alias sudah terpakai. Coba kata lain.');
    }

    return response.data;
        }
