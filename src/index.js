const { router, text, route } = require('bottender/router');
const random = require('random-item');
const axios = require('axios');
const shuffle = require('lodash/shuffle');
const { createFlexCarouselContents } = require('./utils');
const quickReply = require('./quickReply');

async function SearchList(context) {
  const res = await axios.get(`${process.env.API_URL}/list`);
  // Take 10 rooms randomly
  const rooms = shuffle(res.data.list).slice(0, 10);
  await context.sendText('讓我幫你找找...🌀');
  await context.sendFlex(
    '揪起來揪起來！',
    {
      type: 'carousel',
      contents: createFlexCarouselContents(rooms),
    },
    quickReply(['揪團', '救救我啊我救我', '怎麼用'])
  );
}

async function SearchTags(context, { match }) {
  const tag = match.groups.tag;

  const res = await axios.get(`${process.env.API_URL}/list`);
  const hasTypesRoom = res.data.list.filter((el) => el.types.includes(tag));

  const rooms = shuffle(hasTypesRoom).slice(0, 10);
  if (rooms.length === 0) {
    await context.sendText(
      `您想找的 ${tag} 找不到，要不要試試其他的呢？ ex: 尋找 其他`,
      quickReply(['揪團'])
    );
  } else {
    await context.sendText('幫你配對到囉‼️');
    await context.sendFlex(
      '幫你配對到囉！',
      {
        type: 'carousel',
        contents: createFlexCarouselContents(rooms),
      },
      quickReply(['揪團', '救救我啊我救我', '怎麼用'])
    );
  }
}

async function HelpMe(context) {
  await context.sendText(
    `😇範例:
1. 揪團
2. 尋找 代工
第二點目前提供搜尋有👉 菜價, 櫻花, 流星, 摸摸, 代工, 交易, NPC, 其他`,
    quickReply(['揪團', '救救我啊我救我', '怎麼用'])
  );
}

async function Unknown(context) {
  await context.sendText(
    random([
      '抱歉～我不懂你在說什麼QQ',
      '輸入 "揪團" 或 "救救我啊我救我"，我就告訴你有誰開！',
      '@&*#^!@# (壞掉狀)',
      '好了好了，去打 Game 啦',
      '功能開發中，保佑作者可以早下班',
      '作者登出了 💤',
      '繼續猜啊！',
      '防疫期間妳各位還是繼續揪團好了😏',
      '多喝水蛤，別說一些我看不懂的東西！！！',
      '乖乖待在家裡別出門亂晃🤝',
    ]),
    quickReply(['揪團', '救救我啊我救我', '怎麼用'])
  );
}

module.exports = async function App() {
  return router([
    text(['救救我啊我救我', '揪團', '查詢'], SearchList),
    text(
      /^(尋找|查詢|收尋|搜尋|幫我找|想找|幫找|幫忙找|找)\s*(?<tag>[\s\S]+)/,
      SearchTags
    ),
    text(['help', 'Help', '怎麼用', '/help'], HelpMe),
    route('*', Unknown),
  ]);
};
