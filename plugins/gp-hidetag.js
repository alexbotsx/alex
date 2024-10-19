import MessageType from '@whiskeysockets/baileys'
import { generateWAMessageFromContent } from '@whiskeysockets/baileys'

let handler = async (m, { conn, text, participants }) => {
    let users = participants.map(u => conn.decodeJid(u.id))
    let q = m.quoted ? m.quoted : m
    let c = m.quoted ? m.quoted : m.msg

    // Obtener el tipo de mensaje y manejar diferentes casos
    let contentType = q.mtype || ''
    let content = {}

    switch (contentType) {
        case 'imageMessage': // Imágenes
            content = { imageMessage: c.toJSON() }
            break
        case 'videoMessage': // Videos
            content = { videoMessage: c.toJSON() }
            break
        case 'audioMessage': // Audios
            content = { audioMessage: c.toJSON() }
            break
        case 'stickerMessage': // Stickers
            content = { stickerMessage: c.toJSON() }
            break
        case 'documentMessage': // Documentos
            content = { documentMessage: c.toJSON() }
            break
        default: // Mensajes de texto u otros
            content = { extendedTextMessage: c.toJSON ? c.toJSON() : { text: c || '' } }
            break
    }

    const msg = conn.cMod(m.chat,
        generateWAMessageFromContent(m.chat, content, {
            quoted: m,
            userJid: conn.user.id
        }),
        text || q.text, conn.user.jid, { mentions: users }
    )

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
}

handler.help = ['hidetag']
handler.tags = ['group']
handler.command = ['hidetag', 'n', 'noti', 'aviso', 'notify'] 
handler.group = true
handler.admin = true

export default handler
