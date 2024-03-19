const fs = require('fs');
const uuid = require('uuid');
const path = require('path');
const request = require('request');
const { createCanvas, loadImage, registerFont } = require('canvas');

const DEVICE_RATIO = 2;
const FONT_OSS_PATH =
  process.env.NODE_SHARE_FONT_OSS_PATH || 'https://lshm-assets.oss-cn-hangzhou.aliyuncs.com/pingfang.ttf';
const backgroundImageMap = {};

// 获取同比放大的尺寸
function getRatioSize(size) {
  return DEVICE_RATIO * size;
}

function fixUrl(url) {
  return url.startsWith('http') ? url : `https:${url}`;
}

// 绘制圆角矩形标签
function drawRoundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.arcTo(x + width, y, x + width, y + radius, radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
  ctx.lineTo(x + radius, y + height);
  ctx.arcTo(x, y + height, x, y + height - radius, radius);
  ctx.lineTo(x, y + radius);
  ctx.arcTo(x, y, x + radius, y, radius);
  ctx.closePath();
}

// canvas中文字自动换行，超出最大行数...
function splitTextToArr(ctx, str, maxWidth, maxLine = 2) {
  const arrText = str.split('');
  const lineTextArr = [];
  let line = '';
  for (let n = 0; n < arrText.length; n++) {
    line += arrText[n];
    let metrics = ctx.measureText(lineTextArr.length ? `${line}...` : line);
    let lineWidth = metrics.width;
    if (lineWidth > maxWidth && n > 0) {
      lineTextArr.push(lineTextArr.length === maxLine - 1 ? `${line}...` : line);
      if (lineTextArr.length === maxLine) break;
      line = '';
    } else if (n === arrText.length - 1) {
      lineTextArr.push(line);
    }
  }
  return lineTextArr;
}

// 绘制商详分享生成的图片
async function drawItemSharePicture(type, { itemImageUrl, itemName, itemPrice, itemUnit, groupNum }) {
  const canvasWidth = getRatioSize(295);
  const canvasHeight = getRatioSize(236);
  const offsetTop = type === 'item' ? 32 : 52;

  let currentTop = 0;
  function getCalcTop(top = 0) {
    currentTop += top;
    return getRatioSize(currentTop);
  }

  const canvas = createCanvas(canvasWidth, canvasHeight);
  const canvasCtx = canvas.getContext('2d');

  // 获取商品主图
  const itemImage = await loadImage(fixUrl(itemImageUrl));

  // 填充背景
  canvasCtx.drawImage(backgroundImageMap[type], 0, 0, canvasWidth, canvasHeight);
  // 绘制主图背景
  canvasCtx.save();
  drawRoundRect(
    canvasCtx,
    getRatioSize(32),
    getRatioSize(offsetTop),
    getRatioSize(80),
    getRatioSize(80),
    getRatioSize(6)
  );
  canvasCtx.fillStyle = '#efefef';
  canvasCtx.fill();
  // 绘制主图
  canvasCtx.clip();
  canvasCtx.drawImage(itemImage, getRatioSize(32), getRatioSize(offsetTop), getRatioSize(80), getRatioSize(80));
  canvasCtx.restore();
  // 计算商品名称行数
  const lineTextArray = splitTextToArr(canvasCtx, itemName, 90, 2);
  canvasCtx.font = `bold ${getRatioSize(14)}px custom-font`;
  canvasCtx.fillStyle = '#333';
  canvasCtx.textBaseline = 'top';
  // 绘制商品名称
  getCalcTop(offsetTop);
  lineTextArray.forEach((n, i) => {
    canvasCtx.fillText(n, getRatioSize(120), getCalcTop(20 * i));
  });
  if (type !== 'item') {
    // 绘制拼团、秒杀信息
    getCalcTop(18);
    canvasCtx.font = `${getRatioSize(10)}px custom-font`;
    canvasCtx.fillStyle = '#333';
    canvasCtx.fillText(type === 'group' ? `${groupNum}人拼团价` : '秒杀价', getRatioSize(120), getCalcTop(4));
  }
  // 绘制售价
  getCalcTop(type === 'item' ? 20 : 16);
  canvasCtx.font = `bold ${getRatioSize(16)}px custom-font`;
  canvasCtx.fillStyle = '#FF8800';
  canvasCtx.fillText(itemPrice, getRatioSize(120), getCalcTop(4));
  // 绘制单位
  canvasCtx.font = `${getRatioSize(10)}px custom-font`;
  canvasCtx.fillText(`积分/${itemUnit}`, getRatioSize(120 + canvasCtx.measureText(itemPrice).width), getCalcTop(4));

  return canvas;
}

async function pushOss(canvas, ossStore) {
  const imagePath = `share-${uuid.v4()}.jpg`;
  const stream = canvas.createPNGStream({ quality: 1 });
  const result = await ossStore.putStream(imagePath, stream);
  return result ? result.url : '';
}

function fetchFonts() {
  const exitPath = path.resolve(__dirname, '../public/font');

  if (!fs.existsSync(exitPath)) {
    fs.mkdirSync(exitPath);
  }

  const filePath = path.resolve(__dirname, '../public/font/custom-font.ttf');

  const bf = request(FONT_OSS_PATH).pipe(fs.createWriteStream(filePath));

  bf.on('close', () => {
    console.info('Custom Font download completed');
    registerFont(filePath, { family: 'custom-font' });
  });
}

function loadStaticImage() {
  loadImage('https://lshm-assets.oss-cn-hangzhou.aliyuncs.com/images/share/group-share.png').then((result) => {
    backgroundImageMap.group = result;
  });
  loadImage('https://lshm-assets.oss-cn-hangzhou.aliyuncs.com/images/share/seckill-share.png').then((result) => {
    backgroundImageMap.secKill = result;
  });
  loadImage('https://lshm-assets.oss-cn-hangzhou.aliyuncs.com/images/share/item-share.png').then((result) => {
    backgroundImageMap.item = result;
  });
}

module.exports = {
  drawItemSharePicture,
  loadStaticImage,
  fetchFonts,
  pushOss,
};
