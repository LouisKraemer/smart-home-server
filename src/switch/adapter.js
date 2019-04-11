const getSwitchIdFromTopic = topic => topic.split("/")[1];

const getActionFromMessage = message => {
  const stringifiedMessage = message.toString();
  const { click } = JSON.parse(message);
  return click;
};

module.exports = { getSwitchIdFromTopic, getActionFromMessage };
