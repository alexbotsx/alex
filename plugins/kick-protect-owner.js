let handler = async (m, { conn, participants }) => {
    const groupAdmins = participants.filter(p => p.admin).map(p => p.id) // Obtener admins del grupo
    const ownerBot = m.conn.user.jid // Obtener el ID del owner del bot

    // Verificar si el intento de kick es contra el owner del bot
    if (m.text.includes(`${ownerBot}@s.whatsapp.net`) && !groupAdmins.includes(m.sender)) {
        await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove') // Expulsar a la persona que intentó kickear al owner
        await conn.sendMessage(m.chat, 'A dormir, no puedes expulsar al owner del bot.', { quoted: m }) // Enviar mensaje
    }
}

handler.help = ['kickprotect']
handler.tags = ['group']
handler.command = /^kickprotect$/i

handler.group = true
handler.botAdmin = true

export default handler
