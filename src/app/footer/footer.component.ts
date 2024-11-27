import { Component, OnInit } from '@angular/core';
import { FooterService } from '../footer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  footerData:any = [];

  constructor(private footer: FooterService, private router: Router,
    private route: ActivatedRoute,
    private scroller: ViewportScroller) { }

  ngOnInit(): void {

    this.footer.GetFooterData().subscribe((p:any) => {
      this.footerData = p;
    })
  }

}
