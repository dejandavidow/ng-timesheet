import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Category } from '../../model/category';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-one-category',
  templateUrl: './one-category.component.html',
  styleUrls: ['./one-category.component.css']
})
export class OneCategoryComponent implements OnInit {

  @Input() category:Category = new Category('','')
  @Output() deleteCategoryEmit = new EventEmitter<string>();

  constructor(private categoryService:CategoryService,private message: NzMessageService) { }
  ngOnInit(): void {
  }

  deleteCategory(id:string){
    this.deleteCategoryEmit.emit(id);
  }
  updateCategory(id:string,categoryname:string){
    this.categoryService.PutCategoryAsync(id,{id,name:categoryname}).subscribe(() =>{
      this.message.success("Category updated successfuly")
    })
  }
}