const fs = require('fs');
const http = require('http');
const url = require('url');
var PORT=process.env.PORT || 3000;
const slugify = require('slugify');  //used to create a slug

const replaceTemplate = require('./modules/replaceTemplate');


///////////////////////////////////////////////////////////


// FILES


// Blocking, Synchronous way
// const textin=fs.readFileSync('./txt/input.txt','UTF-8');
// console.log(textin);


// const textOut=`This is what i know about Avocado: ${textin}.\n
// Created on ${Date.now()}`;

// fs.writeFileSync('./txt/output.txt',textOut);
// console.log("file written");

// Non-Blocking, Asynchronous way

// fs.readFile('./txt/start.txt','UTF-8',(err,data1)=>{
//     console.log(data1);
//     fs.readFile(`./txt/${data1}.txt`,'UTF-8',(err,data2)=>{
//         console.log(data2);
//         fs.readFile('./txt/append.txt','UTF-8',(err,data3)=>{
//             console.log(data3);
//             fs.writeFile('./txt/final.txt',`${data2}\n${data3}`,err=>{
//                 console.log("Your file has been written");
//             })
//         });
//     });
// });


/////////////////////////////////////////SERVER///////////////////////////////////
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'UTF-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'UTF-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'UTF-8');


const datasimlock = fs.readFileSync(`${__dirname}/dev-data/test.json`, 'UTF-8');
const dataobjsimlock = JSON.parse(datasimlock);
// console.log(dataobjsimlock);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'UTF-8');
const dataobj = JSON.parse(data);
const slugs = dataobjsimlock.map(el => slugify(el.Name, { lower: true }));
// console.log(slugs);

const server = http.createServer((req, res) => {
    const {
        pathname,
        query
    } = url.parse(req.url, true);

    //Overview Page 
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {
            'content-type': 'text/html'
        })
        const cardsHtml = dataobjsimlock.map(el => replaceTemplate(tempCard, el, slugs)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)

        res.end(output);

    }
    //Product page
    else if (pathname === '/product') {
        const product = dataobjsimlock[query.id];
        res.writeHead(200, {
            'content-type': 'text/html'
        })
        const output = replaceTemplate(tempProduct, product, slugs);
        res.end(output);
    }
    //API Page
    else if (pathname === "/api") {
        res.writeHead(200, {
            'content-type': 'application/json'
        })
        res.end(data);
    } else {
        res.writeHead(404, {
            'content-type': 'text/html'
        });
        res.end("<h1>Page not found</h1>");
    }

});
server.listen(PORT, () => {
    console.log("listending to request ");
})
