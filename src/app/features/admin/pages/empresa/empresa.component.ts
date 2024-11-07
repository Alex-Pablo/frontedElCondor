import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class EmpresaComponent {
  empresaForm: FormGroup;
  logotipoURL: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder) {
    this.empresaForm = this.fb.group({
      nombre: [''],
      numero: [''],
      correo: [''],
      direccion: ['']
    });
  }

  onFileChange(event: any) {
    const file = event.target.files;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.logotipoURL = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }


  onSubmit() {
    console.log(this.empresaForm.value);
  }

}
