const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://sundecor.vn';

[
  {
    url: 'https://sundecor.vn/den-chum-pha-le-ban-chay.html',
    subcategory_id: 1,
  }
].forEach((item) => {
  axios(item.url).then((response) => {
    const $ = cheerio.load(response.data);
    $.html();

    const products = $('#up .c a');

    Object.keys(products).forEach(async(key) => {
      if (key % 2 === 0) {
        const product = await axios(`${url}${products[key].attribs.href}`);

        const productHTML = cheerio.load(product.data);
        productHTML.html();

        const cloneProject = {};

        cloneProject.title = productHTML('title').text();
        cloneProject.description = productHTML('meta[name="description"]')[0].attribs.content,
        cloneProject.content = productHTML('#dp1').html();
        cloneProject.image_1 = `${url}${productHTML('.pb .ll .t')[0].attribs.href}`;
        cloneProject.name = productHTML('.pb .rr h1').text();
        cloneProject.code = productHTML('.pb .rr .cc li')[0].children[0].data;
        cloneProject.size = productHTML('.pb .rr .cc li')[1].children[0].data.replace('Kích thước: ', '');
        cloneProject.guarantee = productHTML('.pb .rr .cc li')[2].children[0].data.replace('Bảo hành: ', '');
        cloneProject.status = productHTML('.pb .rr .cc li')[3].children[0].data.replace('Tình trạng: ', '');
        cloneProject.sell_price = productHTML('.pb .rr .gg .r .t span')[0].children[0].data.replace(',', '').replace(' đ', '');
        cloneProject.sale_price = productHTML('.pb .rr .gg .l')[0].children[0].data.replace(',', '').replace(' đ', '');
        cloneProject.subcategory_id = item.subcategory_id;

        console.log(cloneProject);
      }
    });
  });
})


