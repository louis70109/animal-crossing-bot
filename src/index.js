const { router, text, route } = require('bottender/router');
const random = require('random-item');
const axios = require('axios');
const shuffle = require('lodash/shuffle');

function makeStringLength30(str) {
  if (str.length > 30) {
    return `${str.slice(0, 27)}...`;
  }

  if (str.length < 30) {
    return str.padEnd(30, ' ');
  }

  return str;
}

function createFlexCarouselContents(rooms) {
  return rooms.map((element) => {
    const note = makeStringLength30(element.note);
    const type = element.type ? element.type.join(' ') : '';

    return {
      type: 'bubble',
      body: {
        type: 'box',
        layout: 'vertical',
        spacing: 'sm',
        contents: [
          {
            type: 'text',
            text: element.room ? element.room : ' ',
            size: 'xl',
            align: 'center',
            gravity: 'top',
            weight: 'bold',
            color: '#AA1F1F',
            wrap: false,
          },
          {
            type: 'text',
            text: element.name,
            align: 'start',
            wrap: false,
          },
          {
            type: 'text',
            text: `類型： ${type ? type.length > 0 : '房主沒有規定類型哦！'}`,
            color: '#58AA29',
          },
          {
            type: 'text',
            text: `房間人數 ${element.guests}`,
            flex: 0,
            size: 'sm',
            weight: 'bold',
            color: '#139691',
            wrap: true,
          },
          {
            type: 'box',
            layout: 'baseline',
            margin: 'lg',
            contents: [
              {
                type: 'text',
                text: note,
                flex: 7,
                margin: 'xl',
                size: 'lg',
                align: 'start',
                gravity: 'center',
                weight: 'bold',
                wrap: true,
              },
              {
                type: 'spacer',
              },
            ],
          },
        ],
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        spacing: 'sm',
        contents: [
          {
            type: 'button',
            action: {
              type: 'uri',
              label: '揪團首頁',
              uri: 'https://ac-room.cc/',
            },
            color: '#4657B6',
            style: 'primary',
          },
          {
            type: 'button',
            action: {
              type: 'uri',
              label: '加入房間',
              uri: `https://ac-room.cc/${element.id}`,
            },
            color: '#18AE6D',
            style: 'primary',
          },
        ],
      },
    };
  });
}

async function SearchList(context) {
  const res = await axios.get(`${process.env.API_URL}/list`);

  // Take 10 rooms randomly
  const rooms = shuffle(res.data).slice(0, 10);

  await context.sendFlex('揪起來揪起來！', {
    type: 'carousel',
    contents: createFlexCarouselContents(rooms),
  });
}

async function Unknown(context) {
  await context.sendText(
    random([
      '抱歉～我不懂你在說什麼QQ',
      '輸入 "查詢" 或 "揪團" 我會告訴你有誰開！',
      '@&*#^!@# (壞掉狀)',
      '好了好了，去打 Game 啦',
      '功能開發中，保佑作者可以早下班',
      '作者登出了 💤',
      '繼續猜啊！',
    ])
  );
}

module.exports = async function App() {
  return router([text(['查詢', '揪團'], SearchList), route('*', Unknown)]);
};
