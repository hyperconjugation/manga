import express, { query } from 'express';
import cors from 'cors';

import {
    home,
    fetchMovieInfo,
    search,
    fetchGenre,
    topIMDBpage,
    searchPage,
    scrapeExplore,
    fetchGenresList,
    fetchCountriesList,
    fetchMovieInfo2,
    scrapeGenre,
    genrePage,
    scrapeCountry,
    countryPage,
    fetchImages,
    fetchEpisodeSources,
    scrapeSlider,
    scrapeMovie,
    moivePage,
    tvPage,
    scrapeTV,
    explore,
    explorePage
} from './mangafetch.js';
const port = process.env.PORT || 8080;

const corsOptions = {
    origin: '*',
    credentails: true,
    optionSuccessStatus: 200,
    port: port,
  };
  
  const app = express();
  
app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json('WORKING');
});


app.get('/home', async (req, res) => {

        const data = await home();

        res.status(200).json(data);
    
});

app.get('/topIMDB', async (req, res) => {
    try {
        const page = req.query.page;
        const type = req.query.type;
        
        const data = await fetchMovieByTopIMDB({type,page});

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: 'Internal Error',
            message: err,
        });
    }
});

app.get('/fetchGenre', async (req, res) => {
    try {
        const id = req.query.id;
        const page = req.query.page;
        
        const data = await fetchGenre({id,page});

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: 'Internal Error',
            message: err,
        });
    }
});

app.get('/fetchExplore', async (req, res) => {
    try {
        const id = req.query.id;
        const page = req.query.page;
        const sort = req.query.sort;
        
        const data = await scrapeExplore({id,page,sort});

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: 'Internal Error',
            message: err,
        });
    }
});


app.get('/fetchMovieInfo', async (req, res) => {
    try {
        const id = req.query.id;
        const data = await fetchMovieInfo(id);

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: 'Internal Error',
            message: err,
        });
    }
});

app.get('/fetchMovieInfo2', async (req, res) => {
    try {
        const id = req.query.id;
        const data = await fetchMovieInfo2(id);

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: 'Internal Error',
            message: err,
        });
    }
});


app.get('/fetchImages', async (req, res) => {
    try {
        const id = req.query.id;
        const chapter = req.query.chapter;
        const data = await fetchImages({id,chapter});

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: 'Internal Error',
            message: err,
        });
    }
});

app.get('/fetchGenresList', async (req, res) => {
    try {
        const data = await fetchGenresList();

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: 'Internal Error',
            message: err,
        });
    }
});

app.get('/fetchCountriesList', async (req, res) => {
    try {
        const data = await fetchCountriesList();

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: 'Internal Error',
            message: err,
        });
    }
});


app.get('/search', async (req, res) => {
    try {
        const keyw = req.query.keyw;
        const page = req.query.page;
        const data = await search({keyw,page});

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: 'Internal Error',
            message: err,
        });
    }
});

app.get('/fetchEpisodeSources', async (req, res) => {
   
        const id = req.query.id;
        const epId = req.query.epId;
        const server = req.query.server;
        const data = await fetchEpisodeSources({id,epId,server});

        res.status(200).json(data);
    
});

app.get('/slider', async (req, res) => {
    try {
        const data = await scrapeSlider();

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: 'Internal Error',
            message: err,
        });
    }
});

app.get('/explore', async (req, res) => {
    try {
        const type = req.query.type;
        const genre = req.query.genre;
        const page = req.query.page;
        const releaseYear = req.query.releaseYear; 
        const quality = req.query.quality;
        const country = req.query.country;
        const data = await explore({type,genre,releaseYear,quality,country,page});

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: 'Internal Error',
            message: err,
        });
    }
});
app.get('/explorePage', async (req, res) => {
    try {
        const type = req.query.type;
        const genre = req.query.genre;
        const page = req.query.page;
        const releaseYear = req.query.releaseYear; 
        const quality = req.query.quality;
        const country = req.query.country;
        const data = await explorePage({type,genre,releaseYear,quality,country,page});


        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: 'Internal Error',
            message: err,
        });
    }
});

app.get('/genre', async (req, res) => {
    try {
        const genre = req.query.genre;
        const page = req.query.page;
        const data = await scrapeGenre({genre,page});

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: 'Internal Error',
            message: err,
        });
    }
});

app.get('/country', async (req, res) => {
    try {
        const country = req.query.country;
        const page = req.query.page;
        const data = await scrapeCountry({country,page});

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: 'Internal Error',
            message: err,
        });
    }
});


app.get('/movie', async (req, res) => {
    try {
        const page = req.query.page;
        const data = await scrapeMovie({page});

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: 'Internal Error',
            message: err,
        });
    }
});

app.get('/tv', async (req, res) => {
    try {
        const page = req.query.page;
        const data = await scrapeTV({page});

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: 'Internal Error',
            message: err,
        });
    }
});

app.get('/searchPage', async (req, res) => {
    try {
        const keyw = req.query.keyw;
        const page = req.query.page;
        const data = await searchPage({keyw,page});

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: 'Internal Error',
            message: err,
        });
    }
});


app.get('/moviePage', async (req, res) => {
    try {
        const page = req.query.page;
        const data = await moivePage({page});

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: 'Internal Error',
            message: err,
        });
    }
});

app.get('/tvPage', async (req, res) => {
    try {
        const page = req.query.page;
        const data = await tvPage({page});

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: 'Internal Error',
            message: err,
        });
    }
});

app.get('/genrePage', async (req, res) => {
    try {
        const genre = req.query.genre;
        const page = req.query.page;
        const data = await genrePage({genre,page});

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: 'Internal Error',
            message: err,
        });
    }
});

app.get('/countryPage', async (req, res) => {
    try {
        const country = req.query.country;
        const page = req.query.page;
        const data = await countryPage({country,page});

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: 'Internal Error',
            message: err,
        });
    }
});



app.get('/topIMDBpage', async (req, res) => {
    try {
        const page = req.query.page;
        const data = await topIMDBpage({page});

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: 'Internal Error',
            message: err,
        });
    }
});

app.listen(port, () => {
    console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});