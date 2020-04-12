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
            weight: 'bold',
            align: 'center',
            wrap: false,
          },
          {
            type: 'box',
            layout: 'baseline',
            margin: 'lg',
            contents: [
              {
                type: 'text',
                text: '類型：',
                flex: 0,
                color: '#58AA29',
                margin: 'md',
                size: 'md',
                weight: 'bold',
                wrap: true,
              },
              {
                type: 'text',
                text: type ? type : '房主沒有規定類型哦！',
                flex: 0,
                color: '#58AA29',
                size: 'md',
                weight: 'bold',
                wrap: true,
              },
            ],
          },
          {
            type: 'box',
            layout: 'baseline',
            margin: 'md',
            contents: [
              {
                type: 'text',
                text: '島主：',
                flex: 0,
                margin: 'lg',
                size: 'md',
                weight: 'bold',
                wrap: true,
              },
              {
                type: 'text',
                text: element.name,
                flex: 0,
                size: 'md',
                weight: 'bold',
                wrap: true,
              },
            ],
          },
          {
            type: 'box',
            layout: 'baseline',
            spacing: 'xs',
            margin: 'md',
            contents: [
              {
                type: 'text',
                text: '在線等：',
                flex: 0,
                size: 'md',
                color: '#139691',
                weight: 'bold',
                wrap: true,
              },
              {
                type: 'text',
                text: `${element.guests ? element.guests : '0'}`,
                flex: 0,
                size: 'md',
                color: '#139691',
                weight: 'bold',
                wrap: true,
              },
              {
                type: 'text',
                text: ' / ',
                flex: 0,
                size: 'md',
                weight: 'bold',
                wrap: true,
              },
              {
                type: 'text',
                text: '限制：',
                flex: 0,
                color: '#AA1F1F',
                size: 'md',
                weight: 'bold',
                wrap: true,
              },
              {
                type: 'text',
                text: `${element.limit ? element.limit : '0'}`,
                flex: 0,
                color: '#AA1F1F',
                size: 'md',
                weight: 'bold',
                wrap: true,
              },
            ],
          },
          {
            type: 'text',
            text: note,
            flex: 0,
            size: 'xl',
            weight: 'bold',
            color: '#DF6B6B',
            wrap: true,
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
              label: '來去揪團',
              uri: 'https://ac-room.cc/',
            },
            color: '#4657B6',
            style: 'primary',
          },
          {
            type: 'button',
            action: {
              type: 'uri',
              label: '加入這座島',
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
