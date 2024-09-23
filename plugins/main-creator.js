let handler = async (m, { conn, usedPrefix, isOwner }) => {
  let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;RengelSix9;;\nFN:RengelSix9\nORG:RengelSix9\nTITLE:\nTEL;waid=972527282076:5218261275256\nX-ABLabel:RengelSix9\nEND:VCARD`
  
  await conn.sendMessage(m.chat, { 
    contacts: { 
      displayName: 'RengelSix9', 
      contacts: [{ vcard }] 
    }
  }, { quoted: m })
}

handler.help = ['owner']
handler.tags = ['main']
handler.command = ['owner', 'creator', 'creador', 'dueño']

export default handler
