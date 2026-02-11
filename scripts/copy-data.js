#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 配置
const MONITOR_DATA_DIR = path.join(__dirname, '../../github-monitor/data');
const RANKING_DATA_DIR = path.join(__dirname, '../public/data');

// 确保目标目录存在
if (!fs.existsSync(RANKING_DATA_DIR)) {
  fs.mkdirSync(RANKING_DATA_DIR, { recursive: true });
}

// 复制数据文件
function copyData() {
  console.log('📋 复制排行榜数据...');

  const starSrc = path.join(MONITOR_DATA_DIR, 'star-ranking.json');
  const timeSrc = path.join(MONITOR_DATA_DIR, 'time-ranking.json');
  const starDst = path.join(RANKING_DATA_DIR, 'star-ranking.json');
  const timeDst = path.join(RANKING_DATA_DIR, 'time-ranking.json');

  if (fs.existsSync(starSrc) && fs.existsSync(timeSrc)) {
    fs.copyFileSync(starSrc, starDst);
    fs.copyFileSync(timeSrc, timeDst);
    console.log('✅ 数据复制完成！');
    console.log('');
    console.log('📊 Star 排行榜:');
    const starData = JSON.parse(fs.readFileSync(starDst, 'utf-8'));
    starData.projects.slice(0, 5).forEach((p, i) => {
      console.log(`   ${i + 1}. ${p.full_name} (${p.stars.toLocaleString()} ⭐)`);
    });
    return true;
  } else {
    console.error('❌ 数据文件不存在，请先运行监控脚本生成数据');
    return false;
  }
}

// 执行
if (require.main === module) {
  copyData();
}

module.exports = { copyData };
