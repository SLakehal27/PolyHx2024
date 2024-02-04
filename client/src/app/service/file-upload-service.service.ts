import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private storage: AngularFireStorage) {}

  uploadFile(file: File): Observable<string | undefined> {
    // Generate a unique file name (you can customize this)
    const fileName = `${new Date().getTime()}_${file.name}`;
    const fileRef = this.storage.ref(fileName);
    const task = this.storage.upload(fileName, file);

    // Return an observable that resolves to the download URL
    return new Observable((observer) => {
      task.then((snapshot) => {
        fileRef.getDownloadURL().subscribe((downloadURL) => {
          observer.next(downloadURL);
          observer.complete();
        });
      });
      task.catch((error) => {
        observer.error(error);
      });
    });
  }
}
