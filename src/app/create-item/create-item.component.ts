import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';
import { Router } from '@angular/router';
import { faEdit, faTrash, faTimes, faUndo, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent implements OnInit {

  item: Item = new Item();

  // Icons
  faEdit = faEdit;
  faTrash = faTrash;
  faTimes = faTimes;
  faUndo = faUndo;
  faCheck = faCheck;

  constructor(private itemService: ItemService,
    private router: Router) { }

  ngOnInit(): void {
    this.item.description = '';
    this.item.type = '';
  }

  saveItem(){
    this.itemService.createItem(this.item).subscribe( (data: any) =>{
      console.log(data);
      this.goToItemList();
    },
      (    error: any) => console.log(error));
  }

  goToItemList(){
    this.router.navigate(['/items']);
  }

  clearSearch() {
    this.item.type = '';
    this.item.description = '';
  }
  
  onSubmit(){
    if (!this.item.type || !this.item.description) {
      alert('Os dois campos são obrigatórios.');
      return;
    } 
    console.log(this.item);
    this.saveItem();
  }
}
