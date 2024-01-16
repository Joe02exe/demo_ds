import {Component, Input, OnInit} from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule, DatePipe} from '@angular/common';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card'; 
import { RedisService } from '../redis.service';

export interface Section {
  name: string;
  updated: Date;
}

export interface Event {
  eventId: string;
  eventType: string;
  timestamp: string;
  description: string;
  videoPath: string;
}


@Component({
  selector: 'app-listcluster',
  standalone: true,
  templateUrl: './listcluster.component.html',
  styleUrl: './listcluster.component.scss',
  imports: [MatListModule, MatIconModule, MatDividerModule, DatePipe, MatCardModule, CommonModule],
})
export class ListclusterComponent implements OnInit{

  @Input() department: string = "";

  events: Event[] = []

  constructor (private redisService: RedisService) {
  }

  ngOnInit() {
    if (this.department == "Fire Department"){
      this.redisService.getPoliceReports().subscribe((data) => {
        this.events = data
        console.log(this.events)
      });
    } else {
      this.redisService.getFireReports().subscribe((data) => {
        this.events = data
        console.log(this.events)
      });
    }
  }
}
