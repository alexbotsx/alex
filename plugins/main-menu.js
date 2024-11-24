import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'

const defaultMenu = {
  before: `
╭━━━━━〔 𝐑𝐄𝐍𝐆𝐄𝐋 𝐌𝐄𝐋𝐇𝐎𝐑 𝐁𝐎𝐓 〕━━━◉
┣┅⟣───────────────────
┣┅⟣ ׁ⿴⃟ٍࣽ❖᪶۫۫ 𝙃𝙊𝙇𝘼 *%name*
┣┅⟣ ׁ⿴⃟ٍࣽ❖᪶۫۫ 𝙉𝙄𝙑𝙀𝙇 : *%level* 
┣┅⟣ ׁ⿴⃟ٍࣽ❖᪶۫۫ 𝙐𝙎𝙐𝘼𝙍𝙄𝙊𝙎 : %totalreg
┣┅⟣ ׁ⿴⃟ٍࣽ❖᪶۫۫ 𝙏𝙄𝙀𝙈𝙋𝙊 𝘼𝘾𝙏𝙄𝙑𝙊 : %muptime
┣┅━━━━━━━━━━━━━━━━━━━━━━⟣
┣┅⟣ 𝐑𝐄𝐍𝐆𝐄𝐋: +66959353791
┣┅⟣───────────────────
╰━━━━━━━━━━━━━━━━━━━━━◉
%readmore
─✹╌╌╌╌═⊱𖧷⊰⊰⊰⊱⊱⊱✹⊰═╌╌╌╌𖧷

┏━━━━━━━━━━━━━━━━━━━━┓
┃ ⏤͟͟͞ *𝑳𝑰𝑺𝑻𝑨 𝑫𝑬 𝑴𝑬𝑵𝑼𝑺*
┗━━━━━━━━━━━━━━━━━━━━
`.trimStart(),
  after: `
┏━━━━━━━━━━━━━━━━━━━━┓
┣┅⟣ ❒ .info
┣┅⟣ ❒ .owner
┣┅⟣ ❒ .speed
┣┅⟣ ❒ .support
┣┅⟣ ❒ .help
┗━━━━━━━━━━━━━━━━━━━━
 
┏━━━━━ JUEGOS ━━━━┓
┣┅⟣ ❒ .dado
┣┅⟣ ❒ .mates <modo>
┣┅⟣ ❒ .ppt 
┣┅⟣ ❒ .slot <apuesta>
┣┅⟣ ❒ .qc <text>
┣┅⟣ ❒ .doxear @tag
┣┅⟣ ❒ .follar @tag
┣┅⟣ ❒ .formarparejas
┗━━━━━━━━━━━━━━━━━━━━
┏━━━━━━NIVEL & ECONOMIA━━━━━┓
┣┅⟣ ❒ .balance
┣┅⟣ ❒ .buy
┣┅⟣ ❒ .daily
┣┅⟣ ❒ .leaderboard
┣┅⟣ ❒ .levelup
┣┅⟣ ❒ .mine
┣┅⟣ ❒ .transfer [tipo] [monto] [@tag]
┣┅⟣ ❒ .weekly
┣┅⟣ ❒ .work
┗━━━━━━━━━━━━━━━━━━━┛
┏━━━━━━REGISTRO━━━━━┓
┣┅⟣ ❒ .reg <nombre.edad.género>
┣┅⟣ ❒ .mysn
┣┅⟣ ❒ .unreg <Num Serie>
┗━━━━━━━━━━━━━━━━━━━┛
┏━━━━━━STICKER━━━━━┓
┣┅⟣ ❒ .qc <text>
┣┅⟣ ❒ .attp <text>
┣┅⟣ ❒ .emojimix <emoji+emoji> (ⓓ)
┣┅⟣ ❒ .getsticker (ⓓ)
┣┅⟣ ❒ .smaker (ⓓ)
┣┅⟣ ❒ .sticker
┣┅⟣ ❒ .telestick
┣┅⟣ ❒ .toimg <sticker>
┣┅⟣ ❒ .tovid
┣┅⟣ ❒ .trigger <@user>
┣┅⟣ ❒ .ttp <text>
┣┅⟣ ❒ .take <nombre>|<autor>
┣┅⟣ ❒ .tourl <reply image>
┗━━━━━━━━━━━━━━━━━━━┛
┏━━━━━━IMAGEN━━━━━┓
┣┅⟣ ❒ .tvid (ⓓ)
┣┅⟣ ❒ .couple (ⓓ)
┣┅⟣ ❒ .imagen (ⓓ)
┣┅⟣ ❒ .girl (ⓓ)
┣┅⟣ ❒ .meme
┣┅⟣ ❒ .person
┣┅⟣ ❒ .pinterest
┣┅⟣ ❒ .wallpaper (ⓓ)
┗━━━━━━━━━━━━━━━━━━━┛
┏━━━━━━MAKER━━━━━┓
┣┅⟣ ❒ .logololi (ⓓ)
┣┅⟣ ❒ .graffiti2 (ⓓ)
┣┅⟣ ❒ .3dbox (ⓓ)
┣┅⟣ ❒ .future (ⓓ)
┣┅⟣ ❒ .ninja (ⓓ)
┣┅⟣ ❒ .marvel (ⓓ)
┣┅⟣ ❒ .paper (ⓓ)
┣┅⟣ ❒ .glitch (ⓓ)
┣┅⟣ ❒ .halloween (ⓓ)
┣┅⟣ ❒ .green (ⓓ)
┣┅⟣ ❒ .american (ⓓ)
┣┅⟣ ❒ .neon (ⓓ)
┣┅⟣ ❒ .devil (ⓓ)
┣┅⟣ ❒ .wolf (ⓓ)
┣┅⟣ ❒ .phlogo (ⓓ)
┣┅⟣ ❒ .transformer (ⓓ)
┣┅⟣ ❒ .thunder (ⓓ)
┣┅⟣ ❒ .graffiti (ⓓ)
┣┅⟣ ❒ .bpink (ⓓ)
┣┅⟣ ❒ .joker (ⓓ)
┣┅⟣ ❒ .matrix (ⓓ)
┣┅⟣ ❒ .glow (ⓓ)
┣┅⟣ ❒ .ballon (ⓓ)
┣┅⟣ ❒ .dmd (ⓓ)
┣┅⟣ ❒ .lightglow (ⓓ)
┗━━━━━━━━━━━━━━━━━━━┛
┏━━━━━━PREMIUM━━━━━┓
┣┅⟣ ❒ .gdrive (ⓓ)
┣┅⟣ ❒ .mediafire <url> (ⓓ)
┣┅⟣ ❒ .xnxx (ⓓ)
┗━━━━━━━━━━━━━━━━━━━┛
┏━━━━━━GRUPO━━━━━┓
┣┅⟣ ❒ .n / noti 
┣┅⟣ ❒ .fantasmas
┣┅⟣ ❒ .del <mensaje>
┣┅⟣ ❒ .delwarn @user
┣┅⟣ ❒ .demote (@tag)
┣┅⟣ ❒ .infogp
┣┅⟣ ❒ .hidetag
┣┅⟣ ❒ .kick @user
┣┅⟣ ❒ .link
┣┅⟣ ❒ .profile
┣┅⟣ ❒ .promote
┣┅⟣ ❒ .rules
┣┅⟣ ❒ .setbye <text>
┣┅⟣ ❒ .setrules <text>
┣┅⟣ ❒ .group
┣┅⟣ ❒ .grupo
┣┅⟣ ❒ .setwelcome <text>
┣┅⟣ ❒ .setbye <text>
┣┅⟣ ❒ .simulate <event> @user
┣┅⟣ ❒ .staff
┣┅⟣ ❒ .totag
┣┅⟣ ❒ .warn @user
┣┅⟣ ❒ .warns
┣┅⟣ ❒ .tagall <mensaje>
┣┅⟣ ❒ .invocar <mensaje>
┣┅⟣ ❒ .checkexpired
┗━━━━━━━━━━━━━━━━━━━┛
┏━━━━━━NSFW ANIME━━━━━┓
┣┅⟣ ❒ .xwaifu (ⓓ)
┣┅⟣ ❒ .xneko (ⓓ)
┣┅⟣ ❒ .blowjob (ⓓ)
┣┅⟣ ❒ .trap (ⓓ)
┣┅⟣ ❒ .yuri (ⓓ)
┣┅⟣ ❒ .cum (ⓓ)
┣┅⟣ ❒ .hentai (ⓓ)
┗━━━━━━━━━━━━━━━━━━━┛
┏━━━━━━NSFW +18━━━━━┓
┣┅⟣ ❒ .ass (ⓓ)
┣┅⟣ ❒ .boobs (ⓓ)
┣┅⟣ ❒ .lesbian (ⓓ)
┣┅⟣ ❒ .pack (ⓓ)
┣┅⟣ ❒ .pussy (ⓓ)
┣┅⟣ ❒ .xnxx (ⓓ)
┗━━━━━━━━━━━━━━━━━━━┛
┏━━━━━━OWNER━━━━━┓
┣┅⟣ ❒ .expired <días>
┣┅⟣ ❒ .addprem @user <hour>
┣┅⟣ ❒ .autoadmin
┣┅⟣ ❒ .ban @user
┣┅⟣ ❒ .banchat
┣┅⟣ ❒ .listban
┣┅⟣ ❒ .tx
┣┅⟣ ❒ .cleartmp
┣┅⟣ ❒ .delexpired
┣┅⟣ ❒ .delprem @user
┣┅⟣ ❒ .getplugin
┣┅⟣ ❒ .reset-user
┣┅⟣ ❒ .restart
┣┅⟣ ❒ .unban @user
┣┅⟣ ❒ .unbanchat
┣┅⟣ ❒ .update
┗━━━━━━━━━━━━━━━━━━━┛
≡ Use estos comandos sin el prefijo: .
╭━━━〔 AUDIOS 〕━━━◉
┃╭━━━━━━━━━━━━━━━━━ 
┃┃ Buenos días
┃┃ Buenas tardes 
┃┃ Buenas noches
┃┃ Fino señores
┃┃ Sad
┃┃ Motivación
┃┃ fiesta viernes
┃┃ Uwu
┃┃ Estoy triste
┃┃ un Pato
┃┃ ara ara
┃┃ Bueno master
┃┃ Calla Fan de bts
┃┃ Tengo los calzones
┃╰──────────────
╰━━━━━━━━━━━━━━◉
┏━━━━━━MENU FF━━━━━┓
┣┅⟣ ❒ .vs4 
┣┅⟣ ❒ .vs6
┣┅⟣ ❒ .vs8
┣┅⟣ ❒ .vs12
┣┅⟣ ❒ .vs20
┣┅⟣ ❒ .scrim
┗━━━━━━━━━━━━━━━━━━━┛
`
}

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { exp, diamond, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'es'
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length

    // Personalización del texto
    let before = defaultMenu.before
    let after = defaultMenu.after

    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.getName(conn.user.jid),
      level, diamond, name, date, time, totalreg,
    }

    let text = before + after
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

    // Imagen del menú
    let pp = 'https://i.postimg.cc/dt41PbNh/menu1.jpg'

    // Enviar el menú
    conn.sendFile(m.chat, pp, 'menu.jpg', text.trim(), m, null, { mentions: [m.sender] })

    m.react('💀')

  } catch (e) {
    conn.reply(m.chat, '❎ Lo sentimos, el menú tiene un error', m)
    throw e
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = /^menu|help|menú$/i  // Sin prefijo
handler.register = false

handler.exp = 3

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [d, 'd ', h, 'h ', m, 'm '].map(v => v.toString().padStart(2, 0)).join('')
}
