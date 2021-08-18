const generateNotification = (user_uuid, message) => ({
    user_uuid,
    message,
    createdAt: new Date().getTime(),
  });

  const generateMessage = (user, message_uuid,  message) => ({
    user,
    message_uuid,
    message,
    createdAt: new Date().getTime(),
  });
  
  const responseMessage = (status, message) => ({
    status,
    message,
  });
  
  module.exports = {
    generateNotification,
    responseMessage,
    generateMessage
  };