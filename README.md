# BG8LXU · QSL Database Homepage

qrz.com/db/BG8LXU 的完整版 QSL 数据库主页（自建托管版）。

- **在线地址**：https://domerawind.github.io/QRZCOM/
- **QRZ 呼号页**：https://www.qrz.com/db/BG8LXU

## 这是什么

呼号 **BG8LXU**（ZHENG Xinyu · 重庆 · OL39do · CQ 24 / ITU 43）的个人 QSL 数据库主页，
中英双语，单页呈现，包含：

- 呼号主视觉与个人简介（中英双语）
- 电台设备与天线系统（协谷 G90S、UV-K6、BF-5RH、RTL-SDR V4；5.6 m GP / 1.08 m GP / 拉杆天线）
- 常用频段与模式（FT8 14/18/21 MHz、V/UHF 模拟语音与卫星/SSTV）
- ARISS SSTV 奖状存档（No. 231195 / No. 24074）
- QSL 换卡地址（国内直邮 / 国际地址，支持一键复制）
- 通联日志政策说明

## 目录结构

```
.
├── index.html          # 页面本体（单页，中英双语）
├── styles.css          # 样式
├── app.js              # 交互：一键复制地址 / 图片灯箱 / 实时 UTC 时钟
├── assets/             # 图片（QSL 卡片、奖状、头像）
├── qrz-bio-lite.html   # QRZ.com Biography 用的摘要版（备用/参考）
├── .nojekyll           # 让 GitHub Pages 跳过 Jekyll 处理
└── .github/workflows/pages.yml   # 推送即自动发布
```

## 本地预览

直接双击 `index.html` 即可（`file://` 下复制地址、灯箱、时钟均已做兼容）。
或起一个本地服务：

```bash
python -m http.server 8791
# 浏览 http://127.0.0.1:8791/
```

## 更新内容

改 `index.html` / `styles.css` / `assets/` 后推送到 `main`，GitHub Actions 会自动重新发布：

```bash
git add -A
git commit -m "update"
git push
```

## 部署说明

首次发布若 Actions 未自动运行，到仓库 **Settings → Pages**，
把 Source 设为 **GitHub Actions**（本仓库自带 `pages.yml`，比手动选分支更省事）。

## 技术说明

- **零依赖**：无框架、无 CDN、无外部字体，离线可用
- **无障碍**：语义化标签、`lang` 标注、skip link、表格 `caption` + `th scope`、
  灯箱 `role="dialog"` + Esc 关闭 + 焦点归位
- **动效降级**：遵循 `prefers-reduced-motion`
- **打印样式**：可直接"打印为 PDF"存档

## 版权

QSL 卡片摄影 © 2021 霜风DomeraWind · All rights reserved.
页面信息结构参考 [QRZ.com](https://www.qrz.com/db/BI3AR) 呼号页。
