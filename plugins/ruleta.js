let handler = async (m, { conn, participants, command }) => {
    // Lista de números de teléfono de los owners (sin el prefijo de país, ej: '1234567890')
    const owners = ['66959353791', '15798921335']; // Agrega aquí los números de los owners

    // Filtramos los participantes que no sean el bot ni los owners
    let nonOwners = participants.filter(p => 
        !owners.includes(p.id.split('@')[0]) && // No es un owner
        !conn.user.jid.includes(p.id) // No es el bot
    );

    // Si no quedan participantes válidos para expulsar
    if (nonOwners.length === 0) 
        return m.reply(`🚫 No hay usuarios elegibles para la Ruleta Ban.`);

    // Elegimos un usuario al azar
    let randomUser = nonOwners[Math.floor(Math.random() * nonOwners.length)].id;

    // Procedemos a expulsar al usuario seleccionado
    await conn.groupParticipantsUpdate(m.chat, [randomUser], 'remove');
    
    // Mensaje informando sobre el eliminado
    m.reply(`🔪 La Ruleta Ban ha decidido...\n\n🎯 *Usuario eliminado:* @${randomUser.split('@')[0]}`, null, {
        mentions: [randomUser],
    });
};

// Permite que el comando funcione con o sin prefijo
handler.help = ['ruletaban'];
handler.tags = ['group'];
handler.command = /^ruletaban|ruleta$/i; // Detección sin prefijo y con prefijo
handler.admin = true;
handler.group = true;
handler.botAdmin = true;

export default handler;
