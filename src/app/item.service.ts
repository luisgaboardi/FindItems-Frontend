import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private baseURL = "http://localhost:8080/api/v1/items";

  constructor(private httpClient: HttpClient) { }
  
  getItemsList(): Observable<Item[]>{
    return this.httpClient.get<Item[]>(`${this.baseURL}`);
  }

  createItem(employee: Item): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, employee);
  }

  getItemById(id: number): Observable<Item>{
    return this.httpClient.get<Item>(`${this.baseURL}/${id}`);
  }

  updateItem(id: number, employee: Item): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, employee);
  }

  deleteItem(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
