export class Factura {
    idFactura?: number = 0;
    idProveedor?: number = 0;
    idCliente?: number = 0;
    detalles?: FacturaDetalle[];
  }

  export interface FacturaDetalle {
    idProducto: number;
    cantidad: number;
  }
  