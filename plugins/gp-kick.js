let handler = async (m, { conn, text, command }) => {
    // Comprobamos si el mensaje menciona a un usuario o si responde a un mensaje
    if (!m.mentionedJid[0] && !m.quoted) return m.reply(`✳️ ${mssg.useCmd}\n\n*${command}* @tag`);
    let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;

    // Evitamos hacer un auto kick al bot
    if (conn.user.jid.includes(user)) return m.reply(`✳️ No puedo hacer un auto kick`);

    // Procedemos a expulsar al usuario mencionado
    await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
    m.reply(`✅ ${mssg.kick}`);
}

// Permite que el comando funcione con o sin prefijo
handler.help = ['kick @user']
handler.tags = ['group']
handler.command = /^kick|ivan|expulsar$/i // Detección sin prefijo y con prefijo
handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler;
