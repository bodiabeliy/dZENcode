const fs = require("fs") // работа с файловой системой
const File = require("../models/File")
const config  = require("config")
const path = require('path');



class FileService {

    // ф-я создания папок
    createDir(req, file) {

        // создание пути  для файла (путь к домашей папке\имя пользователя\относительный путь)
        return new Promise((resolve, reject) => {
            try {
                let filePath = this.getPath(req, file)
                // если нет папки
                if (!fs.existsSync(filePath)) {
                    fs.mkdir(path.join(filePath, ''),
                    { recursive: true }, (err) => {
                      if (err) {
                        return console.error('error', err);
                      }
                      return resolve('Directory was created successfully!');
                    });
                }
                else {
                    return reject({message: "folder already exist!"})
                }
                
            } catch (error) {
                return reject({message: "File creating error!"})
            }
        })
    }

    // получение пути до удаляемоно файла
    getPath(req, file) {
        return req.filePath + '\\' + file.user + '\\' + file.path

    }

    // удаление файла
    deleteFile(req, file) {
        const path = this.getPath(req, file)
        if (file.type === "dir") {
            fs.rmdirSync(path,{recursive:true})
        }
        else {
            fs.unlinkSync(file.path)
        }

    }

}

module.exports = new FileService()