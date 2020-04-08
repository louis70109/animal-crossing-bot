const { router, text, route } = require('bottender/router');
const random = require('random-item');

const axios = require('axios').default;
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
async function searchList(context) {
  const contents = [];
  const roomList = [];

  await axios
    .get(`${process.env.API_URL}/list`)
    .then((res) => {
      const resp = res.data,
        roomLength = resp.length;

      for (let i = 0; i < 10; i++) {
        const rand = getRandom(0, roomLength);
        roomList.push(resp[rand]);
      }
    })
    .catch((err) => {
      console.log('Error: ', err);
      throw Error(err);
    });
  for (let j = 0; j < roomList.length; j++) {
    const element = roomList[j];
    let payload = element.note;
    let note = '';
    if (payload.length > 30) {
      note = `${payload.slice(0, 27)} ...`;
    } else if (payload.length < 30) {
      note = payload.padEnd(30, ' ');
    } else note = payload;
    let types = '';
    if (element.type) {
      types = element.type.map((el) => (types += `${el} `));
    }
    contents.push({
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
            text: `類型： ${types ? types.length > 0 : '房主沒有規定類型哦！'}`,
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
    });
  }

  await context.sendFlex('揪起來揪起來！', {
    type: 'carousel',
    contents: contents,
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
  return router([text(['查詢', '揪團'], searchList), route('*', Unknown)]);
};
