# 🌌《流浪地球 · 行星推进全局遥测终端与轨道空间枢纽》
### THE EARTH MIGRATION PROJECT // UEG PLANETARY COMMAND DOCK (v2.1.0)

[![Vue 3](https://img.shields.io/badge/Vue-3.4.21-42b883?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4.2-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.162.0-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.2.0-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> **AAA 级硬科幻工业美术规范 · 全流程三维数字孪生与电影级运镜编排**  
> 采用统一天体比例尺（`EARTH_RADIUS = 100`）、程序化 PBR 工业级材质渲染管线、物理三维日全食与多米诺行星发动机矩阵点火。  
> **零外部三维资产依赖** · **零外部音频文件依赖** · **纯算法实时合成太空交响 BGM**

---

## 🌟 核心技术亮点与架构设计

### 1. 统一宇宙空间比例尺（Unified Space Coordinates）
- **宏观地球**：基准半径 $R = 100$，斜前方主光源 `(220, 100, 200)` 照亮正面 **70% 冰封大陆与海洋**，夜半球金色地下城脉络与工业动脉清晰可见。
- **强化版等离子激光巨柱**：主力推进矩阵每束激光直径加粗 2.2 倍、高度拉升至 24~25 单位，配备 10 节超音速马赫激波环与喉部高能聚变星芒耀斑（Nozzle Star-Flare）。
- **防穿模球面大圆航线运镜**：两点间飞行如果路径低于地表外包络安全半径 $R < 115$，相机自动切入球面外大圆弧线绕飞，100% 杜绝穿模穿透地心。

### 2. 8 大高精度 3D 机械实体模型
1. **EARTH (地球全景)**：高反照率冰川白/冰晶蓝大陆、纯白立体蓬松云层、双层瑞利散射大气光环。
2. **ENGINE ARRAY 01 (一号推进阵列)**：$160 \times 160$ 贴合地球曲率的多倍频雪山山脊地形；18 座野兽派重聚变巨塔（垂直肋片、暖黄检修走廊、液压斜撑巨腿、凹陷七联装等离子喷口）。
3. **EQUATORIAL (赤道转向阵列)**：赤道装甲壕沟与万向节双耳轴支架，20° 切向喷射环绕赤道的光河。
4. **ANCHOR (加蓬太空电梯要塞)**：冰封海面八角重装要塞、8 座交叉金属桁架发射脐带塔、电磁感应导轨与攀爬轿厢。
5. **TIANZHU (天柱号同步轨道配重站)**：$R = 142$ 地球同步轨道，拉丝钛合金桁架、金色 Kapton 隔热膜、双层反向旋转离心重力环、8 幅双折蓝宝石硅光伏翼。
6. **HABITAT (极光号双环旋转殖民城)**：$R = 158$ 倾斜高轨，倒角白色钛装甲、12 辐条交通网、零重力船坞与内环暖金城市带。
7. **DEEP SPACE (深空太阳帆激光中继网)**：5 艘 JWST 风格 18 镜片蜂窝镀金主镜探测器、5 层菱形太阳帆隔热膜与脉冲激光数据链路。
8. **LUNA (月球放逐工程)**：$R = 27$ 高对比度陨石坑月球、静海 3 座巨型核聚变放逐发动机与月尘碎石扬尘粒子。

### 3. 三幕宽银幕史诗序列（电影镜头）
- **Chapter I (`THE DYING SUN`)**：3D 沸腾红巨星太阳 $\rightarrow$ 镜头横掠切入地球本影锥 $\rightarrow$ 真实 3D **钻石环日全食（Total Solar Eclipse）**与蓝宝石大气轮廓。
- **Chapter II (`IGNITION`)**：俯冲切入雪山峡谷，18 座重型发动机从近景到远山上演**多米诺骨牌式蓄力点火**，等离子光柱刺穿平流层。
- **Chapter III (`TURNING THE WORLD`)**：穿出云层，全球 3,600 座推进阵列按大陆板块波浪式依次点亮，随后掠过赤道切向转向发动机光河。

### 4. 音效与太空史诗交响 BGM 引擎
- **Web Audio 振荡器和弦合成**：内置 Hans Zimmer / 《流浪地球》风格 D 小调多声部史诗太空交响合成器（深空低音 Drone + 太空管风琴长音 Pad + 水晶星空琶音，和弦进行 Dm9 -> Bbmaj7 -> Gm7 -> A7）。
- **右上角独立总控**：`🎵 BGM: ON/OFF` 独立开关，支持随时静音或开启；在触发“春节十二响”或“JOURNEY 史诗航程”时智能联动激昂升温。
- **双语智能语音**：Web Speech API 智能双语朗读播报（自动适配 `ENG / 中文`）。

---

## 📂 项目结构

```
wandering-earth-hub/
├── src/
│   ├── core/
│   │   ├── EarthSceneEngine.ts       # Three.js 核心引擎、后处理发光、电影运镜
│   │   ├── MegaStructuresBuilder.ts  # 8大巨构建模、程序化 PBR 材质贴图、激光 Shader
│   │   ├── PhysicsTelemetry.ts       # 牛顿引力物理模拟、航行状态机、雷达航迹推算
│   │   └── SoundEngine.ts            # Web Audio 纯算法交响 BGM 与音效合成器
│   ├── styles/                       # 550W 终端科幻 UI 样式规范
│   ├── App.vue                       # 主终端控制台界面、空间节点投影准星
│   └── main.ts                       # 应用入口
├── index.html                        # 主 HTML 模版
├── package.json                      # 项目元数据与依赖
├── tsconfig.json                     # TypeScript 严格配置
├── vite.config.ts                    # Vite 极速构建配置
├── 项目功能说明文档.md                # 综合大作业项目详细功能说明文档
├── LICENSE                           # MIT 开源协议
└── README.md                         # 项目工程说明文档
```

---

## 🚀 启动与运行

```bash
# 1. 安装依赖 (若未安装)
npm install

# 2. 启动开发服务器 (支持局域网访问)
npm run dev

# 3. 生产环境打包构建
npm run build
```

访问地址：[http://localhost:5173/](http://localhost:5173/)

---

## 📄 课程大作业提交说明

本仓库为【综合应用项目】—— **任务四：在类似 GITHUB 等公开平台，发布自己的项目（★★★★★ 五星任务）** 的完整源码与交付物仓库。

- 完整功能文档详见：[项目功能说明文档.md](项目功能说明文档.md)
- 协议：MIT License
