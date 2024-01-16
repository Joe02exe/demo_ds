import {Component, OnInit} from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {DatePipe} from '@angular/common';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card'; 
import { RedisService } from '../redis.service';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-wall-of-shame',
  standalone: true,
  imports: [MatListModule, MatIconModule, MatDividerModule, DatePipe, MatCardModule],
  templateUrl: './wall-of-shame.component.html',
  styleUrl: './wall-of-shame.component.scss'
})
export class WallOfShameComponent implements OnInit{

  images : Blob[] = []
  
  constructor (private redisService: RedisService) {
  }
  
  ngOnInit(): void {
    this.redisService.getWallOfShame().subscribe((data) => {
      this.images = data
    });  }

  department: string = "Wall Of Shame"

}
