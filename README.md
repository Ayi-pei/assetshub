📦 ViteReact-Express-PostgreSQL-Supabase-Template

一、项目介绍
本项目是一个前后端分离的全栈模板，技术栈包括：

前端：Vite + React + TypeScript
后端：Node.js + Express + TypeScript
数据库：本地 PostgreSQL（未来支持 Supabase 无缝切换）
认证：JWT（未来支持 Supabase Auth）
日志与监控：自定义 Logger + Metrics
缓存：Memory Cache（未来可替换为 Redis）

二、目录结构

ViteReact-Express-PostgreSQL-Supabase-Template/
├── server/               # 后端代码（Node.js + Express + TypeScript）
├── client/              # 前端代码（Vite + React + TypeScript）
├── README.md               # 说明文档
└── .env.sample             # 环境变量样例（前后端分开配置）

三、环境变量配置

1️⃣ 后端（server/.env）

DB_USER=postgres
DB_HOST=localhost
DB_PASSWORD=你的数据库密码
DB_PORT=5432
DB_DATABASE=ayi
PORT=3000

SUPABASE_URL=https://xxxxxxxx.supabase.co
SUPABASE_ANON_KEY=你的Supabase Key
JWT_SECRET=你的JWT密钥
NETLIFY_AUTH_TOKEN=Netlify自动化部署Token
NETLIFY_SITE_ID=Netlify站点ID

2️⃣ 前端（client/.env）
VITE_API_BASE_URL=http://localhost:3000

四、启动流程
1️⃣ 启动 PostgreSQL（本地开发）
确认 PostgreSQL 已经启动，并且创建了 zhangyu 数据库。
你可以通过 pgAdmin 或 psql 连接本地数据库，执行以下 SQL：
CREATE DATABASE zhangyu;

2️⃣ 启动后端（backend）
cd server
npm install
npm run dev
后端接口地址：http://localhost:3000

3️⃣ 启动前端（frontend）
cd client
npm install
npm run dev
前端地址：http://localhost:5173

五、数据库迁移（Prisma）
（可选）本项目后端使用 Prisma 作为 ORM，首次运行或数据库结构更新时执行：

cd server
npx prisma migrate dev
六、未来切换 Supabase（兼容策略）
目前使用本地 PostgreSQL，未来切换到 Supabase 时：

修改 .env 文件中的：
DB_HOST
DB_USER
DB_PASSWORD
DB_DATABASE
替换成 Supabase 提供的连接信息，重启后端即可，代码完全兼容。

七、项目打包（ZIP）指南
最终打包文件结构
ViteReact-Express-PostgreSQL-Supabase-Template.zip
├── server/
├── client/
└── README.md
打包步骤（Windows）
选中 backend 和 frontend 文件夹。
右键 → 发送到 → 压缩（ZIP）文件。
重命名为：ViteReact-Express-PostgreSQL-Supabase-Template.zip。
八、未来生产部署建议
层	方案
后端	Docker + PM2
前端	Netlify 或 Vercel
数据库	Supabase 托管 PostgreSQL 或云服务 PostgreSQL
九、作者信息
作者：Ayi
日期：2025-03-01
备注：本模板未来支持 Supabase 无缝切换
🔗 联系方式
如对本模板有任何疑问，请联系项目负责人或提交 GitHub Issue。
cd client
npm install
npm run dev
前端运行在 http://localhost:5173

🔄 数据库迁移（可选）
项目中使用 Prisma 作为ORM，迁移命令如下：

cd server
npx prisma migrate dev
📡 切换到Supabase（未来支持）
目前支持本地PostgreSQL，未来只需：
修改 .env 里的 DB_HOST、DB_USER、DB_PASSWORD、DB_DATABASE，换成Supabase提供的。
直接重启后端即可，无需改代码，Prisma兼容Supabase。

📦 打包说明
最终打包文件
ViteReact-Express-PostgreSQL-Supabase-Template.zip
├── server/
├── client/
└── README.md

压缩命令（Windows）
选中 client 和 server 文件夹
右键 -> 发送到压缩文件
重命名为 ViteReact-Express-PostgreSQL-Supabase-Template.zip

💻 生产部署
未来上线时建议：木得
后端：Docker + PM2
前端：Netlify 或 Vercel
数据库：Supabase托管或云PostgreSQL

✍️ 作者信息
作者：Ayi-pei
时间：2025-03-03
备注：本模板未来支持Supabase无缝切换

📞 联系方式 ayi198701@gmail.com
如果对本模板有任何问题，请联系项目负责人或提交GitHub Issue。
