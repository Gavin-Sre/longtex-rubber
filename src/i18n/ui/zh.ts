// Structure must match en.ts exactly — TypeScript will flag any missing/extra keys.
import type { UIDict } from "./en";

const zh: UIDict = {
  common: {
    siteName: "Longtex Rubber Industry Co., Ltd.",
    siteShortName: "Longtex Rubber Industry",
    address:
      "121/32 Moo 8 Soi Suksawad 74, Suksawad Rd., Bangkru, Prapradaeng, Samutprakarn 10130 Thailand.",
    copyright: "© {year} Longtex Rubber Industry Co., Ltd.",
    backToTop: "返回顶部",
  },
  nav: {
    home: "首页",
    about: "关于我们",
    products: "产品",
    applications: "应用领域",
    reference: "技术参考",
    contact: "联系我们",
  },
  langSwitcher: {
    label: "语言",
  },
  home: {
    seo: {
      title: "泰国天然橡胶线制造商 | Longtex - ISO 认证",
      description:
        "泰国领先的天然橡胶线制造商。通过 ISO 认证的硅胶涂层、滑石粉涂层、食品级挤压橡胶线，适用于纺织、医疗及工业领域，全球出口。",
      keywords:
        "泰国橡胶线制造商, 天然乳胶线, 硅胶橡胶线, 滑石粉涂层线, 食品级橡胶线, 泰国弹性线",
    },
    hero: {
      title: "Longtex Rubber Industry",
      subtitle: "正在寻找高品质挤压橡胶线？我们来帮您！",
      cta: "联系我们",
      imageAlt: "割胶",
    },
    about: {
      title: "关于我们",
      body: "隆特斯橡胶实业有限公司（Longtex Rubber Industry Co., Ltd.）成立于 1984 年，是一家总部位于泰国的高品质挤压天然橡胶线制造商和全球出口商。凭借每月 1,500 吨的产能，我们向全球纺织、医疗、体育和工业客户供应硅胶涂层、滑石粉涂层、食品级及特种橡胶线。我们的产品通过 ISO 和 OekoTex 国际标准认证，拥有 40 多年的制造经验，并致力于以可再生能源驱动的可持续生产。",
      stats: {
        established: "成立年份",
        capacity: "月产能",
        certified: "OekoTex 认证",
        expertise: "行业经验",
      },
      cta: "了解更多关于我们",
    },
    products: {
      title: "我们的产品",
      cta: "探索我们的产品",
      cards: {
        silicone: { title: "硅酮", alt: "硅胶橡胶线" },
        talcum: { title: "滑石粉", alt: "滑石粉涂层橡胶线" },
        foodgrade: { title: "食品级", alt: "食品级橡胶线" },
        specialized: {
          title: "专用线程",
          alt: "特种橡胶线",
        },
      },
    },
    certifications: {
      title: "认证",
      body: "通过 ISO 认证。为您的供应链提供值得信赖的品质与稳定性。",
    },
    contact: {
      title: "携手合作",
      body: "准备好开始了吗？请与我们联系，我们会尽快回复您。",
      cta: "联系我们",
    },
  },
  products: {
    seo: {
      title: "我们的产品 | 天然橡胶线 | Longtex",
      description:
        "泰国领先的天然橡胶线制造商。滑石粉涂层、硅胶涂层及食品级挤压橡胶线，支数 20–110，通过 ISO 认证。",
      keywords:
        "滑石粉涂层橡胶线, 硅胶橡胶线, 食品级橡胶线, 泰国天然乳胶线",
    },
    pageTitle: "我们的产品",
    sections: {
      talcum: "滑石粉涂层",
      silicone: "硅胶涂层",
      foodgrade: "食品级橡胶",
      specialized: "专用线程",
    },
    placeholderText:
      "特种橡胶线（抗紫外线、阻燃、定制颜色等）的规格和图片即将在此发布。",
    table: {
      count: "支数",
      packaging: "包装（公斤/箱）",
      color: "颜色",
      elongation: "断裂伸长率",
      black: "黑色",
      white: "白色",
    },
    applicationsTitle: "产品应用",
    storage: {
      title: "如何正确储存挤压橡胶线",
      intro:
        "为保持挤压橡胶线的耐用性和最佳性能，采用正确的储存方法至关重要。",
      tips: [
        "将挤压橡胶线储存在温度和湿度稳定的环境中，建议温度为 15 至 25 摄氏度。",
        "避免橡胶线受阳光直射，以防对其性能产生不利影响。",
        "堆叠不超过四层，以避免变形并保持原有形状。",
        "采用「先进先出」的库存管理方式，以确保产品新鲜度。",
        "储存时避免混合不同批次，以保持品质稳定一致。",
        "在四个月内使用产品，以获得最佳品质。",
        "储存箱保持竖直放置，以防止处理不当或损坏。",
      ],
    },
  },
  reference: {
    seo: {
      title: "技术参考 | Longtex 橡胶线",
      description:
        "Longtex 天然橡胶线的尺寸、直径、面积和产率参考（基于公布的密度）。",
      keywords:
        "橡胶线尺寸表, 线产率 米/公斤, 橡胶线直径参考, Longtex 规格",
    },
    pageTitle: "技术参考",
    section: {
      title: "线材尺寸与产率",
      intro:
        "挤压橡胶线的传统技术表格：支数（尺寸）、直径、横截面积和产率。所列数值为公布值，供规划和换算参考；关键尺寸请与您的 Longtex 代表确认。",
      tableTitle: "Longtex 橡胶线的尺寸、直径和产率",
      density: "密度 = 1.02(g/mm²)",
      conversionTitle: "换算表",
    },
    headers: {
      size: "尺寸",
      diaMm: "直径 (毫米)",
      diaIn: "直径 (英寸)",
      area: "面积 (mm²)",
      yieldMkg: "产率 (米/公斤)",
      yieldYdLb: "产率 (码/磅)",
    },
  },
  about: {
    seo: {
      title:
        "关于 Longtex Rubber Industry | 成立于 1984 年 | 泰国橡胶线制造商",
      description:
        "隆特斯橡胶实业成立于 1984 年，每月生产 1,500 吨通过 ISO 和 OekoTex 认证的挤压天然橡胶线。了解我们的使命、产能、研发和可持续发展。",
      keywords:
        "关于 Longtex, 泰国橡胶线制造商, 成立于1984年, 1500吨橡胶线, OekoTex认证橡胶线, ISO橡胶线制造商, 泰国可持续橡胶制造商",
    },
    hero: {
      eyebrow: "成立于 1984 年 · 泰国",
      titleLine1: "四十年专注挤压",
      titleLine2: "天然橡胶线",
      body: "Longtex Rubber Industry 是一家总部位于泰国的挤压天然橡胶线制造商，通过 ISO 和 OekoTex 认证，40 多年来一直为全球纺织、医疗、体育和工业客户供货。",
    },
    stats: {
      yearFounded: "成立年份",
      capacity: "月产能",
      expertise: "行业经验",
      certified: "OekoTex 认证",
    },
    breadcrumbHome: "首页",
    breadcrumbAbout: "关于我们",
    sections: {
      mission: {
        eyebrow: "传承",
        title: "使命与价值观",
        body: "隆特斯橡胶实业成立于 1984 年，一直是值得信赖的高品质挤压天然橡胶线制造商和出口商，将产品从泰国销往世界各地的客户。秉承对品质、可靠性和持续改进的承诺，我们致力于以稳定和精准的方式交付满足客户需求的产品。\n\n通过先进的制造技术、可持续的运营以及持续发展的文化，我们确保每一米线材都体现我们对高品质、准时交付和可靠价值的承诺。",
        quote:
          '"坚持高品质标准，确保准时交付，提供合理价格，满足客户需求，并追求持续改进。"',
        quoteLabel: "质量方针",
        imageAlt:
          "隆特斯橡胶实业团队在泰国天然橡胶线制造工厂（成立于 1984 年）。",
      },
      capacity: {
        eyebrow: "规模",
        title: "生产能力",
        body: "Longtex 以其在挤压橡胶线制造方面的悠久历史和专业技术而自豪。自 1984 年成立以来，我们实现了指数级增长，从每月 200 吨的产能发展到令人瞩目的每月 1,500 吨。这一显著扩张证明了我们对持续改进和满足全球市场日益增长需求的执着追求。",
        imageAlt:
          "Longtex 泰国挤压橡胶线生产工厂的天然乳胶储罐，支持每月 1,500 吨产能。",
      },
      rd: {
        eyebrow: "创新",
        title: "研发",
        body: "在隆特斯橡胶实业，我们的制造能力源于拥有深厚技术知识和专业能力的优秀团队。我们经验丰富的专业人员对橡胶线制造技术有着深刻的理解，使我们能够生产出始终满足或超越客户期望的优质产品。我们培育灵活与创新的文化，使我们能够适应不断变化的市场趋势，为尊贵的客户提供定制化解决方案。",
        imageAlt:
          "Longtex 实验室技术人员在泰国对挤压天然橡胶线样品进行质量研发。",
      },
      standards: {
        eyebrow: "信任",
        title: "国际标准",
        body: "我们将成功归因于对运营各方面品质的不懈追求。我们对提升产品品质的承诺促成了健全的质量管理体系。我们自豪地持有享有盛誉的 OekoTex 证书，确保我们的橡胶线符合严格的国际安全和可持续发展标准。此外，我们还根据客户需求进行各种测试，以提供满足特定要求的量身定制解决方案。",
        imageAlt:
          "Longtex 生产车间展示通过 ISO 和 OekoTex 认证的橡胶线制造安全与质量标准。",
      },
      green: {
        eyebrow: "可持续发展",
        title: "绿色环保",
        body: "在 Longtex，我们努力将环境足迹降至最低，并最大化积极影响。我们正在将可再生能源——太阳能和沼气发电机——融入生产流程，以提高能源效率。通过利用太阳能，并将生产废料转化为电力，我们得以减少碳足迹，为创造一个更清洁、更绿色的地球贡献力量。",
        imageAlt:
          "屋顶太阳能电池板为泰国 Longtex 工厂的可持续橡胶线制造提供电力。",
      },
    },
    cta: {
      title: "准备好与我们合作了吗？",
      body: "探索我们通过 ISO 认证的全系列橡胶线产品，或与我们的团队联系。",
      primary: "探索产品",
      secondary: "联系我们",
    },
  },
  applications: {
    sports: {
      title: "体育行业",
      description:
        "腰带、压缩紧身裤、蹦极绳以及在反复受力下需要稳定弹性的高性能运动服。",
    },
    food: {
      title: "食品行业",
      description:
        "食品级橡胶用于肉类网套、鸡肉扎环和包装，安全与卫生合规不容妥协。",
    },
    socks: {
      title: "袜口",
      description: "为袜口精心设计的细支橡胶线，提供持久的贴合力。",
    },
    packaging: {
      title: "包装",
      description: "为多用途工业和零售包装应用而打造的编织绳和绳索。",
    },
    medical: {
      title: "医疗产品",
      description:
        "外科口罩、骨科针织品、压缩袜以及医用级弹性制品。",
    },
  },
};

export default zh;
