# OpenClaw 项目排行榜

GitHub OpenClaw 相关项目的 Star 排行榜和时间排行榜。

## 功能

- ⭐ Star 排行榜：按 Star 数量排序
- ⏰ 时间排行榜：按最新更新时间排序
- 🔄 实时切换：两个排行榜可以快速切换
- 📱 响应式设计：支持移动端和桌面端
- 🌙 深色主题：现代美观的界面

## 部署到 Vercel

### 前置条件

1. Vercel 账号
2. GitHub 账号（用于代码托管）

### 部署步骤

#### 方式一：通过 Vercel CLI 部署

```bash
# 安装依赖
npm install

# 登录 Vercel
npx vercel login

# 部署
npm run deploy
```

#### 方式二：通过 Vercel Dashboard 部署

1. 将代码推送到 GitHub 仓库
2. 访问 [vercel.com/new](https://vercel.com/new)
3. 导入你的 GitHub 仓库
4. 点击 "Deploy" 按钮

## 数据更新

排行榜数据存储在 `/public/data/` 目录下：

- `star-ranking.json` - Star 排行榜数据
- `time-ranking.json` - 时间排行榜数据

数据格式：

```json
{
  "timestamp": "2026/2/11 08:00:15",
  "projects": [
    {
      "id": 1103012935,
      "full_name": "openclaw/openclaw",
      "stars": 182662,
      "forks": 30546,
      "updated_at": "2026-02-10T23:59:16Z",
      "rank": 1,
      "badge": ""
    }
  ]
}
```

### 更新数据

只需要替换 `public/data/` 目录下的 JSON 文件，重新部署即可：

```bash
# 1. 替换数据文件
cp /path/to/new/star-ranking.json public/data/
cp /path/to/new/time-ranking.json public/data/

# 2. 重新部署
npm run deploy
```

或者直接修改后推送到 GitHub，Vercel 会自动重新部署。

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

## 技术栈

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Lucide Icons

## License

MIT
