import { Component, OnInit } from '@angular/core';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss']
})
export class CardFormComponent implements OnInit {
  content: any = {};  // Will hold the dynamic content

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.contentService.getContent().subscribe((content) => {
      this.content = content;  // Fetch the content from the backend and update the UI
    });
  }
}
