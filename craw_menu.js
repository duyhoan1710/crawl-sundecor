const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://sundecor.vn";

const getContentMenu = async (menu, endpoint) => {
  const response = await axios(`${url}${endpoint}`);
  const $ = cheerio.load(response.data);

  $.html();

  menu.title = $("title").text();
  menu.description = $('meta[name="description"]')[0].attribs.content;

  try {
    menu.content1 = $(".itr:first").html();
    menu.content2 = $(".itr:nth-child(2)").html();
  } catch (e) {}
};

axios(url).then((response) => {
  const $ = cheerio.load(response.data);
  $.html();

  const menuHTML = $(".ha .u")[0].children;

  menuHTML.forEach(async (el, index) => {
    if (index > 0) {
      const menu = {};
      const subcategories = [];

      const category = el.children[0].children[0].data;

      const menuLink = el.children[0].attribs.href;

      await getContentMenu(menu, menuLink);

      menu.index = index;
      menu.category = category;

      const subcategoriesHTML = el.children[1].children[0].children;

      for (let i = 0; i < subcategoriesHTML.length; i++) {
        if (
          subcategoriesHTML[i]?.children[0] &&
          subcategoriesHTML[i]?.children[0].children
        ) {
          const subcategory = {};

          subcategory.title =
            subcategoriesHTML[i]?.children[0]?.children[0]?.data;

          const menuLink = subcategoriesHTML[i].children[0].attribs.href;

          await getContentMenu(subcategory, menuLink);

          subcategories.push(subcategory);
        }
      }

      menu.subcategories = subcategories;

      // save menu to database in here

      //...
    }
  });
});
