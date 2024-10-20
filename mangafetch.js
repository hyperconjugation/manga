import axios from 'axios';
import cheerio from 'cheerio';

const BASE_URL = 'https://www.mangaread.org';

const genreList = {
  'all' : 'all',
  'action' : "10",
  'action-adventure' : "24",
  'adventure' : '18',
  'animation' : '3',
  'biography' : '37',
  'comedy' : '7',
  'crime' : '2',
  'documentary' : '11',
  'drama' : '4',
  'family' : '9',
  'fantasy' : '13',
  'history' : '19',
  'horror'  : '14',
  'kids'  : '27',
  'music'  : '15',
  'mystery'  : '1',
  'news'  : '34',
  'reality'  : '22',
  'romance'  : '12',
  'sci-fi-fantasy'  : '31',
  'science-fiction'  : '5',
  'soap'  : '35',
  'talk'  : '29',
  'thriller'  : '16',
  'tv-movie'  : '8',
  'war'  : '17',
  'war-politics'  : '28',
  'western'  : '6'
}

const countryList = {
  'all': 'all',
  'argentina' : '11',
  'australia' : '151',
  'austria' : '4',
  'belgium' : '44',
  'brazil' : '190',
  'canada' : '147',
  'china' : '101',
  'czech-republic' : '231',
  'denmark' : '222',
  'finland' : '158',
  'france' : '3',
  'germany' : '96',
  'hong-kong' : '93',
  'hungary' : '72',
  'india' : '105',
  'ireland' : '196',
  'israel' : '24',
  'italy' : '205',
  'japan' : '173',
  'luxembourg' : '91',
  'mexico' : '40',
  'netherlands' : '172',
  'new-zealand' : '122',
  'norway' : '219',
  'poland' : '23',
  'romania' : '170',
  'russia' : '109',
  'south-africa' : '200',
  'south-korea' : '135',
  'spain' : '62',
  'sweden' : '114',
  'switzerland' : '41',
  'taiwan' : '119',
  'thailand' : '57',
  'united-kingdom' : '180',
  'united-states-of-america' : '129'
}


export const fetchMovieInfo = async (id) => {
  try {
    let genres = [];
    let epList = [];
    let artist = [];
    let author = [];

    const animePageTest = await axios.get(`https://manganow.to/manga/${id}`);

    const $ = cheerio.load(animePageTest.data);

    const title = $('h2.manga-name').text().trim();
    const image = $('div.manga-poster > img').attr('src').trim();
    const rank = $('div.anisc-info > div.item-title:nth-child(6) > span.name').text().trim();
    const type = $('div.anisc-info > div.item-title:nth-child(1) > a').text().trim();
    const desc = $('div.description').text().trim();
    const releasedDate = $('div.post-status > div.post-content_item:nth-child(1) > div.summary-content').text().trim();
    const status = $('div.anisc-info > div.item-title:nth-child(2) > span.name > a').text().trim();
    const otherName = $('div.manga-name-or').text().trim();
    //const author = $('div.post-content_item:nth-child(6) > div.summary-content').text().trim();
    //const artist = $('div.post-content_item:nth-child(7) > div.summary-content').text().trim();


    $('div.anisc-info > div.item-title:nth-child(3) > a').each((i, elem) => {
      artist.push({
        name: $(elem).text().trim(),
        url: $(elem).attr('href').replace("https://www.mangaread.org/", ""),
      });
    });
    $('div.anisc-info > div.item-title:nth-child(4) > a').each((i, elem) => {
      author.push({
        name: $(elem).text().trim(),
        url: $(elem).attr('href'),
      });
    });

    $('div.genres > a').each((i, elem) => {
      genres.push({
        name: $(elem).text().trim(),
        url: $(elem).attr('href'),
      });
    });

    $('li.reading-item').each((i, el) => {
      epList.push({
        episodeId: $(el).find('a').attr('href').replace("https://manganow.to/", ""),
        episodeNum: $(el).find('a > span.name').text().trim(),
        
      });
    });

    const otherManga = $('section.block_area.block_area_category.block_area_authors-other').html()
    const youMayLike = $('section.block_area.block_area_sidebar.block_area-realtime').html().replaceAll("https://manganow.to", "")


    // const ep_start = $('#episode_page > li').first().find('a').attr('ep_start');
    // const ep_end = $('#episode_page > li').last().find('a').attr('ep_end');
    // const movie_id = $('#movie_id').attr('value');
    // const alias = $('#alias_anime').attr('value');
    // const episode_info_html = $('div.anime_info_episodes_next').html();
    // const episode_page = $('ul#episode_page').html();


    return {
      name: title.toString(),
      rank: rank.toString(),
      type: type.toString(),
      synopsis: desc.toString(),
      imageUrl: image.toString(),
      status: status.toString(),
      genres: genres,
      othername: otherName,
      released: releasedDate.toString(),
      author : author,
      artist: artist,
      otherManga: otherManga,
      youMayLike: youMayLike,
      // totalEpisodes: ep_end,
      episode_id: epList.reverse(),
      // episode_info_html: episode_info_html.trim(),
      // episode_page: episode_page.toString().trim(),
    };
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};


export const home = async() => {
  try {
    let list = [];
    let ep= [];
    const mainPage = await axios.get(`https://manganow.to/home`);
    const $ = cheerio.load(mainPage.data);

    
    const trending = $('section.block_area_trending').html().replaceAll("https://manganow.to/", "");
    const lastest = $('section.block_area_home').html().replaceAll("https://manganow.to", "");
    const slider = $('div.deslide-wrap').html().trim().replaceAll("https://manganow.to", "");
    const sidebar = $('div.cbox-content').html().trim().replaceAll("https://manganow.to", "");
    const completed = $('div#featured-04').html().replaceAll("https://manganow.to", "");
    const recommended = $('div#featured-03').html().replaceAll("https://manganow.to", "");
    return {
      trending : trending,
      lastest: lastest,
      slider: slider,
      sidebar: sidebar,
      recommended : recommended,
      completed: completed
    };
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};

export const fetchImages = async ({id,chapter}) => {
  try {
    let images = [];
    const fetchImages = await axios.get(`https://www.mangaread.org/manga/${id}/chapter-${chapter}/`);
    const $ = cheerio.load(fetchImages.data);

    const hasNext = $('div#ver-next-cv').text();
    $('div.reading-content > div.page-break').each((i, el) => {
      images.push({ episodeId: $(el).find('img').attr('src').trim()
      });
    });
    return {
      images: images,
      hasNext: hasNext
    } 
    
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};


export const fetchGenre = async ({id,page = 1}) => {
  try {
    let list = [];
    let genre =[];
    const fetchImages = await axios.get(`https://manganow.to/genre/${id}?page=${page}`);
    const $ = cheerio.load(fetchImages.data);
    $('div.mls-wrap > div.item').each((i, el) => {
      list.push({ 
        id: $(el).find('a').attr('href').replace("https://manganow.to/", ""),
        name:$(el).find('div.manga-detail > a').attr('title'),
        image:$(el).find('a > img').attr('src'),
        lastestChapter:$(el).find('div.chapter > a').attr('href'),
        genre: $(el).find('div.fd-infor').text().trim(),
      });
    });
    const pagination = $('ul.pagination').html();

    return {
      data:list,
      pagination: pagination
    }
    
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};

export const scrapeExplore = async ({id,page = 1, sort = "default"}) => {
  try {
    let list = [];
    const fetchImages = await axios.get(`https://manganow.to/${id}?page=${page}&sort=${sort}`);
    const $ = cheerio.load(fetchImages.data);
    $('div.mls-wrap > div.item').each((i, el) => {
      list.push({ 
        id: $(el).find('a').attr('href').replace("https://manganow.to/", ""),
        name:$(el).find('div.manga-detail > a').attr('title'),
        image:$(el).find('a > img').attr('src'),
        lastestChapter:$(el).find('div.fd-list').html().replaceAll("https://manganow.to/", ""),
        genre: $(el).find('span.fdi-cate').html()
      });
    });
    const pagination = $('ul.pagination').html();

    return {
      data:list,
      pagination: pagination
    }
    
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};


export const explore = async ({ list = [], type = "all" , genre = "all", releaseYear = "all" , quality = "all", country = "all" ,page = 1 }) => {
  try {

      const genrePG = genreList[genre]
      const countryPG = countryList[country]
      const genrePage = await axios.get(`${BASE_URL}/filter?type=${type}&quality=${quality}&release_year=${releaseYear}&country=${countryPG}&genre=${genrePG}&page=${page}`);
      const $ = cheerio.load(genrePage.data);
     
      $('div.flw-item').each((i, elem) => {
        const releaseDate = $(elem).find('.film-detail > .fd-infor > .fdi-item:nth-child(1)').text()
        const totalEpisodes = $(elem).find('.film-detail > .fd-infor > span:nth-child(3)').text();
        
        list.push({
          id: $(elem).find('h2.film-name > a').attr('href'),
          title : $(elem).find('h2.film-name > a').attr('title'),
          image: $(elem).find('div.film-poster > img').attr('data-src'),
          releaseDate: isNaN(parseInt(releaseDate)) ? null : releaseDate,
          type: $(elem).find('.film-detail > .fd-infor > .fdi-type').text(),
          duration: $(elem).find('.film-detail > .fd-infor > .fdi-duration').text(),
          seasons: releaseDate.includes('SS') && !isNaN(parseInt(releaseDate.split('SS')[1])) ? parseInt(releaseDate.split('SS')[1]) : null,
          lastEpisodes: totalEpisodes.includes('EPS') && !isNaN(parseInt(totalEpisodes.split('EPS')[1])) ? parseInt(totalEpisodes.split('EPS')[1]) : null,
          // animeUrl: BASE_URL + '/' + $(elem).find('p.name > a').attr('href'),
        });
      });
      return list;
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};

export const explorePage = async ({ type = "all" , genre = "all", releaseYear = "all" , quality = "all", country = "all" ,page = 1 }) => {
  try {
    const genrePG = genreList[genre]
    const countryPG = countryList[country]
    const explorePage = await axios.get(`${BASE_URL}/filter?type=${type}&quality=${quality}&release_year=${releaseYear}&country=${countryPG}&genre=${genrePG}&page=${page}`);

    const $ = cheerio.load(explorePage.data);

    const pagination = $('ul.pagination').html()

    return {
      pagination: pagination
    }
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};


// Promise: 


export const fetchGenresList = async () => {
  try {
    const data = await flixhq.fetchGenresList();

    return data;
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};

export const fetchCountriesList = async () => {
  try {
    const data = await flixhq.fetchCountriesList();

    return data;
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};

export const search = async ({keyw,page}) => {
  try {
    const data = await flixhq.search(keyw,page);

    return data;
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};


export const fetchEpisodeSources = async ({id,epId}) => {
  try {
    const data = await flixhq.fetchEpisodeSources(id,epId);

    return data;
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};


export const scrapeGenre = async ({ list = [], genre, page = 1 }) => {
  try {

      
      const genrePage = await axios.get(`${BASE_URL}/genre/${genre}?page=${page}`);
      const $ = cheerio.load(genrePage.data);
     
      $('div.flw-item').each((i, elem) => {
        const releaseDate = $(elem).find('.film-detail > .fd-infor > .fdi-item:nth-child(1)').text()
        const totalEpisodes = $(elem).find('.film-detail > .fd-infor > span:nth-child(3)').text();
        
        list.push({
          id: $(elem).find('h2.film-name > a').attr('href'),
          title : $(elem).find('h2.film-name > a').attr('title'),
          image: $(elem).find('div.film-poster > img').attr('data-src'),
          releaseDate: isNaN(parseInt(releaseDate)) ? null : releaseDate,
          type: $(elem).find('.film-detail > .fd-infor > .fdi-type').text(),
          duration: $(elem).find('.film-detail > .fd-infor > .fdi-duration').text(),
          seasons: releaseDate.includes('SS') && !isNaN(parseInt(releaseDate.split('SS')[1])) ? parseInt(releaseDate.split('SS')[1]) : null,
          lastEpisodes: totalEpisodes.includes('EPS') && !isNaN(parseInt(totalEpisodes.split('EPS')[1])) ? parseInt(totalEpisodes.split('EPS')[1]) : null,
          // animeUrl: BASE_URL + '/' + $(elem).find('p.name > a').attr('href'),
        });
      });
      return list;
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};



export const scrapeSlider = async ( list = [] ) => {
  try {

      
      const sliderPage = await axios.get(`https://flixhq.to/home`);
      const $ = cheerio.load(sliderPage.data);
      const sliderImageRegex = new RegExp(/^background-image: url\((.*)\)/);
      $('#slider > div.swiper-wrapper > div.swiper-slide').each((i, el) => {
        const image = $(el).attr('style')?.split(';')[0];
        const match = image.match(sliderImageRegex);
        const id = $(el).find('.film-title > a').attr('href');
        const title = $(el).find('.film-title > a').attr('title');
        const movieDetail = $(el).find('.sc-detail > .scd-item');
        const movieGenre = $(movieDetail.get()[3]).find('a').get();
        list.push({
            image: match[1],
            title: title,
            id: id,
            
            detail: {
                quality: $(movieDetail).find('span.quality').text(),
                duration: $(movieDetail.get()[1]).find('strong').text(),
                imdb: $(movieDetail.get()[2]).find('strong').text(),
                genres: movieGenre.map(el => $(el).attr('title')),
            },
            description: $(el).find('.sc-desc').text(),
        });
    });
     
      
      return list;
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};


export const scrapeCountry = async ({ list = [], country, page = 1 }) => {
  try {

      
      const CountryPage = await axios.get(`${BASE_URL}/country/${country}?page=${page}`);
      const $ = cheerio.load(CountryPage.data);
     
      $('div.flw-item').each((i, elem) => {
        const releaseDate = $(elem).find('.film-detail > .fd-infor > .fdi-item:nth-child(1)').text()
        const totalEpisodes = $(elem).find('.film-detail > .fd-infor > span:nth-child(3)').text();
        
        list.push({
          id: $(elem).find('h2.film-name > a').attr('href'),
          title : $(elem).find('h2.film-name > a').attr('title'),
          image: $(elem).find('div.film-poster > img').attr('data-src'),
          releaseDate: isNaN(parseInt(releaseDate)) ? null : releaseDate,
          type: $(elem).find('.film-detail > .fd-infor > .fdi-type').text(),
          duration: $(elem).find('.film-detail > .fd-infor > .fdi-duration').text(),
          seasons: releaseDate.includes('SS') && !isNaN(parseInt(releaseDate.split('SS')[1])) ? parseInt(releaseDate.split('SS')[1]) : null,
          lastEpisodes: totalEpisodes.includes('EPS') && !isNaN(parseInt(totalEpisodes.split('EPS')[1])) ? parseInt(totalEpisodes.split('EPS')[1]) : null,
          // animeUrl: BASE_URL + '/' + $(elem).find('p.name > a').attr('href'),
        });
      });
      return list;
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};



export const scrapeMovie = async ({ list = [], page = 1 }) => {
  try {

      
      const scrapeMoviePage = await axios.get(`${BASE_URL}/movie?page=${page}`);
      const $ = cheerio.load(scrapeMoviePage.data);
     
      $('div.flw-item').each((i, elem) => {
        const releaseDate = $(elem).find('.film-detail > .fd-infor > .fdi-item:nth-child(1)').text()
        const totalEpisodes = $(elem).find('.film-detail > .fd-infor > span:nth-child(3)').text();
        
        list.push({
          id: $(elem).find('h2.film-name > a').attr('href'),
          title : $(elem).find('h2.film-name > a').attr('title'),
          image: $(elem).find('div.film-poster > img').attr('data-src'),
          releaseDate: isNaN(parseInt(releaseDate)) ? null : releaseDate,
          type: $(elem).find('.film-detail > .fd-infor > .fdi-type').text(),
          duration: $(elem).find('.film-detail > .fd-infor > .fdi-duration').text(),
          seasons: releaseDate.includes('SS') && !isNaN(parseInt(releaseDate.split('SS')[1])) ? parseInt(releaseDate.split('SS')[1]) : null,
          lastEpisodes: totalEpisodes.includes('EPS') && !isNaN(parseInt(totalEpisodes.split('EPS')[1])) ? parseInt(totalEpisodes.split('EPS')[1]) : null,
          // animeUrl: BASE_URL + '/' + $(elem).find('p.name > a').attr('href'),
        });
      });
      return list;
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};


export const scrapeTV = async ({ list = [], page = 1 }) => {
  try {

      
      const scrapeTVPage = await axios.get(`${BASE_URL}/tv-show?page=${page}`);
      const $ = cheerio.load(scrapeTVPage.data);
     
      $('div.flw-item').each((i, elem) => {
        const releaseDate = $(elem).find('.film-detail > .fd-infor > .fdi-item:nth-child(1)').text()
        const totalEpisodes = $(elem).find('.film-detail > .fd-infor > span:nth-child(3)').text();
        
        list.push({
          id: $(elem).find('h2.film-name > a').attr('href'),
          title : $(elem).find('h2.film-name > a').attr('title'),
          image: $(elem).find('div.film-poster > img').attr('data-src'),
          releaseDate: isNaN(parseInt(releaseDate)) ? null : releaseDate,
          type: $(elem).find('.film-detail > .fd-infor > .fdi-type').text(),
          duration: $(elem).find('.film-detail > .fd-infor > .fdi-duration').text(),
          seasons: releaseDate.includes('SS') && !isNaN(parseInt(releaseDate.split('SS')[1])) ? parseInt(releaseDate.split('SS')[1]) : null,
          lastEpisodes: totalEpisodes.includes('EPS') && !isNaN(parseInt(totalEpisodes.split('EPS')[1])) ? parseInt(totalEpisodes.split('EPS')[1]) : null,
          // animeUrl: BASE_URL + '/' + $(elem).find('p.name > a').attr('href'),
        });
      });
      return list;
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};






// PAGINATION
export const topIMDBpage = async ({  page }) => {
  try {
    const topIMDBpg = await axios.get(`${BASE_URL}/top-imdb?page=${page}`);

    const $ = cheerio.load(topIMDBpg.data);

    const pagination = $('ul.pagination').html()

    return {
      pagination: pagination
    }
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};

export const moivePage = async ({  page }) => {
  try {
    const moviepg = await axios.get(`${BASE_URL}/movie?page=${page}`);

    const $ = cheerio.load(moviepg.data);

    const pagination = $('ul.pagination').html()

    return {
      pagination: pagination.replaceAll("movie","movies")
    }
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};

export const tvPage = async ({  page }) => {
  try {
    const tvpg = await axios.get(`${BASE_URL}/tv-show?page=${page}`);

    const $ = cheerio.load(tvpg.data);

    const pagination = $('ul.pagination').html()

    return {
      pagination: pagination
    }
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};

export const genrePage = async ({genre, page }) => {
  try {
    const genrePg = await axios.get(`${BASE_URL}/genre/${genre}?page=${page}`);

    const $ = cheerio.load(genrePg.data);

    const pagination = $('ul.pagination').html()

    return {
      pagination: pagination
    }
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};

export const countryPage = async ({country, page }) => {
  try {
    const countryPg = await axios.get(`${BASE_URL}/country/${country}?page=${page}`);

    const $ = cheerio.load(countryPg.data);

    const pagination = $('ul.pagination').html()

    return {
      pagination: pagination
    }
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};



export const searchPage = async ({keyw, page }) => {
  try {
    const searchpg = await axios.get(`${BASE_URL}/search/${keyw.replace(" ", "-")}?page=${page}`);

    const $ = cheerio.load(searchpg.data);

    const pagination = $('ul.pagination').html()

    return {
      pagination: pagination.replaceAll("?","&").replaceAll("/search/","search?q="),
    }
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};


// flixhq.fetchMovieInfo("movie/watch-m3gan-91330").then(data => console.log(data));

// // Async/Await:
// (async () => {
//     const data = await flixhq.fetchMovieInfo("movie/watch-m3gan-91330");
//     console.log(data);
// })();

// Async/Await:
// (async () => {
//     const data = await flixhq.home();
//     console.log(data);
// })();