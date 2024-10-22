import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'], 
  imports: [RouterOutlet, ReactiveFormsModule,HttpClientModule ]
})
export class AppComponent {
  title = 'Sistema Factura Ejemplo QH';
}