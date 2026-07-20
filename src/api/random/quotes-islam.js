const axios = require('axios');

module.exports = (app) => {
    app.get('/random/quotes-islam', async (req, res) => {
        try {
            const url = 'https://api-nanzz.my.id/docs/api/random/quotes-islam.php';
            
            const response = await axios.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Accept': 'application/json',
                    'Connection': 'keep-alive'
                }
            });

            if (response.data && response.data.status === true) {
                res.json({
                    status: true,
                    result: {
                        quote: response.data.result.quote,
                        source: response.data.result.source
                    }
                });
            } else {
                res.status(500).json({
                    status: false,
                    message: "Failed to fetch Islamic quote"
                });
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message || "Terjadi kesalahan saat mengambil quotes Islam"
            });
        }
    });
};
