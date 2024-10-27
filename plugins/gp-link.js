let handler = async (m, { conn, groupMetadata }) => {
    let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(m.chat);
    
    conn.sendButton(
        m.chat,
        `\n${mssg.linkGp} *${groupMetadata.subject}*\n\n${link}`,  // Mensaje que aparece
        'Enlace del grupo',  // Texto adicional o pie del mensaje (opcional)
        [
            { buttonId: `.copylink`, buttonText: { displayText: 'Copiar enlace' }, type: 1 }
        ]
    );

    // Definir un comando para copiar automáticamente el enlace cuando el usuario presiona el botón
    conn.copyLink = async (msg) => {
        await conn.reply(msg.chat, '🔗 Enlace copiado: ' + link, msg);
    };
};

// Handler para copiar el enlace
handler.command = ['copylink'];
handler.group = true;
handler.botAdmin = true;

export default handler;
