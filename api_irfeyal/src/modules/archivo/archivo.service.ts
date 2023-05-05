import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Archivo } from './entities/archivo.entity';
import { Repository } from 'typeorm';
import { join } from 'path';
import { google } from 'googleapis';
import { NivelEstudioService } from '../nivel_estudio/nivel_estudio.service';
import { drive } from 'googleapis/build/src/apis/drive';

@Injectable()
export class ArchivoService {
  constructor(
    @InjectRepository(Archivo)
    private readonly _archivoService: Repository<Archivo>,
    private readonly _nivelEstudioService: NivelEstudioService,
  ) {}

  async obtenerArchivosPorCapitulo(capId: number) {
    try {
      const buscarPorCodigo = await this._archivoService.find({
        where: {
          capId: capId,
        },
      });
      console.log(buscarPorCodigo);
      return buscarPorCodigo;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  // async obtenerAudioDeGoogleDrive(name) {
  //   const KEYFILEPATH = join(process.cwd(), 'credentials.json');
  //   const SCOPES = ['https://www.googleapis.com/auth/drive'];
  //   const auth = new google.auth.GoogleAuth({
  //     keyFile: KEYFILEPATH,
  //     scopes: SCOPES,
  //   });

  //   const drive = await google.drive({ version: 'v3', auth });
  //   const resultado = await drive.files.list({
  //     spaces: 'drive',
  //     fields:
  //       'files(id, name, mimeType, modifiedTime, originalFilename, webContentLink)',
  //   });
  //   // 'files(id, name, mimeType, modifiedTime, originalFilename, webContentLink)',
  //   const listaAudios = resultado.data.files;
  //   // console.log(listaAudios);
  //   for (let i = 0; i < listaAudios.length; i++) {
  //     const element = listaAudios[i];
  //     if (element.originalFilename == name) {
  //       return { url: element.webContentLink + '.mp3' };
  //     }
  //   }
  //   throw new HttpException(
  //     { message: 'No existe Audio en el servidor de google' },
  //     HttpStatus.BAD_REQUEST,
  //   );
  // }

  async obtenerAudioDeGoogleDrive(name) {
    const KEYFILEPATH = join(process.cwd(), 'credentials.json');
    const SCOPES = ['https://www.googleapis.com/auth/drive'];
    const auth = new google.auth.GoogleAuth({
      keyFile: KEYFILEPATH,
      scopes: SCOPES,
    });

    const drive = await google.drive({ version: 'v3', auth });
    const fileList = [];
    let NextPageToken = '';
    do {
      const params = {
        pageToken: NextPageToken || '',
        pageSize: 1000,
        fields: 'nextPageToken, files(id, originalFilename,webContentLink)',
        corpora: 'allDrives',
        includeItemsFromAllDrives: true,
        supportsAllDrives: true,
      };
      const res = await drive.files.list(params);
      Array.prototype.push.apply(fileList, res.data.files);
      NextPageToken = res.data.nextPageToken;
    } while (NextPageToken);
    for (let i = 0; i < fileList.length; i++) {
      const element = fileList[i];
      if (element.originalFilename == name) {
        return { url: element.webContentLink + '.mp3', nombreArchivo: name };
      }
    }
    throw new HttpException(
      { message: 'No existe Audio en el servidor de google' },
      HttpStatus.BAD_REQUEST,
    );
  }
}
