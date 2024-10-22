import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private apiUrl = 'http://localhost:8080/api/factura';

  constructor(private http: HttpClient) { }

  getFacturas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }


  crearFactura(factura: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, factura);
  }

  
  eliminarFactura(idFactura: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idFactura}`);
  }

 
  actualizarFactura(idFactura: number, factura: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${idFactura}`, factura);
  }


  getProveedores(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/api/proveedor');
  }

  getProductos(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/api/producto');
  }
}
