import { Component, OnInit } from '@angular/core';
import { RegisterEventValidatorService } from 'src/app/services/validators/register-event/register-event-validator.service';
import { FatappCoreService } from 'src/app/services/fatapp-core/fatapp-core-service.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { NavController } from '@ionic/angular';
import { ToolsService } from 'src/app/services/tools/tools.service';

@Component({
  selector: 'app-register-event',
  templateUrl: './register-event.page.html',
  styleUrls: ['./register-event.page.scss'],
})
export class RegisterEventPage {

  public formEvent;
  public validationMessages;
  public banner;


  constructor(
    private eventValidator: RegisterEventValidatorService,
    private apiCore: FatappCoreService,
    private global: GlobalsService,
    private navController: NavController,
    private tools: ToolsService,
  ) {
    this.formEvent = this.eventValidator.getFormEvent();
    this.validationMessages = this.eventValidator.getFormEventValidationsMessages();
  }

  async register() {
    try {
      let validDate = false;
      if (!this.formEvent.valid) {
        this.eventValidator.validateAllFormFields();
      } else {
        const loading = await this.global.createLoading('Carregando...');
        await loading.present();
        validDate = await this.tools.validateDate(this.formEvent.value.initialDate, this.formEvent.value.finalDate);
        if (validDate) {
          this.formEvent.value.initialDate = this.tools.formatDate(this.formEvent.value.initialDate);
          this.formEvent.value.finalDate =  this.tools.formatDate(this.formEvent.value.finalDate);
          console.log(this.formEvent.value);
          const response = await this.apiCore.registerEvent(this.formEvent.value);
          console.log(response);
          await loading.dismiss();
          await this.global.createToast('Evento cadastrado com sucesso!');
          this.resetInputs();
        } else {
          await loading.dismiss();
          this.global.createAlert('Data inválida');

        }

      }
    } catch (error) {
      console.log(error);
    }
  }

  resetInputs() {
    this.formEvent.reset();
  }
  // async selectBanner(event) {
  //   this.banner = await this.tools.toBase64(event.target.files[0]);
  // }
}
