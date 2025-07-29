// ProductListingPage.js
// POM Page for Saucedemo Product Listing, Login, Cart, and Checkout
// https://playwright.dev/docs/pom
const { expect } = require('@playwright/test');

class ProductListingPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.selectors = {
            username: '#user-name',
            password: '#password',
            loginBtn: '#login-button',
            inventoryList: '.inventory_list',
            addToCartBtn: '.inventory_item .btn_inventory',
            cartIcon: '.shopping_cart_link',
            checkoutBtn: '#checkout',
            firstName: '#first-name',
            lastName: '#last-name',
            zipCode: '#postal-code',
            continueBtn: '#continue',
            finishBtn: '#finish',
            successMsg: '.complete-header'
        }
    }
    // Login method
    async login(username, password, utils) {
        utils.logStep('Intent: Login with credentials', `Action: Fill username and password, click login (username: ${username})`);
        await this.page.fill(this.selectors.username, username);
        await this.page.fill(this.selectors.password, password);
        await this.page.click(this.selectors.loginBtn);
        await this.page.waitForSelector(this.selectors.inventoryList, { state: 'visible' });
        utils.logStep('Observed Result', 'Inventory page loaded after login.');
    }
    // Add first available product to cart
    async addFirstProductToCart(utils) {
        utils.logStep('Intent: Add a product to cart', 'Action: Click first inventory add-to-cart button');
        await this.page.click(this.selectors.addToCartBtn);
        utils.logStep('Observed Result', 'Product added to cart.');
    }
    // Go to cart
    async goToCart(utils) {
        utils.logStep('Intent: Go to cart page', 'Action: Click cart icon');
        await this.page.click(this.selectors.cartIcon);
        await this.page.waitForSelector(this.selectors.checkoutBtn, { state: 'visible' });
        utils.logStep('Observed Result', 'Cart page loaded.');
    }
    // Begin checkout
    async checkout(firstName, lastName, zip, utils) {
        utils.logStep('Intent: Checkout process', 'Action: Click checkout, fill user info');
        await this.page.click(this.selectors.checkoutBtn);
        await this.page.fill(this.selectors.firstName, firstName);
        await this.page.fill(this.selectors.lastName, lastName);
        await this.page.fill(this.selectors.zipCode, zip);
        await this.page.click(this.selectors.continueBtn);
        utils.logStep('Observed Result', 'User entered info and continued to order overview.');
    }
    // Finish order
    async finishCheckout(utils) {
        utils.logStep('Intent: Complete checkout', 'Action: Click finish');
        await this.page.click(this.selectors.finishBtn);
        await this.page.waitForSelector(this.selectors.successMsg, { state: 'visible' });
        utils.logStep('Observed Result', 'Checkout/success page confirmed!');
    }
}
module.exports = { ProductListingPage };