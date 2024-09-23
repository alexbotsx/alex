let handler = async (m, { conn, usedPrefix, isOwner }) => {
let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;RengelSix9⁩;;\nFN:RengelSix9⁩\nORG:RengelSix9\nTITLE:\nitem1.TEL;waid=972527282076:5218261275256\nitem1.X-ABLabel:RengelSix9\nX-WA-BIZ-DESCRIPTION:\nX-WA-BIZ-NAME:RengelSix9⁩\nEND:VCARD`
await conn.sendMessage(m.chat, { contacts: { displayName: 'おBrayan.xyz⁩', contacts: [{ vcard }] }}, {quoted: m})
}
handler.help = ['owner']
handler.tags = ['main']
handler.command = ['owner', 'creator', 'creador', 'dueño'] 

export default handler
