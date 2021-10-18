import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Item } from '../item'
import { ItemService } from '../item.service'
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { faEdit, faTrash, faPlus, faUndo  } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  items: Item[];
  filterType: string = '';
  filterDescription: string = '';

  //
  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;
  faUndo = faUndo;

  @ViewChild('searchType') searchType: ElementRef<HTMLInputElement>;
  @ViewChild('searchDescription') searchDescription: ElementRef<HTMLInputElement>;

  constructor(private itemService: ItemService,
    private router: Router) { }

  ngOnInit(): void {
    this.getItems();
  }

  private getItems(){
    this.itemService.getItemsList().subscribe((data: Item[]) => {
      this.items = data;
    });
  }

  ngAfterViewInit() {
    fromEvent(this.searchType.nativeElement, 'change')
      .pipe()
      .subscribe((e: Event) => {
        const target = e.target as HTMLInputElement;
        this.filterType = target.value;
      });

    fromEvent(this.searchDescription.nativeElement, 'keyup')
      .pipe(
        debounceTime(250)
      )
      .subscribe((e: Event) => {
        const target = e.target as HTMLInputElement;
        this.filterDescription = target.value;
      });
  }

  updateItem(id: number){
    this.router.navigate(['update-item', id]);
  }

  deleteItem(id: number){
    this.itemService.deleteItem(id).subscribe( (data: any) => {
      console.log(data);
      this.getItems();
    })
  }

  clearSearch() {
    this.filterDescription = '';
    this.filterType = '';
  }
}
