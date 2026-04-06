const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    // Viewport mobile com escala 2x para alta qualidade
    await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2 });
    await page.goto('http://localhost:8080', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1500));
    
    // Home
    await page.screenshot({ path: '/home/ubuntu/gdinfo-site/img/tela_mobile_home_hq.png', fullPage: false });
    console.log('Mobile home HQ captured');
    
    // Produtos
    await page.evaluate(() => document.querySelector('#produtos').scrollIntoView({ behavior: 'instant' }));
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: '/home/ubuntu/gdinfo-site/img/tela_mobile_produtos_hq.png', fullPage: false });
    console.log('Mobile produtos HQ captured');
    
    // Contato
    await page.evaluate(() => document.querySelector('#contato').scrollIntoView({ behavior: 'instant' }));
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: '/home/ubuntu/gdinfo-site/img/tela_mobile_contato_hq.png', fullPage: false });
    console.log('Mobile contato HQ captured');
    
    await browser.close();
    console.log('Done!');
})();
