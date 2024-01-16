import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MatListModule} from '@angular/material/list'; 
import { ListclusterComponent } from './listcluster/listcluster.component';
import { WallOfShameComponent } from './wall-of-shame/wall-of-shame.component';
import { RedisService } from './redis.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [RedisService],
  imports: [CommonModule, MatListModule, RouterOutlet, ListclusterComponent, WallOfShameComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend_ds'; 
  fire : string = "Fire Department";
  police: string = "Police Department"
} 
