import RNFS from 'react-native-fs';
import { AsyncStorage } from '@terminus/nusi-mobile';
import { nanoid } from 'nanoid';

const FILE_MANAGER_STORAGE_KEY = 'FILE_MANAGER_STORAGE_KEY';

const Dir = RNFS.CachesDirectoryPath;

class FileManager {
  static manager = null as Record<string, { hash: string; path: string }> | null;

  static async getManager() {
    if (!this.manager) {
      this.manager = JSON.parse((await AsyncStorage.get(FILE_MANAGER_STORAGE_KEY)) || '{}') || {};
    }
  }

  /**
   * 对文件进行下载
   * @param  {string} url
   */
  static async prefetch(url: string) {
    const extName = url.split('.')[url.split('.').length - 1];
    const toFile = `${Dir}/${nanoid()}.${extName}`;
    const { statusCode } = await RNFS.downloadFile({ fromUrl: url, toFile }).promise;
    if (statusCode >= 200 && statusCode < 300) {
      const hash = await RNFS.hash(toFile, 'md5');
      await this.getManager();
      this.manager = { ...this.manager, [url]: { hash, path: toFile } };
      await AsyncStorage.set(FILE_MANAGER_STORAGE_KEY, JSON.stringify(this.manager));
    }
  }

  /**
   * 根据url查询缓存
   * @param  {string} url
   */
  static async queryCache(url: string) {
    await this.getManager();
    const filePath = this.manager?.[url]?.path;
    if (!filePath) {
      return null;
    }
    const exists = await RNFS.exists(filePath);
    if (exists) {
      return `file://${filePath}`;
    }
    return null;
  }
}

export default FileManager;
