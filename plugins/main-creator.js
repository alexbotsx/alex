let handler = async (m, { conn, usedPrefix, isOwner }) => {
  let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;RengelSxnt;;\nFN:RengelSxnt\nORG:RengelSxnt\nTITLE:\nTEL;waid=15798921335:5218261275256\nX-ABLabel:RengelSxnt\nEND:VCARD`
  
  await conn.sendMessage(m.chat, { 
    contacts: { 
      displayName: 'RengelSxnt', 
      contacts: [{ vcard }] 
    }
  }, { quoted: m })
}

handler.help = ['owner']
handler.tags = ['main']
handler.command = ['owner', 'creator', 'creador', 'dueño']

export default handler
