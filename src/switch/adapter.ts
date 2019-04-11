export const getSwitchIdFromTopic = topic => topic.split("/")[1];

export const getActionFromMessage = message => {
  const stringifiedMessage = message.toString();
  const { click } = JSON.parse(message);
  return click;
};
