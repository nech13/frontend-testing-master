import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {   // экспортируется класс компонента AppComponent
  users: any[] = []; // TODO: выделить модель данных
  chanels: any[] = [];
  content: any[] = [];

  userName = new FormControl();  // одиночный контрол формы
  userFavorite = new FormControl();

  private httpClient: HttpClient;
  //private route: ActivatedRoute;

  constructor(httpClient: HttpClient/*, route: ActivatedRoute*/) {
    this.httpClient = httpClient;
   // this.route = route;

    //this.route.params.
  }

  ngOnInit(): void {  // Выполняет инициализацию компонента
    this.httpClient.get<any[]>('/assets/users.json').subscribe((users: any[]) => {
      this.users = users;
    });

    this.httpClient.get<any[]>('/assets/tv_channels.json').subscribe((channels: any[]) => {
      this.chanels = channels;
    });

    this.httpClient.get<any[]>('/assets/content.json').subscribe((content: any[]) => {
      this.content = content;
    });
  }

  // вычисляет любимый канал
  getFavoriteChannels(favConId: number[]): string[] {
    if (!Array.isArray(favConId) || favConId.length <= 0) { // проверка на пустой массив
      return ['Нет любимых каналов'];
    }
    const favorite: number[] = [];
    for (const i of this.chanels) {
      favorite.push(favConId.filter(fav => {
        return this.content.filter(con => (
          con.channel_id === i.channel_id &&
            con.favorite_content_id === fav
        )).length > 0;
      }).length);
    }
    const max: number = Math.max(...favorite);
    const result: string[] = this.chanels.filter(elem => favorite[elem.channel_id - 1] >= max).map(elem => elem.name);
    return result;
  }

  // записывает новые данные
  onUser(): void {
    const name = this.userName.value;
    const favorite = this.userFavorite.value;
    this.httpClient.post('/', { name, favorite }).subscribe((data) => {
      console.log(data);
    });
  }

}
