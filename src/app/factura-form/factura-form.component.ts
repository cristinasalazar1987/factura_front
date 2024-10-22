import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { FacturaService } from '../factura.service';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './factura-form.component.html',
  styleUrls: ['./factura-form.component.css']
})
export class FacturaFormComponent implements OnInit {

  facturaForm: FormGroup;
  facturas: any[] = [];
  proveedores: any[] = [];
  productos: any[] = [];

  constructor(private fb: FormBuilder, private facturaService: FacturaService) {
    this.facturaForm = this.fb.group({
      nombreCliente: ['', Validators.required],
      idProveedor: ['', Validators.required],
      detalles: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.cargarFacturas();
    this.cargarProveedores();
    this.cargarProductos();
  }

  cargarFacturas() {
    this.facturaService.getFacturas().subscribe(data => {
      this.facturas = data;
    });
  }

  cargarProveedores() {
    this.facturaService.getProveedores().subscribe(data => {
      this.proveedores = data;
    });
  }

  cargarProductos() {
    this.facturaService.getProductos().subscribe(data => {
      this.productos = data;
    });
  }

  get facturaDetalles() {
    return this.facturaForm.get('detalles') as FormArray;
  }

  agregarProducto() {
    const detalle = this.fb.group({
      idProducto: ['', Validators.required],
      cantidad: [1, Validators.required],
      precio: [0]
    });
    this.facturaDetalles.push(detalle);
  }

  crearFactura() {
    if (this.facturaForm.valid) {
      this.facturaService.crearFactura(this.facturaForm.value).subscribe(() => {
        this.cargarFacturas();
        this.facturaForm.reset();
        this.facturaDetalles.clear();
      });
    }
  }

  eliminarFactura(idFactura: number) {
    this.facturaService.eliminarFactura(idFactura).subscribe(() => {
      this.cargarFacturas();
    });
  }

  actualizarFactura(idFactura: number) {
    const factura = this.facturas.find(f => f.idFactura === idFactura);
    this.facturaForm.patchValue(factura);
    this.facturaDetalles.clear();
    factura.detalles.forEach((detalle: any) => {
      const detalleForm = this.fb.group({
        idProducto: [detalle.idProducto, Validators.required],
        cantidad: [detalle.cantidad, Validators.required],
        precio: [detalle.precio]
      });
      this.facturaDetalles.push(detalleForm);
    });
  }

  eliminarProducto(indice: number) {
    this.facturaDetalles.removeAt(indice);
  }

  generarPDF(factura: any) {
    const doc = new jsPDF();

    // Título del PDF
    doc.setFontSize(18);
    doc.text('Reporte de Factura', 10, 10);

    // Información básica de la factura
    doc.setFontSize(12);
    doc.text(`ID Factura: ${factura.idFactura}`, 10, 20);
    doc.text(`Cliente: ${factura.nombreCliente}`, 10, 30);
    doc.text(`Proveedor: ${factura.nombreProveedor}`, 10, 40);

    // Detalle de los productos en la factura
    doc.text('Detalles de la Factura:', 10, 50);
    factura.detalles.forEach((detalle: any, index: number) => {
      doc.text(`Producto: ${detalle.nombreProducto}`, 10, 60 + (index * 10));
      doc.text(`Cantidad: ${detalle.cantidad}`, 80, 60 + (index * 10));
      doc.text(`Precio: $${detalle.precio}`, 120, 60 + (index * 10));
    });

    // Guardar el archivo PDF
    doc.save(`Factura_${factura.idFactura}.pdf`);
  }

}
