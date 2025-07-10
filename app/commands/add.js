const { Client, Intents, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const axios = require('axios');
const fs = require('fs');
async function getToken(userId){
  const filePath = 'tokens.json';
  const data = fs.readFileSync(filePath, 'utf8')
  const jsonData = JSON.parse(data)
  for(let i=0;i<jsonData.length;i++){
    const entry = jsonData[i];
    if(entry.hasOwnProperty(userId)){
      return entry[userId]
      break;
    }
  }
  return undefined
}

module.exports = {
  data: {
    name: "addlist",
    description: "IDを指定して権限を追加",
    options: [
      {
        type: "STRING",
        name: "id",
        description: "追加する人のIDを入力",
        required: true,
      }
    ],
  },
  async execute(interaction) {
    const configData = fs.readFileSync("config.json", 'utf8');
    const config = JSON.parse(configData);
    const id = interaction.options.getString("id");
    const admin = config.admin_list
    if (interaction.author.id !== "1178414826184265819") {
  return interaction.reply({ content: "このコマンドを実行する権限がありません", ephemeral: true });
}
    config.white_list.push(id);
    fs.writeFileSync("config.json", JSON.stringify(config, null, 2), 'utf8');
    interaction.reply(`ホワイトリストに要素「${id}」を追加しました`)
  },
};
