const axios = require('axios');

module.exports = (app) => {
    app.get('/random/loli', async (req, res) => {
        try {
            const url = 'https://api-nanzz.my.id/docs/api/random/loli.php';
            
            const response = await axios.get(url, {
                responseType: 'arraybuffer',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Accept': 'image/*,*/*;q=0.8',
                    'Connection': 'keep-alive'
                }
            });

            const contentType = response.headers['content-type'] || 'image/jpeg';
            res.set('Content-Type', contentType);
            res.send(response.data);
        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message || "Terjadi kesalahan saat mengambil random loli"
            });
        }
    });
};
