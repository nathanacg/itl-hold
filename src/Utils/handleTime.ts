export const getDate = (date: string) => {
  const postTime: Date = new Date(date);
  const day = postTime.getDate();
  const month = postTime.getMonth() + 1;
  const year = postTime.getFullYear();

  const formattedDate = `${day < 10 ? '0' : ''}${day}/${
    month < 10 ? '0' : ''
  }${month}/${year}`;

  return formattedDate;
};

export const getDateRoom = (date: string) => {
  const postTime: Date = new Date(date);
  const day = postTime.getDate();
  const month = postTime.getMonth() + 1;
  const year = postTime.getFullYear();
  const hours = postTime.getHours();
  const minutes = postTime.getMinutes();

  const formattedDate = `${day < 10 ? '0' : ''}${day}/${
    month < 10 ? '0' : ''
  }${month}/${year.toString().slice(2, 4)} - ${
    hours < 10 ? '00' : hours
  }h${minutes}`;

  return formattedDate;
};

export const getDateRoomPublic = (date: string) => {
  const postTime: Date = new Date(date);
  const day = postTime.getDate();
  const month = postTime.getMonth() + 1;
  const year = postTime.getFullYear();

  const formattedDate = `${day < 10 ? '0' : ''}${day}/${
    month < 10 ? '0' : ''
  }${month}/${year}`;

  return formattedDate;
};

export const handleTime = (time: string) => {
  const postTime: Date = new Date(time);
  const now: Date = new Date();
  const diferenceInMilliSeconds: number = now.getTime() - postTime.getTime();

  const seconds = Math.floor(diferenceInMilliSeconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const diferenceInDays = diferenceInMilliSeconds / (1000 * 60 * 60 * 24);

  if (diferenceInDays > 7) {
    const weeks = Math.floor(diferenceInDays / 7);
    return `${weeks}sem`;
  } else if (diferenceInDays < 1) {
    if (hours < 1) {
      if (minutes < 1) {
        return `${seconds + 2}s`;
      } else {
        return `${minutes}m`;
      }
    } else {
      return `${hours}h`;
    }
  } else {
    return `${days}d`;
  }
};

export const handleTimeStories = (time: number) => {
  const postTime: Date = new Date(time);
  const now: Date = new Date();
  const diferenceInMilliSeconds: number = now.getTime() - postTime.getTime();

  const seconds = Math.floor(diferenceInMilliSeconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours < 1) {
    if (minutes < 1) {
      return `${seconds}s`;
    } else {
      return `${minutes}m`;
    }
  } else {
    return `${hours}h`;
  }
};

export const formatTimeRec = (milliseconds: number) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
};

export const getDateMsg = (dateString: string) => {
  const postTime = new Date(dateString);

  const offsetInMinutes = 180;
  postTime.setMinutes(postTime.getMinutes() + offsetInMinutes);

  const today = new Date();
  today.setMinutes(today.getMinutes() + offsetInMinutes);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const options = { day: 'numeric', month: 'short' };

  const dataOriginal = dateString;

  const dataObj = new Date(dataOriginal);
  const diasDaSemana = [
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
    'Domingo',
  ];
  const diaDaSemana = diasDaSemana[dataObj.getDay()];

  if (
    postTime.getDate() === today.getDate() &&
    postTime.getMonth() === today.getMonth() &&
    postTime.getFullYear() === today.getFullYear()
  ) {
    return 'Hoje';
  } else if (
    postTime.getDate() === yesterday.getDate() &&
    postTime.getMonth() === yesterday.getMonth() &&
    postTime.getFullYear() === yesterday.getFullYear()
  ) {
    return 'Ontem';
  } else {
    const formattedDate = postTime.toLocaleDateString('pt-BR', options);
    return `${diaDaSemana}, ${formattedDate}`;
  }
};
