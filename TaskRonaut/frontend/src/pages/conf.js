const serverHostName = 'taskronaut.at/api';
const clientHostName = 'localhost';

const serverPort = 3001;
const clientPort = 4321;

const protocol = 'http';

export const serverURL = `${protocol}://${serverHostName}`;
export const clientURL = `${protocol}://${clientHostName}:${clientPort}`;
