import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Item } from '../item';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faTrash, faTimes, faUndo, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit {

  id: number;
  item: Item = new Item();

  // Icons
  faEdit = faEdit;
  faTrash = faTrash;
  faTimes = faTimes;
  faUndo = faUndo;
  faCheck = faCheck;

  constructor(private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.itemService.getItemById(this.id).subscribe((data: any) => {
      this.item = data;
      
    }, (error: any) => console.log(error));
  }

  clearSearch() {
    this.item.type = '';
    this.item.description = ' ';
  }

  onSubmit(){
    this.itemService.updateItem(this.id, this.item).subscribe( (data: any) =>{
      if (!this.item.type || !this.item.description) {
        alert('Os dois campos são obrigatórios.');
        return;
      }
      this.goToItemList();
    }
    , (error: any) => console.log(error));
  }

  goToItemList(){
    this.router.navigate(['/items']);
  }
}
