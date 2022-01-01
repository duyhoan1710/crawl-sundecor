const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://sundecor.vn';

axios(url).then((response) => {
  const $ = cheerio.load(response.data);
  $.html();

  const menuHTML = $('.ha .u')[0].children;

  const menus = [];

  menuHTML.forEach((el, index) => {
    if (index > 0) {
      const menu = {};
      const subcategories = [];

      const category = el.children[0].children[0].data;

      menu.index = index;
      menu.category = category;

      const subcategoriesHTML = el.children[1].children[0].children;

      subcategoriesHTML.forEach((el) => {
        if (el?.children[0] && el?.children[0].children) {
          subcategories.push(el?.children[0]?.children[0]?.data);
        }
      });

      menu.subcategories = subcategories;
      menus.push(menu);
    }
  })

  console.log(menus);
});