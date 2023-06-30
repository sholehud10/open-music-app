const Hapi = require('@Hapi/hapi');
const albums = require('./api/albums');
const AlbumsService = require('./services/AlbumsService');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  const albumsService = new AlbumsService();

  await server.register({
    plugin: albums,
    options: {
      service: albumsService,
    },
  });

  await server.start();
  console.log(`server berjalan pada ${server.info.uri}`);
};

init();
