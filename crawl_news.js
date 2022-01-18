const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://sundecor.vn";

[
  {
    url: "https://sundecor.vn/den-chum.html",
    // subcategory_id: 5,
  },
  // {
  //   url: 'https://sundecor.vn/quat-tran-nhat-ban.html',
  //   subcategory_id: 5,
  // },
  // {
  //   url: 'https://sundecor.vn/quat-tran-den-asia.html',
  //   subcategory_id: 5,
  // },
  // {
  //   url: 'https://sundecor.vn/quat-tran-my.html',
  //   subcategory_id: 5,
  // },
  // {
  //   url: 'https://sundecor.vn/quat-tran-nhap-khau-fanco.html',
  //   subcategory_id: 5,
  // },
  // {
  //   url: 'https://sundecor.vn/quat-tran-den-co-dien.html',
  //   subcategory_id: 5,
  // },
  // {
  //   url: 'https://sundecor.vn/quat-tran-canh-cup-canh-xoe.html',
  //   subcategory_id: 5,
  // },
  // {
  //   url: 'https://sundecor.vn/quat-tran-panasonic.html',
  //   subcategory_id: 5,
  // },
  // {
  //   url: 'https://sundecor.vn/quat-tran-dien-co.html',
  //   subcategory_id: 5,
  // },
  // {
  //   url: 'https://sundecor.vn/den-ban-serip-dong.html',
  //   subcategory_id: 6,
  // },
  // {
  //   url: 'https://sundecor.vn/den-ban-hien-dai.html',
  //   subcategory_id: 6,
  // },
  // {
  //   url: 'https://sundecor.vn/den-ban-co-dien.html',
  //   subcategory_id: 6,
  // },
  // {
  //   url: 'https://sundecor.vn/den-san-hien-dai.html',
  //   subcategory_id: 6,
  // },
  // {
  //   url: 'https://sundecor.vn/den-tha-hien-dai.html',
  //   subcategory_id: 7,
  // },
  // {
  //   url: 'https://sundecor.vn/den-tuong-pha-le.html',
  //   subcategory_id: 7,
  // },
  // {
  //   url: 'https://sundecor.vn/den-tuong-dong.html',
  //   subcategory_id: 7,
  // },
  // {
  //   url: 'https://sundecor.vn/den-tuong-pha-le.html',
  //   subcategory_id: 7,
  // },
  // {
  //   url: 'https://sundecor.vn/den-tuong-hien-dai.html',
  //   subcategory_id: 7,
  // },
  // {
  //   url: 'https://sundecor.vn/den-tuong-co-dien.html',
  //   subcategory_id: 7,
  // },
  // {
  //   url: 'https://sundecor.vn/den-soi-tranh-dong.html',
  //   subcategory_id: 7,
  // },

  // // Đèn tường
  // {
  //   url: 'https://sundecor.vn/den-tuong-pha-le.html',
  //   subcategory_id: 8,
  // },
  // {
  //   url: 'https://sundecor.vn/den-tuong-dong.html',
  //   subcategory_id: 8,
  // },
  // {
  //   url: 'https://sundecor.vn/den-tuong-hien-dai.html',
  //   subcategory_id: 8,
  // },
  // {
  //   url: 'https://sundecor.vn/den-tuong-co-dien.html',
  //   subcategory_id: 8,
  // },
  // {
  //   url: 'https://sundecor.vn/den-tuong-co-dien.html',
  //   subcategory_id: 8,
  // },
  // {
  //   url: 'https://sundecor.vn/den-soi-tranh-dong.html',
  //   subcategory_id: 8,
  // },
].forEach((item) => {
  axios(item.url).then((response) => {
    const $ = cheerio.load(response.data);
    $.html();

    const news = $(".t strong a");

    Object.keys(news).forEach(async (key) => {
      if (typeof news[key] === 'object' && !!news[key]?.attribs) {
        const newsResponse = await axios(`${url}${news[key].attribs.href}`);
        const newsHTML = cheerio.load(newsResponse.data);
        newsHTML.html();
        const cloneNews = {};

        cloneNews.title = newsHTML('title').text();
        cloneNews.description = newsHTML('meta[name="description"]')[0].attribs.content,
        cloneNews.image = newsHTML('meta[property="og:image"]')[0].attribs.content
        cloneNews.content = newsHTML('.itr:first').html();
        cloneNews.name = newsHTML('.dr h1').text();

        if (Object.keys(cloneNews).length) {
          // save news to database
          console.log(cloneNews);
        }
      }
    });
  });
});
