import { AfterContentInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { map, tap, mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterContentInit {
  name = 'Angular';
  imageToShow: any;
  isImageLoading: boolean = true;

  constructor(private httpClient: HttpClient, private chg: ChangeDetectorRef) {}

  ngOnInit() {}

  ngAfterContentInit() {
    var min = 1000000;
    var max = 9999999;
    var num = Math.floor(Math.random() * min) + max;
    this.getImage(`https://picsum.photos/200/300/?rando`);
  }

  getImage(url: string) {
    console.log(url);
    this.httpClient.get(url, { responseType: 'blob', withCredentials: true }).pipe(
      mergeMap(blob => this.blobToBase64(blob)),
    ).subscribe((base64Image) => {
      this.isImageLoading = true;
      console.log("TEST - this.path", base64Image)
      this.imageToShow = base64Image;
      this.chg.detectChanges();
      this.isImageLoading = false;
    });
  }

  private blobToBase64(blob: Blob): Observable<any> {
    const fileReader = new FileReader();
    const observable = new Observable(observer => {
      fileReader.onloadend = () => {
        observer.next(fileReader.result);
        observer.complete();
      };
    });
    fileReader.readAsDataURL(blob);
    return observable;
  }
}
