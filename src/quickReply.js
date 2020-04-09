function toTextAction(text) {
  return {
    type: 'action',
    action: {
      type: 'message',
      label: text,
      text: text,
    },
  };
}

module.exports = function quickReply(textOrTexts) {
  const texts = Array.isArray(textOrTexts) ? textOrTexts : [textOrTexts];

  return {
    quickReply: {
      items: texts.map(toTextAction),
    },
  };
};
