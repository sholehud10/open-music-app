class AlbumsHandler {
  constructor(service) {
    this._service = service;

    this.postAlbumHandler = this.postAlbumHandler.bind(this);
    this.getAlbumsHandler = this.getAlbumsHandler.bind(this);
    this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
    this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
    this.delAlbumByIdHandler = this.delAlbumByIdHandler.bind(this);
  }

  postAlbumHandler(request, h) {
    try {
      const { name = 'album title', year = 2000 } = request.payload;
      const albumId = this._service.addAlbum({ name, year });

      const response = h.response({
        status: 'success',
        data: {
          albumId: albumId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      const response = h.response({
        status: 'error',
        message: error.message,
      });
      response.code(404);
      console.log(response);
      return response;
    }
  }

  getAlbumsHandler(request, h) {
    try {
      const albums = this._service.getAlbums();
      const response = h.response({
        status: 'success',
        data: {
          albums,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      const response = h.response({
        status: 'error',
        message: error.message,
      });
      response.code(404);
      console.log(response);
      return response;
    }
  }

  getAlbumByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const album = this._service.getAlbumById(id);

      const response = h.response({
        status: 'success',
        data: {
          album: album,
        },
      });
      response.code(200);
      return response;
    } catch (error) {
      const response = h.response({
        status: 'error',
        message: error.message,
      });
      response.code(404);
      console.log(response);
      return response;
    }
  }

  putAlbumByIdHandler(request, h) {
    try {
      const { id } = request.params;
      this._service.editAlbumById(id, request.payload);

      const response = h.response({
        status: 'success',
        message: 'Album berhasil diperbarui',
      });
      response.code(200);
      return response;
    } catch (error) {
      const response = h.response({
        status: 'error',
        message: error.message,
      });
      response.code(404);
      console.log(response);
      return response;
    }
  }

  delAlbumByIdHandler(request, h) {
    try {
      const { id } = request.params;
      this._service.deleteAlbumById(id);

      const response = h.response({
        status: 'success',
        message: 'Album berhasil dihapus',
      });
      response.code(200);
      return response;
    } catch (error) {
      const response = h.response({
        status: 'error',
        message: error.message,
      });
      response.code(404);
      console.log(response);
      return response;
    }
  }
}

module.exports = AlbumsHandler;
