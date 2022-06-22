const mongoose = require('mongoose');
const {categoriesData} = require('./data/categoriesData');
const {productsData} = require('./data/productsData');
const {usersData} = require('./data/usersData');
const {brandsData} = require('./data/brandsData');
const User = require('../models/userModel');
const Category = require('../models/categoryModel');
const Product = require('../models/productModel');
const Brand = require('../models/brandModel');
const database = require('../config/database');

require('dotenv').config();

database.connect();

const importData = async () => {
    try {
        await Category.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        await Brand.deleteMany();

        const createdBrands = await Brand.insertMany(brandsData);
        const createdUsers = await User.insertMany(usersData);
        await Category.insertMany(categoriesData);

        const adminUser = createdUsers[0]._id;

        const products = productsData.map((product, index) => {
            return { ...product, user: adminUser,  detail: {...product.detail, brand: createdBrands[index]._id}}
        })

        await Product.insertMany(products);

        console.log('Data Imported!')
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await Category.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        await Brand.deleteMany();

        console.log('Data Destroyed!')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}