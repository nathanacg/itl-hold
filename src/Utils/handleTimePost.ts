export const handleTimePost = (time: string) => {
    const postTime: Date = new Date(time);
    const now: Date = new Date();

    const differenceInMilliSeconds: number = now.getTime() - postTime.getTime();

    const seconds = Math.floor(differenceInMilliSeconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);

    let result = "";

    switch (true) {
        case seconds < 60:
            result = `há ${seconds} ${seconds > 1 ? 'segundos' : 'segundo'}`;
            break;
        case minutes === 1:
            result = `há ${minutes} minuto`;
            break;
        case minutes < 60:
            result = `há ${minutes} minutos`;
            break;
        case hours === 1:
            result = `há ${hours} hora`;
            break;
        case hours < 24:
            result = `há ${hours} horas`;
            break;
        case days === 1:
            result = `há ${days} dia`;
            break;
        case days < 30:
            result = `há ${days} dias`;
            break;
        case months < 2:
            result = `há ${months} mês`;
            break;
        default:
            result = `há ${months} meses`;
            break;
    }

    return result;
}
