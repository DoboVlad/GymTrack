import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./layout/header/header";
import { Navbar } from "./layout/navbar/navbar";
import { Footer } from "./layout/footer/footer";
import { AuthService } from './core/services/auth';
import { Loading } from "./core/components/loading/loading";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Navbar, Loading],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected title = 'frontend-gymtrack';

  constructor(protected authService: AuthService) { }

  ngOnInit() {}
}
