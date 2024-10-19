let handler = async (m, { conn, args, usedPrefix, command }) => {
    let isClose = { 
        'open': 'not_announcement',          // .group open
        'close': 'announcement',             // .group close
        'abrir': 'not_announcement',         // abrir grupo
        'cerrar': 'announcement',            // cerrar grupo
        'abrirgrupo': 'not_announcement',    // .grupo abrir
        'cerrargrupo': 'announcement'        // .grupo cerrar
    }[(args[0] || '').toLowerCase()]         // Permitir tanto minúsculas como mayúsculas
    if (isClose === undefined)
        return m.reply(`
🛡️ ${mssg.gpSetting}

*▢ ${usedPrefix + command} close*
*▢ ${usedPrefix + command} open*
*▢ ${usedPrefix + command} cerrar*
*▢ ${usedPrefix + command} abrir*
`)
    await conn.groupSettingUpdate(m.chat, isClose)
}
handler.help = ['group', 'grupo']
handler.tags = ['group']
handler.command = ['group', 'grupo'] // Comandos para ".group" y ".grupo"
handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler
