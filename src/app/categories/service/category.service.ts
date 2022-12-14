import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient,private authService:AuthService) { }

  GetCategoriesAsync(pageNumber:number,pageSize:number,searchTerm:string,filterLetter:string){
    if(searchTerm !== '' && filterLetter === '')
    {
      return this.http.get<Category[]>(`https://localhost:44381/api/Categories/search?search=${searchTerm}&pageNumber=${pageNumber}&pageSize=${pageSize}`,{headers:this.authService.authHeader()})
    }
    else if(searchTerm ==='' && filterLetter !== ''){
      return this.http.get<Category[]>(`https://localhost:44381/api/Categories/filters?pageNumber=${pageNumber}&pageSize=${pageSize}&letter=${filterLetter}`,{headers:this.authService.authHeader()})
    }
    else
    return this.http.get<Category[]>(`https://localhost:44381/api/Categories?pageNumber=${pageNumber}&pageSize=${pageSize}`,{headers:this.authService.authHeader()})
  }
  GetCategoryCountAsync(filterLetter:string){
    if(filterLetter !== '')
    {
      return this.http.get<number>(`https://localhost:44381/api/Categories/filter-count?letter=${filterLetter}`,{headers:this.authService.authHeader()})
    }
    else
    return this.http.get<number>('https://localhost:44381/api/Categories/search-count',{headers:this.authService.authHeader()})
  }
  PostCategoryAsync(category:Category){
    return this.http.post('https://localhost:44381/api/Categories',JSON.stringify(category),{headers:this.authService.authHeader()})
  }
  DeleteCategoryAsync(id:string){
    return this.http.delete(`https://localhost:44381/api/Categories/${id}`,{headers:this.authService.authHeader()})
  }
  PutCategoryAsync(id:string,category:Category){
    return this.http.put(`https://localhost:44381/api/Categories/${id}`,JSON.stringify(category),{headers:this.authService.authHeader()})
  }
  getCategoriesList(){
    return this.http.get<Category[]>('https://localhost:44381/api/Categories',{headers:this.authService.authHeader()})
  }
}
