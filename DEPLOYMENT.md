# OpenClaw 项目排行榜 - 部署指南

## 📊 网站概览

网站已经创建完成！包含以下功能：

- ✅ Star 排行榜（显示排名、项目名、Star数、Fork数、简介、徽章）
- ✅ 时间排行榜（显示排名、项目名、最新更新时间、Star数、简介）
- ✅ 两个排行榜可以快速切换
- ✅ 深色主题，现代美观设计
- ✅ 响应式布局（支持移动端）
- ✅ 数据更新机制（只需替换 JSON 文件）

## 🚀 部署到 Vercel

### 需要提供的信息

1. **Vercel 账号** - 用于部署
2. **GitHub 仓库** - 用于托管代码（可选，但推荐）

### 方式一：快速部署（推荐）

如果你有 Vercel 账号和 GitHub 仓库：

1. 将代码推送到 GitHub：
```bash
cd /Users/ronglecat/.openclaw/workspace/openclaw-ranking

# 创建 GitHub 仓库（如果没有的话）
# 然后添加远程仓库
git remote add origin https://github.com/your-username/openclaw-ranking.git

# 推送代码
git push -u origin main
```

2. 访问 https://vercel.com/new
3. 导入你的 GitHub 仓库
4. 点击 "Deploy" 按钮
5. 等待部署完成（约 1-2 分钟）

### 方式二：通过 CLI 部署

1. 安装 Vercel CLI：
```bash
npx vercel login
```

2. 在项目目录运行：
```bash
cd /Users/ronglecat/.openclaw/workspace/openclaw-ranking
npm run deploy
```

3. 按提示操作即可

## 📝 数据更新方式

### 方式一：手动替换文件

每次排行榜更新后，只需替换 `public/data/` 目录下的 JSON 文件：

```bash
# 1. 复制最新数据
cp /Users/ronglecat/.openclaw/workspace/github-monitor/data/star-ranking.json \
   /Users/ronglecat/.openclaw/workspace/openclaw-ranking/public/data/
cp /Users/ronglecat/.openclaw/workspace/github-monitor/data/time-ranking.json \
   /Users/ronglecat/.openclaw/workspace/openclaw-ranking/public/data/

# 2. 重新部署
npm run deploy
```

### 方式二：自动脚本（更推荐）

修改监控脚本，在生成报告后自动复制数据到排行榜网站目录：

```bash
# 在 monitor.js 中添加
fs.copyFileSync(
  path.join(DATA_DIR, 'star-ranking.json'),
  path.join('/Users/ronglecat/.openclaw/workspace/openclaw-ranking/public/data', 'star-ranking.json')
);
fs.copyFileSync(
  path.join(DATA_DIR, 'time-ranking.json'),
  path.join('/Users/ronglecat/.openclaw/workspace/openclaw-ranking/public/data', 'time-ranking.json')
);
```

然后添加自动部署命令：

```bash
# 修改 package.json
"scripts": {
  "update-and-deploy": "cp /Users/ronglecat/.openclaw/workspace/github-monitor/data/*.json public/data/ && npm run deploy"
}
```

每次监控完成后运行：
```bash
npm run update-and-deploy
```

## 📁 项目结构

```
openclaw-ranking/
├── app/
│   ├── components/
│   │   └── ProjectCard.tsx    # 项目卡片组件
│   ├── globals.css               # 全局样式
│   ├── layout.tsx               # 根布局
│   ├── page.tsx                 # 主页面
│   └── types.ts                 # 数据类型定义
├── public/
│   └── data/
│       ├── star-ranking.json     # Star 排行榜数据
│       └── time-ranking.json     # 时间排行榜数据
├── package.json
├── next.config.js
├── tailwind.config.ts
└── README.md
```

## 🎨 自定义样式

如需修改样式，编辑以下文件：

- `app/globals.css` - 全局样式和主题变量
- `tailwind.config.ts` - Tailwind 配置和主题色
- `app/components/ProjectCard.tsx` - 项目卡片样式

## 📱 预览

本地预览：
```bash
cd /Users/ronglecat/.openclaw/workspace/openclaw-ranking
npm run dev
```

访问 http://localhost:3000

## 🔗 部署后的链接

部署完成后，Vercel 会提供一个链接，类似：
- `https://openclaw-ranking.vercel.app`
- `https://openclaw-ranking-xxx.vercel.app`

你可以将这个链接添加到监控脚本中，每次更新后通知你。

## 💡 后续操作流程

1. 定期监控脚本自动运行（每天）
2. 数据自动生成到 `github-monitor/data/`
3. 运行 `npm run update-and-deploy` 复制数据并部署
4. 网站自动更新，无需手动修改代码

---

**需要我帮你部署吗？请提供以下信息：**

1. 是否已经有 Vercel 账号？
2. 是否需要创建 GitHub 仓库？
3. 更新数据时，是需要手动还是自动部署？
