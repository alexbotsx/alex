let handler = async (m, { conn, groupMetadata }) => { 
    let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(m.chat);

    conn.sendHydrated(
        m.chat,
        `\n${mssg.linkGp} *${groupMetadata.subject}*\n\n${link}`,  // Mensaje que aparecerá
        'Enlace del grupo',  // Texto adicional o pie del mensaje (opcional)
        null,                 // Imagen o multimedia (opcional, aquí es null)
        link,                 // URL del enlace que queremos copiar
        'Copiar enlace',      // Texto del botón
        null,                 // Descripción de otro botón (opcional, aquí es null)
        null,                 // Otra URL (opcional, aquí es null)
        [                     // Lista de botones adicionales (opcional)
            [null]            // Opcional, aquí se puede añadir otro botón
        ],
        m
    );
};

handler.help = ['link'];
handler.tags = ['group'];
handler.command = ['linkgroup', 'link'];
handler.group = true;
handler.botAdmin = true;

export default handler;
