const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://sundecor.vn';

[
  {
    url: 'https://sundecor.vn/quat-tran-den-canh-go.html',
    subcategory_id: 5,
  },
  {
    url: 'https://sundecor.vn/quat-tran-nhat-ban.html',
    subcategory_id: 5,
  },
  {
    url: 'https://sundecor.vn/quat-tran-den-asia.html',
    subcategory_id: 5,
  },
  {
    url: 'https://sundecor.vn/quat-tran-my.html',
    subcategory_id: 5,
  },
  {
    url: 'https://sundecor.vn/quat-tran-nhap-khau-fanco.html',
    subcategory_id: 5,
  },
  {
    url: 'https://sundecor.vn/quat-tran-den-co-dien.html',
    subcategory_id: 5,
  },
  {
    url: 'https://sundecor.vn/quat-tran-canh-cup-canh-xoe.html',
    subcategory_id: 5,
  },
  {
    url: 'https://sundecor.vn/quat-tran-panasonic.html',
    subcategory_id: 5,
  },
  {
    url: 'https://sundecor.vn/quat-tran-dien-co.html',
    subcategory_id: 5,
  },
  {
    url: 'https://sundecor.vn/den-ban-serip-dong.html',
    subcategory_id: 6,
  },
  {
    url: 'https://sundecor.vn/den-ban-hien-dai.html',
    subcategory_id: 6,
  },
  {
    url: 'https://sundecor.vn/den-ban-co-dien.html',
    subcategory_id: 6,
  },
  {
    url: 'https://sundecor.vn/den-san-hien-dai.html',
    subcategory_id: 6,
  },
  {
    url: 'https://sundecor.vn/den-tha-hien-dai.html',
    subcategory_id: 7,
  },
  {
    url: 'https://sundecor.vn/den-tuong-pha-le.html',
    subcategory_id: 7,
  },
  {
    url: 'https://sundecor.vn/den-tuong-dong.html',
    subcategory_id: 7,
  },
  {
    url: 'https://sundecor.vn/den-tuong-pha-le.html',
    subcategory_id: 7,
  },
  {
    url: 'https://sundecor.vn/den-tuong-hien-dai.html',
    subcategory_id: 7,
  },
  {
    url: 'https://sundecor.vn/den-tuong-co-dien.html',
    subcategory_id: 7,
  },
  {
    url: 'https://sundecor.vn/den-soi-tranh-dong.html',
    subcategory_id: 7,
  },

  // Đèn tường
  {
    url: 'https://sundecor.vn/den-tuong-pha-le.html',
    subcategory_id: 8,
  },
  {
    url: 'https://sundecor.vn/den-tuong-dong.html',
    subcategory_id: 8,
  },
  {
    url: 'https://sundecor.vn/den-tuong-hien-dai.html',
    subcategory_id: 8,
  },
  {
    url: 'https://sundecor.vn/den-tuong-co-dien.html',
    subcategory_id: 8,
  },
  {
    url: 'https://sundecor.vn/den-tuong-co-dien.html',
    subcategory_id: 8,
  },
  {
    url: 'https://sundecor.vn/den-soi-tranh-dong.html',
    subcategory_id: 8,
  },
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
        cloneProject.code = productHTML('.pb .rr .cc li')[0].children[0].data.replace('Mã SP: ','');
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


