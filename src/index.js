const axios = require('axios').default;
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports = async function App(context) {
  const contents = [];
  const roomList = [];

  await axios
    .get('https://api.ac-room.cc/list')
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

  await context.sendFlex('來看直播囉！', {
    type: 'carousel',
    contents: contents,
  });
};
