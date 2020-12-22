function messageWhenJoining(client) {
  client.on('guildCreate', (guild) => {
    let channelTarget;
    guild.channels.cache.forEach((channel) => {
      if (channel.type === 'text' && !channelTarget) {
        channelTarget = channel;
      }
    });
    channelTarget.send('Salve salve yodinha');
  });
  return client;
}

export default messageWhenJoining;
