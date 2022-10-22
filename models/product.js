<<<<<<< HEAD
const db = require('../util/database');

const Cart = require('./cart');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute(
      'INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
      [this.title, this.price, this.imageUrl, this.description]
    );
  }

  static deleteById(id) {
    return db.execute ('DELETE FROM products WHERE products.id =?',[id]);
}

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  static findById(id) {
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
  }
}
=======
const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');


const getProductsFromFile = (cb) => {

    
        fs.readFile(p, (err, fileContent) => {
            if (err) {
               return cb([]);
            }
            cb(JSON.parse(fileContent));
        })
        
    }


module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    save() {
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            })
        });
        //const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json')
        
    }

    

    static fetchAll(cb) {
        getProductsFromFile(cb);
        
    }
}
>>>>>>> c485dc441cee64008c7918843f4a4f08a589041e
