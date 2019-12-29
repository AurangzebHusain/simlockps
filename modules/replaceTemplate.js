// module.exports = (temp, product) => {
//     let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
//     output = output.replace(/{%IMAGE%}/g, product.image);
//     output = output.replace(/{%PRICE%}/g, product.price);
//     output = output.replace(/{%FROM%}/g, product.from);
//     output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
//     output = output.replace(/{%QUANTITY%}/g, product.quantity);
//     output = output.replace(/{%DESCRIPTION%}/g, product.description);
//     output = output.replace(/{%ID%}/g, product.id);
//     if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
//     return output;
// }

module.exports = (temp, product, slug) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.Name);
    output = output.replace(/{%PRICE%}/g, product.price);
    // output = output.replace(/{%FROM%}/g, product.from);
    // output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    // output = output.replace(/{%SHORTDES%}/g, product.stock);
    // output = output.replace(/{%IMAGE%}/g, product.Images);
    // for (var i = 0; i < 2; i++) {
    //     if (product.Images[i] != null) {
    //         output = output.replace(/{%IMAGE%}/g[i], product.Images[i]);
    //     }
    // }
    output = output.replace(/{%IMAGE0%}/g, product.Images[0]);
    output = output.replace(/{%IMAGE1%}/g, product.Images[1]);
    output = output.replace(/{%IMAGE2%}/g, product.Images[2]);
    output = output.replace(/{%IMAGE3%}/g, product.Images[3]);
    output = output.replace(/{%IMAGE4%}/g, product.Images[4]);
    output = output.replace(/{%IMAGE5%}/g, product.Images[5]);

    output = output.replace(/{%SHORTDESCRIPTION%}/g, product.shortdescription);
    //Description

    (product.description == "") ? output = output.replace(/{%noDescription%}/g, 'no-description') : output = output.replace(/{%DESCRIPTION%}/g, product.description);

    output = output.replace(/{%ID%}/g, product.ID);
    if (!product.stock) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

    output = output.replace(/{%slug%}/g, slug[product.ID]);
    console.log(slug[product.ID]);
    // console.log(product);

    return output;
}

