import { Component, OnInit } from '@angular/core';
import { FooterService } from '../footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  footerData:any = [];


  constructor(private footer: FooterService) { }

  ngOnInit(): void {
    this.footer.GetFooterData().subscribe((p:any) => {
      this.footerData = p;
    })
  }

}
