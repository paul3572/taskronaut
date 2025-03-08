const serverHostName = 'taskronaut.at/api';
const clientHostName = 'localhost';

const serverPort = 3001;
const clientPort = 4321;

const serverProtocol = 'https';
const clientProtocol = 'http';

export const serverURL = `${serverProtocol}://${serverHostName}`;
export const clientURL = `${clientProtocol}://${clientHostName}:${clientPort}`;
