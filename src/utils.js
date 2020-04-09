function makeStringLength30(str) {
  if (str === null) {
    return str;
  }

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
    const type = element.types ? element.types.join(' ') : '無';
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
            text: `類型：${type ? type : '房主沒有規定類型哦！'}`,
            color: '#58AA29',
          },
          {
            type: 'text',
            text: `房間人數: ${element.guests ? element.guests : '0'}`,
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

module.exports = { createFlexCarouselContents };
