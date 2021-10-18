import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Item } from '../item';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit {

  id: number;
  item: Item = new Item();
  constructor(private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.itemService.getItemById(this.id).subscribe((data: any) => {
      this.item = data;
      
    }, (error: any) => console.log(error));
  }

  onSubmit(){
    this.itemService.updateItem(this.id, this.item).subscribe( (data: any) =>{
      this.goToItemList();
    }
    , (error: any) => console.log(error));
  }

  goToItemList(){
    this.router.navigate(['/items']);
  }
}
