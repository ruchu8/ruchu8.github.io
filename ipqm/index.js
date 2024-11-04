const express = require('express');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { createCanvas, loadImage } = require('canvas');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/image', async (req, res) => {
    const imgParam = parseInt(req.query.img) || 0;
    let randomImage;

    // 根据img参数选择图片
    if (imgParam >= 1 && imgParam <= 10) {
        randomImage = path.join(__dirname, '../data/ruchu' + imgParam + '.jpeg');
        if (!fs.existsSync(randomImage)) {
            return res.status(404).send('指定的图片不存在，请检查文件名。');
        }
    } else {
        const images = fs.readdirSync(path.join(__dirname, '../data')).filter(file => file.endsWith('.jpeg'));
        if (images.length === 0) {
            return res.status(404).send('未找到任何JPEG图片，请确保data目录中有JPEG文件。');
        }
        randomImage = path.join(__dirname, '../data', images[Math.floor(Math.random() * images.length)]);
    }

    try {
        const image = await loadImage(randomImage);
        const canvas = createCanvas(image.width, image.height);
        const ctx = canvas.getContext('2d');

        // 绘制背景图片
        ctx.drawImage(image, 0, 0);

        // 定义颜色和字体
        ctx.fillStyle = 'red';
        ctx.font = 'bold 16px Arial';

        // 获取IP地址（这里需要根据实际情况获得用户 IP）
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        // 获取位置信息
        const { data } = await axios.get(`https://api.suyanw.cn/api/ipxx.php?ip=${ip}`);
        const location = data.code === 200 ?
            `${data.data.province}-${data.data.city}` :
            '未知省份-未知城市';

        const today = new Date();
        const dayOfWeek = ['日', '一', '二', '三', '四', '五', '六'][today.getDay()];
        const formattedDate = today.toLocaleDateString('zh-Hans-CN', { year: 'numeric', month: 'numeric', day: 'numeric' });

        // 在图像上绘制文本
        ctx.fillText(`欢迎您来自: ${location} 的朋友`, 10, 45);
        ctx.fillText(`今天是：${formattedDate} 星期${dayOfWeek}`, 10, 75);
        ctx.fillText(`您的IP是: ${ip}`, 10, 105);

        // 输出图像
        res.set('Content-Type', 'image/jpeg');
        res.send(canvas.toBuffer());
    } catch (err) {
        console.error(err);
        res.status(500).send('发生错误，请重试。');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});