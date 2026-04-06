const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 375, height: 812 });
    await page.goto('http://localhost:8080', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: '/home/ubuntu/gdinfo-site/img/tela_mobile_home.png', fullPage: false });
    console.log('Mobile home captured');
    
    // Scroll to products
    await page.evaluate(() => document.querySelector('#produtos').scrollIntoView());
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: '/home/ubuntu/gdinfo-site/img/tela_mobile_produtos.png', fullPage: false });
    console.log('Mobile produtos captured');
    
    // Scroll to contact
    await page.evaluate(() => document.querySelector('#contato').scrollIntoView());
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: '/home/ubuntu/gdinfo-site/img/tela_mobile_contato.png', fullPage: false });
    console.log('Mobile contato captured');
    
    await browser.close();
    console.log('Done!');
})();
