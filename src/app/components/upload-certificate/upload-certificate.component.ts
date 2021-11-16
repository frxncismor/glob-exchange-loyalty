import { Component, OnChanges, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TokenService } from "./../../util/token.service";

@Component({
  selector: "app-upload-certificate",
  templateUrl: "./upload-certificate.component.html",
  styleUrls: ["./upload-certificate.component.css"],
})
export class UploadCertificateComponent implements OnInit, OnChanges {
  form: FormGroup;

  model = {
    title: "",
    url: "",
    date: new Date().toDateString(),
  };

  constructor(
    private tokenService: TokenService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  ngOnInit() {}

  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.tokenService.refreshBalance();
  }

  send() {
    console.log(this.model);
    this.tokenService
      .uploadCourse(this.model.title, this.model.url, this.model.date)
      .then((res) => {
        this.model = {
          title: "",
          url: "",
          date: new Date().toDateString(),
        };
      });
  }

  private buildForm() {
    const urlRegex =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    this.form = this.formBuilder.group({
      title: ["", [Validators.required]],
      url: ["", [Validators.required, Validators.pattern(urlRegex)]],
    });
  }
}
